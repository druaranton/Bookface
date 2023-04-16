import React from 'react';
import logo from '../assets/logo.png'; //imports the logo
import './Header.css' //imports the corresponding css

class Header extends React.Component {

    render() {
        const logout = this.props.butfunc
        return(
            <div className='Head'>
                <div className='MidHead'>
                    <img id='logoFeed' src= {logo} alt= "logo" />
                </div>
                <div className='RightHead'>
                    <button id="logout" onClick={logout}>Log Out</button>
                </div>
            </div>
            
        )
    }
}

export default Header