// shim HTMLElement if necessary
// Safari breaks when attempting to inherit from HTMLElement
// Babel marked as wontfix because, well, it's not really
// a language issue: https://phabricator.babeljs.io/T1548
if (typeof HTMLElement !== 'function') {
  var _HTMLElement = function() {};
  _HTMLElement.prototype = HTMLElement.prototype;
  HTMLElement = _HTMLElement;
}

// thin wrapper around HTMLElement with convenience methods
export default class WebComponent extends HTMLElement {

  // parse an attribute which has been serialized as JSON
  // pass an optional errorHandler in case JSON.parse() fails
  getJSONAttribute(attrName, errorHandler=() => null) {
    try {
      return JSON.parse(this.getAttribute(attrName));
    } catch(e) {
      return errorHandler(attrName, e);
    }
  }

  // check whether a boolean attribute is 'enabled' in an element instance
  // taking into account usages such as:
  // <my-element myattr=true>    -> enabled
  // <my-element myattr>         -> enabled
  // <my-element myattr=false>   -> disabled
  // <my-element>                -> disabled
  isAttributeEnabled(attrName) {
    const attrVal = this.getAttribute(attrName);
    return typeof attrVal === 'string' && ['', 'true'].indexOf(attrVal.toLowerCase()) !== -1;
  }

}
