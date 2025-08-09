let add__note = document.querySelector(".add-note");
let notes = document.querySelector(".notes");

// Function to create a new note element
function createNote(id = Date.now(), content = "") {
  let note = document.createElement("div");
  note.classList.add("note");
  note.dataset.noteId = id; // Assign the unique ID to the note div
  note.innerHTML = `
        <div class="tool-bar">
            <div class="edit" role="button" aria-label="Edit note"></div>
            <div class="x" role="button" aria-label="Remove note"></div>
        </div>
        <textarea class="note-content" readonly>${content}</textarea>
    `;

  return note;
}

// Function to add a new note
function addNote() {
  let noteElement = createNote();
  notes.prepend(noteElement); // إضافة الملاحظة الجديدة في البداية
  let textarea = noteElement.querySelector("textarea");
  textarea.focus(); // تركيز المؤشر على الملاحظة الجديدة
  textarea.readOnly = false;
  noteElement.classList.remove("read-only");
}

// Function to remove a note
function removeNote(noteElement) {
  let id = noteElement.dataset.noteId;
  localStorage.removeItem("note_" + id);
  noteElement.remove();
}

// Function to handle textarea input
function handleInput(event) {
  let target = event.target;
  if (target.classList.contains("note-content")) {
    let text = target.value.trim();
    let id = target.closest(".note").dataset.noteId;
    if (text !== "") {
      localStorage.setItem("note_" + id, text);
    } else {
      localStorage.removeItem("note_" + id);
    }
  }
}

// Event listener for adding a new note
add__note.addEventListener("click", addNote);

// Event listener for toolbar actions
notes.addEventListener("click", function (event) {
  let target = event.target;
  let noteElement = target.closest(".note");

  if (target.classList.contains("edit")) {
    let textarea = noteElement.querySelector(".note-content");
    let isReadOnly = textarea.readOnly;

    textarea.readOnly = !isReadOnly;
    noteElement.classList.toggle("read-only", !isReadOnly);

    if (!isReadOnly) {
      textarea.focus();
    }
  } else if (target.classList.contains("x")) {
    removeNote(noteElement);
  }
});

// Event listener for storing note content in local storage on input
notes.addEventListener("input", handleInput);

// Load notes from local storage on page load
window.addEventListener("load", function () {
  let noteKeys = Object.keys(localStorage).filter((key) =>
    key.startsWith("note_")
  );
  noteKeys.sort((a, b) => {
    let aId = parseInt(a.substring(5));
    let bId = parseInt(b.substring(5));
    return bId - aId;
  });

  for (const key of noteKeys) {
    let noteContent = localStorage.getItem(key);
    let id = key.substring(5);
    let noteElement = createNote(id, noteContent);
    noteElement.classList.add("read-only");
    notes.appendChild(noteElement);
  }
});
س;
