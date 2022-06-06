import { AiOutlineLoading } from "react-icons/ai";
import { useAppSelector, useAppDispatch, useGetPokemons } from "../hooks";
import {
  incrementNumberOfVisiblePokemons,
  selectGenderFilter,
  selectSearchFilter,
  selectTypeFilter,
} from "../slices/filterSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";

interface PokemonProps {
  name: string;
  id: number;
}

export function PokemonList() {
  const {
    filteredPokemons = [],
    isLoading,
    pokemons,
    numberOfVisiblePokemons,
    isError,
    typeQueryTrigger,
    genderQueryTrigger,
  } = useGetPokemons();
  const dispatch = useAppDispatch();
  const searchFilter = useAppSelector(selectSearchFilter);
  const typeId = useAppSelector((state) => state.ids.filter);
  const typeFilter = useAppSelector(selectTypeFilter);
  const genderFilter = useAppSelector(selectGenderFilter);

  // trigger in this component, when typeFilter changes, cant trigger on TypeFilter component
  // because it doesnt work, not sure why
  useEffect(() => {
    if (typeId) {
      typeQueryTrigger(typeId, true);
    }
  }, [typeId]);

  useEffect(() => {
    if (genderFilter !== "all") {
      genderQueryTrigger(genderFilter, true);
    }
  }, [genderFilter]);

  if (isLoading)
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <AiOutlineLoading className="animate-spin text-2xl" />
      </div>
    );
  if (isError) return <p>Error</p>;
  if (!pokemons) return null;

  return (
    <>
      <p className="mb-6 font-medium">
        Choose a pokemon to view more information
      </p>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {pokemons.map((entry) => (
          <PokemonCard
            key={entry.entry_number}
            id={entry.entry_number}
            name={entry.pokemon_species.name}
          />
        ))}
        {pokemons.length === 0 && (
          <div className="col-span-3">
            <p className="mb-6 text-lg font-semibold tracking-tight">
              No pokemon found with the search term {searchFilter}{" "}
              {typeFilter && `and type ${typeFilter}`}
            </p>
          </div>
        )}
      </div>
      {filteredPokemons.length > numberOfVisiblePokemons && (
        <div className="mt-6 flex items-center justify-center">
          <button
            onClick={() => dispatch(incrementNumberOfVisiblePokemons())}
            className="mb-6 rounded-lg bg-zinc-200 py-2 px-4 font-bold uppercase transition-colors hover:bg-zinc-300 active:outline active:outline-1"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}

function PokemonCard({ id, name }: PokemonProps) {
  if (!id) return null;
  const idParam = id.toString().padStart(3, "0");
  return (
    <Link
      className="relative flex flex-col items-center justify-center overflow-hidden rounded-md border mix-blend-darken shadow-lg transition-colors hover:bg-slate-200 active:outline active:outline-1 lg:rounded-lg 2xl:rounded-xl"
      to={id.toString()}
    >
      <div>
        <img
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${idParam}.png`}
          height="215"
          width="215"
        />
      </div>
      <span className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-poke-blue via-poke-yellow to-poke-red"></span>
      <p className="mb-4 font-semibold capitalize tracking-tight sm:text-lg">
        {name}
      </p>
    </Link>
  );
}
