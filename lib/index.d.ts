// Type definitions for webcomponent 1.0.0
// Project: webcomponent
// Definitions by: Mixpanel (https://mixpanel.com)

declare class CustomElement extends HTMLElement {
    /**
     * Custom Elements v0 spec
     */
    /**
     * Called when an instance of the Component is attached to the DOM.
     */
    attachedCallback(): void;
    /**
     * Called when an instance of the Component is created.
     */
    createdCallback(): void;
    /**
     * Called when an instance of the Component is detached from the DOM.
     */
    detachedCallback(): void;
    /**
     * Called when an attribute is changed, appended, removed, or replaced on the Component.
     */
    attributeChangedCallback(attributeName: string, oldValue?: any, newValue?: any);
}

export class WebComponent extends CustomElement {
    /**
     * Parse an attribute which has been serialized as JSON.
     * Pass an optional errorHandler in case JSON.parse() fails.
     */
    getJSONAttribute(attrName: string, errorHandler?: () => void): any;
    /**
     * Check whether a boolean attribute is 'enabled' in an element instance
     * taking into account string and empty attribute usages.
     */
    isAttributeEnabled(attrName: string): boolean;
}
