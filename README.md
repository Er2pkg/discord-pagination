# discord-pagination

This is a simple module for discord.js v.12 where you can working with pages

Init: `const Pagination = new (require('discord-pagination'))(Discord) //Sets vars to constant and Discord library`

## Example

```js
/* Full usage
//Old style (for default value, use undefined)
Pagination.showPage(arrayContent, page, onOneElements)
Pagination.pagesArray(arrayContent, onOneElements)
Pagination.message(message, messageRender, arrayContent, onOneElements, page, time, pageButtons, loop, removeEmojiAtEnd)
Pagination.optionChooser(message, arrayContent, chooseHandler, delete, atts, time, timeout)

//New style (for default value, remove object element)
Pagination.showPage({
content: arrayContent,
page: page,
onOne: onOneElements
})
Pagination.pagesArray({
content: arrayContent,
onOne: onOneElements
})
Pagination.message({
msg: message,
render: messageRender,
content: arrayContent,
onOne: onOneElements,
page: page,
time: time,
pageButtons: pageButtons,
loop: loop,
remojiend: removeEmojiAtEnd
})
Pagination.optionChooser({
msg: message,
content: arrayContent,
chooseHandler: chooseHandler,
deletee: delete,
atts: attempts,
time: time,
timeout: timeout
})
*/

const Discord = require('discord.js'),
client = new Discord.Client,
testCon = [
'a', 'b', 'c', 'd', 'e', 'f',
'g', 'h', 'i', 'j', 'k', 'l',
'm', 'n', 'o', 'p', 'q', 'r',
's', 't', 'u', 'v', 'w', 'x',
'y', 'z'
],
testRen = page => `Test!\nPage: ${page.page}/${page.totalPages}\n${page.content.join('\n')}`,
testCb = ([num, msg]) => msg.edit(`You choosed: ${testCon[num-1]}`)
new (require('discord-pagination'))(Discord)

client.on('message', message => {
/*
Commands:
!test1 - testing showing page 1 with 6 elements
!test2 - testing message with 6 elements
!test3 - testing option chooser
*/
if(message.content.startsWith('!test')) {
message.test = message.content.split('!test')[1]
if(message.test == '1')
message.channel.send(Discord.Pagination.showPage({
content: testCon,
page: 1,
onOne: 6
}).join('\n'))
if(message.test == '2')
Discord.Pagination.message({
msg: message,
render: testRen,
content: testCon,
onOne: 6
})
if(message.test == '3')
Discord.Pagination.optionChooser({
msg: message,
content: Discord.Pagination.showPage(testCon, 1, 6),
deletee: false
}).then(testCb)
}
})
client.login('TOKEN')
```

### Customize

```js
Discord.Pagination.message({
msg: message,
pageButtons: [...]
})
/* [...] is an array
Must be like this:
[{e: '◀', act: 'prev'}, {e: '⏹', act: 'stop'}, {e: '▶', act: 'next'}]
e - emoji
act - action
action can be a string (prev, next, stop (delete)) or function to create your own actions
if function, parametrs is (message, reaction, pages, page, collector, loop, options)
*/
```