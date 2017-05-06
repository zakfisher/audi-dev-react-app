import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { matchPath } from 'react-router';
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';
import MissingPage from '../pages/MissingPage/MissingPage';

class App extends Component {

  get children() {
    const { routes } = this.props.route;
    const { pathname } = this.props.location;

    // Default page to 404
    let Children = <MissingPage {...this.props} />;

    // Set page by route
    routes.forEach((route, i) => {

      // Check for matching route
      const isMatchingRoute = matchPath(pathname, {
        path: route.path,
        exact: true,
        strict: false
      });

      if (!isMatchingRoute) return;

      // Create new page component with all props (redux + router)
      const RouteComponent = routeProps => <route.component {...this.props} {...routeProps} />;
      Children = <Route path={route.path} children={RouteComponent} />;
    });

    return Children;
  }

  render() {
    return (
      <div className="App">
        <Nav {...this.props} />
        {this.children}
        <Footer {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default withRouter(connect(mapStateToProps)(App));
