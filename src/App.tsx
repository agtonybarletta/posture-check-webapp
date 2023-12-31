import React, {useState} from "react";
import "./App.css";
import Main from "./components/main/Main";
import Header from "./components/header/Header";
import Container from "@mui/material/Container";
import ServicesProvider from "./services/ServicesProvider";

function App() {

  /*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
	  */
  return (
  <ServicesProvider>
    <div className="App">
        <Header></Header>
        <Main></Main>
    </div>
	</ServicesProvider>
  );
}

export default App;
