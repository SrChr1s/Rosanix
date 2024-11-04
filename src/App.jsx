import { Switch, Route } from "wouter";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Landing} />
      <Route path="/home" component={Home} />
    </Switch>
  );
}

export default App;
