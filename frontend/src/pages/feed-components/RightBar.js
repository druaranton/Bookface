import React from 'react';
import './RightBar.css';

class RightBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            friendReqs: [], //for the friend requests
            youMightKnow: [], //for the suggested users to add
            friendlist: [], //for the fiends
            useremail: localStorage.getItem("useremail")
        }

        this.clickedAdd = this.clickedAdd.bind(this);
        this.clickConfirm = this.clickConfirm.bind(this);
        this.clickDelete = this.clickDelete.bind(this);
    }

    componentDidMount() {
        //post request to get the suggested to add friends
        fetch("http://localhost:3001/findnewfriends",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.state.useremail })
        })
        .then(response => response.json())
          .then(body => {
            this.setState({ youMightKnow: body})
        });
        
        //post request to get the friend requests
        fetch("http://localhost:3001/friendrequests",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.state.useremail })
        })
        .then(response => response.json())
          .then(body => {
            this.setState({ friendReqs: body})
        });

        //post request to get the friend list
        fetch("http://localhost:3001/friendlist",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.state.useremail })
        })
        .then(response => response.json())
          .then(body => {
            this.setState({ friendlist: body})
        });
    }

    //function to confirm the friend request
    clickConfirm(e) {
        //post request to confirm the friend request
        fetch("http://localhost:3001/confirmfriendreq",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ acceptor: this.state.useremail, requestor: e.target.id })
        })
        .then(response => response.json())
          .then(body => {
        });

        // //post request to get the updated friends list
        // fetch("http://localhost:3001/friendlist",
        // {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ email: this.state.useremail })
        // })
        // .then(response => response.json())
        //   .then(body => {
        //     this.setState({ friendlist: body})
        //     console.log(body);
        // });
        
        // //post request to get the updated friend requests
        // fetch("http://localhost:3001/friendrequests",
        // {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ email: this.state.useremail })
        // })
        // .then(response => response.json())
        //   .then(body => {
        //     this.setState({ friendReqs: body})
        // });
        window.location.reload(); //to reflect the posts
    }
    
    //funtion to delete the friend request
    clickDelete(e) {
        //post request to delete friend request
        fetch("http://localhost:3001/deletfriendreq",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ acceptor: this.state.useremail, requestor: e.target.id })
        })
        .then(response => response.json())
          .then(body => {
        });

        // //post request to get the ipdated friend requests
        // fetch("http://localhost:3001/friendrequests",
        // {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ email: this.state.useremail })
        // })
        // .then(response => response.json())
        //   .then(body => {
        //     this.setState({ friendReqs: body})
        // });
        
        // //post request to get the updated suggested friends
        // fetch("http://localhost:3001/findnewfriends",
        // {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ email: this.state.useremail })
        // })
        // .then(response => response.json())
        //   .then(body => {
        //     this.setState({ youMightKnow: body})
        // });

        
        window.location.reload();

    }

    //function to request to be friends
    clickedAdd(e) {
        //post request to request a user to be friends
        fetch("http://localhost:3001/addfriend",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ toemail: e.target.id, fromemail: this.state.useremail })
        })
        .then(response => response.json())
          .then(body => {
        });
        
        //post request to get updated suggested friends
        fetch("http://localhost:3001/findnewfriends",
         {
             method: "POST",
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({ email: this.state.useremail })
        })
         .then(response => response.json())
           .then(body => {
             this.setState({ youMightKnow: body})
        });
    }

    render() {
        const suggestedFriends = this.state.youMightKnow;
        const friendRqs = this.state.friendReqs;
        const friends = this.state.friendlist;
        return (
            <div className='RightBar'>
                <h2 id='headerRight'>Friends</h2>
                <div>
                    <h4 id='FriendRhead'>Friend Requests</h4>
                    <div className='FRBlock'>
                        {
                            friendRqs.map((f, j) => {
                                return(
                                    <div className='FRequests'>
                                        <p>{f.fullname}</p>
                                        <button className='ConDelButton' name={j} id={f.email} onClick={this.clickConfirm}>Confirm</button>
                                        <button className='ConDelButton' name={j} id={f.email} onClick={this.clickDelete}>Delete</button>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <hr></hr>
                <div>
                    <h4 id='suggestedF'>You might know...</h4>
                    <div className='SuggestedBlock'>
                        {
                            suggestedFriends.map((fr, i) => {
                                if(fr.email !== this.state.useremail) {
                                    return(
                                        <div className='FriendSuggestion'>
                                            <p>{fr.fullname}</p>
                                            <button type='button' className='AddButton' name={i} onClick={this.clickedAdd} id={fr.email}>Add friend</button>
                                        </div>
                                    )
                                } else {
                                    return <div></div>
                                }
                                
                            })
                        }
                    </div>
                </div>
                <hr></hr>
                <div>
                    <h4 id='friendsHead'>Friends</h4>
                    <div className='FriendsBlock'>
                        {
                            friends.map((friend, k) => {
                                return(
                                    <div className='Friendslist'>
                                        <p key={k}>{friend.fullname}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )

    }
}

export default RightBar