import React from 'react';

/* The side menu of the web app */
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
                        <a href="http://s000.tinyupload.com/download.php?file_id=95197881208836191904&t=9519788120883619190493819" className="download">Download Readme</a>
                    </li>
                </ul>
            </nav>
        </>;
    }
}

export default Menu;