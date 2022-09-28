import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import { PokemonModal } from "./components/PokemonModal";
import ErrorPage from "./pages/404";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route path="/:id" element={<PokemonModal />} />
    </Route>
  )
);
export function RoutesProvider() {
  return <RouterProvider router={router} />;
}
