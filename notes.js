const fs = require('fs')
const chalk = require('chalk')
function getNotes() {
  return 'Foo function'
}

//Function to add a note
const addNote = function (title, body) {
  const notes = loadNotes()
  const duplicate = notes.filter(note => { return note.title === title })

  if (duplicate.length === 0) {
    notes.push({
      title,
      body
    })
    saveNotes(notes)
    console.log(chalk.bgGreen('Note added!'))
  } else {
    console.error(chalk.bgRed('Title already in use!'))
  }
}

const removeNote = function (title) {
  const notes = loadNotes()
  if (notes.length === 0) {
    console.error(chalk.red('No notes!'))
  } else {
    const newArray = notes.filter(note => { note.title !== title })
    if (newArray.length === notes.length) {
      console.error(chalk.bgRed('Note not found!'))
    } else {
      saveNotes(newArray)
      console.log(chalk.bgGreen('Note removed!'))
    }
  }
}
//Function to save the note
const saveNotes = function (notes) {
  const dataJson = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJson)
}

//Function to load notes
const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    return JSON.parse(dataBuffer.toString())
  } catch (error) {
    return []
  }
}

module.exports = { getNotes, addNote, removeNote }