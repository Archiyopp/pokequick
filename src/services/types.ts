import { TYPES_COLORS } from "../constants";
export interface Pokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  base_experience: number;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
}

export interface NationalPokedex {
  id: number;
  descriptions: { description: string }[];
  name: string;
  pokemon_entries: {
    entry_number: number;
    pokemon_species: {
      name: string;
      url: string;
    };
  }[];
}

interface CommonPokemonQueryResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export type TypesQueryResult = Omit<CommonPokemonQueryResult, "results"> & {
  results: {
    name: keyof typeof TYPES_COLORS;
    url: string;
  }[];
};

export type GendersQueryResult = CommonPokemonQueryResult;

export type PokemonColorQueryResult = CommonPokemonQueryResult;
