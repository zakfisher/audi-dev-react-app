import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { matchPath } from 'react-router';
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';
import MissingPage from '../pages/MissingPage/MissingPage';

/*
  Map state and dispatch to component props
*/

const mapStateToProps = state => state;

const App = props => {

  // Default page to 404
  let Page = {
    component: MissingPage,
    path: '/404'
  };

  // Set page by route
  props.route.routes.forEach((route, i) => {
    const isMatchingRoute = matchPath(props.location.pathname, {
      path: route.path,
      exact: false,
      strict: false
    });
    Page = isMatchingRoute ? route : Page;
  });

  // Create new page component with all props (redux + router)
  const PageComponent = routeProps => <Page.component {...props} {...routeProps} />;

  return (
    <div className="App">
      <Nav {...props} />
      <Route path={Page.path} children={PageComponent} />
      <Footer {...props} />
    </div>
  );
};

export default withRouter(connect(mapStateToProps)(App));
