// Component for displaying individual pokemon card
export const PokemonCards = ({ pokemon }) => {
  return (
    <li className="pokemon-card">
      {/* Pokemon image */}
      <figure>
        <img
          src={pokemon.sprites.other.dream_world.front_default}
          alt={pokemon.name}
          className="pokemon-image"
          style={{ 
            width: '100%',
            height: 'auto',
            maxWidth: '200px',
            objectFit: 'contain' 
          }}
        />
      </figure>
      
      {/* Pokemon name */}
      <h1 className="pokemon-name">{pokemon.name}</h1>
      
      {/* Pokemon type(s) */}
      <div className="pokemon-highlight pokemon-info">
        <p>{pokemon.types.map((type) => type.type.name).join(", ")}</p>
      </div>
      
      {/* Stats grid - Using predefined stat order from API */}
      <div className="grid-three-cols">
        <div className="pokemon-info">
          <p>
            <span>Height:</span>
            {pokemon.height}
          </p>
        </div>
        <div className="pokemon-info">
          <p>
            <span>Weight:</span>
            {pokemon.weight}
          </p>
        </div>
        {/* Attack stat (stats[1] in API response) */}
        <div className="pokemon-info">
          <p>
            <span>Attack:</span>
            {pokemon.stats[1].base_stat}
          </p>
        </div>
        {/* Defense stat (stats[2] in API response) */}
        <div className="pokemon-info">
          <p>
            <span>Defense:</span>
            {pokemon.stats[2].base_stat}
          </p>
        </div>
        {/* HP stat (stats[0] in API response) */}
        <div className="pokemon-info">
          <p>
            <span>HP:</span>
            {pokemon.stats[0].base_stat}
          </p>
        </div>
      </div>
    </li>
  );
};