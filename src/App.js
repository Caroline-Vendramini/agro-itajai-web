import RoutesApp from "./routes";
import Loader from "./components/loader/Loader";
import { LoaderProvider } from "./providers/LoaderProvider";
import { UnitProvider } from "./providers/UnitProvider";

function App() {

  return (
    <>
      <UnitProvider>
        <LoaderProvider>
          <Loader />
          <RoutesApp />
        </LoaderProvider>
      </UnitProvider>
    </>
  );
}

export default App;
