import React from "react";
import Login from "./View/Login";
import MainPage from "./View/MainPage";
import "./App.css";
import { useSelector } from "react-redux";
import { selectUser } from "./Redux/userSlice";

function App() {
  const userLogged = useSelector(selectUser);

  let page;

  if (userLogged.isLogged) {
    page = <MainPage />
  } else {
    page = <Login />
  }

  return (
    <div className="App">
      {page}
    </div>
  );
}


export default App;