import React from 'react'
import ReactDOM from 'react-dom'
import Pet from './Pet';

const App = () => {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "Adopt Me"),
    React.createElement(Pet, {
      name: "Micha",
      animal: "cat",
      breed: "Bicolor",
    }),
    React.createElement(Pet, {
      name: "Gato",
      animal: "cat",
      breed: "White",
    })
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
