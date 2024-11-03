import { Switch, Route } from "wouter";
import Landing from "./pages/Landing";
import Home from "./pages/Home";

function App() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/home" component={Home} />
    </Switch>
  );
}

export default App;
