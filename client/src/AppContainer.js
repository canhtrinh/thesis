import React, { PropTypes } from 'react';
import Nav from './nav.js';
import PrimaryChatroom from './PrimaryChatroom.js';
import LeftSideBar from './sidebar.js';
import SideBar from 'react-side-bar';
import RightSideBarContainer from './RightSideBarForMembers.js';

class AppContainer extends React.Component {

  constructor(props){
    super(props)
    this.socket = io('/Hack-Reactor-NameSpace');
  }

  // render(){
  //   return (
  //     <div>

  //       <div><Nav /></div>
        
  //       <table>
  //         <td><LeftSideBar theSocket={this.socket} /></td>
  //         <td><PrimaryChatroom theSocket={this.socket} /></td>
  //       </table>



  //     </div>
  //   )
  // }

  // showMenu() {
  //     this.refs.menu.show()
  // }

  // showDeeperMenu() {
  //     this.refs.deeperMenu.show()
  // }

  // render() {
  //     return (
  //       <div>
  //           <h1>React JS Sliding Menu</h1>
  //           <button onClick={this.showMenu}>Show Menu!</button>

  //           <Menu ref="menu" alignment="right" type="main-menu">
  //               <MenuItem onClick={this.showDeeperMenu}>Option 1</MenuItem>
  //               <MenuItem onClick={this.showDeeperMenu}>Option 2</MenuItem>
  //               <MenuItem onClick={this.showDeeperMenu}>Option 3</MenuItem>
  //           </Menu>

  //           <Menu ref="deeperMenu" alignment="right" type="deeper-menu">
  //               <MenuItem>Deep option 1</MenuItem>
  //               <MenuItem>Deep option 2</MenuItem>
  //               <MenuItem>Deep option 3</MenuItem>
  //           </Menu>

  //       </div>
  //     )
  // }

  render(){
    return (
      <div>

        <div><RightSideBarContainer /></div>

      </div>
    )
  }

}

export default AppContainer