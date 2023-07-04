import React, {Component} from "react";
import { render } from "react-dom";

export default function App() {
    return ( <h1>Hello world</h1> );
}


const appDiv = document.getElementById("app");
render(<App />, appDiv);