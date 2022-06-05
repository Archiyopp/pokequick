import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  PokemonByTypeQueryResult,
  PokemonByGenderQueryResult,
  EvolutionChain,
} from "./types";
import {
  GendersQueryResult,
  NationalPokedex,
  Pokemon,
  PokemonColorQueryResult,
  PokemonSpecies,
  TypesQueryResult,
} from "./types";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemons: builder.query<NationalPokedex, void>({
      query: () => "pokedex/national",
    }),
    getPokemonTypes: builder.query<TypesQueryResult, void>({
      query: () => `type`,
    }),
    getPokemonsByType: builder.query<PokemonByTypeQueryResult, string | number>(
      {
        query: (type) => `type/${type}`,
      }
    ),
    getPokemonById: builder.query<Pokemon, number | string>({
      query: (id) => `pokemon/${id}`,
    }),
    getPokemonGenders: builder.query<GendersQueryResult, void>({
      query: () => "gender",
    }),
    getPokemonsByGender: builder.query<
      PokemonByGenderQueryResult,
      string | number
    >({
      query: (gender) => `gender/${gender}`,
    }),
    getPokemonColors: builder.query<PokemonColorQueryResult, void>({
      query: () => "pokemon-color",
    }),
    getPokemonSpeciesById: builder.query<PokemonSpecies, string | number>({
      query: (id) => `pokemon-species/${id}`,
    }),
    getPokemonEvolutionById: builder.query<EvolutionChain, number | string>({
      query: (id) => `evolution-chain/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPokemonsQuery,
  useGetPokemonTypesQuery,
  useGetPokemonByIdQuery,
  useGetPokemonGendersQuery,
  useGetPokemonColorsQuery,
  useGetPokemonSpeciesByIdQuery,
  useLazyGetPokemonsByTypeQuery,
  useLazyGetPokemonsByGenderQuery,
  useGetPokemonEvolutionByIdQuery,
  endpoints: {
    getPokemonsByType: {
      useLazyQuerySubscription: useLazyGetPokemonsByTypeQuerySubscription,
    },
  },
} = pokemonApi;
