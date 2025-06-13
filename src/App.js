import {Provider} from "react-redux";
import "./App.css";
import Body from "./components/Body";
import {BrowserRouter} from "react-router-dom";
import appStore from "./utils/appStore";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Body />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
