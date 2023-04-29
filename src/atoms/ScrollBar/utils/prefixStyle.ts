let div = null;
const prefixes = [ 'Webkit', 'Moz', 'O', 'ms' ];

export const prefixStyle = (prop:any) => {
    div= document.createElement('div');

    var style = div?.style;

    // prop exists without prefix
    if (prop in style) {
        return prop;
    }

    // borderRadius -> BorderRadius
    var titleCase = prop.charAt(0).toUpperCase() + prop.slice(1);

    // find the vendor-prefixed prop
    for (var i = prefixes.length; i >= 0; i--) {
        var name = prefixes[i] + titleCase;
        // e.g. WebkitBorderRadius or webkitBorderRadius
        if (name in style) {
            return name;
        }
    }

    return false;
};
