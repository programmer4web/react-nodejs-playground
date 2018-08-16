import './scss/style.scss';
import React from 'react';
import {render} from 'react-dom';
import {Router, Route} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import {Provider} from 'react-redux';
import store from "./store/index"; // redux store

import Home from './screens/Home';
import Departments from './screens/Departments';

const customHistory = createBrowserHistory(),
  renderApplication = () => {
    render(
      <Provider store={store}>
        <Router history={customHistory}>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/departments" component={Departments} />
          </div>
        </Router>
      </Provider>,
      document.querySelector('#root')
    );
  }

renderApplication(Home);

if (module.hot) {
  module.hot.accept("./screens/Home", () => {
    renderApplication();
  });
}
