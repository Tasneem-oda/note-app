let add__note = document.querySelector('.add-note');
let notes = document.querySelector('.notes');

// Function to create a new note element
function createNote() {
    let note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
        <div class="tool-bar">
            <div class="edit"></div>
            <div class="x"></div>
        </div>
        <div class="container">
            <textarea></textarea>
        </div>
    `;

    return note;  // we return it to show it in it's place
}

// Function to add a new note
function addNote() {
    let noteElement = createNote();
    notes.appendChild(noteElement);
    let textarea = noteElement.querySelector('textarea');
    textarea.dataset.id = Date.now(); // Assign a unique ID to the textarea
}

// Function to remove a note
function removeNote() {
    let note = this.closest('.note');
    let textarea = note.querySelector('textarea');
    localStorage.removeItem('note_' + textarea.dataset.id);
    note.remove();
}

// Function to handle textarea input
//this functon related to local storage
function handleInput(event) {
    let target = event.target;
    let text = target.value.trim();
    if (text !== '') {
        let id = target.dataset.id;
        localStorage.setItem('note_' + id, text);
    } else {
        // Remove note from local storage if content is deleted
        let id = target.dataset.id;
        localStorage.removeItem('note_' + id);
    }
}

// Event listener for adding a new note
add__note.addEventListener('click', addNote);

// Event listener for editing a note
notes.addEventListener('click', function(event) {
    let target = event.target;
    if (target.classList.contains('edit')) {
        let textarea = target.closest('.note').querySelector('textarea');
        textarea.readOnly = !textarea.readOnly;
        if (textarea.readOnly) {
            textarea.style.backgroundColor = 'lightgray';
        } else {
            textarea.style.backgroundColor = '';
        }
    }
});

// Event listener for removing a note
notes.addEventListener('click', function(event) {
    let target = event.target;
    if (target.classList.contains('x')) {
        removeNote.call(target);
    }
});

// Event listener for storing note content in local storage on input
notes.addEventListener('input', handleInput);

// Load notes from local storage on page load
window.addEventListener('load', function() {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith('note_')) {
            let noteContent = localStorage.getItem(key);
            let id = key.substring(5); // Extract ID from the key
            let noteElement = createNote();
            let textarea = noteElement.querySelector('textarea');
            textarea.value = noteContent;
            textarea.dataset.id = id; // Assign the stored ID to the textarea
            notes.appendChild(noteElement);
        }
    }
});
