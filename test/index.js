import WebComponent from '../lib';

customElements.define(`test-widget`, class TestWidget extends WebComponent {
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
});

describe(`WebComponent instance`, function() {
  let el;

  beforeEach(function() {
    document.body.innerHTML = ``;
    el = document.createElement(`test-widget`);
  });

  it(`supports custom constructors`, function() {
    expect(el.constructed).to.be.ok;
  });
});
