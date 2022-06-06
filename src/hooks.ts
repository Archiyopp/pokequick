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
  useLazyGetPokemonsByGenderQuery,
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

  const [
    genderQueryTrigger,
    {
      data: pokemonsByGenderData,
      isLoading: pokemonByGenderLoading,
      isError: pokemonByGenderError,
      isFetching: pokemonByGenderFetching,
    },
  ] = useLazyGetPokemonsByGenderQuery();

  const objectWithPokemonNames: {
    [pokemon: string]: { type: boolean; gender: boolean; color: boolean };
  } = {};

  const getInitObj = () => ({ type: false, gender: false, color: false });

  if (typeFilter && pokemonsByTypeData) {
    for (const pokemon of pokemonsByTypeData.pokemon) {
      if (!objectWithPokemonNames[pokemon.pokemon.name]) {
        objectWithPokemonNames[pokemon.pokemon.name] = getInitObj();
      }
      objectWithPokemonNames[pokemon.pokemon.name].type = true;
    }
  }

  if (genderFilter !== "all" && pokemonsByGenderData) {
    for (const pokemon of pokemonsByGenderData.pokemon_species_details) {
      if (!objectWithPokemonNames[pokemon.pokemon_species.name]) {
        objectWithPokemonNames[pokemon.pokemon_species.name] = getInitObj();
      }
      objectWithPokemonNames[pokemon.pokemon_species.name].gender = true;
    }
  }

  const initialPokemons = pokemonData?.pokemon_entries;

  const filteredPokemons = initialPokemons?.filter((entry) => {
    const name = entry.pokemon_species.name;

    if (typeFilter && pokemonsByTypeData) {
      if (!objectWithPokemonNames[name]?.type) return false;
    }

    if (genderFilter !== "all" && pokemonsByGenderData) {
      if (!objectWithPokemonNames[name]?.gender) return false;
    }

    if (Number.isNaN(Number.parseInt(searchFilter))) {
      return name.toLowerCase().includes(searchFilter.toLowerCase());
    }
    return entry.entry_number.toString().includes(searchFilter);
  });

  const pokemons = filteredPokemons?.slice(0, numberOfVisiblePokemons);

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
    genderQueryTrigger,
    pokemonsByTypeData,
    isFetching,
  };
};
