import React from 'react';

class Sidebar extends React.Component {

  
    render() {
      return <div class="sidebarHistory">
                <div>{this.props.status}</div>
                <ol>{this.props.moves}</ol>
            </div>
    }
  }

  export default Sidebar;