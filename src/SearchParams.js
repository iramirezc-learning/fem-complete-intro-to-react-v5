import React, { useEffect, useState } from "react";
import petApi, { ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";
import useDropdown from "./useDropdown";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    setBreeds([]);
    setBreed("");

    if (!animal) return;

    petApi
      .breeds(animal)
      .then(({ breeds: breedsFromApi = [] }) => {
        const breedsNames = breedsFromApi.map(({ name }) => name);

        setBreeds(breedsNames);
      })
      .catch(console.error);
  }, [animal, setBreeds, setBreed]);

  async function fetchPets() {
    const { animals: petsFromApi } = await petApi.animals({
      location,
      breed,
      type: animal,
    });

    setPets(petsFromApi || []);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button type="submit">Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
