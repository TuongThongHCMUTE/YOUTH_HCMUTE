export const replaceJSX = (str, find, replace) => {
    let parts = str.split(find);
    for(let i = 0, result = []; i < parts.length; i++) {
        result.push(parts[i]);
        result.push(replace);
    }
    return result;
}