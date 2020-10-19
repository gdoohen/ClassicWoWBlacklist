export const formatProperName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

export const stringIsContainedInArray = (arr, str) => {
    let isContained = false;
    
    arr.forEach(element => {
        if (str.includes(element)) isContained = true;
    });

    return isContained;
};