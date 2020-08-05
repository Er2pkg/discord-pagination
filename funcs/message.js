/**
 *Create a message and start reaction collector
 *@param {message} msg Message from Discord client
 *@param {Function(page)} render Function to render message
 *@param {Array} content Unfiltered content
 *@param {Number} [onOne=15] Elements on 1 page
 *@param {Number} [page=1] Start page
 *@param {Number} [time=300000] Time when over reaction collector in ms
 *@param {Array} [pageButtons=this.defaultPageButtons] Page buttons
 *@param {Boolean} [loop=true] Loop the pages?
 *@param {Boolean} [remojiend=true] Remove emojis at end of the collector?
 */
module.exports = ths => {
ths.message = async (opts, ...params) => {
opts = ths.applyParams('message', (params.length>0 || opts.client), opts, ...params)
let
pages = new ths.PageManager(ths.pagesArray(opts.content, opts.onOne), opts.msg.client, ths)
const message = await opts.msg.channel.send(opts.render(pages.get(opts.page))).catch(() => null)
opts.pageButtons = opts.pageButtons.filter(i => pages.size==1?(['delete', 'stop'].includes(i.act)):i)
opts.pageButtons.forEach(async i => await message.react(i.e))
const collector = message.createReactionCollector((r, user) => opts.pageButtons.find(i => i.e == (r.emoji.id || r.emoji.name)) && user.id == opts.msg.author.id, {time: opts.time})
collector.on('end', () => {
if(!message || (message && message.deleted)) return
if(!opts.remojiend) return
message.reactions.cache
.filter(i=>opts.pageButtons.find(x=>x.e==(i.emoji.id||i.emoji.name)))
.forEach(i=>i.remove().catch(()=>null))
})
collector.on('collect', r => {
let act = opts.pageButtons.find(i => i.e == (r.emoji.id || r.emoji.name)).act

switch(act) {
default:
act(message, r, pages, opts.page, collector, opts.loop, opts)
break

case 'stop':
case 'delete': message.delete().then(()=>collector.stop()); break

case 'prev':
if(opts.loop) {
if(opts.page == 1)
opts.page = pages.size
else opts.page--
} else
if(opts.page == 1) opts.page = 1; else opts.page--
break

case 'next':
if(opts.loop) {
opts.page++
if(opts.page > pages.size)
opts.page = 1
} else if(opts.page<pages.size) opts.page++
break

}
message.edit(opts.render(pages.get(opts.page))).catch(()=>null)
})
}
}