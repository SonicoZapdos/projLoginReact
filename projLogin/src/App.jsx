import React, { useState } from "react";
import Login from "./View/Login";
import MainPage from "./View/MainPage";
import "./App.css";

function App() {
  const [isLoggedIn, setLogged] = useState(false);
  const [user, setUser] = useState('');

  let page;

  function logout() {
    setLogged(false);
  }

  function isLoggedInChange(_isLoggedIn, _user) {
    setUser(_user);
    console.log(user);
    setLogged(_isLoggedIn);
  }

  if (isLoggedIn) {
    page = <MainPage person={user} isLoggedInChange={logout} />
  } else {
    page = <Login isLoggedInChange={isLoggedInChange} />
  }

  return (
    <div className="App">
      {page}
    </div>
  );
}


export default App;