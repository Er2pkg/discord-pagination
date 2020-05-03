# discord-pagination

This is a simple module for discord.js v.12 when can working with pages

## Example

```js
/* Full usage
pagination.showPage(content, page, onOneElements)
pagination.message(message, messagerender, arraycontent, onOneElements, page, time, pageButtons, loop)
*/

const Discord = require('discord.js'),
client = new Discord.Client(),
testCb = page => `Test!\nPage: ${page.page}/${page.totalPages}\n${page.content.join('\n')}`,
testCon = [
'a', 'b', 'c', 'd', 'e', 'f',
'g', 'h', 'i', 'j', 'k', 'l',
'm', 'n', 'o', 'p', 'q', 'r',
's', 't', 'u', 'v', 'w', 'x',
'y', 'z'
]
Discord.pagination = require('discord-pagination')

client.on('message', message => {
if(message.startsWith('!test'))
Discord.pagination.message(message, testCb, testCon, 6)
})
client.login('TOKEN')
```