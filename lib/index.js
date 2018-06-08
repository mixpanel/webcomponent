import ExtendableHTMLElement from './extendable-html-element';

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

  // Parse number attributes. Examples:
  // null      -> null
  // ""        -> null
  // "asd"     -> null
  // "123asd"  -> null
  // "123"     -> 123
  // "123.45"  -> 123.45
  getNumberAttribute(attrName) {
    const attrVal = this.getAttribute(attrName);
    if (!attrVal) {
      return null;
    } else {
      const num = Number(attrVal);
      return Number.isNaN(num) ? null : num;
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
