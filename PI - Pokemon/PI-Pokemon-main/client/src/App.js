import "./App.css";
import { BrowserRouter as Routes, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import CreatePokemon from "./Components/CreatePokemon/CreatePokemon";
import Detail from "./Components/Details/Detail";
import ErrorPage from "./Components/ErrorPage/ErrorPage";

function App() {
  return (
    <Routes>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/home/:id" component={Detail}></Route>
          <Route exact path="/create" component={CreatePokemon} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </div>
    </Routes>
  );
}

export default App;
