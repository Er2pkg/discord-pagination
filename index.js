const discord = require('discord.js'),
Base = discord.Base
BaseManager = discord.BaseManager

/**
 * Page class
 *@returns {Page}
 */
class Page extends Base {
constructor(a, data) {
super(a)
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
constructor(Discord) {
//Discord integration
if(Discord) {
Discord.Pagination = this
Discord.Page = Page
Discord.PageManager = PageManager
}

this.defaultChooserHandler = (e, n) => {
switch(e) {
case 'choose': return 'We found serveal options of content. Choose one of options'; break
case 'choosed': return 'You choosed: a'.replace('a', n); break
case 'error': return 'Error to find an option. Returns 1'; break
}}
this.defaultPageButtons = [{e: '◀', act: 'prev'}, {e: '⏹', act: 'delete'}, {e: '▶', act: 'next'}]
}

/**
 *Show a page
 *@param {Array} content Unfiltered content
 *@param {Number} [page=1] Page
 *@param {Number} [onOne=15] Elements on 1 page
 *@returns {Array} Page array
 */
showPage = (content, page = 1, onOne = 15) => content.slice(((page - 1) * onOne), (onOne) + ((page - 1) * onOne))

/**
 *Create a message and start reaction collector
 *@param {message} msg Message from Discord client
 *@param {Function(page)} mcontent Function to render message
 *@param {Array} content Unfiltered content
 *@param {Number} [onOne=15] Elements on 1 page
 *@param {Number} [page=1] Start page
 *@param {Number} [time=300000] Time when over reaction collector in ms
 *@param {Array} [pageButtons=this.defaultPageButtons] Page buttons
 *@param {Boolean} [loop=true] Loop the pages?
 */
message = async (msg, mcontent, content, onOne = 15, page = 1, time = 300000, pageButtons = this.defaultPageButtons, loop = true) => {
let pages = [], totalPages = Math.ceil(content.length/onOne)
if(page < 1 || page > totalPages) page = 1
for(let x=1;x<=totalPages;x++) pages.push({page: x, totalPages: totalPages, content: this.showPage(content, x, onOne)})
pages = new PageManager(pages)
const message = await msg.channel.send(mcontent(pages.get(page))).catch(() => null)
pageButtons = pageButtons.filter(i => totalPages==1?(i.act == 'delete'):i)
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
message.edit(mcontent(pages.get(page)))
}
if(act == 'next') {
if(loop) {
page++
if(page > totalPages) page = 1
} else if(page<totalPages) page++
message.edit(mcontent(pages.get(page)))
}
})
}
/**
 *Choose an option
 *@param {message} msg Message from Discord client
 *@param {Array} content Content to choose
 *@param {Function(event, number)} [chooseHandler=this.defaultChooseHandler] ChooseHandler
 *@param {Boolean} [deletee=true] Delete a message?
 *@param {Number} [atts=3] Attempts
 *@returns {Promise} Promise array with the number and message
 */
optionChooser = (msg, content, chooseHandler = this.defaultChooseHandler, deletee = true, atts = 3) =>
new Promise(async res => {
const message = await msg.channel.send(chooseHandler('choose')+'\n'+content.map((i,d)=>(d+1)+'. '+i).join('\n')).catch(() => null)
let i=1,
options = content.length,
collector = new discord.MessageCollector(msg.channel, a => a.author.id == msg.author.id, { time: 120000 })
collector.on('collect', msge => {
let num = parseInt(msge.content.slice(0, options.length))
if(('a'+num)!=='aNaN'&&num>0&&num<=options) {message.edit(chooseHandler('choosed', num)); if(deletee) message.delete({timeout: 2000}); collector.stop(); return res([num, message])}
else if(i!==atts) i++
else {
message.edit(chooseHandler('error'))
if(deletee) message.delete({timeout: 2000})
collector.stop()
return res([1, message])
}})})

}
module.exports = DiscordPagination