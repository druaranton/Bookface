import { signUp, login, checkIfLoggedIn } from "./auth-controller.js";
import { searchUser, findFriendSuggestions, addFriend, friendreqs, confirmFriend, deleteFRequest, findFriends, savePost, collectPost, deletePost, updatePost } from "./feed-controller.js";

const setUpRoutes = (app) => {
  app.post("/signup", signUp);
  app.post("/login", login);
  app.post("/checkifloggedin", checkIfLoggedIn);
  app.post("/searchuser", searchUser);
  app.post("/findnewfriends", findFriendSuggestions);
  app.post("/addfriend", addFriend);
  app.post("/friendrequests", friendreqs);
  app.post("/confirmfriendreq", confirmFriend);
  app.post("/deletfriendreq", deleteFRequest);
  app.post("/friendlist", findFriends);
  app.post("/savepost", savePost);
  app.post("/collectpost", collectPost);
  app.post("/deletepost", deletePost);
  app.post("/updatepost", updatePost);
}

export default setUpRoutes;