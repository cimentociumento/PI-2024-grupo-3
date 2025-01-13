const quizData = [
    {
        question: "Choose the correct sentence:",
        options: [
            "I have been to Paris last year.",
            "I went to Paris last year.",
            "I have gone to Paris last year.",
            "I had been going to Paris last year."
        ],
        correct: 1,
        level: "B1"
    },
    {
        question: "What's the meaning of 'Nevertheless'?",
        options: [
            "Portanto",
            "Entretanto",
            "Ademais",
            "Contudo"
        ],
        correct: 3,
        level: "B2"
    },
    {
        question: "Complete: 'If I _____ rich, I would buy a mansion.'",
        options: [
            "am",
            "were",
            "was",
            "will be"
        ],
        correct: 1,
        level: "B2"
    },
    {
        question: "Which sentence uses Present Perfect Continuous correctly?",
        options: [
            "I am studying English since 2020.",
            "I have been studying English since 2020.",
            "I study English since 2020.",
            "I was studying English since 2020."
        ],
        correct: 1,
        level: "B2"
    },
    {
        question: "Choose the correct phrasal verb: 'Could you _____ the children while I'm out?'",
        options: [
            "look after",
            "look into",
            "look up",
            "look down"
        ],
        correct: 0,
        level: "B1"
    },
    {
        question: "Select the word that is NOT a synonym of 'beautiful':",
        options: [
            "gorgeous",
            "stunning",
            "graceful",
            "clever"
        ],
        correct: 3,
        level: "B1"
    },
    {
        question: "Which sentence is grammatically correct?",
        options: [
            "Neither John or Mary are coming.",
            "Neither John nor Mary is coming.",
            "Neither John nor Mary are coming.",
            "Neither John and Mary is coming."
        ],
        correct: 1,
        level: "C1"
    },
    {
        question: "What's the meaning of the idiom 'It's raining cats and dogs'?",
        options: [
            "Está chovendo animais",
            "Está chovendo muito forte",
            "Está garoando",
            "Está nublado"
        ],
        correct: 1,
        level: "B1"
    },
    {
        question: "Choose the correct relative pronoun: 'The man _____ car was stolen called the police.'",
        options: [
            "which",
            "whose",
            "who",
            "whom"
        ],
        correct: 1,
        level: "B2"
    },
    {
        question: "Select the correct form: 'By this time next year, I _____ from university.'",
        options: [
            "will graduate",
            "will have graduated",
            "will be graduating",
            "will have been graduating"
        ],
        correct: 1,
        level: "C1"
    },
    {
        question: "What's the correct pronunciation of 'schedule' in British English?",
        options: [
            "SKED-yool",
            "SHED-yool",
            "SKE-dual",
            "SHE-dual"
        ],
        correct: 1,
        level: "B2"
    },
    {
        question: "Choose the correct modal verb: 'You _____ smoke in hospitals.'",
        options: [
            "don't have to",
            "mustn't",
            "shouldn't",
            "can't"
        ],
        correct: 1,
        level: "B1"
    },
    {
        question: "Which word is NOT a collective noun?",
        options: [
            "flock",
            "herd",
            "crowd",
            "person"
        ],
        correct: 3,
        level: "B2"
    },
    {
        question: "Complete: 'She's _____ tired to go out tonight.'",
        options: [
            "to",
            "too",
            "two",
            "very"
        ],
        correct: 1,
        level: "A2"
    },
    {
        question: "Which sentence uses the Past Perfect correctly?",
        options: [
            "When I arrived, they left.",
            "When I arrived, they have left.",
            "When I arrived, they had left.",
            "When I arrived, they were leaving."
        ],
        correct: 2,
        level: "B2"
    },
    {
        question: "What's the meaning of 'to beat around the bush'?",
        options: [
            "Falar diretamente",
            "Evitar o assunto principal",
            "Criar problemas",
            "Resolver um conflito"
        ],
        correct: 1,
        level: "C1"
    },
    {
        question: "Choose the correct tag question: 'You're coming to the party, _____?'",
        options: [
            "aren't you",
            "don't you",
            "isn't it",
            "won't you"
        ],
        correct: 0,
        level: "B2"
    },
    {
        question: "Which sentence contains a gerund?",
        options: [
            "I want to sleep.",
            "I enjoy sleeping.",
            "I will sleep.",
            "I slept well."
        ],
        correct: 1,
        level: "B2"
    },
    {
        question: "What's the correct order of adjectives: 'A _____ box'?",
        options: [
            "wooden old large",
            "old large wooden",
            "large old wooden",
            "wooden large old"
        ],
        correct: 2,
        level: "C1"
    },
    {
        question: "Choose the correct reported speech: He said, 'I am tired.'",
        options: [
            "He said he is tired.",
            "He said he was tired.",
            "He said he has been tired.",
            "He said he had tired."
        ],
        correct: 1,
        level: "B2"
    }
];

