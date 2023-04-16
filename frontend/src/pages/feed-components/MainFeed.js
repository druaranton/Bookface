import React from 'react';
import './MainFeed.css'; //imports the corresponding css

class MainFeed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [], //where posts will be stored for rendering
            useremail: localStorage.getItem("useremail")
        }

        this.savePost = this.savePost.bind(this);
        this.deleteAPost = this.deleteAPost.bind(this);
        this.editAPost = this.editAPost.bind(this);
    }

    componentDidMount() {
        //post request to collect all post
        fetch("http://localhost:3001/collectpost",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.state.useremail })
        })
        .then(response => response.json())
          .then(body => {
            this.setState({ posts: body.reverse()}); //reverses the results so that the latest would be at the top
        });
    }

    //function to save post
    savePost(e) {
        const contentPost = document.getElementById("postTextBox"); //gets the textbox element
        //post request to save the post
        fetch("http://localhost:3001/savepost",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.state.useremail, content: contentPost.value })
        })
        .then(response => response.json())
          .then(body => {
        });
        document.getElementById("postTextBox").value = ""; //clears the textbox
        //post request to get the posts to update the posts state
        fetch("http://localhost:3001/collectpost",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.state.useremail })
        })
        .then(response => response.json())
          .then(body => {
            this.setState({ posts: body.reverse()});
        });
    }

    //function to delete a post
    deleteAPost(e) {
        //post request to delete a post
        fetch("http://localhost:3001/deletepost",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ author: this.state.useremail, time: e.target.name })
        })
        .then(response => response.json())
          .then(body => {
        });
        //post request to get the updated list of post and store it to the posts state
        fetch("http://localhost:3001/collectpost",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.state.useremail })
        })
        .then(response => response.json())
          .then(body => {
            this.setState({ posts: body.reverse()});
        });

    }

    //function to edit a post
    editAPost(e) {
        const ownMail = this.state.useremail;
        document.querySelectorAll(".ContentButton").forEach(g => g.disabled = true); //disables the edit and delete buttons while editing
        var editArea = document.createElement('textarea'); //create a text area element
        var saveButton = document.createElement('button'); //create a button element
        editArea.value = this.state.posts[e.target.id].content; //the value of the text area is the content of the post to be edited
        saveButton.innerHTML = "Save"; //inner text of the button
        editArea.className = "EditArea"; //sets a classname
        saveButton.className = "SaveButton" //sets a class name
        document.getElementsByClassName('ContentSection')[e.target.id].appendChild(editArea); //append it to the html
        document.getElementsByClassName('ContentSection')[e.target.id].appendChild(saveButton); //append it to the html
        saveButton.onclick = function() { //when save button is clicked
            //function to save the edits to the post
            fetch("http://localhost:3001/updatepost",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ author: ownMail, time: e.target.name, contents: editArea.value })
            })
            .then(response => response.json())
              .then(body => {
            });
            window.location.reload(); //reloads the window so that changes would reflect
          }
    }

    render() {
        const postsA = this.state.posts;
        return (
            <div className='CenterContent'>
                <div className='FormSection'>
                    <form id='postForm'>
                        <textarea placeholder="What's on your mind?" id='postTextBox' name='postTextBox' rows={5} cols={90}></textarea><br />
                        <button id='postButton' type='button' onClick={this.savePost}>Post</button>
                    </form>
                </div>
                <br />
                <div className='PostContent'>
                    {
                        postsA.map((post, a) => {
                            if(post.author_reference === this.state.useremail) {
                                return (
                                    <div>
                                        <div className='ContentSection'>
                                            <h5 id='postAuthor'>{post.fullname}</h5>
                                            <p id='timestamp'>Posted: {post.timestamp}</p>
                                            <p>{post.content}</p>
                                            <hr id='line'></hr>
                                            <button className='ContentButton' onClick={this.editAPost} id={a} name={post.timestamp}>Edit</button>
                                            <button className='ContentButton' onClick={this.deleteAPost} name={post.timestamp} id={a}>Delete</button>
                                        </div>
                                    </div>
                                    
                                )
                            } else {
                                return (
                                    <div>
                                        <div className='ContentSection'>
                                            <h5 id='postAuthor'>{post.fullname}</h5>
                                            <p id='timestamp'>Posted: {post.timestamp}</p>
                                            <p>{post.content}</p>
                                        </div>
                                    </div>
                                )
                            
                            }
                            
                        })
                    }
                    
                </div>
                
            </div>
        )
    }
}

export default MainFeed