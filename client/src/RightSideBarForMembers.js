import React from 'react';
import ReactDOM from 'react-dom';
import SideBar from './RightSideBarExample';

class RightSideBarContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      barOpened: false,
      duration: 150,
      mode: 'over',
      side: 'left',
      size: 256,
      tolerance: 70,
      topBarIncluded: false
    };
  }

  toggleBar() {
    this.setState({ barOpened: !this.state.barOpened });
  }

  onOpen() {
    this.setState({ barOpened: true });
  }

  onClose() {
    this.setState({ barOpened: false });
  }

  handleChangeSide(event) {
    console.log("side",event.target.value)
    this.setState({ side: event.target.value });
  }

  handleChangeTopBar(event) {
    this.setState({ topBarIncluded: !this.state.topBarIncluded });
  }

  render() {
    const { barOpened, duration, mode, side, size, topBarIncluded } = this.state;
    const { BEHIND, OVER, PUSH } = SideBar.MODES;
    const { LEFT, RIGHT } = SideBar.SIDES;
    const navIconClassName = [ 'nav-icon' ];

    if (barOpened) {
      navIconClassName.push('open');
    }
    const bar = (<div className='side'>Amazing SideBar</div>);
    const topBar = (<div className='topBar'>
      <div className='left'>
        <div
          className={navIconClassName.join(' ')}
          onClick={this.toggleBar.bind(this)}>
          <span/><span/><span/><span/>
        </div>
      </div>
      <div className='center'>SideBar</div>
      <div className='right'></div>
    </div>);

    const sideBarProps = {
      bar: bar,
      mode: mode,
      opened: barOpened,
      onOpen: this.onOpen.bind(this),
      onClose: this.onClose.bind(this),
      side: side,
      veilStyle: {
        opacity: 0.4
      }
    };

    if (topBarIncluded) {
      sideBarProps.topBar = topBar;
    }

    return (
      <SideBar {...sideBarProps}>
        { !topBarIncluded && topBar }
        <div className='main'>

          <section className='opened-option'>
            <div className='title'>Opened</div>
            <div className='explain'>
              Set this option to open or close sidebar.
            </div>
            <div className='option-wrapper'>
              <input
                id='opened-option'
                onChange={this.toggleBar.bind(this)}
                type='checkbox'
                checked={barOpened} />
              <label htmlFor='opened-option'>Opened</label>
            </div>
          </section>

          <section className='openingSide-option'>
            <div className='title'>Side</div>
            <div className='explain'>
              Set the side where to place the sidebar, <b>LEFT</b> or
              <b>RIGHT</b>.
            </div>
            <div className='option-wrapper'>
              <select value={side} onChange={this.handleChangeSide.bind(this)}>
                <option value={LEFT}>{LEFT}</option>
                <option value={RIGHT}>{RIGHT}</option>
              </select>
            </div>
          </section>

          <section className='topBar-option'>
            <div className='title'>TopBar</div>
            <div className='explain'>
              This option allows integrate the topBar of the app as part of the
              SideBar component to open the sidebar ignoring the topBar.
            </div>
            <div className='option-wrapper'>
              <input
                id='topBar-option'
                onChange={this.handleChangeTopBar.bind(this)}
                type='checkbox'
                checked={topBarIncluded} />
              <label htmlFor='topBar-option'>Include TopBar</label>
            </div>
          </section>

        </div>
      </SideBar>
    );
  }
}

export default RightSideBarContainer;









// Another example

// import React from 'react';

// var CloseMenuButton = React.createClass({
//     render: function() {
//         return <button onClick={this.props.onClick}>{this.props.children}</button>;
//     }
// });

// var MenuItem = React.createClass({
//     render: function() {
//         return <div onClick={this.props.onClick} className="menu-item">{this.props.children}</div>;
//     }
// });

// var Menu = React.createClass({
//     getInitialState: function() {
//         return {
//             visible: false  
//         };
//     },

//     show: function() {
//         this.setState({ visible: true });
//     },

//     hide: function() {
//         this.setState({ visible: false });
//     },


//     render: function() {
//         return <div className="menu">
//             <div className={(this.state.visible ? "visible" : "") + " right " + this.props.type}>
//               <CloseMenuButton onClick={this.hide}>Close</CloseMenuButton>
//               {this.props.children}
//             </div>
//         </div>;
//     }
// });



// var App = React.createClass({

//     showMenu: function() {
//         this.refs.menu.show();
//     },

//     showDeeperMenu: function() {
//         this.refs.deeperMenu.show();
//     },

//     render: function() {
//         return <div>
//             <h1>React JS Sliding Menu</h1>
//             <button onClick={this.showMenu}>Show Menu!</button>

//             <Menu ref="menu" alignment="right" type="main-menu">
//                 <MenuItem onClick={this.showDeeperMenu}>Option 1</MenuItem>
//                 <MenuItem onClick={this.showDeeperMenu}>Option 2</MenuItem>
//                 <MenuItem onClick={this.showDeeperMenu}>Option 3</MenuItem>
//             </Menu>

//             <Menu ref="deeperMenu" alignment="right" type="deeper-menu">
//                 <MenuItem>Deep option 1</MenuItem>
//                 <MenuItem>Deep option 2</MenuItem>
//                 <MenuItem>Deep option 3</MenuItem>
//             </Menu>

//         </div>;
//     }
// });

// export default App;