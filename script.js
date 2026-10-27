const questions = [{"question": "Warum kann das Einfügen eines Elements in ein Array im ungünstigsten Fall aufwendig sein?", "options": ["Das gesamte Array muss neu programmiert werden.", "Viele vorhandene Elemente müssen verschoben werden.", "Alle Elemente müssen zunächst gelöscht werden.", "Jedes Element benötigt eine zusätzliche Nachfolgerreferenz."], "correct": 1}, {"question": "Welche zwei Informationen enthält ein Knoten einer verketteten linearen Liste?", "options": ["Nutzdaten und Nachfolgerreferenz", "Index und Arraygröße", "Vorgänger und Arrayindex", "Nutzdaten und Listenlänge"], "correct": 0}, {"question": "Welche Bedeutung hat null als Nachfolger eines Knotens?", "options": ["Der Knoten ist der erste Knoten.", "Der Knoten wurde noch nicht gespeichert.", "Der Knoten ist der letzte Knoten.", "Die gesamte Liste ist leer."], "correct": 2}, {"question": "Welchen Wert besitzt die Referenz erster bei einer leeren Liste?", "options": ["0", "null", "-1", "P100"], "correct": 1}, {"question": "Welche Aufgabe hat die Variable aktuell beim Durchlaufen einer Liste?", "options": ["Sie speichert dauerhaft den ersten Knoten.", "Sie zählt automatisch die Knoten.", "Sie bewegt sich schrittweise durch die Liste.", "Sie speichert immer den letzten Knoten."], "correct": 2}, {"question": "Welche Schleifenbedingung eignet sich zum vollständigen Durchlaufen einer linearen Liste mit der Laufreferenz aktuell?", "options": ["aktuell != null", "aktuell == null", "erster == null", "aktuell == erster"], "correct": 0}, {"question": "Warum muss beim Einfügen eines Knotens nach aktuell zuerst der neue Knoten mit dem bisherigen Nachfolger verbunden werden?", "options": ["Damit die Liste automatisch sortiert wird.", "Damit der restliche Teil der Liste erreichbar bleibt.", "Damit erster auf null gesetzt werden kann.", "Damit alle nachfolgenden Knoten verschoben werden."], "correct": 1}, {"question": "Welche Referenz muss verändert werden, wenn der erste Knoten einer nicht leeren Liste gelöscht wird?", "options": ["Die Referenz erster", "Nur die Referenz des letzten Knotens", "Alle Nachfolgerreferenzen", "Nur die Laufreferenz aktuell"], "correct": 0}, {"question": "Welche Laufzeit hat das Einfügen nach einem bereits bekannten Knoten, wenn nur eine konstante Anzahl von Referenzen verändert wird?", "options": ["O(n²)", "O(n)", "O(log n)", "O(1)"], "correct": 3}, {"question": "Warum kann die Suche nach einer bestimmten Paketnummer in einer verketteten linearen Liste im Worst Case O(n) benötigen?", "options": ["Jeder Knoten muss zweimal durchsucht werden.", "Im ungünstigsten Fall muss die gesamte Liste durchlaufen werden.", "Vor jeder Suche müssen alle Knoten sortiert werden.", "Beim Suchen werden alle Referenzen verändert."], "correct": 1}, {"question": "Welche beiden Anweisungen fügen einen neuen Knoten neu korrekt am Anfang einer Liste ein?", "options": ["neu.setNaechster(erster); danach erster = neu;", "erster = neu; danach neu.setNaechster(null);", "neu.setNaechster(null); danach erster = erster.getNaechster();", "erster.setNaechster(neu); danach neu = erster;"], "correct": 0}, {"question": "aktuell verweist auf den Vorgänger des zu löschenden Knotens. Welche Anweisung entfernt den nachfolgenden Knoten aus der Verkettung?", "options": ["aktuell = null;", "aktuell.setNaechster(null);", "aktuell.setNaechster(aktuell.getNaechster().getNaechster());", "erster = aktuell.getNaechster();"], "correct": 2}, {"question": "Ein Paket erhält lediglich einen neuen Status. Was wird dabei verändert?", "options": ["Die Struktur der Liste", "Nur die Nutzdaten des gespeicherten Pakets", "Die Referenz erster", "Alle Nachfolgerreferenzen"], "correct": 1}, {"question": "Ein Paket mit bestimmter Paketnummer soll gesucht und anschließend gelöscht werden. Welche Worst-Case-Laufzeit ist für den gesamten Vorgang passend?", "options": ["O(1)", "O(log n)", "O(n)", "O(n²)"], "correct": 2}, {"question": "Für welches Szenario ist eine verkettete lineare Liste besonders passend?", "options": ["Eine feste Anzahl Sensorwerte wird ständig über ihren Index gelesen.", "Auf das 10.000. Element soll besonders häufig direkt zugegriffen werden.", "Eine Folge von Aufträgen ändert sich häufig und neue Aufträge werden oft am Anfang eingefügt.", "Eine feste Messwertreihe soll möglichst kompakt über Positionsnummern angesprochen werden."], "correct": 2}];

