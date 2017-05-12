import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import './AEMPreview.sass';
import COMPONENTS from '../../audi/components';
import DEMOS from '../../audi/demos';
import Sidebar from '../../components/Sidebar/Sidebar';
import Searchbar from '../../components/Searchbar/Searchbar';
import ComponentNote from '../ComponentNote/ComponentNote';

const IFRAME_COMPONENTS = { ...COMPONENTS, ...DEMOS };



class AEMPreview extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired
  };



  get component() {
    const { componentId } = this.props;
    return IFRAME_COMPONENTS[componentId] || null;
  }

  get serverComponent() {
    return ReactDOMServer.renderToStaticMarkup(
      this.component ? <this.component /> : <h3>Component not found.</h3>
    );
  }

  render() {
    const { name } = this.props;
    console.log('props', this.props)


    return (
      <main className={`${name} AEMPreview`}>
        {/*<div className='control-bar'>
          {'AEM Preview'}
        </div>*/}
        <Sidebar>
          <div className='fixed-search'>
            <div>
              <p>Search by component</p>
              <Searchbar {...this.props} />
            </div>
          </div>
          <h2>Components</h2>
          <ul>
            {Object.keys(COMPONENTS).map((componentId, i) => (
              <li key={i}>
                <a href={"#" + componentId}>{componentId}</a>
              </li>
            ))}
          </ul>
        </Sidebar>
        <div className="component-padding MainContent">
          {Object.keys(COMPONENTS).map((componentId, i) => {
            return <ComponentNote componentId={componentId} key={i}/>
          })}
        </div>
      </main>
    );
  }
}

export default AEMPreview;
