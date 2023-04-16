import React, { Component } from "react";
import Cookies from "universal-cookie";
import logo from './assets/logo.png'; //imports the logo
import './LogIn.css'; //imports the css
import { Navigate } from "react-router-dom";

export default class LogIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isValidCred: false
        }

        this.checkLForm = this.checkLForm.bind(this);
    }

    checkLForm(e) {
        if(document.getElementById('l-myForm').checkValidity() === true) { //performs the validity of the form (checks if every field has input and if they are in correct format)
            e.preventDefault();

            const credentials = {
                email: document.getElementById("l-email").value,
                password: document.getElementById("l-password").value
              }
          
              // Send a POST request
              fetch(
                "http://localhost:3001/login",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(credentials)
                })
                .then(response => response.json())
                .then(body => {
                  if (!body.success) { alert("Failed to log in"); }
                  else {
                    // successful log in. store the token as a cookie
          
                    const cookies = new Cookies();
                    cookies.set(
                      "authToken",
                      body.token,
                      {
                        path: "localhost:3001/",
                        age: 60*60,
                        sameSite: "lax"
                      });
          
                      localStorage.setItem("useremail", body.useremail);
                    //   alert("Successfully logged in");
                      this.setState({ isValidCred: true});

                      
                  }
                })
        }
    }

    render() {
        if(this.state.isValidCred === true) {
            return <Navigate to="/feed" />
        } else {
            return (
                <div className='LogInPage'>
                    <div>
                        <img id='l-logo' src= {logo} alt= "logo" />
                    </div>
                    <form id='l-myForm'>
                        <fieldset id='l-content'>
                            <legend id='logIn'>Log In</legend>
                            <div className='L-Field'>
                                <label className="LogLabel" htmlFor="email">Email: </label> <input type="email" name="email" className="LogInput" id="l-email" required />
                            </div>
                            <div className='L--Field'>
                                <label className="LogLabel" htmlFor="password">Password: </label> <input type="password" name="password" className="LogInput" id="l-password" required />
                            </div>
    
                            <button onClick={this.checkLForm} id="logInButton">Log In</button>
                            <a href="./sign-up" id="noAccYet">No account yet? Sign Up!</a>
                            
                        </fieldset>
                    </form>
                </div>
                
            )
        }
        
    }
}