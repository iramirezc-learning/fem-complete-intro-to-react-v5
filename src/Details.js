import React from "react";
import PetApi from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

class Details extends React.Component {
  state = { loading: true };

  componentDidMount() {
    PetApi.animal(+this.props.id)
      .then((apiResult) => {
        if (apiResult instanceof Error) {
          throw apiResult;
        }

        const { animal: pet } = apiResult;

        this.setState({
          name: pet.name,
          animal: pet.type,
          location: `${pet.contact.address.city}, ${pet.contact.address.state}`,
          description: pet.description,
          media: pet.photos,
          breed: pet.breeds.primary,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  }

  componentDidUpdate() {
    if (this.state.error) {
      throw this.state.error; // propagate the error for ErrorBoundary
    }
  }

  render() {
    const {
      loading,
      name,
      animal,
      location,
      description,
      media,
      breed,
    } = this.state;

    if (loading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => <button style={theme.button}>Adopt {name}</button>}
          </ThemeContext.Consumer>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

const DetailsWithErrorBoundary = (props) => {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
};

export default DetailsWithErrorBoundary;
