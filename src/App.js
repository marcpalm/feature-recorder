import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import {
  Home,
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
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path="/login/:mode" component={Login} />
              <Route exact path='/login/:mode/orgs/:user' component={ListOfOrgs} />
              <Route exact path='/:mode/:owner' component={ListOfRepos}/>
              <Route exact path='/:mode/:owner/:repo' component={ListOfBranches} />
              <Route exact path='/:mode/:owner/:repo/:branch' component={ListOfFeatures} />
              <Route path='/:mode/:owner/:repo/:branch/:file' component={FilePresenter}/>
            </Switch>
          </main>
        </div>
      </Router>
    )
  }
}

export default App;