const intro = document.getElementById("intro");
const form = document.getElementById("quizForm");
const actions = document.getElementById("actions");
const result = document.getElementById("result");
const badge = document.getElementById("progressBadge");
const missing = document.getElementById("missingMessage");

document.getElementById("startBtn").addEventListener("click", startQuiz);
document.getElementById("submitBtn").addEventListener("click", evaluateQuiz);

function startQuiz() {
  intro.classList.add("hidden");
  form.classList.remove("hidden");
  actions.classList.remove("hidden");
  renderQuestions();
  updateProgress();
}

function renderQuestions() {
  form.innerHTML = "";
  questions.forEach((q, qi) => {
    const section = document.createElement("section");
    section.className = "question";
    section.id = `question-${qi}`;

    const number = document.createElement("div");
    number.className = "question-number";
    number.textContent = `Frage ${qi + 1} von ${questions.length}`;

    const title = document.createElement("h2");
    title.textContent = q.question;

    section.append(number, title);

    q.options.forEach((option, oi) => {
      const label = document.createElement("label");
      label.className = "option";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${qi}`;
      input.value = oi;
      input.addEventListener("change", updateProgress);

      const text = document.createElement("span");
      text.textContent = option;

      label.append(input, text);
      section.appendChild(label);
    });

    form.appendChild(section);
  });
}

function updateProgress() {
  let answered = 0;
  questions.forEach((_, qi) => {
    if (form.querySelector(`input[name="q${qi}"]:checked`)) answered++;
  });
  badge.textContent = `${answered} / ${questions.length} beantwortet`;
}

function evaluateQuiz() {
  const unanswered = [];
  questions.forEach((_, qi) => {
    if (!form.querySelector(`input[name="q${qi}"]:checked`)) unanswered.push(qi);
  });

  if (unanswered.length) {
    missing.textContent = `Bitte beantworte noch ${unanswered.length} Frage${unanswered.length === 1 ? "" : "n"}.`;
    document.getElementById(`question-${unanswered[0]}`).scrollIntoView({behavior:"smooth", block:"center"});
    return;
  }

  missing.textContent = "";
  let score = 0;
  const details = [];

  questions.forEach((q, qi) => {
    const selected = Number(form.querySelector(`input[name="q${qi}"]:checked`).value);
    const correct = selected === q.correct;
    if (correct) score++;

    const labels = form.querySelectorAll(`#question-${qi} .option`);
    labels.forEach((label, oi) => {
      label.classList.remove("correct", "wrong");
      if (oi === q.correct) label.classList.add("correct");
      if (oi === selected && oi !== q.correct) label.classList.add("wrong");
      label.querySelector("input").disabled = true;
    });

    details.push({
      number: qi + 1,
      correct,
      selected: q.options[selected],
      solution: q.options[q.correct]
    });
  });

  const percent = Math.round((score / questions.length) * 100);
  form.classList.add("hidden");
  actions.classList.add("hidden");
  badge.textContent = `${score} / ${questions.length} Punkte`;

  result.innerHTML = `
    <h2>Auswertung</h2>
    <div class="big-score">${score} / ${questions.length}</div>
    <div class="percent">${percent} % der Punkte erreicht</div>
    <p>${feedbackText(score)}</p>
    <div id="detailResults"></div>
    <button class="restart" id="restartBtn">Quiz erneut starten</button>
  `;

  const detailBox = result.querySelector("#detailResults");
  details.forEach(d => {
    const row = document.createElement("div");
    row.className = "result-row";
    row.innerHTML = `
      <strong>Frage ${d.number} · <span class="${d.correct ? "answer-ok" : "answer-bad"}">${d.correct ? "1 Punkt" : "0 Punkte"}</span></strong>
      <div>Deine Antwort: ${escapeHtml(d.selected)}</div>
      ${d.correct ? "" : `<div>Richtige Antwort: ${escapeHtml(d.solution)}</div>`}
    `;
    detailBox.appendChild(row);
  });

  result.classList.remove("hidden");
  result.scrollIntoView({behavior:"smooth", block:"start"});
  document.getElementById("restartBtn").addEventListener("click", restartQuiz);
}

function feedbackText(score) {
  if (score === 15) return "Sehr sicher: Die zentralen Konzepte der linearen Liste sitzen.";
  if (score >= 12) return "Sehr gute Grundlage. Einzelne Details können noch gefestigt werden.";
  if (score >= 9) return "Die Grundidee ist verstanden. Wiederhole besonders Referenzänderungen und Laufzeiten.";
  if (score >= 6) return "Einige Grundlagen sind vorhanden. Wiederhole Knoten, Referenzen und Traversieren.";
  return "Wiederhole den Abschnitt zu Knoten, Referenzen und dem Durchlaufen einer linearen Liste.";
}

function restartQuiz() {
  result.classList.add("hidden");
  result.innerHTML = "";
  form.classList.remove("hidden");
  actions.classList.remove("hidden");
  renderQuestions();
  missing.textContent = "";
  updateProgress();
  window.scrollTo({top: 0, behavior:"smooth"});
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
