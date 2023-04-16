import React from 'react';
import './LeftBar.css';

class LeftBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchedUsers: [],
            foundAny: true
        }

        this.searchIt = this.searchIt.bind(this);
    }

    //function used in searching for users when search button is clicked
    searchIt(e) {
        const info = document.getElementById("searchBox");
        if(info.value.trim().length) { //if the user has something to search
            this.setState({ foundAny: true })
            //post request to search the user
            fetch("http://localhost:3001/searchuser",
          {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ toSearch: info.value })
          })
          .then(response => response.json())
          .then(body => {
            this.setState({ searchedUsers: body})
            if(body.length === 0) { //if no result is found
                this.setState({ foundAny: false });
            }
          });
        } else { //if the searchbox is empty
            this.setState({ searchedUsers: []})
            this.setState({ foundAny: false })
        }
        
    }

    render() {
        const result = this.state.searchedUsers;
        if(this.state.foundAny === true) {
            return(
                <div className='LeftBar'>
                   <h2 id='headerLeft'>Search</h2>
                   <div className='SearchSec'>
                        <input type="text" id="searchBox" placeholder="Search.." name="search"></input>
                        <button type='button' onClick={this.searchIt} id='infoSearch'>Search</button>
                   </div>
                   <div>
                       {
                           result.map((resu, i) => {
                               return(
                                   <div className='UsersFound'>
                                       <p className='UserFname'>{resu.fullname}</p>
                                       <p className='UserEmail'>Email: {resu.email}</p>
                                    </div>
                               )
                           })
                       }
                   </div>
                </div>
                
            )
        } else {
            return(
                <div className='LeftBar'>
                   <h2 id='headerLeft'>Search</h2>
                   <div className='SearchSec'>
                        <input type="text" id="searchBox" placeholder="Search.." name="search"></input>
                        <button type='button' onClick={this.searchIt} id='infoSearch'>Search</button>
                   </div>
                   <div>
                        <h4 id='noUser'>No Users Found!</h4>
                   </div>
                </div>
                
            )
        }
        
    }
}

export default LeftBar