import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import {
  Login,
  ListOfBranches,
  ListOfOrgs,
  ListOfRepos,
  ListOfFeatures,
  FilePresenter
} from './routes'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <main>
            <Route exact path="/:mode/login" component={Login} />
            <Route exact path='/:mode/orgs/:user' component={ListOfOrgs} />
            <Route exact path='/:mode/:owner' component={ListOfRepos}/>
            <Route exact path='/:mode/:owner/:repo' component={ListOfBranches} />
            <Route exact path='/:mode/:owner/:repo/:branch' component={ListOfFeatures} />
            <Route path='/:mode/:owner/:repo/:branch/:file' component={FilePresenter}/>
          </main>
        </div>
      </Router>
    )
  }
}

export default App;
