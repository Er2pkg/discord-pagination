const discord = require('discord.js'),
Base = discord.Base,
BaseManager = discord.BaseManager,
Page = require('./Page'),
PageManager = require('./PageManager')

/**
 * Pagination class
 *@class {DiscordPagination}
 */
class DiscordPagination {
constructor(Discord) {
Object.defineProperty(this, 'Pagination', {value: this})
Object.defineProperty(this, 'Page', {value: Page})
Object.defineProperty(this, 'PageManager', {value: PageManager})
//Discord integration
if(Discord) {
Discord.Pagination = this
Discord.Page = Page
Discord.PageManager = PageManager
}

require('fs')
.readdirSync(__dirname+'/funcs')
.filter(i=>!i.startsWith('-'))
.forEach(i=>require('./funcs/'+i)(this))
}

applyParams(func, k = true, ...params) {
if(!k)
return {...this.defaultParams[func], ...params[0]}
let p = {...this.defaultParams}[func],
pi = Object.keys(p)
params.forEach((i,d)=>!i?'':p[pi[d]]=i)
return p
}
}
module.exports = DiscordPagination