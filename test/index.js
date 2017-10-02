import TestWidget from './fixtures';

customElements.define(`test-widget`, TestWidget);

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
