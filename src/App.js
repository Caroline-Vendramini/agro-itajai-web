import RoutesApp from "./routes";
import Loader from "./components/loader/Loader";
import { LoaderProvider } from "./providers/LoaderProvider";

function App() {

  return (
    <>
      <LoaderProvider>
        <Loader />
        <RoutesApp />
      </LoaderProvider>
    </>
  );
}

export default App;
