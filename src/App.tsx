import { Header } from "./components/Header";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="h-full w-full bg-bwhite text-gray-800">
      <Header />
      <main className="flex justify-center">
        <Home />
      </main>
    </div>
  );
}

export default App;
