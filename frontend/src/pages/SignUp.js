import React, { Component } from "react";
import logo from './assets/logo.png'; //imports the logo
import './SignUp.css'; //imports the css

export default class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            password: "", //password
            repPass: "", //repeat password
            isRepDisabled: true, //to know if the repeat password field is currently disabled
            isPassValid: false, //if the password is valid
            isPassMatched: false //if the password matched the repeat password
        }

        this.handlePChange = this.handlePChange.bind(this)
        this.handleRChange = this.handleRChange.bind(this)
        this.checkForm = this.checkForm.bind(this)
    }

    handlePChange(e) { //function that is performed when the password value has changed
        this.setState({ password: e.target.value }) //sets the password in state
        
        if(e.target.value !== "") { //if the input is not empty
            this.setState({ isRepDisabled: false }) //sets the diasable to the field of repeat password into false
            if(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(e.target.value) === false) { //if the password is not valid
                document.getElementById('errPass').innerHTML = "Error: Password must have at least 8 characters, 1 number, 1 lowercase letter, and 1 uppercase letter!"; //display error message
                this.setState({ isPassValid: false }) //sets the password valid into false
            } else { //if the password is valid
                document.getElementById('errPass').innerHTML = ""; //the error displayed is blank
                this.setState({ isPassValid: true }) //sets teh isPassValid into true
                if(e.target.value !== this.state.repPass && this.state.repPass !== "") { //if the repeat password and the password are not matched (when the rep pass has value before then the user modifies the pass field)
                    document.getElementById('errMatch').innerHTML = "Passwords do not match!"; //display error
                    this.setState({ isPassMatched: false}) //sets the ispassmatched into false
                } else { //else
                    this.setState({ isPassMatched: true}) //sets the ispassmatched into true
                    document.getElementById('errMatch').innerHTML = ""; //no error
                }
            }
        } else { //if the pass field becomes empty
            this.setState({ isRepDisabled: true }) //disables the repeat password field
            document.getElementById('errPass').innerHTML = ""; //no error
            document.getElementById('errMatch').innerHTML = ""; //no error
        }
    }

    handleRChange(e) { //function that is performed when the repeat password value has changed
        this.setState({ repPass: e.target.value }) //sets the repPass
        if(this.state.isPassValid === true && e.target.value !== "") { //if the password is valid and the repeat password value is not empty
            if(this.state.password !== e.target.value) { ///if te password is not equal to the repeat password
                document.getElementById('errMatch').innerHTML = "Passwords do not match!"; //display error message
                this.setState({ isPassMatched: false}) //sets the isPassMatched into false
            } else { //if the passwords are equal
                this.setState({ isPassMatched: true}) //sets the match to true
                document.getElementById('errMatch').innerHTML = ""; //no error
            }
        } else { //if the password is not valid or the rep pass is empty
            document.getElementById('errMatch').innerHTML = ""; //don't display error on rep pass
        }
    }

    checkForm(e) { //performed when the Sign Up button is clicked
        if(document.getElementById('s-myForm').checkValidity() === true) { //performs the validity of the form (checks if every field has input and if they are in correct format)
            if(this.state.isPassMatched !== true) { //if they are not
                e.preventDefault(); //don't refresh the page
            } else {
                e.preventDefault();
                const user = {
                  firstname: document.getElementById("s-firstName").value,
                  lastname: document.getElementById("s-lastName").value,
                  email: document.getElementById("s-email").value,
                  password: document.getElementById("s-password").value
                }
            
                // send a POSt request to localhost:3001/signup
                fetch(
                  "http://localhost:3001/signup",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                  })
                  .then(response => response.json())
                  .then(body => {
                    if (body.success) { alert("Successfully saved user"); }
                    else { alert("Failed to save user"); }
                  });
            }
        }
    }

    render() {
        return (
            <div className='SignUpPage'>
                <div className="SignUpLogo">
                    <img id='s-logo' src= {logo} alt= "logo" />
                </div>
                <form id='s-myForm'>
                    <fieldset id='s-content'>
                        <legend id='signUp'>Sign Up</legend>
                        <div className='S-Field'>
                            <label className="SignLabel" htmlFor="firstName">First Name: </label> <input type="text" name="firstName" className="SignInput" id="s-firstName" required />
                        </div>
                        <div className='S-Field'>
                            <label className="SignLabel" htmlFor="lastName">Last Name: </label> <input type="text" name="lastName" className="SignInput" id="s-lastName" required />
                        </div>
                        <div className='S-Field'>
                            <label className="SignLabel" htmlFor="email">Email: </label> <input type="email" name="email" className="SignInput" id="s-email" required />
                        </div>
                        <div className='S-Field'>
                            <label className="SignLabel" htmlFor="password">Password: </label> <input type="password" name="password" className="SignInput" id="s-password" onChange={this.handlePChange} value={this.state.password}  required />
                            <p id='errPass' className='S-Error'></p>
                        </div>
                        <div className='S-Field'>
                            <label className="SignLabel" htmlFor="repeatPass">Repeat Password: </label> <input type="password" name="repeatPass" className="SignInput" id="s-repeatPass" onChange={this.handleRChange} value={this.state.repPass} disabled={this.state.isRepDisabled} required />
                            <p id='errMatch' className='S-Error'></p>
                        </div>
        
                        <button onClick={this.checkForm} id="signUpButton">Sign Up</button>
                    </fieldset>
                </form>
                
            </div>
            
        )
    }
}