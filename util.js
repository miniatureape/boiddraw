/**
 * Splits a css rgba string value into r,g,b and a components.
 */
function colorSplit(str) {
    let values = str.slice(
        str.indexOf( "(" ) + 1, 
        str.indexOf( ")" )
    );
    return values.split(",").map(Number);
}

/**
 * Combine r,g,b and/or a into a css rgb(a) value.
 */
function colorJoin(parts) {
    let str = parts.length > 3 ? "rgba(" : "rgb(";
    return str + parts.join(",") + ")";
}
