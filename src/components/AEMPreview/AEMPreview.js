import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import './AEMPreview.sass';
import COMPONENTS from '../../audi/components';
import DEMOS from '../../audi/demos';

const IFRAME_COMPONENTS = { ...COMPONENTS, ...DEMOS };

class AEMPreview extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired
  };

  get html() {
    const head = `
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Styles -->
        <style type="text/css">${this.css}</style>
        <!--
        <link href="/path/to/compiled/core.css" rel="stylesheet"></link>
        <link href="/path/to/compiled/component.css" rel="stylesheet"></link>
        -->

        <!-- Dependencies -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react-dom.js"></script>
        <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
      </head>
    `;

    const body = `
      <body>
        <div id="root">${this.component}</div>

        <!--
        <script type="text/babel">
          const Component = ${this.IframeComponent};
          ReactDOM.render(
            <Component />,
            document.getElementById('root')
          );
        </script>
        -->
      </body>
    `;

    return `${head}${body}`;
  }

  get css() {
    return `
      html {
        background: white;
        height: 2000px;
      }
      * {
        color: black;
        font-family: arial;
        margin: 0;
        padding: 0;
      }
    `;
  }

  get component() {
    const { componentId } = this.props;
    const IframeComponent = this.IframeComponent = IFRAME_COMPONENTS[componentId] || null;
    return ReactDOMServer.renderToString(
      IframeComponent ? <IframeComponent /> : <h3>Component not found.</h3>
    );
  }

  render() {
    const { name } = this.props;
    return (
      <main className={`${name} AEMPreview`}>
        <div className='control-bar'>
          {'AEM Preview'}
        </div>
        <iframe src={`data:text/html;charset=utf-8,${encodeURI(this.html)}`} />
      </main>
    );
  }
}

export default AEMPreview;
