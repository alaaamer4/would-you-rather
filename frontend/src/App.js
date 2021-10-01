import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import Home from "./Routes/Home";
import CreateQuestion from "./Routes/CreateQuestion";
import Navbar from "./components/navbar/Navbar";
import ProtectedRoute from "./functions/ProtectedRoute";
import Loading from "./components/loading/Loading";
import { loadUser } from "./store/actions/auth";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Select from "./components/select/Select";
import NotFound from "./Routes/NotFound";
function App() {
  const isLoading = useSelector((state) => state.auth.isLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isLoading ? (
    <Loading />
  ) : (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <ProtectedRoute path="/add" component={CreateQuestion} />
        <ProtectedRoute path="/leaderboard" component={Leaderboard} />
        <ProtectedRoute path="/questions/:id" component={Select} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
