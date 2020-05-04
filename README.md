# discord-pagination

This is a simple module for discord.js v.12 where you can working with pages

Init: `new (require('discord-pagination'))(Discord)`

or `const pagination = new (require('discord-pagination))()`

## Example

```js
/* Full usage
pagination.showPage(content, page, onOneElements)
pagination.message(message, messageRender, arrayContent, onOneElements, page, time, pageButtons, loop)
pagination.optionChooser(message, arrayContent, chooseHandler, delete, atts)
*/

const Discord = require('discord.js'),
client = new Discord.Client(),
testCon = [
'a', 'b', 'c', 'd', 'e', 'f',
'g', 'h', 'i', 'j', 'k', 'l',
'm', 'n', 'o', 'p', 'q', 'r',
's', 't', 'u', 'v', 'w', 'x',
'y', 'z'
],
testCb = page => `Test!\nPage: ${page.page}/${page.totalPages}\n${page.content.join('\n')}`,
testCb2 = ([num, msg]) => msg.edit(`You choosed: ${testCon[num-1]}`)
new (require('discord-pagination'))(Discord)

client.on('message', message => {
if(message.content.startsWith('!test')) {
message.test = message.content.split('!test')[1]
if(message.test == '1')
message.channel.send(Discord.pagination.showPage(testCon, 1, 6).join('\n'))
if(message.test == '2')
Discord.pagination.message(message, testCb, testCon, 6)
if(message.test == '3')
Discord.pagination.optionChooser(message, Discord.pagination.showPage(testCon, 1, 6), false).then(testCb2)
}
})
client.login('TOKEN')
```

### Customize

```js
Discord.pagination.message(message, render, arrayContent, onOneElements, page, time, [...])
/* [...] is array
Must be like this:
[{e: '◀', act: 'prev'}, {e: '⏹', act: 'delete'}, {e: '▶', act: 'next'}]
e - emoji
act - action
action can be a string (prev, next, delete) or function to create your own actions
if function, parametrs is (message, reaction, pages, page, collector)
*/
```