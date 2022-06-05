import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import ContentLoader from "react-content-loader";
import { useNavigate, useParams } from "react-router-dom";
import { PokemonSpecies } from "../services/types";
import {
  useGetPokemonByIdQuery,
  useGetPokemonSpeciesByIdQuery,
} from "../services/pokemon";
import { TYPES_COLORS } from "../constants";

export function PokemonModal() {
  const pokemonId = useParams()?.id;
  if (!pokemonId) return null;
  if (Number.isNaN(Number.parseInt(pokemonId))) return null;
  const {
    data: pokemonData,
    isLoading: isLoadingPokemon,
    isError: isErrorPokemon,
  } = useGetPokemonByIdQuery(pokemonId);
  const {
    data: speciesData,
    isLoading: speciesLoading,
    isError: speciesError,
  } = useGetPokemonSpeciesByIdQuery(pokemonId);
  console.log(pokemonData, speciesData);
  const isLoading = isLoadingPokemon || speciesLoading;
  const isError = isErrorPokemon || speciesError;
  if (isError) return null;

  return (
    <Modal>
      <div className="grid grid-cols-2 p-6">
        <img
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId.padStart(
            3,
            "0"
          )}.png`}
          width="475"
          height="475"
        />
        <div>
          {isLoading ? (
            <MyLoader />
          ) : (
            <>
              <Dialog.Title
                className="mb-4 text-2xl font-bold capitalize tracking-tight"
                as="h1"
              >
                {pokemonData?.name}{" "}
                <span className="text-gray-500">
                  #{pokemonId.padStart(3, "0")}
                </span>
              </Dialog.Title>
              {speciesData && speciesData.flavor_text_entries.length > 0 && (
                <PokemonDescription
                  flavor_text_entries={speciesData.flavor_text_entries}
                />
              )}
              {pokemonData && (
                <>
                  <div className="my-4 w-full overflow-hidden overflow-x-auto rounded border border-gray-200 lg:w-[95%]">
                    <table className="min-w-full divide-y divide-gray-300 text-sm">
                      <thead>
                        <tr className="bg-gray-200">
                          <th
                            className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                            scope="col"
                          >
                            Category
                          </th>
                          <th
                            className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                            scope="col"
                          >
                            Value
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-300">
                        <PokemonTableRow
                          category="Height"
                          value={pokemonData.height}
                          valueLabel="m"
                        />
                        <PokemonTableRow
                          category="Weight"
                          value={pokemonData.weight}
                          valueLabel="kg"
                        />
                        {speciesData && (
                          <>
                            <PokemonTableRow
                              category="gender"
                              value={
                                speciesData.gender_rate === -1
                                  ? "genderless"
                                  : isBetweenTheRange(
                                      speciesData.gender_rate,
                                      0,
                                      8
                                    )
                                  ? "Male - Female"
                                  : speciesData.gender_rate === 0
                                  ? "Male"
                                  : "Female"
                              }
                            />
                            <PokemonTableRow
                              category="Color"
                              value={speciesData.color.name}
                            />
                            <PokemonTableRow
                              category="Habitat"
                              value={speciesData.habitat.name}
                            />
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <h2 className="mb-2 text-lg font-bold tracking-tight">
                    Types:
                  </h2>
                  <div className="flex flex-row flex-wrap items-center justify-start gap-4">
                    {pokemonData.types.map(({ type }) => (
                      <span
                        className="flex items-center rounded-md px-2 pb-0.5 font-semibold capitalize text-white"
                        key={type.name}
                        style={{
                          textShadow: `1px 1px 2px #232323`,
                          backgroundColor: TYPES_COLORS[type.name] || "gray",
                        }}
                      >
                        {type.name}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="bg-gray-300 p-6"></div>
    </Modal>
  );
}

function PokemonDescription({
  flavor_text_entries,
}: {
  flavor_text_entries: PokemonSpecies["flavor_text_entries"];
}) {
  let description = "";

  for (const entry of flavor_text_entries) {
    if (entry.language.name === "en") {
      description = entry.flavor_text;
      break;
    }
  }
  return (
    <Dialog.Description className="">
      {description.replace(/\n/g, " ")}{" "}
    </Dialog.Description>
  );
}

function PokemonTableRow({
  category,
  value,
  valueLabel = "",
}: {
  category: string;
  value: string | number;
  valueLabel?: string;
}) {
  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-2 font-medium capitalize">
        {category}
      </td>
      <td className="whitespace-nowrap px-4 py-2 capitalize text-gray-700">
        {value}
        {valueLabel}
      </td>
    </tr>
  );
}

function MyLoader() {
  return (
    <ContentLoader
      speed={2}
      width={400}
      height={160}
      viewBox="0 0 400 160"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="-1" y="12" rx="3" ry="3" width="105" height="7" />
      <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
      <circle cx="128" cy="15" r="14" />
      <rect x="0" y="115" rx="0" ry="0" width="400" height="35" />
      <rect x="0" y="165" rx="0" ry="0" width="400" height="25" />
      <rect x="0" y="215" rx="0" ry="0" width="400" height="25" />
    </ContentLoader>
  );
}

function Modal({ children }: { children: JSX.Element | JSX.Element[] }) {
  const navigate = useNavigate();
  return (
    <Transition appear show as={Fragment}>
      <Dialog open onClose={() => navigate("/")}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div
            className={`relative z-10 flex min-h-full items-center justify-center p-4 text-center`}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`max-w-4xl transform overflow-hidden rounded-md bg-bwhite text-left align-middle shadow-xl transition-all`}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function isBetweenTheRange(
  value: number,
  min: number,
  max: number
): value is number {
  return value > min && value < max;
}
