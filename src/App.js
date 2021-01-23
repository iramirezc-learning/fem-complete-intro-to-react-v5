const Pet = ({ name, animal, breed }) => {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, name),
    React.createElement("h2", {}, animal),
    React.createElement("h2", {}, breed)
  );
};

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
