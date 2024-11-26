import { createUseStyles } from 'react-jss';
import { useGetPokemon } from '../../hooks/useGetPokemon';
import clsx from 'clsx';

interface PokemonInfoProps {
  pokemonId: string;
  open: boolean;
  onClose: () => void;
}

export const PokemonInfo: React.FC<PokemonInfoProps> = ({
  pokemonId,
  open,
  onClose,
}) => {
  const classes = useStyles();
  const { pokemon, loading } = useGetPokemon(pokemonId);

  return open ? (
    <div className={classes.root}>
      {!loading && (
        <>
          <h1 className={classes.name}>
            {pokemon.name}
            <div
              className={clsx(classes.closeBtn, 'material-icons')}
              onClick={onClose}
            >
              close
            </div>
          </h1>
          <div className={classes.container}>
            <div className={classes.column}>
              <img src={pokemon.image} alt={pokemon.name} />
              <div className={classes.specs}>
                Pok&eacute;mon # {pokemon.number}
                <br />
                {pokemon.classification}
                <br />
                Weight: {pokemon.weight?.minimum} - {pokemon.weight?.maximum}
                <br />
                Height: {pokemon.height?.minimum} - {pokemon.height?.maximum}
              </div>
            </div>
            <div className={classes.column}>
              <div className={classes.specs}>
                Type
                <br />
                {pokemon.types?.map((type) => (
                  <span
                    key={type}
                    className={`${classes.types} ${type.toLowerCase()}`}
                  >
                    {type}&nbsp;
                  </span>
                ))}
              </div>

              <div className={classes.specs}>
                Resistant
                <br />
                {pokemon.resistant?.map((res) => (
                  <span
                    key={res}
                    className={`${classes.types} ${res.toLowerCase()}`}
                  >
                    {res}&nbsp;
                  </span>
                ))}
              </div>

              <div className={classes.specs}>
                Weaknesses
                <br />
                {pokemon.weaknesses?.map((weak) => (
                  <span
                    key={weak}
                    className={`${classes.types} ${weak.toLowerCase()}`}
                  >
                    {weak}&nbsp;
                  </span>
                ))}
              </div>

              <div className={classes.specs}>Flee Rate: {pokemon.fleeRate}</div>

              <div className={classes.specs}>
                Max CP: {pokemon.maxCP}
                <br />
                Max HP: {pokemon.maxHP}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  ) : null;
};

const useStyles = createUseStyles(
  {
    root: {
      backgroundColor: '#0f131b',
      position: 'fixed',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: 'auto',
      maxWidth: '500px',
      height: 'fit-content',
    },
    container: {
      display: 'flex',
      width: '100%',
    },
    column: {
      width: '50%',
      padding: '2%',
      '& img': {
        width: '100%',
        marginBottom: '10px',
      },
    },
    name: {
      width: '100%',
      fontSize: '1.5em',
      margin: '30px 0',
    },
    closeBtn: {
      position: 'absolute',
      top: '10px',
      right: '10px',
    },
    specs: {
      textAlign: 'left',
      lineHeight: '25px',
      marginBottom: '10px',
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

  { name: 'PokemonInfo' }
);
