const discord = require('discord.js'),
BaseManager = discord.BaseManager

/**
 *PageManager
 *@returns {PageManager}
 */
class PageManager extends BaseManager {
constructor(pages, client, pg) {
super(client, pages, require('./Page'))
Object.defineProperty(this, 'Pagination', {value: pg})
Object.defineProperty(this, 'Page', {value: this.holds})
Object.defineProperty(this, 'PageManager', {value: this})
}
add(page) {return super.add(page, true, {id: page.page, extras: [this]})}
get(page) {
let c = this.cache.get(page)
if(c) c.totalPages = this.cache.size
return c
}
get size(){return this.cache.size}
}
module.exports = PageManager