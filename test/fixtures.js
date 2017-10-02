import WebComponent from '../lib';

export default class TestWidget extends WebComponent {
  constructor() {
    super();
    this.constructed = true;
  }

  connectedCallback() {
    this.innerHTML = `Hello world`;
    this.connected = true;
  }

  static get observedAttributes() {
    return [`foo`];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.lastAttrChanged = name;
  }
}
