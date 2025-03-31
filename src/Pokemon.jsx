import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards.jsx";

export const Pokemon = () => {
  // State management for pokemon data, loading status, errors, and search filter
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // API endpoint with limit for initial pokemon fetch
  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

  // Main data fetching function
  const fetchpokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      // Fetch detailed data for each pokemon in parallel
      const pokemonData = data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const data = await res.json();
        return data;
      });

      // Wait for all individual pokemon requests to complete
      const pokemonData2 = await Promise.all(pokemonData);
      setPokemon(pokemonData2);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchpokemon();
  }, []);

  // Filter pokemon based on search input
  const searchPokemon = pokemon.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(search.toLowerCase());
  });

  if (loading) {
    return <h1 className="flex justify-center items-center">Loading...</h1>;
  }
  if (error) {
    return <h1 className="flex justify-center items-center">Error</h1>;
  }

  return (
    <section className="container">
      {/* Header section */}
      <header>
        <h1>Pokemon</h1>
      </header>
      
      {/* Search input field */}
      <div className="pokemon-search">
        <input
          type="text"
          placeholder="Search for a pokemon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '90%',
            maxWidth: '500px',
            margin: '0 auto',
            borderRadius: '24px',
            padding: '12px 24px',
            fontSize: '1.8rem'
          }}
        />
      </div>
      
      {/* Main pokemon cards grid */}
      <div>
        <ul className="cards">
          {searchPokemon.map((pokemon) => {
            return <PokemonCards key={pokemon.id} pokemon={pokemon} />;
          })}
        </ul>
      </div>
    </section>
  );
};
