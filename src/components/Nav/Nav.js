import React from 'react';
import { Link } from 'react-router-dom';
import User from '../../helpers/user';
import SVG from '../SVG/SVG';
import audiRingsSVG from '../../svg/audi-rings.svg';
import caretSVG from '../../svg/caret.svg';
import SITE_NAME from '../../fixtures/site-name';
import './Nav.sass';

const getLinkClass = (url, segment) => url.indexOf(segment) > -1 ? 'active' : '';

const Nav = ({ user, location }) => {
  const url = location.pathname;
  let markup = null;

  if (user) {
    markup = (
      <nav className="Nav">

        {/* Primary Nav Bar */}
        <div className="primary-nav">
          <Link className="rings" to="/">
            <SVG file={audiRingsSVG} name="audiRingsSVG"/>
          </Link>
          <h1>{SITE_NAME}</h1>
          <div className="user">
            <p>{user.displayName}</p>
            <img src={user.photoURL} alt="" />
          </div>
          <div className="dropdown">
            <SVG file={caretSVG} name="caretSVG" />
            <div className="menu">
              <Link to="#" onClick={User.logOut}>Log Out</Link>
            </div>
          </div>
        </div>

        {/* Secondary Nav Bar */}
        <div className="secondary-nav">
          <Link to="/notes" className={getLinkClass(url, '/note')}>Notes</Link>
          <Link to="/components" className={getLinkClass(url, '/component')}>Components</Link>
          <Link to="/demos" className={getLinkClass(url, '/demo')}>Demos</Link>
          <Link to="/onboarding" className={getLinkClass(url, '/onboarding')}>Onboarding</Link>
        </div>

      </nav>
    );
  }

  return markup;
};

export default Nav;
