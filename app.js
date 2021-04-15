const yargs = require('yargs')
const notes = require('./notes')


//add, remove, read, list

//Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new Note!',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body)
  }
})

//Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a Note!',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
  },
  handler: function (argv) {
    notes.removeNote(argv.title)
  }
})


//Create list command
yargs.command({
  command: 'list',
  describe: 'List all Notes!',
  handler: function () {
    console.log('Listing all notes')
  }
})


//Create remove command
yargs.command({
  command: 'read',
  describe: 'Read a Note!',
  handler: function () {
    console.log('Reading a note')
  }
})

yargs.parse()