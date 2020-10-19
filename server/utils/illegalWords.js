import { stringIsContainedInArray } from './stringFormatting';

export const isWordIllegal = str => {
    return stringIsContainedInArray(ILLEGAL_WORDS, str);
};

export const ILLEGAL_WORDS = []; //TODO: Put bad words here
