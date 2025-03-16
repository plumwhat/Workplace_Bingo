const words = [
    "Agile", "Synergy", "Paradigm", "Innovation", "Disruption", "KPI", "Metrics", "Blockchain", "AI", "Automation", "Cloud", "SaaS", "UX", "UI", "Pivot", "Scale", "Growth", "Revenue", "Profit", "Margin", "ROI", "Stakeholder", "Partnership", "Collaboration", "Networking", "Branding", "Marketing", "Sales", "Strategy", "Roadmap", "Project", "Task", "Deadline", "Meeting", "Presentation", "Feedback", "Alignment", "Optimization", "Efficiency", "Productivity", "Resources", "Budget", "Analysis", "Data", "Insight", "Report", "Trend", "Forecast", "Value", "Impact", "Solution"
];

const grid = document.querySelector('.grid');
const resetButton = document.getElementById('reset-button');
const bingoDiv = document.getElementById('bingo');
const bingoTimesButton = document.getElementById('bingo-times-button');
let selectedWords = [];
let selectedCells = [];

function getRandomWords() {
    const shuffled = words.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 9);
}

function createGrid() {
    selectedWords = getRandomWords();
    grid.innerHTML = '';
    selectedCells = Array(9).fill(false);

    selectedWords.forEach((word, index) => {
        const cell = document.createElement('div');
        cell.textContent = word;
        cell.dataset.index = index;
        cell.addEventListener('click', toggleCell);
        grid.appendChild(cell);
    });
}

function toggleCell(event) {
    const cell = event.target;
    const index = parseInt(cell.dataset.index);
    selectedCells[index] = !selectedCells[index];
    cell.classList.toggle('selected');
    checkBingo();
}

function checkBingo() {
    if (selectedCells.every(cell => cell)) {
        bingoDiv.classList.remove('hidden');
        recordBingoTime();
    } else {
        bingoDiv.classList.add('hidden');
    }
}

function recordBingoTime() {
    const now = new Date();
    const time = now.toLocaleString();
    let bingoTimes = JSON.parse(localStorage.getItem('bingoTimes')) || [];
    bingoTimes.push(time);
    localStorage.setItem('bingoTimes', JSON.stringify(bingoTimes));
}

function resetGame() {
    createGrid();
}

resetButton.addEventListener('click', resetGame);

bingoTimesButton.addEventListener('click', () => {
    window.location.href = 'bingo_times.html';
});

createGrid();
