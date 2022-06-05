import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GendersQueryResult,
  NationalPokedex,
  Pokemon,
  PokemonColorQueryResult,
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
    getPokemonById: builder.query<Pokemon, number | string>({
      query: (id) => `pokemon/${id}`,
    }),
    getPokemonGenders: builder.query<GendersQueryResult, void>({
      query: () => "gender",
    }),
    getPokemonColors: builder.query<PokemonColorQueryResult, void>({
      query: () => "pokemon-color",
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
} = pokemonApi;
