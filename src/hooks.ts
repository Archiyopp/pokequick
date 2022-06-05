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

export const useGetPokemons = () => {
  const numberOfVisiblePokemons = useAppSelector(selectNumberOfVisiblePokemons);
  const searchFilter = useAppSelector(selectSearchFilter);
  const typeFilter = useAppSelector(selectTypeFilter);
  const genderFilter = useAppSelector(selectGenderFilter);
  const {
    data: pokemonData,
    isLoading: isLoadingPokemon,
    isError: isPokemonError,
  } = useGetPokemonsQuery();
  const [
    typeQueryTrigger,
    {
      data: pokemonsByTypeData,
      isLoading: pokemonsByTypeLoading,
      isError: pokemonsByTypeError,
    },
  ] = useLazyGetPokemonsByTypeQuery();

  const initialPokemons = pokemonData?.pokemon_entries;

  const filteredPokemons = initialPokemons?.filter((entry) => {
    if (Number.isNaN(Number.parseInt(searchFilter))) {
      return entry.pokemon_species.name
        .toLowerCase()
        .includes(searchFilter.toLowerCase());
    }
    return entry.entry_number.toString().includes(searchFilter);
  });

  const pokemons = filteredPokemons?.slice(0, numberOfVisiblePokemons);
  const isLoading = isLoadingPokemon || pokemonsByTypeLoading;
  const isError = isPokemonError || pokemonsByTypeError;
  return {
    pokemons,
    isLoading,
    isError,
    filteredPokemons,
    numberOfVisiblePokemons,
    typeQueryTrigger,
  };
};
