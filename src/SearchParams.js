import React, { useEffect, useState } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  useEffect(() => {
    setBreeds([]);
    setBreed("");

    if (!animal) return;

    pet
      .breeds(animal)
      .then(({ breeds: breedsFromApi = [] }) => {
        const breedsNames = breedsFromApi.map(({ name }) => name);

        setBreeds(breedsNames);
      })
      .catch(console.error);
  }, [animal]);

  return (
    <div className="search-params">
      <form>
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
    </div>
  );
};

export default SearchParams;
