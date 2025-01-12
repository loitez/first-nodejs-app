const fs = require('fs/promises');
const chalk = require('chalk');
const path = require('path');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {

    const notes = await getNotes()

    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)

    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen('Congratulations! Note added'))
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: "utf-8"})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
    const notes = await getNotes()
    console.log(chalk.bgMagenta('Notes list:'))
    notes.forEach(note => {
        console.log(chalk.magenta(`Note ID: ${note.id},`, `Title: ${note.title}`))
    })

}

async function removeNote(id) {
    const notes = await getNotes()
    const noteForDelete = notes.filter(note => note.id === id)
    const noteIndex = notes.indexOf(noteForDelete[0])
    if (noteIndex < 0) {
        console.log(chalk.red('Sorry, note index not found'))
        return
    }
    notes.splice(noteIndex, 1)
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgYellow('Note removed'))
}

module.exports = {
    addNote, printNotes, removeNote
}