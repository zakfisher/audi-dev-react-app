import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import './AEMPreview.sass';
import COMPONENTS from '../../app/components';
import DEMOS from '../../app/demos';
import {togglePreview, checkPreview} from '../../helpers/preview';

const IFRAME_COMPONENTS = {
  ...COMPONENTS,
  ...DEMOS
};

class AEMPreview extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired
  };

  get html() {
    const {componentId} = this.props;
    const head = `
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Styles -->
        <link href="http://localhost:5000/css/style.css" rel="stylesheet"></link>

        <!-- Dependencies -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react-dom.js"></script>
        <script src="https://unpkg.com/prop-types/prop-types.js"></script>
        <script src="http://localhost:5000/js/${componentId}.js"></script>
      </head>
    `;

    const body = `
      <body>
        <div id="root">${this.serverComponent}</div>
        <script type="text/javascript">
          ReactDOM.render(
            React.createElement(
              window.AudiReact.${componentId}
            ),
            document.querySelector('#root')
          );
        </script>
      </body>
    `;

    return `${head}${body}`;
  }

  get component() {
    const {componentId} = this.props;
    return IFRAME_COMPONENTS[componentId] || null;
  }

  get serverComponent() {
    return ReactDOMServer.renderToStaticMarkup(this.component ? <this.component/> : <h3>Component not found.</h3>);
  }

  checkActive() {
    return checkPreview() ? " active" : "";
  }

  render() {
    const {name} = this.props;
    let active = this.checkActive();
    return (
      <main className={`${name} AEMPreview` + active}>
        <div
          onClick={() => {
          togglePreview();
        }}
          className={'control-bar' + active}>
          {'AEM Preview'}
        </div>
        <iframe
          className={active}
          src={`data:text/html;charset=utf-8,${encodeURI(this.html)}`}/>
      </main>
    );
  }
}

export default AEMPreview;
