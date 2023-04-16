import mongoose from 'mongoose';

const User = mongoose.model("User"); // get user model registered in Mongoose
const Friends = mongoose.model("Friends"); // get friends model registered in Mongoose
const Posts = mongoose.model("Posts"); // get posts model registered in Mongoose

//function to search the user
const searchUser = (req, res) => {
    const regSearch = new RegExp('.*' + String(req.body.toSearch) + '.*', 'i'); //regex is used so that it would be case sensitive and it would not be exact search
    User.find({ fullname: { $regex: regSearch }}, (err, user) => {
        if(!err) {
            res.send(user);
        }
        
    })
}

//function to find users that the user is not yet friend with
const findFriendSuggestions = (req, res) => {
    Friends.findOne({ email: req.body.email }, (err, self) => {
        if(!err) {
            var notIncluded = self.friendRequests.concat(self.friendlist); //pending pend requests and already friends is not included
            Friends.find({ friendRequests: req.body.email }, (err, result) => {
                if(result.length !== 0) {
                    result.map((r) => {
                        notIncluded.push(r.email);  //users that the user had already sent friend request is also not included
                        
                    })

                }
                Friends.find({email: { $nin: notIncluded }}, (err, suggest) => {
                    if(!err) {
                        res.send(suggest);
                    }
                })
            })
        }
    })
}

//function to send a friend request
const addFriend = (req, res) => {
    Friends.updateOne({ email: req.body.toemail}, { $push: { friendRequests: req.body.fromemail}}, (err, done) => {
        if(!err) {
            res.send({success: true});
            console.log("added");
        }
    })
}

//function to collect the users that added the user
const friendreqs = (req, res) => {
    Friends.findOne({ email: req.body.email }, (err, own) => {
        if(!err) {
            Friends.find({ email: { $in: own.friendRequests }}, (err, reequests) => {
                if(!err) {
                    res.send(reequests);
                }
            })
        }
    })
}

//function to confirm the friend request
const confirmFriend = (req, res) => {
    Friends.updateOne({email: req.body.acceptor}, { $push: { friendlist: req.body.requestor }}, (err, done) => { //add to friendlist
        if(!err) {
            console.log("added to friends");
        }
    })
    Friends.updateOne({email: req.body.requestor}, { $push: { friendlist: req.body.acceptor }}, (err, done) => { //add to fiendlist
        if(!err) {
            console.log("added to friends");
        }
    })
    Friends.updateOne({email: req.body.acceptor}, { $pull: { friendRequests: req.body.requestor }}, (err, done) => { //remove from the friend requests
        if(!err) {
            res.send({success : true});
        }
    })
}

//function to delete the friend request
const deleteFRequest = (req, res) => {
    Friends.updateOne({email: req.body.acceptor}, { $pull: { friendRequests: req.body.requestor }}, (err, done) => {
        if(!err) {
            res.send({success : true});
        }
    })
}

//function to find the friends of the user
const findFriends = (req, res) => {
    Friends.findOne({ email: req.body.email }, (err, user) => {
        if(!err) {
            Friends.find({ email: { $in: user.friendlist }}, (err, done) => {
                if(!err) {
                    res.send(done);
                }
            })
        }
    })
}

//function to save the post
const savePost = (req, res) => {
    User.findOne({ email: req.body.email }, (err, found) => {
        if(!err) {
            const newPost = new Posts({
                author_reference: req.body.email,
                content: req.body.content,
                fullname: found.fullname
            });

            newPost.save((err) => {
                if (err) { return res.send({ success: false, err }); }
                else { return res.send({ success: true }); }
              });
        }
    })
}

//funtion to collect all the posts relative to the user
const collectPost = (req, res) => {
    Friends.findOne({ email: req.body.email }, (err, user) => {
        if(!err) {
            Friends.find({ email: { $in: user.friendlist }}, (err, done) => {
                if(!err) {
                    var allfriends = [];
                    if(done.length !== 0) {
                        done.map((fr) => {
                            allfriends.push(fr.email); //all of friends
                        })
                    }
        
                    allfriends.push(req.body.email); //the user

                    Posts.find({author_reference: { $in: allfriends }}, (err, postss) => { //find posts
                        if(!err) {
                            res.send(postss);
                        }
                    })
                }
            })
        }
    })
}

//function to delete a post
const deletePost = (req, res) => {
    Posts.deleteOne({ author_reference: req.body.author, timestamp: req.body.time }, (err, done) => {
        if(!err) {
            res.send({success:true});
        }
    })
}

//function to update a post
const updatePost = (req, res) => {
    Posts.findOne({author_reference: req.body.author, timestamp: req.body.time}, (err, docu) => {
        if(!err) {
            docu.content = req.body.contents;
            docu.save();
        }
    })
}

export { searchUser, findFriendSuggestions, addFriend, friendreqs, confirmFriend, deleteFRequest, findFriends, savePost, collectPost, deletePost, updatePost }