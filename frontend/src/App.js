import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Feed from "./pages/Feed";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact={true} path="/" element={<Feed  />} />
          <Route exact={true} path="/sign-up" element={<SignUp  />} />
          <Route exact={true} path="/log-in" element={<LogIn />} />
          <Route exact={true} path="/feed" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
