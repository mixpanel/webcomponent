// shim HTMLElement if necessary
// Safari breaks when attempting to inherit from HTMLElement
// Babel marked as wontfix because, well, it's not really
// a language issue: https://phabricator.babeljs.io/T1548
if (typeof HTMLElement !== 'function') {
  var _HTMLElement = function() {};
  _HTMLElement.prototype = HTMLElement.prototype;
  HTMLElement = _HTMLElement;
}

// Babel 6's class inheritance does not play entirely well
// with HTMLElement (and other native classes), which shows up
// in the implementation of customElements.define()
// see https://github.com/babel/babel/issues/4480
// this patch is adapted from
// https://github.com/github/babel-plugin-transform-custom-element-classes/blob/f5067aa/lib/index.js#L4-L6
function ExtendableHTMLElement() { return Reflect.construct(HTMLElement, [], this.__proto__.constructor); };
Object.setPrototypeOf(ExtendableHTMLElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(ExtendableHTMLElement, HTMLElement);


// on to the main show!
// WebComponent = thin wrapper around HTMLElement with convenience methods
export default class WebComponent extends ExtendableHTMLElement {

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
  // <my-element myattr="true">    -> enabled
  // <my-element myattr>           -> enabled
  // <my-element myattr="myattr">  -> enabled
  // <my-element myattr="false">   -> disabled
  // <my-element>                  -> disabled
  isAttributeEnabled(attrName) {
    const attrVal = this.getAttribute(attrName);
    return typeof attrVal === 'string' &&
      ['', 'true', attrName.toLowerCase()].indexOf(attrVal.toLowerCase()) !== -1;
  }

}
