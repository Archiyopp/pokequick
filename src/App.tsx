import { PokemonList } from "./components/PokemonList";
import { AiFillFilter, AiOutlineSearch } from "react-icons/ai";
import { TypesFilter } from "./components/TypesFilter";
import { GenderFilter } from "./components/GenderFilter";
import { useAppDispatch, useAppSelector } from "./hooks";
import { changeFilter, selectSearchFilter } from "./slices/filterSlice";
import { ColorFilter } from "./components/ColorFilter";

function App() {
  return (
    <div className="bg-bwhite text-gray-800">
      <Header />
      <main className="flex justify-center">
        <div className="w-11/12 xl:w-9/12">
          <div className="grid grid-cols-12">
            <section className="col-span-3 border-r-2">
              <div className="grid grid-cols-1 gap-4 divide-y">
                <p className="mt-2 pt-2 text-lg font-medium">
                  Filters <AiFillFilter className="inline-block" />{" "}
                </p>
                <TypesFilter />
                <GenderFilter />
              </div>
            </section>
            <section className="col-span-9 py-4 pl-8">
              <PokemonList />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="flex justify-center bg-zinc-100 shadow-md">
      <div className="flex w-11/12 items-center justify-between py-2 xl:w-9/12">
        <Logo />
        <SearchInput />
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="flex items-center">
      <img
        src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png"
        alt="Pikachu"
        className="h-14 mix-blend-darken"
      />
      <span className="logo-text-shadow text-2xl font-bold tracking-tight text-poke-yellow">
        PokeQuick
      </span>
    </div>
  );
}

function SearchInput() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectSearchFilter);
  return (
    <label htmlFor="search" className="relative">
      <span className="sr-only">search</span>
      <input
        type="text"
        name="search"
        id="search"
        className="h-7 w-40 rounded-xl border px-1 pl-6 md:w-52 lg:w-64"
        placeholder="search"
        value={filter}
        onChange={({ target }) => dispatch(changeFilter(target.value))}
      />
      <AiOutlineSearch className="absolute left-1 top-1/2 -translate-y-1/2 text-lg" />
    </label>
  );
}

export default App;
