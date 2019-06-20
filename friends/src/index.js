import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { MainContainer } from "./containers/MainContainer";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <MainContainer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
<Router>
<App />
</Router>, rootElement);
