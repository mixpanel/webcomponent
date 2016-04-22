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
  attachedCallback() {
    // ...
  }

  get myattr() {
    // ...
  }
  // etc
}
document.registerElement('my-widget', MyWidget);
```

`WebComponent` is a thin wrapper around `HTMLElement` which
- works out-of-the-box in Safari (see Babel issue ["Can't extend HTMLElement in Safari"](https://phabricator.babeljs.io/T1548))
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

## License

MIT
