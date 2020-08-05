/**
 *Show a page
 *@param {Array} content Unfiltered content
 *@param {Number} [page=1] Page
 *@param {Number} [onOne=15] Elements on 1 page
 *@returns {Array} Page array
 */
module.exports = ths => {
ths.showPage = (opts, ...params) => {
opts = ths.applyParams('showPage', (params.length>0 || Array.isArray(opts)), opts, ...params)
return opts.content.slice(((opts.page - 1) * opts.onOne), (opts.onOne) + ((opts.page - 1) * opts.onOne))
}
}