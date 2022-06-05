import { Route, Routes } from "react-router-dom";
import { PokemonModal } from "./components/PokemonModal";
import { Home } from "./pages/Home";

export function RoutesProvider() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/:id" element={<PokemonModal />} />
      </Route>
    </Routes>
  );
}
