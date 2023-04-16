import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from './feed-components/Header'; //imports the header
import LeftBar from './feed-components/LeftBar'; //imports the leftbar
import RightBar from "./feed-components/RightBar"; //imports the rightbar
import MainFeed from './feed-components/MainFeed'; //imports the main feed

export default class Feed extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          checkedIfLoggedIn: false,
          isLoggedIn: null,
          useremail: localStorage.getItem("useremail")
        }
    
        this.logout = this.logout.bind(this);
        
    }

    componentDidMount() {
        // Send POST request to check if user is logged in
        fetch("http://localhost:3001/checkifloggedin",
          {
            method: "POST",
            credentials: "include"
          })
          .then(response => response.json())
          .then(body => {
            if (body.isLoggedIn) {
              this.setState({ checkedIfLoggedIn: true, isLoggedIn: true, username: localStorage.getItem("useremail")});
            } else {
              this.setState({ checkedIfLoggedIn: true, isLoggedIn: false });
            }
          });
    }

    logout(e) {
        e.preventDefault();
    
        // Delete cookie with authToken
        const cookies = new Cookies();
        cookies.remove("authToken");
    
        // Delete username in local storage
        localStorage.removeItem("useremail");
    
        this.setState({ isLoggedIn: false });
    }

    searchUser(e) {

    }

    render() {
        if (!this.state.checkedIfLoggedIn) {
          // delay redirect/render
          return (<div></div>)
        }
    
        else {
          if (this.state.isLoggedIn) {
            // render the page
            return (
              <div className="Feed">
                <Header butfunc={this.logout}/>
                <LeftBar />
                <RightBar />
                <MainFeed />
              </div>
            )
          }
    
          else {
            // redirect
            return <Navigate to="/log-in" />
          }
        }
    }

}