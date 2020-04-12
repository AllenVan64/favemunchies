import React from 'react';
import Menu from './Menu.js';
import Content from './Content.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currPage: "ResList"
    }
    this.choosePage = this.choosePage.bind(this);
  }

  componentDidMount() {
    let button = document.getElementById(this.state.currPage);
    button.classList.add("active");
  }

  // Sets the actual page and sets button as active
  choosePage(event, page) {
    var buttons = document.getElementsByClassName("nav-btn");
    var buttons;
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("active");
    }
    
    let button = document.getElementById(page);
    button.classList.add("active");
    
    if(this.state.currPage.localeCompare(page) != 0) {
      this.setState({
        currPage: page
      });
    }
  }
  
  render() {
    
    return <>
        <Menu choosePage = {this.choosePage} />
        <Content currPage = {this.state.currPage}/>
    </>;
  }
}

export default App; 
