import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPokemonByIdQuery } from "../services/pokemon";

export function PokemonModal() {
  const pokemonId = useParams()?.id;
  const navigate = useNavigate();
  if (!pokemonId) return null;
  if (Number.isNaN(Number.parseInt(pokemonId))) return null;
  const { data, isLoading, isError } = useGetPokemonByIdQuery(pokemonId);
  if (isLoading || isError) return null;

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
                className={`max-w-4xl transform overflow-hidden rounded-md bg-bwhite p-6 text-left align-middle shadow-xl transition-all`}
              >
                <div className="grid grid-cols-2">
                  <img
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId.padStart(
                      3,
                      "0"
                    )}.png`}
                    width="475"
                    height="475"
                  />
                  <Dialog.Title className="text-2xl font-bold capitalize tracking-tight">
                    {data?.name}{" "}
                    <span className="rounded-full border border-gray-800 p-2 text-xl">
                      {pokemonId.padStart(3, "0")}
                    </span>
                  </Dialog.Title>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
