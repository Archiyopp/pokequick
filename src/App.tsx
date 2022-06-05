import { Header } from "./components/Header";
import { RoutesProvider } from "./routes";

function App() {
  return (
    <div className="h-full w-full bg-bwhite text-gray-800">
      <Header />
      <main className="flex justify-center">
        <RoutesProvider />
      </main>
    </div>
  );
}

export default App;
