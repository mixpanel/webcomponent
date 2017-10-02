import TestWidget from './fixtures';

customElements.define(`test-widget`, TestWidget);

describe(`WebComponent instance`, function() {
  let el;

  beforeEach(function() {
    document.body.innerHTML = ``;
    el = document.createElement(`test-widget`);
  });

  describe(`Custom Elements spec behavior`, function() {
    it(`supports custom constructors`, function() {
      expect(el.constructed).to.be.ok;
    });

    it(`calls connectedCallback when attached to DOM`, function() {
      expect(el.connected).not.to.be.ok;
      expect(el.innerHTML).to.be.empty;
      document.body.appendChild(el);
      expect(el.connected).to.be.ok;
      expect(el.innerHTML).to.be.equal(`Hello world`);
    });

    it(`calls disconnectedCallback when removed from DOM`, function() {
      expect(el.disconnected).not.to.be.ok;
      document.body.appendChild(el);
      expect(el.disconnected).not.to.be.ok;
      document.body.innerHTML = ``;
      expect(el.disconnected).to.be.ok;
    });

    it(`observes attribute changes`, function() {
      expect(el.lastAttrChanged).not.to.be.ok;
      el.setAttribute(`foo`, `bar`);
      expect(el.lastAttrChanged).to.equal(`foo`);
      expect(el.getAttribute(`foo`)).to.equal(`bar`);
    });

    it(`does not observe changes to undeclared attributes`, function() {
      expect(el.lastAttrChanged).not.to.be.ok;
      el.setAttribute(`moo`, `baz`);
      expect(el.lastAttrChanged).not.to.be.ok;
      expect(el.getAttribute(`moo`)).to.equal(`baz`);
    });
  });
});
