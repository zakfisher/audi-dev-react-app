import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import './AEMPreview.sass';
import COMPONENTS from '../../audi/components';
import DEMOS from '../../audi/demos';
import Sidebar from '../../components/Sidebar/Sidebar';
import Searchbar from '../../components/Searchbar/Searchbar';

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
        <div className='control-bar'>
          {'AEM Preview'}
        </div>
        <Sidebar>
          <div className='fixed-search'>
            <div>
              <p>Search by component</p>
              <Searchbar {...this.props} />
            </div>
          </div>
        </Sidebar>
        <div className="component-padding MainContent">
          <h2>{this.props.componentId}</h2>
          <hr/>
          <div className="component-container">
            <h2>{this.props.componentId + " example"}</h2>
            <div id="component-display">
              <this.component/>
            </div>
          </div>
          <h2>{"Properties"}</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
          <hr/>
          <h2>{"Documentation"}</h2>
          <hr/>
        </div>
      </main>
    );
  }
}

export default AEMPreview;
