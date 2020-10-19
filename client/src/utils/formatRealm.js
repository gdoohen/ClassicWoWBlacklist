import capitalize from 'lodash/capitalize';

export const capitalizeRealm = (realm) => {
    if (!realm.includes(' ')) {
        return capitalize(realm);
    } else {
        const words = realm.split(' ');
        let formattedWords = [];

        words.forEach(word => {
            formattedWords.push(capitalize(word));
        });

        const formattedRealm = formattedWords.join(" ");
        return formattedRealm;
    }
};