import { useGetPokemonsQuery } from "../services/pokemon";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useAppSelector } from "../hooks";
import { selectSearchFilter } from "../slices/filterSlice";
import { Link } from "react-router-dom";

interface PokemonProps {
  name: string;
  id: number;
}

export function PokemonList() {
  const { data, isLoading, isError } = useGetPokemonsQuery();
  const [numberOfPokemonsToView, setNumberOfPokemonsToView] = useState(20);
  const searchFilter = useAppSelector(selectSearchFilter);
  if (isLoading)
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <AiOutlineLoading className="animate-spin text-2xl" />
      </div>
    );
  if (isError) return <p>Error</p>;
  if (!data) return null;

  const filteredPokemons = data.pokemon_entries.filter((entry) => {
    if (Number.isNaN(Number.parseInt(searchFilter))) {
      return entry.pokemon_species.name
        .toLowerCase()
        .includes(searchFilter.toLowerCase());
    }
    return entry.entry_number.toString().includes(searchFilter);
  });

  const pokemons = filteredPokemons.slice(0, numberOfPokemonsToView);

  return (
    <>
      <p className="mb-6 font-medium">
        Choose a pokemon to view more information
      </p>
      <div className="grid grid-cols-3 gap-8">
        {pokemons.map((entry) => (
          <PokemonCard
            key={entry.entry_number}
            id={entry.entry_number}
            name={entry.pokemon_species.name}
          />
        ))}
        {filteredPokemons.length > numberOfPokemonsToView && (
          <div className="col-span-3 flex items-center justify-center">
            <button
              onClick={() =>
                setNumberOfPokemonsToView(numberOfPokemonsToView + 20)
              }
              className="mb-6 rounded-lg bg-zinc-100 py-2 px-4 font-bold uppercase transition-colors hover:bg-zinc-200 active:outline active:outline-1"
            >
              Load more
            </button>
          </div>
        )}
        {pokemons.length === 0 && (
          <div className="col-span-3">
            <p className="mb-6 text-lg font-semibold tracking-tight">
              No pokemon found with the search term {searchFilter}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function PokemonCard({ id, name }: PokemonProps) {
  if (!id) return null;
  const idParam = id.toString().padStart(3, "0");
  return (
    <Link
      className="flex flex-col items-center justify-center rounded-lg border mix-blend-darken shadow-lg"
      to={id.toString()}
    >
      <div>
        <img
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${idParam}.png`}
          height="215"
          width="215"
        />
      </div>
      <p className="mb-4 font-semibold capitalize tracking-tight sm:text-lg">
        {name}
      </p>
    </Link>
  );
}
