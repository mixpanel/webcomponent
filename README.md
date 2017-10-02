# webcomponent

Lightweight utilities for constructing [Web Components](http://webcomponents.org/)

## Installation

Install via `npm`, for packaging with a bundler such as `Webpack` or `Browserify`:

    npm install --save webcomponent

If your target environment does not have native support for Web Components, you should include a separate polyfill such as [webcomponents.js](https://github.com/WebComponents/webcomponentsjs).

## Usage

Register web components by extending the `WebComponent` class instead of `HTMLElement`:

```javascript
import WebComponent from 'webcomponent';
class MyWidget extends WebComponent {
  connectedCallback() {
    // ...
  }

  get myprop() {
    // ...
  }
  // etc
}
customElements.define('my-widget', MyWidget);
```

`WebComponent` is a thin wrapper around `HTMLElement` which
- works out-of-the-box in Safari (see Babel issue ["Can't extend HTMLElement in Safari"](https://phabricator.babeljs.io/T1548))
- works out-of-the-box with Babel 6's class inheritance, without the need for extra plugins (see Babel issue ["Native extends breaks HTMLELement, Array, and others"](https://github.com/babel/babel/issues/4480))
- provides some extra helper methods next to the standard [Element API](https://developer.mozilla.org/en-US/docs/Web/API/Element)

#### Built-in helper methods:

`getJSONAttribute(attrName [, errorHandler])`: parse an attribute which has been serialized as JSON, e.g.,
```html
<my-widget data-magic-numbers="[1,2,3]"></my-widget>
```
```javascript
this.getJSONAttribute('data-magic-numbers') // [1, 2, 3]
```
If no `errorHandler` is passed, JSON-parsing errors will result in `null` being returned.

`isAttributeEnabled(attrName)`: check whether a boolean-like attribute is 'enabled', taking into account usages such as:
```html
<my-widget awesome="true">     <!-- enabled -->
<my-widget awesome>            <!-- enabled -->
<my-widget awesome="awesome">  <!-- enabled -->
<my-widget awesome="false">    <!-- disabled -->
<my-widget>                    <!-- disabled -->
```

## Development

Install dependencies: `npm install`

Run local demo:
- `cd demo`
- `npm install`
- `npm start`
- Visit [http://localhost:8080/](http://localhost:8080/)

## Running tests

Browser tests run with Selenium through [web-component-tester](https://github.com/Polymer/web-component-tester).

#### Run with locally installed browsers
`npm test`

#### Tunnel to [Sauce Labs](https://saucelabs.com/)
`npm run build-test && npm run test-browser-sauce`

Set credentials with environment variables `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY`. The default browser/OS matrix is defined in `wct.conf.json`.

## License

MIT
