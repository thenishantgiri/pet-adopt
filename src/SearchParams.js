import { useState, useEffect, useContext } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
const THEMES = [
  {
    name: "Blizzard Blue",
    hex: "#B0DDF2",
  },
  {
    name: "Bubble Gum",
    hex: "#FFC6C6",
  },
  {
    name: "Blond",
    hex: "#FFEDBB",
  },
  {
    name: "Shampoo",
    hex: "#FFCDF7",
  },
];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [breeds] = useBreedList(animal);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const requestPets = async () => {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    const json = await res.json();
    setPets(json.pets);
  };

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        {/* Location Label */}
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            value={location}
            placeholder="Location"
            onChange={(event) => setLocation(event.target.value)}
            className="w-60 mb-5 block"
          />
        </label>

        {/* Animal Label */}
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
            className="w-60 mb-5 block"
          >
            <option /> {/* for blank option  */}
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        {/* Breed Label */}
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            disabled={!breeds.length}
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
            onBlur={(e) => {
              setBreed(e.target.value);
            }}
            className="w-60 mb-5 block disabled:opacity-50"
          >
            <option /> {/* for blank option  */}
            {breeds.map((allBreed) => (
              <option key={allBreed} value={allBreed}>
                {allBreed}
              </option>
            ))}
          </select>
        </label>

        {/* Theme Label */}
        <label htmlFor={theme}>
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
            className="w-60 mb-5 block"
          >
            <option />
            {THEMES.map((theme) => {
              return (
                <option key={theme.hex} value={theme.hex}>
                  {theme.name}
                </option>
              );
            })}
          </select>
        </label>
        <button
        className="rounded px-6 py-2 text-white hover:opacity-50"  style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
