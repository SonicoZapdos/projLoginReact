import React, {useState} from "react";
import Login from "./View/Login";
import MainPage from "./View/MainPage";
import "./App.css";

function App() {
  const [isLoggedIn, setState] = useState({isLoggedIn: false});
  let page;

  function isLoggedInChange(_isLoggedIn) {
    setState(_isLoggedIn);
  }

  if (isLoggedIn) {
    page = <Login isLoggedInChange={isLoggedInChange} />
  }
  else {
    page = <MainPage />
  }

  return (
      <div className="App">
        {page}
      </div>
  );
}


export default App;