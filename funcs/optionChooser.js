const discord = require('discord.js')
/**
 *Choose an option
 *@param {message} msg Message from Discord client
 *@param {Array} content Content to choose
 *@param {Function(event, number)} [chooseHandler=this.defaultChooseHandler] ChooseHandler
 *@param {Boolean} [deletee=true] Delete a message?
 *@param {Number} [atts=3] Attempts
 *@param {Number} [time=120000] Message collector time
 *@param {Number} [timeout=2000] Message delete timeout
 *@returns {Promise} Promise array with the number and message
 */
module.exports = ths => {
ths.optionChooser = (opts, ...params) =>
new Promise(async res => {
opts = ths.applyParams('optionChooser', (params.length>0 || opts.client), opts, ...params)
const message = await opts.msg.channel.send(opts.chooseHandler('choose')+'\n'+opts.content.map((i,d)=>(d+1)+'. '+i).join('\n')).catch(() => null)
let i=1,
options = opts.content.length,
collector = new discord.MessageCollector(opts.msg.channel, a => a.author.id == opts.msg.author.id, { time: opts.time })
collector.on('collect', msge => {
let num = parseInt(msge.content.slice(0, options.length))
if(!isNaN(num)&&num>0&&num<=options) {
message.edit(opts.chooseHandler('choosed', num))
if(opts.deletee) message.delete({timeout: opts.timeout})
collector.stop()
return res([num, message])
}
else if(i!==atts) i++
else {
message.edit(opts.chooseHandler('error'))
if(opts.deletee) message.delete({timeout: opts.timeout})
collector.stop()
return res([1, message])
}})})
}