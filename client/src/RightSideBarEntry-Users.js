import axios from 'axios';
import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import { addDMRoom } from '../actions/DMRoomActions';
import { setCurrentRoom } from '../actions/CurrentRoomActions';

const RightSideBarEntryUser = ({ dispatch, DMRooms, user, allUsers, currentUser, currentRoom, theSocket }) => {

  const handleReceive = (cb,body) => {
    dispatch(cb(body));
  }

  const getPeerToChangeRoom = (room) => {
    //emits to socket and has it alert to that user that I want to chat
    theSocket.emit("direct message",{
      recipientEmail: user.email,
      room: room,
      msg: user.username + ', ' + currentUser.username +" wants to open a direct chat with you!"
    });
  }

  return (
    <li onClick={ 
      () => {
        //for now, this will open up a DM request

        // console.log("clicked user",user)

        // //emits to socket and has it alert to that user that I want to chat
        // theSocket.emit("direct message",{
        //   recipientEmail: user.email,
        //   // room: currentRoom.channelName,
        //   msg: user.username + ', ' + currentUser.username +" wants to open a direct chat with you!"
        // });

        //if DM room exists i.e. in the DB, set currentRoom to room with that person
        let roomExists = false;
        for(let i = 0; i<DMRooms.length; i++){
          if(user.username === DMRooms[i].user1username || user.username === DMRooms[i].user2username){
            handleReceive(setCurrentRoom,DMRooms[i]);
            theSocket.emit('changeRoom', currentRoom);
            getPeerToChangeRoom(DMRooms[i]);
            roomExists = true;
            return;
          }
        }
        //otherwise make a new room
        if(!roomExists){
            //set up a new direct message room
            axios.post('/db/DMRooms',{ 
              user1: currentUser.id, 
              user2: user.id,
              channelName: currentUser.username + user.username, //i.e. CanhJulia
              aliasName: user.username + currentUser.username }) //i.e. JuliaCanh
            .then((response) => {
              console.log("room created in DB!", response);
              let roomToAdd = {
                id: response.data[0],
                user1ID: currentUser.id,
                user2ID: user.id,
                user1username: currentUser.username,
                user2username: user.username,
                channelName: currentUser.username + user.username,
                aliasName: user.username + currentUser.username,
                currentRoomToggle: true
              }
              //add room to Store
              handleReceive(addDMRoom,roomToAdd);

              //change current room in Store and in the Socket
              handleReceive(setCurrentRoom,roomToAdd);
              theSocket.emit('changeRoom', currentRoom.channelName);
              // getPeerToChangeRoom();
            })
            .then( () => getPeerToChangeRoom(currentRoom))
            .catch((err) => console.error(err))          
        }

      }
    }>
      * { user.username }
    </li>

  );
}

const mapStateToProps = (state, ownProps) => {
  console.log("DM Rooms",state.allReducers.DMRoomReducer)
  return { 
    currentUser: state.allReducers.CurrentUserReducer,
    currentRoom: state.allReducers.CurrentRoomReducer,
    DMRooms: state.allReducers.DMRoomReducer,
    allUsers: state.allReducers.UserReducer 
  }
};

export default connect(mapStateToProps)(RightSideBarEntryUser);


