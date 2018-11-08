import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import {
  Home,
  Login,
  ListOfBranches,
  ListOfOrgs,
  ListOfRepos,
  FilePresenter
} from './routes'

import {
  Header
} from './header/Header'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <Switch>
              <Route path="/login/:mode" component={Header} />
              <Route path="/:mode" component={Header} />
            </Switch>
          </header>
          <main>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path="/login/:mode" component={Login} />
              <Route exact path='/login/:mode/orgs/:username' component={ListOfOrgs} />
              <Route exact path='/:mode/:owner' component={ListOfRepos}/>
              <Route exact path='/:mode/:owner/:repo' component={ListOfBranches} />
              <Route path='/:mode/:owner/:repo/:branch' component={FilePresenter} />
            </Switch>
          </main>
        </div>
      </Router>
    )
  }
}

export default App;
