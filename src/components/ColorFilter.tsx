import { useGetPokemonColorsQuery } from "../services/pokemon";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { changeColor, selectColorFilter } from "../slices/filterSlice";

export function ColorFilter() {
  const { data, isLoading, isError } = useGetPokemonColorsQuery();
  if (isLoading) return <p className="mx-auto">Loading...</p>;
  if (isError) return <p className="mx-auto">Error loading colors</p>;
  console.log(data);
  return (
    <div className="">
      <p className="pt-4 font-semibold">Color</p>
      <div className="mt-4 mr-4 flex flex-wrap gap-6">
        {data?.results.map((color) => (
          <ColorButton color={color.name} key={color.name} />
        ))}
      </div>
    </div>
  );
}

interface ColorProps {
  color: string;
}

function ColorButton({ color }: ColorProps) {
  const colorFilter = useAppSelector(selectColorFilter);
  const dispatch = useAppDispatch();
  return (
    <button
      className={`h-7 w-7 rounded-sm shadow-md ${
        color === colorFilter ? "scale-125 outline" : "opacity-80"
      }`}
      style={{ backgroundColor: color }}
      onClick={() => dispatch(changeColor(color))}
    ></button>
  );
}
