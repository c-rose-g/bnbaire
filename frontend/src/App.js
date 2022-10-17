// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots";
import * as sessionActions from "./store/session";
import * as SpotActions from './store/allSpots'
import SingleSpot from './components/SpotDetails'
import CreateSpot from "./components/CreateSpot";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route exact path='/'>
          <AllSpots />
           </Route>
          <Route path={`/spots/:spotId`} >
            <SingleSpot />
          </Route>
          {/* <Route path='/spots'>
            <CreateSpot/> */}
          {/* </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
