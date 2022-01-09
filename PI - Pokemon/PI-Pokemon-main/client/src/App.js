import "./App.css";
import { BrowserRouter as Routes, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";

function App() {
  return (
    <Routes>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/home" component={Home}></Route>
        </Switch>
      </div>
    </Routes>
  );
}

export default App;
