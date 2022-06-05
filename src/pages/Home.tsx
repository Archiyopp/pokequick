import { AiFillFilter } from "react-icons/ai";
import { Outlet } from "react-router-dom";
import { ColorFilter } from "../components/ColorFilter";
import { GenderFilter } from "../components/GenderFilter";
import { PokemonList } from "../components/PokemonList";
import { TypesFilter } from "../components/TypesFilter";

export function Home() {
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
  return (
    <section className="col-span-3 border-r-2">
      <div className="grid grid-cols-1 gap-4 divide-y">
        <p className="mt-2 pt-2 text-lg font-medium">
          Filters <AiFillFilter className="inline-block" />{" "}
        </p>
        <TypesFilter />
        <ColorFilter />
        <GenderFilter />
      </div>
      <Outlet />
    </section>
  );
}
