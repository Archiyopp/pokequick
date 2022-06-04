import { useGetPokemonColorsQuery } from "../services/pokemon";
import { useState } from "react";

export function ColorFilter() {
  const { data, isLoading, isError } = useGetPokemonColorsQuery();
  if (isLoading) return <p className="mx-auto">Loading...</p>;
  if (isError) return <p className="mx-auto">Error loading colors</p>;
  console.log(data);
  return (
    <div className="">
      <p className="pt-4">Colors</p>
      <div className="mt-4 mr-4 flex flex-wrap gap-3">
        {data?.results.map((color) => (
          <ColorButton color={color.name} url={color.url} key={color.name} />
        ))}
      </div>
    </div>
  );
}

interface ColorProps {
  color: string;
  url: string;
}

function ColorButton({ color, url }: ColorProps) {
  const [selected, setSelected] = useState(false);
  return (
    <button
      className={`h-6 w-6 rounded-sm ${
        selected
          ? "border-b-4 border-poke-blue shadow-md"
          : "border border-gray-300"
      } shadow-md`}
      style={{ backgroundColor: color }}
      onClick={() => setSelected(!selected)}
    ></button>
  );
}
