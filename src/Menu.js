import React from 'react';


class Menu extends React.Component {


    render() {
    
        return <>
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h1 id="page-title">Fave Munchies</h1>
                </div>
                <ul className="list-unstyled components">
                    <p id="menu-title">Menu</p>
                    <li className="nav-btn" id="ResList">
                        <a onClick={event=>this.props.choosePage(event, "ResList")} href="#" >Restaurant List</a>
                    </li>
                    <li className="nav-btn" id="AddRes">
                        <a onClick={event=>this.props.choosePage(event, "AddRes")} href="#" >Add Restaurant</a>
                    </li>
                    <li className="nav-btn" id="AddLoc">
                        <a onClick={event=>this.props.choosePage(event, "AddLoc")} href="#" >Add Location</a>
                    </li>
                </ul>
                <ul className="list-unstyled CTAs">
                    <li>
                        <a href="http://s000.tinyupload.com/download.php?file_id=35847823384655688988&t=3584782338465568898817852" className="download">Download Readme</a>
                    </li>
                </ul>
            </nav>
        </>;
    }
}

export default Menu;