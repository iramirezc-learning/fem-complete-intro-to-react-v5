import React from "react";
import PetApi from "@frontendmasters/pet";
import Carousel from "./Carousel";

class Details extends React.Component {
  state = { loading: true };

  componentDidMount() {
    PetApi.animal(+this.props.id)
      .then((apiResult) => {
        if (apiResult instanceof Error) {
          throw new Error(apiResult);
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
      .catch(console.error);
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
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;
