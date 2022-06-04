import { TYPES_COLORS } from "../constants";
export interface Pokemon {
  id: number;
  name: string;
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

export interface TypesQueryResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: keyof typeof TYPES_COLORS;
    url: string;
  }[];
}

export interface GendersQueryResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}
