import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import './Preview.sass';

import COMPONENTS from '../../app/components';
import DEMOS from '../../app/demos';

const IFRAME_COMPONENTS = { ...COMPONENTS, ...DEMOS };

const ASSET_PATH = 'http://localhost:5000/js';

const iframe = componentId => {

  const Component = IFRAME_COMPONENTS[componentId] || null;
  const serverComponent = ReactDOMServer.renderToStaticMarkup(
    Component ? <Component /> : <h3>Component not found.</h3>
  );

  let markup = `
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <!-- Styles -->
      <link href="http://localhost:5000/css/style.css" rel="stylesheet"></link>

      <!-- Dependencies -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react-dom.js"></script>
      <script src="https://unpkg.com/prop-types/prop-types.js"></script>
      <script src="${ ASSET_PATH }/${ componentId }.js"></script>
    </head>

    <body>
      <!-- React Root -->
      <div id="root">${ serverComponent }</div>

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

  markup = encodeURI(markup);

  return <iframe src={`data:text/html;charset=utf-8,${ markup }`} />;
};

const Preview = ({ componentId }) => (
  <div className='Preview'>
    {iframe(componentId)}
  </div>
);

Preview.PropTypes = {
  componentId: PropTypes.string.isRequired
};

export default Preview;