let currentQuestion = 0;
let score = 0;
let userData = {};
let currentCombo = 0;
let maxCombo = 0;

// Adicionar função para embaralhar arrays
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para inicializar o quiz
function initQuiz() {
    const form = document.getElementById('user-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            userData.name = document.getElementById('userName').value;
            currentQuestion = 0;
            score = 0;
            currentCombo = 0;
            maxCombo = 0;
            startQuiz();
        });
    }

    // Inicializar o contador total de questões
    const totalQuestionsElement = document.getElementById('total-questions');
    if (totalQuestionsElement) {
        totalQuestionsElement.textContent = quizData.length;
    }

    // Adicionar listener para o botão de reiniciar
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            currentQuestion = 0;
            score = 0;
            document.getElementById('result-screen').classList.add('hidden');
            document.getElementById('welcome-screen').classList.remove('hidden');
            document.getElementById('user-form').reset();
        });
    }

    const backhome = document.getElementById('back-home');
    if (backhome) {
        backhome.addEventListener('click', function() {
            window.location.href = '/Users/Ezequiel/PI-2024-grupo-3/index.html';
        });
    }
    }


function startQuiz() {
    // Embaralhar as questões antes de começar
    quizData.sort(() => Math.random() - 0.5);
    
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const questionData = quizData[currentQuestion];
    const questionContainer = document.getElementById('question-container');
    
    // Atualizar contadores
    document.getElementById('current-question').textContent = currentQuestion + 1;
    document.getElementById('total-questions').textContent = quizData.length;
    document.getElementById('question-num').textContent = currentQuestion + 1;
    
    document.querySelector('.progress-bar').setAttribute('data-progress', 
        Math.round((currentQuestion / quizData.length) * 100));
    
    questionContainer.style.opacity = '0';
    
    setTimeout(() => {
        document.getElementById('question-text').textContent = questionData.question;
        
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        
        // Criar array de opções com seus índices
        const optionsWithIndices = questionData.options.map((option, index) => ({
            text: option,
            isCorrect: index === questionData.correct
        }));
        
        // Embaralhar as opções
        shuffleArray(optionsWithIndices);
        
        // Criar os botões de opção
        optionsWithIndices.forEach((option, index) => {
            const button = document.createElement('div');
            button.className = 'option';
            button.textContent = option.text;
            button.onclick = () => selectOption(option.isCorrect, index);
            button.style.animation = `slideIn 0.5s ease-out ${index * 0.1}s`;
            optionsContainer.appendChild(button);
        });
        
        questionContainer.style.opacity = '1';
        updateProgress();
    }, 300);
}

