let currentTopic = null;
let currentQuestionIndex = 0;

async function loadTopic(topicKey) {
  try {
    const response = await fetch(`topicos/${topicKey}.json`);
    if (!response.ok) throw new Error('Tópico não encontrado');
    currentTopic = await response.json();
    currentQuestionIndex = 0;
    showQuestion();
    document.getElementById('topics-list').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('topic-title').textContent = currentTopic.titulo;
  } catch (error) {
    alert('Erro ao carregar o tópico: ' + error.message);
  }
}

function showQuestion() {
  if (!canAnswerMore()) {
    document.getElementById('question-box').innerHTML = `
      <p>⚠️ Limite diário atingido! Volte amanhã ou <a href="#">torne-se premium</a>.</p>
    `;
    return;
  }

  const q = currentTopic.questoes[currentQuestionIndex];
  document.getElementById('question-box').innerHTML = `
    <p><strong>Questão ${q.id} de ${currentTopic.questoes.length}</strong></p>
    <p>${q.enunciado}</p>
    <ul>
      ${q.alternativas.map(alt => `<li><label><input type="radio" name="q" value="${alt[0]}"> ${alt}</label></li>`).join('')}
    </ul>
    <button onclick="showAnswer(${q.id})">Ver Resposta</button>
  `;
  loadNote(q.id);
}

function showAnswer(questionId) {
  const q = currentTopic.questoes[currentQuestionIndex];
  document.getElementById('question-box').innerHTML += `
    <div class="answer">
      <p><strong>Resposta correta:</strong> ${q.resposta_correta}</p>
      <p><em>${q.explicacao}</em></p>
    </div>
  `;
  incrementDailyCount();
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentTopic.questoes.length) {
    showQuestion();
  } else {
    alert('Fim do tópico!');
    location.reload();
  }
}
