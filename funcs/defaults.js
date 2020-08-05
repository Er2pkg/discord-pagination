module.exports = ths => {
  ths.defaultChooseHandler = (e, n) => {
    switch(e) {
      case 'choose': return 'We found serveal options of content. Choose one of options'; break
      case 'choosed': return 'You choosed: '+n; break
      case 'error': return 'Error to find an option. Returns 1'; break
    }
  }
  ths.defaultPageButtons = [{e: '◀', act: 'prev'}, {e: '⏹', act: 'stop'}, {e: '▶', act: 'next'}]
  ths.defaultParams = {
    showPage: {
      content: [],
      page: 1,
      onOne: 15,
    },
    pagesArray: {
      content: [],
      onOne: 15,
    },
    message: {
      msg: undefined,
      render: page => `${page.content}\nPage: ${page.page}/${page.totalPages}`,
      content: [],
      onOne: 15,
      page: 1,
      time: 5*60*1000,
      pageButtons: ths.defaultPageButtons,
      loop: true,
      remojiend: true,
    },
    optionChooser: {
      msg: undefined,
      content: [],
      chooseHandler: ths.defaultChooseHandler,
      deletee: true,
      atts: 3,
      time: 120000,
      timeout: 2000,
    },
  }

}