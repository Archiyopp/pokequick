import { TYPES_COLORS } from "../constants";

interface NameUrl {
  name: string;
  url: string;
}
export interface Pokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  base_experience: number;
  types: {
    slot: number;
    type: {
      name: keyof typeof TYPES_COLORS;
      url: string;
    };
  }[];
}

export interface PokemonSpecies {
  color: NameUrl;
  flavor_text_entries: {
    flavor_text: string;
    language: NameUrl;
  }[];
  evolves_from_species: NameUrl | null;
  gender_rate: number;
  habitat: NameUrl | null;
  evolution_chain: {
    url: string;
  };
}

export interface NationalPokedex {
  id: number;
  descriptions: { description: string }[];
  name: string;
  pokemon_entries: {
    entry_number: number;
    pokemon_species: NameUrl;
  }[];
}

interface Chain {
  is_baby: boolean;
  species: NameUrl;
  evolves_to: Chain[];
}

export interface EvolutionChain {
  id: number;
  chain: {
    is_baby: boolean;
    species: NameUrl;
    evolves_to: Chain[];
  };
}

interface CommonPokemonQueryResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: NameUrl[];
}

export type TypesQueryResult = Omit<CommonPokemonQueryResult, "results"> & {
  results: {
    name: keyof typeof TYPES_COLORS;
    url: string;
  }[];
};

export type GendersQueryResult = CommonPokemonQueryResult;

export type PokemonColorQueryResult = CommonPokemonQueryResult;

export interface PokemonByTypeQueryResult {
  name: string;
  id: number;
  pokemon: {
    pokemon: NameUrl;
    slot: number;
  }[];
}

export interface PokemonByGenderQueryResult {
  name: string;
  id: number;
  pokemon_species_details: {
    pokemon_species: NameUrl;
    rate: number;
  }[];
}

export interface PokemonByColorQueryResult {
  name: string;
  id: number;
  pokemon_species: NameUrl[];
}
