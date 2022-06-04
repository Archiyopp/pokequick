import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GendersQueryResult,
  NationalPokedex,
  Pokemon,
  TypesQueryResult,
} from "./types";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemons: builder.query<NationalPokedex, void>({
      query: () => "pokedex/national",
    }),
    getPokemonTypes: builder.query<TypesQueryResult, void>({
      query: () => `type`,
    }),
    getPokemonById: builder.query<Pokemon, number>({
      query: (id) => `pokemon/${id}`,
    }),
    getPokemonGenders: builder.query<GendersQueryResult, void>({
      query: () => "gender",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPokemonByNameQuery,
  useGetPokemonsQuery,
  useGetPokemonTypesQuery,
  useGetPokemonByIdQuery,
  useGetPokemonGendersQuery,
} = pokemonApi;
