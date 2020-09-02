import React from 'react';

class Sidebar extends React.Component {

    render() {
      return <div class="sidebarWrapper">
              <div class="sidebarHistory">
                <div>{this.props.status}</div>
                <ol>{this.props.moves}</ol>
            </div>
          </div>    
    }
  }

  export default Sidebar;