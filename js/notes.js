let currentNoteQuestionId = null;

function loadNote(questionId) {
  currentNoteQuestionId = questionId;
  const key = `note_${questionId}`;
  const note = localStorage.getItem(key) || '';
  
  document.getElementById('notes-section').innerHTML = `
    <h3>O que eu aprendi?</h3>
    <textarea id="noteInput" rows="3" placeholder="Escreva suas anotações aqui...">${note}</textarea>
    <button onclick="saveNote()">Salvar Anotação</button>
  `;
}

function saveNote() {
  const note = document.getElementById('noteInput').value;
  const key = `note_${currentNoteQuestionId}`;
  localStorage.setItem(key, note);
  alert('Anotação salva!');
}// Gerenciamento de anotações
