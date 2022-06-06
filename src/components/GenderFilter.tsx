import { useAppSelector, useAppDispatch } from "../hooks";
import { useGetPokemonGendersQuery } from "../services/pokemon";
import { changeGender, selectGenderFilter } from "../slices/filterSlice";

export function GenderFilter() {
  const { data, isLoading, isError } = useGetPokemonGendersQuery();
  const genderFilter = useAppSelector(selectGenderFilter);
  const dispatch = useAppDispatch();
  if (isLoading) return <p className="mx-auto">Loading...</p>;
  if (isError) return <p className="mx-auto">Error loading genders</p>;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeGender(e.target.value));
  };
  return (
    <div className="flex flex-col gap-1  pt-4">
      <p className="mb-2 font-medium">Gender</p>
      <label htmlFor="all">
        <input
          type="radio"
          name="gender"
          id="all"
          className="mr-2"
          value="all"
          checked={genderFilter === "all"}
          onChange={handleChange}
        />
        All
      </label>
      {data?.results.map((gender) => (
        <label htmlFor={gender.name} className="capitalize" key={gender.name}>
          <input
            type="radio"
            name="gender"
            id={gender.name}
            className="mr-2"
            value={gender.name}
            onChange={handleChange}
            checked={genderFilter === gender.name}
          />
          {gender.name}
        </label>
      ))}
    </div>
  );
}
