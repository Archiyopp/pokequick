import { AiFillFilter } from "react-icons/ai";
import { Outlet } from "react-router-dom";
import { ColorFilter } from "../components/ColorFilter";
import { GenderFilter } from "../components/GenderFilter";
import { PokemonList } from "../components/PokemonList";
import { TypesFilter } from "../components/TypesFilter";
import { useAppDispatch, useDocumentTitle } from "../hooks";
import { resetFilters } from "../slices/filterSlice";

export function Home() {
  useDocumentTitle("Home");
  return (
    <div className="w-11/12 xl:w-9/12">
      <div className="grid grid-cols-12">
        <FilterSection />
        <section className="col-span-9 py-4 pl-8">
          <PokemonList />
        </section>
      </div>
    </div>
  );
}

function FilterSection() {
  const dispatch = useAppDispatch();
  return (
    <section className="col-span-3 border-r-2">
      <div className="grid grid-cols-1 gap-4 divide-y">
        <p className="mt-2 pt-2 text-lg font-semibold">
          Filters <AiFillFilter className="inline-block" />{" "}
        </p>
        <TypesFilter />
        <ColorFilter />
        <GenderFilter />
        <div className="flex items-center justify-center pt-4">
          <button
            className="mb-6 rounded-lg bg-zinc-200 py-2 px-4 font-bold uppercase transition-colors hover:bg-zinc-300 active:outline active:outline-1"
            type="button"
            onClick={() => dispatch(resetFilters())}
          >
            Reset filters
          </button>
        </div>
      </div>
      <Outlet />
    </section>
  );
}
