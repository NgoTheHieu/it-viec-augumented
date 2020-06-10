import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Details from "./pages/Details";
import { useSelector } from "react-redux";
function App() {
  let user = useSelector((state) => state.user);

  const ProtectedRoute = (props) => {
    if (user.isAuthenticated === true) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };
  return (
    <div>
      <Switch>
        <Route path="/login" exact component={Login} /> 
        {/* this handle event that switch user to Login pages */}
        <Route path="/jobs/" exact component={Jobs} />
        {/* this handle event that switch user to Job pages */}
        <Route path="/" exact component={Jobs} />
        {/* this handle event that switch user to well, .. Jobs page */}
        <ProtectedRoute
          path="/job/:id"
          render={(props) => <Details {...props} />} 
        />
      </Switch>
    </div>
  );
}

export default App;
