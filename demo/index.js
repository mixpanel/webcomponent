import WebComponent from '../build';

class MyWidget extends WebComponent {
  constructor() {
    super();
    console.log(`Constructing my-widget:`, this);
  }

  connectedCallback() {
    this.innerHTML = `my-widget has entered the DOM`;
  }

  static get observedAttributes() {
    return [`foo`];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attr ${name} changed to ${newValue}`);
    console.log(`JSON value:`, this.getJSONAttribute(name));
  }
}

customElements.define(`my-widget`, MyWidget);
