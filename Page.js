const discord = require('discord.js'),
Base = discord.Base

/**
 * Page class
 *@returns {Page}
 */
class Page extends Base {
constructor(client, data, pg) {
super(client)
Object.defineProperty(this, 'Pagination', {value: pg.Pagination})
Object.defineProperty(this, 'Page', {value: this})
Object.defineProperty(this, 'PageManager', {value: pg})
this.page = data.page
this.content = data.content
}}
module.exports = Page