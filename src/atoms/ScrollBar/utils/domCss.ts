import { addPxToStyle } from './addPxToStyles';
import { prefixStyle } from './prefixStyle';
import { toCamelCase } from './toCamelCase';

const cache:Record<string, any> = { 'float': 'cssFloat' };

function detect ({ cssProp }:{ cssProp: string }) {
    var camel = toCamelCase(cssProp);
    var result = prefixStyle(camel);
    cache[camel] = cache[cssProp] = cache[result] = result;
    return result;
}

function style({
    element,
    property,
    value
}:{
    element: any,
    property: string,
    value?: any,
}) {
    let camel = cache[property];
    if (typeof camel === 'undefined') {
        camel = detect({ cssProp: property });
    }

    // may be false if CSS prop is unsupported
    if (camel) {
        if (value === undefined) {
            return element.style[camel];
        }

        element.style[camel] = addPxToStyle(camel, value);
    }
};

function each({ element, properties }:{
    element: any,
    properties: any,
}) {
    for (var k in properties) {
        if (properties.hasOwnProperty(k)) {
            style({
                element: element,
                property: k,
                value: properties[k]
            });
        }
    }
};

export function setCSS(...args:any[]) {
    if (args.length === 2) {
        if (typeof args[1] === 'string') {
            args[0].style.cssText = args[1];
        } else {
            each({
                element: args[0],
                properties: args[1],
            });
        }
    } else {
        style({
            element: args[0],
            property: args[1],
            value: args[2],
        });
    }
}

export function get ({
    element,
    properties
}:{ element: any,
    properties: any
}) {
    if (Array.isArray(properties)) {
        return properties.reduce(function (obj, prop) {
            obj[prop] = style({
                element,
                property: prop || ''
            });
            return obj;
        }, {});
    } else {
        return style({
            element,
            property: properties || '',
        });
    }
};
