import includes from 'lodash/includes';

export const stringIncludesSomeElement = (str, arr) => {
    let stringIncludes = false;
    arr.forEach(i => {
        if (includes(str, i)) stringIncludes = true;
    });
    return stringIncludes;
};