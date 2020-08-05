/**
 *Pages in array with objects
 *@param {Array} content Unfiltered content
 *@param {Number} [onOne=15] Elements on 1 page
 *@returns {Array} Pages array with objects
 */
module.exports = ths => {
ths.pagesArray = (opts, ...params) => {
opts = ths.applyParams('pagesArray', (params.length>0 || Array.isArray(opts)), opts, ...params)
let pages = []
for(let i of opts.content) {
pages.push({
page: pages.length+1,
content: ths.showPage(opts.content, pages.length+1, opts.onOne),
})
if(pages[pages.length-1].content.length<1)
pages.splice(-1, 1)
}
return pages
}
}