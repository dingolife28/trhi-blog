
  const QUESTIONS = [
    {
      q: "Welches Bakterium kann laut einer Studie von 2019 Laktat in das leistungsrelevante Propionat umwandeln?",
      options: ["Akkermansia muciniphila", "Veillonella atypica", "Lactobacillus rhamnosus", "Bifidobacterium longum"],
      correct: 1,
      explainCorrect: "Richtig! Veillonella atypica wurde in der Nature-Medicine-Studie von 2019 als möglicher Leistungs-Booster identifiziert, weil es Laktat zu Propionat verstoffwechselt.",
      explainWrong: "Nicht ganz – gemeint ist Veillonella atypica. Es nimmt Laktat auf, das bei intensiver Belastung im Blut ansteigt, und wandelt es in Propionat um."
    },
    {
      q: "Was beobachteten die Forschenden der Edith-Cowan-Studie bei Athleten in Ruhephasen hinsichtlich ihrer Ernährung?",
      options: [
        "Die Ernährungsqualität blieb völlig unverändert",
        "Sie aßen automatisch mehr Obst und Gemüse",
        "Die Ernährungsqualität sank: mehr verarbeitete Lebensmittel, weniger Frischware, etwas mehr Alkohol",
        "Sie reduzierten ihre Kalorienzufuhr stark"
      ],
      correct: 2,
      explainCorrect: "Genau – Kohlenhydrate und Ballaststoffe blieben zwar konstant, aber die Lebensmittelqualität sank: mehr Fertigprodukte, weniger Frisches, moderat mehr Alkohol.",
      explainWrong: "Tatsächlich sank die Ernährungsqualität in Ruhephasen: mehr verarbeitete Lebensmittel, weniger frisches Obst und Gemüse, etwas mehr Alkohol – bei gleichbleibender Kohlenhydrat- und Ballaststoffmenge."
    },
    {
      q: "Welcher Stoff steigt bei intensiver Belastung im Blut an und spielt laut Forschung eine Rolle für das Darmmikrobiom?",
      options: ["Cortisol", "Adrenalin", "Laktat", "Insulin"],
      correct: 2,
      explainCorrect: "Richtig! Laktat steigt bei harter Belastung im Blut an, gelangt teilweise in den Darm und kann dort von bestimmten Bakterien verstoffwechselt werden.",
      explainWrong: "Die Antwort ist Laktat. Es entsteht bei intensiver Muskelarbeit, gelangt teils in den Darm und wird dort von bestimmten Bakterien aufgenommen."
    },
    {
      q: "Was verlangsamte sich laut der Studie bei den Athleten zusätzlich während Phasen mit geringerer Trainingsbelastung?",
      options: ["Die Herzfrequenz in Ruhe", "Die Darmtransitzeit (Verdauungsgeschwindigkeit)", "Die Reaktionszeit", "Die Schlafdauer"],
      correct: 1,
      explainCorrect: "Genau – die Darmtransitzeit verlangsamte sich in Ruhephasen deutlich, was zusätzlich zur veränderten Ernährung das Mikrobiom beeinflusste.",
      explainWrong: "Gemeint ist die Darmtransitzeit: Die Verdauung verlief in Ruhephasen spürbar langsamer – ein weiterer Faktor, der die Mikrobiom-Zusammensetzung mitprägte."
    },
    {
      q: "Welche Bakteriengattungen werden in der Forschung häufig mit Ausdauertraining und positiven Mikrobiom-Veränderungen in Verbindung gebracht?",
      options: [
        "Salmonella und Helicobacter",
        "Akkermansia, Prevotella und Faecalibacterium",
        "Streptococcus und Staphylococcus",
        "Clostridium difficile und E. coli"
      ],
      correct: 1,
      explainCorrect: "Richtig! Diese drei Gattungen tauchen in Studien zu Ausdauertraining besonders häufig als „begünstigt“ auf – sie hängen unter anderem mit der Bildung kurzkettiger Fettsäuren zusammen.",
      explainWrong: "Die Antwort lautet Akkermansia, Prevotella und Faecalibacterium – sie werden in der Forschung wiederholt mit den positiven Effekten von Ausdauertraining auf das Mikrobiom assoziiert."
    }
  ];

  let current = 0;
  let score = 0;
  let answered = false;

  const introEl = document.getElementById('quizIntro');
  const playEl = document.getElementById('quizPlay');
  const resultEl = document.getElementById('resultScreen');
  const startBtn = document.getElementById('startBtn');
  const nextBtn = document.getElementById('nextBtn');
  const restartBtn = document.getElementById('restartBtn');
  const shareBtn = document.getElementById('shareBtn');
  const qCounter = document.getElementById('qCounter');
  const progressFill = document.getElementById('progressFill');
  const scorePill = document.getElementById('scorePill');
  const questionText = document.getElementById('questionText');
  const optionsList = document.getElementById('optionsList');
  const feedbackBox = document.getElementById('feedbackBox');

  startBtn.addEventListener('click', () => {
    introEl.style.display = 'none';
    playEl.style.display = 'block';
    renderQuestion();
  });

  nextBtn.addEventListener('click', () => {
    current++;
    if (current < QUESTIONS.length) {
      renderQuestion();
    } else {
      showResult();
    }
  });

  restartBtn.addEventListener('click', () => {
    current = 0;
    score = 0;
    resultEl.classList.remove('show');
    introEl.style.display = 'block';
    playEl.style.display = 'none';
  });

  shareBtn.addEventListener('click', () => {
    const text = `Ich habe ${score} von ${QUESTIONS.length} Punkten beim TRHI-Quiz "Darm & Sport" erreicht! 🦠💪`;
    if (navigator.share) {
      navigator.share({ text: text }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        shareBtn.textContent = 'In Zwischenablage kopiert ✓';
        setTimeout(() => { shareBtn.textContent = 'Ergebnis teilen'; }, 2200);
      });
    }
  });

  function renderQuestion() {
    answered = false;
    feedbackBox.classList.remove('show', 'wrong');
    feedbackBox.textContent = '';
    nextBtn.style.display = 'none';

    const item = QUESTIONS[current];
    qCounter.textContent = `Frage ${current + 1} / ${QUESTIONS.length}`;
    progressFill.style.width = `${(current / QUESTIONS.length) * 100}%`;
    scorePill.textContent = `${score} Punkte`;
    questionText.textContent = item.q;

    optionsList.innerHTML = '';
    item.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option';
      btn.textContent = opt;
      btn.addEventListener('click', () => selectAnswer(idx, btn));
      optionsList.appendChild(btn);
    });
  }

  function selectAnswer(idx, btnEl) {
    if (answered) return;
    answered = true;
    const item = QUESTIONS[current];
    const allBtns = optionsList.querySelectorAll('.option');
    allBtns.forEach(b => b.disabled = true);

    if (idx === item.correct) {
      btnEl.classList.add('correct');
      score++;
      feedbackBox.textContent = '✅ ' + item.explainCorrect;
      feedbackBox.classList.add('show');
    } else {
      btnEl.classList.add('incorrect');
      allBtns[item.correct].classList.add('correct');
      feedbackBox.textContent = '❌ ' + item.explainWrong;
      feedbackBox.classList.add('show', 'wrong');
    }
    scorePill.textContent = `${score} Punkte`;
    progressFill.style.width = `${((current + 1) / QUESTIONS.length) * 100}%`;
    nextBtn.style.display = 'inline-block';
    nextBtn.textContent = (current + 1 < QUESTIONS.length) ? 'Weiter →' : 'Ergebnis ansehen →';
  }

  function showResult() {
    playEl.style.display = 'none';
    resultEl.classList.add('show');

    document.getElementById('resultScoreText').textContent = `Du hast ${score} von ${QUESTIONS.length} Punkten erreicht.`;

    let emoji, title, msg;
    if (score === 5) {
      emoji = '🏆'; title = 'Mikrobiom-Profi!';
      msg = 'Perfektes Ergebnis – du hast die wichtigsten Erkenntnisse rund um Training und Darmgesundheit voll verinnerlicht.';
    } else if (score >= 3) {
      emoji = '💪'; title = 'Stark unterwegs!';
      msg = 'Solide Quote – die Kernaussagen des Artikels sitzen. Ein Blick zurück auf die Highlight-Boxen schadet trotzdem nicht.';
    } else if (score >= 1) {
      emoji = '🌱'; title = 'Guter Start!';
      msg = 'Ein paar Punkte hast du schon mitgenommen. Lies den Artikel noch einmal in Ruhe – vor allem den Abschnitt zum Laktat-Mechanismus.';
    } else {
      emoji = '🔄'; title = 'Nochmal von vorn?';
      msg = 'Kein Problem – das Thema ist komplex. Wirf einen zweiten Blick auf den Artikel und probiere es erneut.';
    }
    document.getElementById('resultEmoji').textContent = emoji;
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultMsg').textContent = msg;
  }
