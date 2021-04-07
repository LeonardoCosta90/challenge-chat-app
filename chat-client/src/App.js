import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => (
  <Router>
    <Route path="/" exact component={join} />
    <Route path="/chat" exact component={join} />
  </Router>
);
