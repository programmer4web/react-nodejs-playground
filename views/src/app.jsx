import './scss/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Home from './screens/Home';
import Departments from './screens/Departments';

const customHistory = createBrowserHistory(),
  renderApplication = () => {
    ReactDOM.render(
      <Router history={customHistory}>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/departments" component={Departments} />
        </div>
      </Router>,
      document.querySelector('#root')
    );
  }

renderApplication(Home);

if (module.hot) {
  module.hot.accept("./screens/Home", () => {
    renderApplication();
  });
}
