document.addEventListener('DOMContentLoaded', () => {
	const input = document.getElementById('password-input');
	const btn = document.getElementById('evaluate-btn');
	const fill = document.querySelector('.progress-fill');
	const valueLabel = document.querySelector('.estimate .value');

	function evaluatePassword(pw) {
		if (!pw) return { score: 0, label: 'Empty' };
		let score = 0;
		if (pw.length >= 8) score += 25;
		else score += Math.min(25, pw.length * 3);
		if (/[a-z]/.test(pw)) score += 15;
		if (/[A-Z]/.test(pw)) score += 20;
		if (/\d/.test(pw)) score += 20;
		if (/[^A-Za-z0-9]/.test(pw)) score += 20;
		score = Math.min(100, score);
		let label = 'Very weak';
		if (score < 25) label = 'Very weak';
		else if (score < 50) label = 'Weak';
		else if (score < 75) label = 'Good';
		else label = 'Strong';
		return { score, label };
	}

	btn.addEventListener('click', () => {
		const pw = input.value;
		const { score, label } = evaluatePassword(pw);
		fill.style.setProperty('--strength', score + '%');
		valueLabel.textContent = label;
		if (score === 0) fill.classList.add('empty');
		else fill.classList.remove('empty');
	});
});
