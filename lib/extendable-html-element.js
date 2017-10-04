/**
 * Various shims and patches for HTMLElement to work around problems
 * of inheritance in different browsers and transpilation configurations.
 * @module extendable-html-element
 */

let ExtendableHTMLElement;

// shim HTMLElement if necessary
// Safari breaks when attempting to inherit from HTMLElement
// Babel marked as wontfix because, well, it's not really
// a language issue: https://phabricator.babeljs.io/T1548
if (typeof HTMLElement !== 'function') {
  var _HTMLElement = function() {};
  _HTMLElement.prototype = HTMLElement.prototype;
  HTMLElement = _HTMLElement;
}

if (typeof Reflect === 'undefined') {

  // fix for Safari 9 "HTMLElementConstructor is not a constructor"
  // adapted from https://github.com/webcomponents/webcomponentsjs/issues/755#issuecomment-332354121
  function setProto(A, B) {
    A.prototype = Object.create(B.prototype, {
      constructor: {
        configurable: true,
        writable    : true,
        value       : A,
      },
    });
  }
  ExtendableHTMLElement = function(self) {
    self = HTMLElement.call(self || this);
    return self;
  }
  setProto(ExtendableHTMLElement, HTMLElement);

} else {

  // Babel 6's class inheritance does not play entirely well
  // with HTMLElement (and other native classes), which shows up
  // in the implementation of customElements.define()
  // see https://github.com/babel/babel/issues/4480
  // this patch is adapted from
  // https://github.com/github/babel-plugin-transform-custom-element-classes/blob/f5067aa/lib/index.js#L4-L6
  ExtendableHTMLElement = function() {
    return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
  };
  Object.setPrototypeOf(ExtendableHTMLElement.prototype, HTMLElement.prototype);
  Object.setPrototypeOf(ExtendableHTMLElement, HTMLElement);

}

export default ExtendableHTMLElement;
