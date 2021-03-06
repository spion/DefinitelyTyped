// Type definitions for ftdomdelegate
// Project: https://github.com/ftlabs/ftdomdelegate
// Definitions by: Christian Holm Nielsen
// Definitions: https://github.com/borisyankov/DefinitelyTyped


declare class Delegate
{
    constructor(element: HTMLElement);

    on(eventType: string, selector: string, callback : (event : any) => any) : void;

    on(eventType: string, callback:(event : any) => any) : void;
}