function selectOption(isCorrect, selectedIndex) {
    const options = document.querySelectorAll('.option');
    const progressBar = document.querySelector('.progress-bar');
    const gameCharacter = document.querySelector('.game-character');
    const comboMessage = document.querySelector('.combo-message');
    
    options.forEach(option => {
        option.classList.add('disabled');
    });

    options[selectedIndex].classList.add('selected');
    
    if (isCorrect) {
        options[selectedIndex].classList.add('correct');
        score++;
        currentCombo++;
        
        // Verificar e atualizar combo imediatamente
        if (currentCombo >= 5) {
            progressBar.classList.add('on-fire');
            gameCharacter.style.opacity = '1';
            comboMessage.classList.add('show');
            document.getElementById('combo-count').textContent = currentCombo;
        } else {
            // Garantir que os elementos estejam ocultos se combo < 5
            progressBar.classList.remove('on-fire');
            gameCharacter.style.opacity = '0';
            comboMessage.classList.remove('show');
        }
        
        // Atualizar máximo combo
        if (currentCombo > maxCombo) {
            maxCombo = currentCombo;
        }
    } else {
        options[selectedIndex].classList.add('wrong');
        // Resetar combo e esconder elementos
        currentCombo = 0;
        progressBar.classList.remove('on-fire');
        gameCharacter.style.opacity = '0';
        comboMessage.classList.remove('show');
        
        // Mostrar resposta correta
        options.forEach((option, index) => {
            if (option.classList.contains('selected')) return;
            const optionText = option.textContent;
            const originalIndex = quizData[currentQuestion].options.indexOf(optionText);
            if (originalIndex === quizData[currentQuestion].correct) {
                option.classList.add('correct');
            }
        });
    }

    setTimeout(() => {
        currentQuestion++;
        
        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function updateProgress() {
    const progress = ((currentQuestion) / quizData.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

function showResults() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    
    const percentage = Math.round((score / quizData.length) * 100);
    document.getElementById('score').textContent = percentage;
    
    // Determinar o nível CEFR (Common European Framework of Reference)
    let level = '';
    let recommendations = [];
    if (percentage >= 90) {
        level = 'C2 - Proficiency';
        recommendations = [
            {name: 'Rosetta Stone - Advanced', url: 'https://www.rosettastone.com'},
            {name: 'Cambridge Advanced English Course', url: 'https://www.cambridgeenglish.org'},
            {name: 'The Economist Reading', url: 'https://www.economist.com'}
        ];
    } else if (percentage >= 80) {
        level = 'C1 - Advanced';
        recommendations = [
            {name: 'Duolingo - Advanced Topics', url: 'https://www.duolingo.com'},
            {name: 'BBC Learning English', url: 'https://www.bbc.co.uk/learningenglish'},
            {name: 'TED Talks', url: 'https://www.ted.com'}
        ];
    } else if (percentage >= 70) {
        level = 'B2 - Upper Intermediate';
        recommendations = [
            {name: 'Busuu Premium', url: 'https://www.busuu.com'},
            {name: 'Memrise', url: 'https://www.memrise.com'},
            {name: 'English Central', url: 'https://www.englishcentral.com'}
        ];
    } else if (percentage >= 50) {
        level = 'B1 - Intermediate';
        recommendations = [
            {name: 'Duolingo', url: 'https://www.duolingo.com'},
            {name: 'Babbel', url: 'https://www.babbel.com'},
            {name: 'Mondly', url: 'https://www.mondly.com'}
        ];
    } else {
        level = 'A1/A2 - Beginner';
        recommendations = [
            {name: 'Duolingo Basics', url: 'https://www.duolingo.com'},
            {name: 'HelloTalk', url: 'https://www.hellotalk.com'},
            {name: 'LingoKids', url: 'https://www.lingokids.com'}
        ];
    }

    // Criar os elementos do gráfico
    const chartContainer = document.createElement('div');
    chartContainer.className = 'charts-container';

    // Container para o gráfico de pizza
    const pieWrapper = document.createElement('div');
    pieWrapper.className = 'chart-wrapper';
    const pieCanvas = document.createElement('canvas');
    pieCanvas.id = 'pieChart';
    pieWrapper.appendChild(pieCanvas);

    // Container para o gráfico de barras
    const barWrapper = document.createElement('div');
    barWrapper.className = 'chart-wrapper';
    const barCanvas = document.createElement('canvas');
    barCanvas.id = 'barChart';
    barWrapper.appendChild(barCanvas);

    chartContainer.appendChild(pieWrapper);
    chartContainer.appendChild(barWrapper);

    // Criar seção de recomendações
    const recommendationsHTML = `
        <div class="level-info">
            <h2 id="lvl">Seu nível é: ${level}</h2>
            <p>Parabéns ${userData.name}! Você completou o teste.</p>
            <p>Maior combo: ${maxCombo} acertos seguidos! 🔥</p>
        </div>
        <div class="charts-container">
            ${chartContainer.outerHTML}
        </div>
        <div class="level-table">
            <h3>Níveis de Proficiência em Inglês</h3>
            <table>
                <tr>
                    <th>Nível</th>
                    <th>Classificação</th>
                    <th>Pontuação</th>
                </tr>
                <tr class="${percentage >= 90 ? 'current-level' : ''}">
                    <td>C2</td>
                    <td>Proficiency</td>
                    <td>90-100%</td>
                </tr>
                <tr class="${percentage >= 80 && percentage < 90 ? 'current-level' : ''}">
                    <td>C1</td>
                    <td>Advanced</td>
                    <td>80-89%</td>
                </tr>
                <tr class="${percentage >= 70 && percentage < 80 ? 'current-level' : ''}">
                    <td>B2</td>
                    <td>Upper Intermediate</td>
                    <td>70-79%</td>
                </tr>
                <tr class="${percentage >= 50 && percentage < 70 ? 'current-level' : ''}">
                    <td>B1</td>
                    <td>Intermediate</td>
                    <td>50-69%</td>
                </tr>
                <tr class="${percentage < 50 ? 'current-level' : ''}">
                    <td>A1/A2</td>
                    <td>Basic/Elementary</td>
                    <td>0-49%</td>
                </tr>
            </table>
        </div>
        <div class="recommendations">
            <h3>Recomendações para continuar estudando:</h3>
            <div class="recommendations-grid">
                ${recommendations.map(rec => `
                    <a href="${rec.url}" target="_blank" class="recommendation-card">
                        <h4>${rec.name}</h4>
                        <span class="recommendation-arrow">→</span>
                    </a>
                `).join('')}
            </div>
        </div>
    `;

    document.getElementById('level-description').innerHTML = recommendationsHTML;

    // Criar gráficos usando Chart.js
    createCharts(score, quizData.length - score);
}

// Função para criar os gráficos
function createCharts(correct, incorrect) {
    // Gráfico de Pizza
    new Chart(document.getElementById('pieChart'), {
        type: 'doughnut',
        data: {
            labels: ['Acertos', 'Erros'],
            datasets: [{
                data: [correct, incorrect],
                backgroundColor: [
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(255, 82, 82, 0.8)'
                ],
                borderColor: [
                    'rgba(76, 175, 80, 1)',
                    'rgba(255, 82, 82, 1)'
                ],
                borderWidth: 2,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 14
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Distribuição de Respostas',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: 20
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });

    // Gráfico de Barras
    new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels: ['Seu Desempenho'],
            datasets: [
                {
                    label: 'Acertos',
                    data: [correct],
                    backgroundColor: 'rgba(76, 175, 80, 0.8)',
                    borderColor: 'rgba(76, 175, 80, 1)',
                    borderWidth: 2,
                    borderRadius: 5,
                    categoryPercentage: 0.8
                },
                {
                    label: 'Erros',
                    data: [incorrect],
                    backgroundColor: 'rgba(255, 82, 82, 0.8)',
                    borderColor: 'rgba(255, 82, 82, 1)',
                    borderWidth: 2,
                    borderRadius: 5,
                    categoryPercentage: 0.8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 14
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Análise Detalhada do Desempenho',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: 20
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.raw || 0;
                            const total = quizData.length;
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} questões (${percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: quizData.length,
                    ticks: {
                        stepSize: 1,
                        font: {
                            size: 12
                        }
                    },
                    title: {
                        display: true,
                        text: 'Número de Questões',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

window.addEventListener('load', initQuiz);
