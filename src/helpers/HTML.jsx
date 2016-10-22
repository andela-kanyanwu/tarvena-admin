import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
  };
  render() {
    const { assets, component} = this.props;
    const content = component ? ReactDOM.renderToString(component) : 'Yolo';
    console.log(content, 'our content')

    return (
      <html lang="en-us">
        <head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media="screen, projection"
              rel="stylesheet" type="text/css" charSet="UTF-8"
            />
          )}

          {/* (will be present only in development mode) */}
          {/* outputs a <style/> tag with all bootstrap styles + App.scss + it could be CurrentPage.scss. */}
          {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
          {/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
        {Object.keys(assets.javascript).map((script, i) =>
          <script src={assets.javascript[script]} key={i} />
        )}
        </body>
      </html>
    );
  }
}
