import React from "react";
import ReactDOM from "react-dom";
import Pet from "./Pet";

const App = () => {
  return (
    <div>
      <h1>Adopt Me</h1>
      <Pet name="Micha" animal="cat" breed="Bicolor" />
      <Pet name="Gato" animal="cat" breed="White" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
