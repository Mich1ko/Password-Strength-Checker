document.addEventListener('DOMContentLoaded', () => {
    console.log('Password Strength Checker loaded');
    const passwordInput = document.getElementById('password-input');
    const evaluateButton = document.getElementById('evaluate-btn');
    const progressFill = document.querySelector('.progress-fill');
    const progressTrack = document.querySelector('.progress-track');
    const strengthLabel = document.querySelector('.estimate .value');
    const logo = document.getElementById('logo');
    const paragraph = document.getElementById('title-paragraph');

    // evaluating password strength function
    function evaluatePasswordStrength(password) {
        if (!password) return { score: 0, label: 'Empty' };
        
        let score = 0;
        if (password.length >= 12) score += 30;
        else if (password.length >= 8) score += 20;
        else score += Math.min(10, password.length * 1);
        if (/[a-z]/.test(password)) score += 10;
        if (/[A-Z]/.test(password)) score += 15;
        if (/\d/.test(password)) score += 15;
        if (/[^A-Za-z0-9]/.test(password)) score += 20;
        score = Math.min(100, score);

        let label = 'Very weak';
        if (score === 0) label = 'Empty';
        else if (score < 25) label = 'Very weak';
        else if (score < 50) label = 'Weak';
        else if (score < 75) label = 'Good';
        else label = 'Strong';
        return { score, label };
    }

    // update UI function

    function updateUI(score, label) {
        if (progressFill) {
            progressFill.style.setProperty('--strength', score + '%');
            progressFill.classList.toggle('empty', score === 0);
        }
        if (strengthLabel) strengthLabel.textContent = label;
    }

    function runEvaluate() {
        const pw = passwordInput ? passwordInput.value : '';
        const { score, label } = evaluatePasswordStrength(pw);
        updateUI(score, label);
    }

    if (evaluateButton) evaluateButton.addEventListener('click', runEvaluate);
    if (passwordInput) passwordInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') runEvaluate(); });

    // clear progress bar when the input is emptied
    if (passwordInput) passwordInput.addEventListener('input', () => {
        if (passwordInput.value.trim() === '') {
            updateUI(0, 'Empty');
        }
    });

    // keep bar empty at start
    updateUI(0, 'Empty');
});

