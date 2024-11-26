import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
import { PokemonInfo } from '../PokemonInfo';

import { useNavigate, useParams } from 'react-router-dom';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const { pokemonId } = useParams();
  const navigate = useNavigate();

  const [modalOpen, updateModalOpen] = useState(false);
  const [selectedPokemon, updateSelectedPokemon] = useState('');
  const [searchText, updateSearchText] = useState('');
  const [filteredPokemon, updateFilteredPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    if (pokemons.length > 0) {
      updateFilteredPokemon({ ...pokemons });
    }
    if (pokemonId) {
      updateSelectedPokemon(pokemonId);
      updateModalOpen(true);
    }
  }, [pokemons, pokemonId]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();

    const filtered = pokemons.filter((pokemon) => {
      return Object.values(pokemon).some((value) =>
        String(value).toLowerCase().includes(query)
      );
    });

    updateSearchText(query);
    updateFilteredPokemon(filtered);
  };

  const handleCardClick = (id: string) => {
    navigate(`/pokemon/${id}`);
    updateSelectedPokemon(id);
    updateModalOpen(true);
  };

  const handleModalClose = () => updateModalOpen(false);

  const pokemonList = searchText === '' ? pokemons : filteredPokemon;

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <input
          type="text"
          name="search"
          value={searchText}
          onChange={handleTextChange}
          placeholder="Filter Pokémon..."
        />
      </div>
      {loading && <div>Loading...</div>}
      {pokemonList.map((pkmn) => (
        <div
          key={pkmn.id}
          className={classes.pokemonCard}
          onClick={() => handleCardClick(pkmn.id)}
        >
          <img src={pkmn.image} alt={pkmn.name} />
          <div className={classes.specs}>
            <h4>{pkmn.name}</h4>
            <h5>#{pkmn.number}</h5>
            {pkmn.types.map((type) => (
              <div
                key={type}
                className={`${classes.types} ${type.toLowerCase()}`}
              >
                {type}&nbsp;
              </div>
            ))}
          </div>
        </div>
      ))}

      <PokemonInfo
        pokemonId={selectedPokemon}
        open={modalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',

      display: 'flex',
      flexDirection: 'column',
      rowGap: '20px',
    },
    search: {
      display: 'flex',
      width: '100%',
      '& input': {
        color: '#171E2b',
        width: '100%',
        padding: '10px',
      },
    },
    pokemonCard: {
      display: 'flex',
      padding: '10px',
      '& img': {
        maxHeight: '100px',
      },
      '& h4': {
        margin: '5px 0px',
      },
      '& h5': {
        margin: '0px 0px 10px 0px',
      },
      border: '1px solid #7C89A3',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
      },
    },
    specs: {
      textAlign: 'left',
      marginLeft: '10px',
    },
    types: {
      '&.normal': { color: '#A8A77A' },
      '&.fire': { color: '#EE8130' },
      '&.water': { color: '#6390F0' },
      '&.electric': { color: '#F7D02C' },
      '&.grass': { color: '#7AC74C' },
      '&.ice': { color: '#96D9D6' },
      '&.fighting': { color: '#C22E28' },
      '&.poison': { color: '#A33EA1' },
      '&.ground': { color: '#E2BF65' },
      '&.flying': { color: '#A98FF3' },
      '&.psychic': { color: '#F95587' },
      '&.bug': { color: '#A6B91A' },
      '&.rock': { color: '#B6A136' },
      '&.ghost': { color: '#735797' },
      '&.dragon': { color: '#6F35FC' },
      '&.dark': { color: '#705746' },
      '&.steel': { color: '#B7B7CE' },
      '&.fairy': { color: '#D685AD' },
    },
  },
  { name: 'PokemonList' }
);
