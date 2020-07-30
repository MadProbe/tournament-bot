import common_tags from "common-tags";
export const trimResultTransformer = common_tags.trimResultTransformer;
export const stripIndentTransformer = common_tags.stripIndentTransformer;
export const replaceResultTransformer = common_tags.replaceResultTransformer;
export const replaceSubstitutionTransformer = common_tags.replaceSubstitutionTransformer;
export const replaceStringTransformer = common_tags.replaceStringTransformer;
export const inlineArrayTransformer = common_tags.inlineArrayTransformer;
export const splitStringTransformer = common_tags.splitStringTransformer;
export const removeNonPrintingValuesTransformer = common_tags.removeNonPrintingValuesTransformer;
export const commaLists = common_tags.commaLists;
export const commaListsAnd = common_tags.commaListsAnd;
export const commaListsOr = common_tags.commaListsOr;
export const html = common_tags.html;
export const codeBlock = common_tags.codeBlock;
export const source = common_tags.source;
export const safeHtml = common_tags.safeHtml;
export const oneLine = common_tags.oneLine;
export const oneLineTrim = common_tags.oneLineTrim;
export const oneLineCommaLists = common_tags.oneLineCommaLists;
export const oneLineCommaListsOr = common_tags.oneLineCommaListsOr;
export const oneLineCommaListsAnd = common_tags.oneLineCommaListsAnd;
export const inlineLists = common_tags.inlineLists;
export const oneLineInlineLists = common_tags.oneLineInlineLists;
export const stripIndent = common_tags.stripIndent;
export const stripIndents = common_tags.stripIndents;
/**
 * `
exports.trimResultTransformer = _trimResultTransformer3.default;
exports.stripIndentTransformer = _stripIndentTransformer3.default;
exports.replaceResultTransformer = _replaceResultTransformer3.default;
exports.replaceSubstitutionTransformer = _replaceSubstitutionTransformer3.default;
exports.replaceStringTransformer = _replaceStringTransformer3.default;
exports.inlineArrayTransformer = _inlineArrayTransformer3.default;
exports.splitStringTransformer = _splitStringTransformer3.default;
exports.removeNonPrintingValuesTransformer = _removeNonPrintingValuesTransformer3.default;

// tags

exports.commaLists = _commaLists3.default;
exports.commaListsAnd = _commaListsAnd3.default;
exports.commaListsOr = _commaListsOr3.default;
exports.html = _html3.default;
exports.codeBlock = _codeBlock3.default;
exports.source = _source3.default;
exports.safeHtml = _safeHtml3.default;
exports.oneLine = _oneLine3.default;
exports.oneLineTrim = _oneLineTrim3.default;
exports.oneLineCommaLists = _oneLineCommaLists3.default;
exports.oneLineCommaListsOr = _oneLineCommaListsOr3.default;
exports.oneLineCommaListsAnd = _oneLineCommaListsAnd3.default;
exports.inlineLists = _inlineLists3.default;
exports.oneLineInlineLists = _oneLineInlineLists3.default;
exports.stripIndent = _stripIndent3.default;
exports.stripIndents = _stripIndents3.default;
`.match(/exports\.(\w+)/g).map(x => x.replace(/exports./, '')).map(x => `export const ${x} = common_tags.${x};\n`).join('')
 */
