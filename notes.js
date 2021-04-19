const fs = require('fs')
const chalk = require('chalk')
const { title } = require('process')

//Function to list all notes
const listNotes = () => {
  console.log(chalk.bgGreen("Your notes:"))
  const notes = loadNotes()
  notes.forEach(element => console.log(element.title))
}

//Function to add a note
const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicate = notes.find(note => note.title === title)
  if (!duplicate) {
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

//Function to remove a note by title
const removeNote = title => {
  const notes = loadNotes()
  if (notes.length === 0) {
    console.error(chalk.red('No notes!'))
  } else {
    const newArray = notes.filter(note => note.title !== title)
    if (newArray.length === notes.length) {
      console.error(chalk.bgRed('Note not found!'))
    } else {
      saveNotes(newArray)
      console.log(chalk.bgGreen('Note removed!'))
    }
  }
}

//Function to save the note
const saveNotes = (notes) => {
  const dataJson = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJson)
}

//Function to load notes
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    return JSON.parse(dataBuffer.toString())
  } catch (error) {
    return []
  }
}

//Function to read a note by title
const readNote = title => {
  const notes = loadNotes()
  const note = notes.find(note => note.title === title)
  if (note) { console.log(`${chalk.bgGreen(note.title)} ${note.body}`) }
  else { console.error(chalk.red("Note not found")) }

}

module.exports = { addNote, removeNote, listNotes, readNote }