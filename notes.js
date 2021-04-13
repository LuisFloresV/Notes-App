const fs = require('fs')

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
  } else {
    console.error('Title already in use!')
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

module.exports = { getNotes, addNote }