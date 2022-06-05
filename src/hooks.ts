import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import {
  selectGenderFilter,
  selectNumberOfVisiblePokemons,
  selectSearchFilter,
  selectTypeFilter,
} from "./slices/filterSlice";
import {
  useGetPokemonsQuery,
  useLazyGetPokemonsByTypeQuery,
} from "./services/pokemon";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const useGetPokemons

export const useGetPokemons = () => {
  const numberOfVisiblePokemons = useAppSelector(selectNumberOfVisiblePokemons);
  const searchFilter = useAppSelector(selectSearchFilter);
  const typeFilter = useAppSelector(selectTypeFilter);
  const genderFilter = useAppSelector(selectGenderFilter);

  // FETCH_POKEMONS
  const {
    data: pokemonData,
    isLoading: isLoadingPokemon,
    isError: isPokemonError,
    isFetching: isFetchingPokemon,
  } = useGetPokemonsQuery();

  const [
    typeQueryTrigger,
    {
      data: pokemonsByTypeData,
      isLoading: pokemonsByTypeLoading,
      isError: pokemonsByTypeError,
      isFetching: pokemonsByTypeFetching,
    },
  ] = useLazyGetPokemonsByTypeQuery();

  const objectWithPokemonNames: { [pokemon: string]: boolean } = {};

  if (typeFilter && pokemonsByTypeData) {
    for (const pokemon of pokemonsByTypeData.pokemon) {
      objectWithPokemonNames[pokemon.pokemon.name] = true;
    }
  }

  const initialPokemons = pokemonData?.pokemon_entries;

  const filteredPokemons = initialPokemons?.filter((entry) => {
    if (typeFilter && pokemonsByTypeData) {
      if (!objectWithPokemonNames[entry.pokemon_species.name]) {
        return false;
      }
    }

    if (Number.isNaN(Number.parseInt(searchFilter))) {
      return entry.pokemon_species.name
        .toLowerCase()
        .includes(searchFilter.toLowerCase());
    }
    return entry.entry_number.toString().includes(searchFilter);
  });

  const pokemons = filteredPokemons?.slice(0, numberOfVisiblePokemons);
  console.log(filteredPokemons?.length);

  const isLoading = isLoadingPokemon || pokemonsByTypeLoading;
  const isError = isPokemonError || pokemonsByTypeError;
  const isFetching = isFetchingPokemon || pokemonsByTypeFetching;
  return {
    pokemons,
    isLoading,
    isError,
    filteredPokemons,
    numberOfVisiblePokemons,
    typeQueryTrigger,
    pokemonsByTypeData,
    isFetching,
  };
};
