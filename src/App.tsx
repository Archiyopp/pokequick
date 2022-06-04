import { PokemonList } from "./components/PokemonList";
import { TypesFilter } from "./components/TypesFilter";
import { GenderFilter } from "./components/GenderFilter";
import { ColorFilter } from "./components/ColorFilter";
import { Header } from "./components/Header";
import { AiFillFilter } from "react-icons/ai";

function App() {
  return (
    <div className="bg-bwhite text-gray-800">
      <Header />
      <main className="flex justify-center">
        <div className="w-11/12 xl:w-9/12">
          <div className="grid grid-cols-12">
            <FilterSection />
            <section className="col-span-9 py-4 pl-8">
              <PokemonList />
            </section>
          </div>
        </div>
      </main>
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
    </section>
  );
}

export default App;
