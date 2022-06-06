import { AiOutlineLoading } from "react-icons/ai";
import { TYPES_COLORS } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useGetPokemonTypesQuery } from "../services/pokemon";
import { changeType, selectTypeFilter } from "../slices/filterSlice";
import { changeFilterId } from "../slices/idsSlice";

export function TypesFilter() {
  const { data, isLoading, isError } = useGetPokemonTypesQuery();
  const dispatch = useAppDispatch();
  const typeFilter = useAppSelector(selectTypeFilter);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeType(e.target.value));
    if (data && e.target.value !== typeFilter) {
      const url = data.results.find(
        (type) => type.name === e.target.value
      )?.url;
      if (url) dispatch(changeFilterId(url.split("/")[6]));
    }
  };

  if (isLoading)
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <AiOutlineLoading className="animate-spin text-2xl" />
      </div>
    );
  if (isError) return <p>Error</p>;
  if (!data) return null;
  return (
    <div className="pt-4">
      <p className="mb-4 font-semibold">Type</p>
      <div className="grid gap-y-2 lg:grid-cols-2">
        {data.results.map((type) => (
          <label
            htmlFor={type.name}
            className="flex items-center"
            key={type.name}
          >
            <input
              type="checkbox"
              name={type.name}
              id={type.name}
              className="mr-3 h-4 w-4"
              style={{ accentColor: TYPES_COLORS[type.name] || "gray" }}
              value={type.name}
              checked={typeFilter === type.name}
              onChange={handleChange}
            />
            <span
              className="flex items-center rounded-md px-2 pb-0.5 font-semibold capitalize text-white"
              style={{
                textShadow: `1px 1px 2px #232323`,
                backgroundColor: TYPES_COLORS[type.name] || "gray",
              }}
            >
              {type.name}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
