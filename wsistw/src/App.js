import React from "react";
import "./App.css";
import { Parser } from "./parser.js";
import { Randomize } from "./randomize.js";

function App() {
  return (
    <div>
      {/* {
        <Parser url="https://www.artforum.com/api/guide/entities-by-place-location/new-york?category=all&page=1&size=1&fetchAll=0" />
      } */}

      {<Randomize />}
    </div>
  );
}

export default App;
