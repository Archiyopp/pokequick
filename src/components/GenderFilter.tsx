import { useGetPokemonGendersQuery } from "../services/pokemon";

export function GenderFilter() {
  const { data, isLoading, isError } = useGetPokemonGendersQuery();
  if (isLoading) return <p className="mx-auto">Loading...</p>;
  if (isError) return <p className="mx-auto">Error loading genders</p>;

  return (
    <div className="flex flex-col gap-1  pt-4">
      <p className="mb-2 font-medium">Gender</p>
      <label htmlFor="all">
        <input
          type="radio"
          name="gender"
          id="all"
          className="mr-2"
          defaultChecked
        />
        All
      </label>
      {data?.results.map((gender) => (
        <label htmlFor={gender.name} className="capitalize" key={gender.name}>
          <input type="radio" name="gender" id={gender.name} className="mr-2" />
          {gender.name}
        </label>
      ))}
    </div>
  );
}
