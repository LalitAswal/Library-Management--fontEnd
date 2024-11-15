import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./pages/Login.jsx";
import store from "./store/store.jsx";

function App() {
  return (
    <Provider store={store}>
      <Router>
          <Route path="/" exact component={Login} />
      </Router>
    </Provider>
  );
}

export default App;