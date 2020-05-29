// Type definitions for webcomponent 1.2.0
// Project: webcomponent
// Definitions by: Mixpanel (https://mixpanel.com)

// Custom Elements v1 spec
export class CustomElement extends HTMLElement {
    static readonly observedAttributes: Array<string>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: null|string, newValue: null|string): void;
    adoptedCallback?(): void;
}

export default class WebComponent extends CustomElement {
    /**
     * Parse an attribute which has been serialized as JSON.
     * Pass an optional errorHandler in case JSON.parse() fails.
     */
    getJSONAttribute(attrName: string, errorHandler?: () => void): any;
    /**
     * Parse number attributes, returning null if the string attribute
     * cannot be successfully parsed.
     */
    getNumberAttribute(attrName: string): number|null;
    /**
     * Check whether a boolean attribute is 'enabled' in an element instance
     * taking into account string and empty attribute usages.
     */
    isAttributeEnabled(attrName: string): boolean;
}
