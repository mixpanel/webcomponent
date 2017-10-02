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

  describe(`lib-specific convenience methods`, function() {
    describe(`getJSONAttribute()`, function() {
      it(`parses attr strings as JSON`, function() {
        el.setAttribute(`foo`, `5`);
        expect(el.getJSONAttribute(`foo`)).to.eql(5);

        el.setAttribute(`foo`, `"Hi"`);
        expect(el.getJSONAttribute(`foo`)).to.eql(`Hi`);

        el.setAttribute(`foo`, `{}`);
        expect(el.getJSONAttribute(`foo`)).to.eql({});

        el.setAttribute(`foo`, `{"x": 42}`);
        expect(el.getJSONAttribute(`foo`)).to.eql({x: 42});
      });

      it(`defaults to null when parsing fails`, function() {
        el.setAttribute(`foo`, `{not valid JSON}`);
        expect(el.getJSONAttribute(`foo`)).to.be.null;
      });

      it(`supports custom error handlers`, function() {
        el.setAttribute(`foo`, `{not valid JSON}`);
        const reverseAttrName = attr => [...attr].reverse().join(``);
        expect(el.getJSONAttribute(`foo`, reverseAttrName)).to.equal(`oof`);
      });

      it(`only calls custom error handlers when parsing fails`, function() {
        el.setAttribute(`foo`, `5`);
        expect(el.getJSONAttribute(`foo`, () => `bar`)).to.equal(5);
        el.setAttribute(`foo`, `{not valid JSON}`);
        expect(el.getJSONAttribute(`foo`, () => `bar`)).to.equal(`bar`);
      });

      it(`passes errors to the handler`, function() {
        el.setAttribute(`foo`, `{not valid JSON}`);
        let error = ``;
        const handler = (attr, err) => {
          error = err;
          return `hello`;
        };
        expect(el.getJSONAttribute(`foo`, handler)).to.equal(`hello`);
        expect(error.message).not.to.be.empty;
      });
    });

    describe(`isAttributeEnabled()`, function() {
      it(`interprets "true" as enabled`, function() {
        el.setAttribute(`foo`, `true`);
        expect(el.isAttributeEnabled(`foo`)).to.be.ok;
      });

      it(`interprets "" (<my-element myattr>) as enabled`, function() {
        el.setAttribute(`foo`, ``);
        expect(el.isAttributeEnabled(`foo`)).to.be.ok;
      });

      it(`interprets name-and-value-match (<my-element foo="foo">) as enabled`, function() {
        el.setAttribute(`foo`, `foo`);
        expect(el.isAttributeEnabled(`foo`)).to.be.ok;
      });

      it(`interprets "false" as disabled`, function() {
        el.setAttribute(`foo`, `false`);
        expect(el.isAttributeEnabled(`foo`)).not.to.be.ok;
      });

      it(`interprets lack of attribute as disabled`, function() {
        expect(el.isAttributeEnabled(`foo`)).not.to.be.ok;
      });

      it(`interprets arbitrary values as disabled`, function() {
        el.setAttribute(`foo`, `random text`);
        expect(el.isAttributeEnabled(`foo`)).not.to.be.ok;

        el.setAttribute(`foo`, `1`);
        expect(el.isAttributeEnabled(`foo`)).not.to.be.ok;
      });

      it(`is case-insensitive`, function() {
        el.setAttribute(`foo`, `TrUe`);
        expect(el.isAttributeEnabled(`foo`)).to.be.ok;

        el.setAttribute(`foo`, `FALSE`);
        expect(el.isAttributeEnabled(`foo`)).not.to.be.ok;
      });
    });
  });
});
