const Discord = require('discord.js'),
BaseManager = Discord.BaseManager

/**
 * Page class
 *@returns {Page}
 */
class Page {
constructor(a, data) {
this.page = data.page
this.content = data.content
this.totalPages = data.totalPages
}}

/**
 *PageManager
 *@returns {PageManager}
 */
class PageManager extends BaseManager {
constructor(pages) {
super(null, pages, Page)
}
add(page) {return super.add(page, true, {id: page.page})}
get(page) {return this.cache.get(page)}
}

/**
 * Pagination class
 *@class {DiscordPagination}
 */
class DiscordPagination {
constructor() {
this.pageButtons = [{e: '◀', act: 'prev'}, {e: '⏹', act: 'delete'}, {e: '▶', act: 'next'}]
}

/**
 *Show a page
 *@param {Array} content Unfiltered content
 *@param {Number} page Page
 *@param {Number} onOne Elements on 1 page
 *@returns {Array} Page array
 */
showPage = (content, page = 1, onOne = 15) => content.slice(((page - 1) * onOne), (onOne) + ((page - 1) * onOne))

/**
 *Create a message and start reaction collector
 *@param {message} msg Message from Discord client
 *@param {Function(page)} mcontent Function to render message
 *@param {Array} content Unfiltered content
 *@param {Number} onOne Elements on 1 page
 *@param {Number} page Start page
 *@param {Number} time Time when over reaction collector
 *@param {Array} pageButtons Page buttons
 *@param {Boolean} loop Loop the pages?
 */
message = async (msg, mcontent, content, onOne = 15, page = 1, time = 300000, pageButtons = this.pageButtons, loop = true) => {
let pages = [], totalPages = Math.ceil(content.length/onOne)
if(page < 1 || page > totalPages) page = 1
for(let x=1;x<=totalPages;x++) pages.push({page: x, totalPages: totalPages, content: this.showPage(content, x, onOne)})
pages = new PageManager(pages)
const message = await msg.channel.send(mcontent(pages.get(page))).catch(() => null)
pageButtons.forEach(async i => await message.react(i.e))
const collector = message.createReactionCollector((r, user) => pageButtons.find(i => i.e == r.emoji.name) && user.id == msg.author.id, {time: time})
collector.on('collect', r => {
let act = pageButtons.find(i => i.e == r.emoji.name).act
if(typeof act == 'function') return act(message, r, pages, page, collector)

if(act == 'delete') {collector.stop(); message.delete()}
if(act == 'prev') {
if(loop) {
if(page == 1) page = totalPages
else page--
} else if(page == 1) page = 1; else page--
if(typeof mcontent == 'function') message.edit(mcontent(pages.get(page)))
}
if(act == 'next') {
if(loop) {
page++
if(page > totalPages) page = 1
} else if(page<totalPages) page++
if(typeof mcontent == 'function') message.edit(mcontent(pages.get(page)))
}
})
}
}
module.exports = new DiscordPagination()