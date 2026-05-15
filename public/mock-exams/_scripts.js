// Shared exam JS — toggle solutions/hints + auto-insert answer areas
function toggle(el) {
  if (!el) return;
  el.classList.toggle('show');
}
function toggleById(id) {
  toggle(document.getElementById(id));
}
function showAll() {
  document.querySelectorAll('.solution').forEach(el => el.classList.add('show'));
}
function hideAll() {
  document.querySelectorAll('.solution').forEach(el => el.classList.remove('show'));
}
function printExam() {
  window.print();
}

// Auto-insert answer writing area under each part
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.part').forEach((part, idx) => {
    // skip if already has answer area
    if (part.querySelector('.answer-area')) return;

    const pointsEl = part.querySelector('.part-points');
    let lines = 8; // default
    if (pointsEl) {
      const m = pointsEl.textContent.match(/\d+/);
      if (m) {
        const pts = parseInt(m[0]);
        // map points → suggested number of lines (~28px each)
        if (pts <= 5) lines = 5;
        else if (pts <= 8) lines = 6;
        else if (pts <= 10) lines = 8;
        else if (pts <= 15) lines = 11;
        else if (pts <= 17) lines = 13;
        else if (pts <= 20) lines = 15;
        else lines = 18;
      }
    }

    const partText = part.querySelector('.part-text');
    if (!partText) return;

    const examId = (location.pathname.split('/').pop() || 'exam').replace('.html', '');
    const storageKey = `${examId}-answer-${idx}`;

    const area = document.createElement('div');
    area.className = 'answer-area';
    const ta = document.createElement('textarea');
    ta.rows = lines;
    ta.placeholder = '...';
    ta.setAttribute('aria-label', 'אזור פתרון');
    ta.dataset.key = storageKey;

    // Restore saved
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) ta.value = saved;
    } catch (e) {}

    // Auto-save while typing
    ta.addEventListener('input', () => {
      try { localStorage.setItem(storageKey, ta.value); } catch (e) {}
    });

    area.appendChild(ta);

    // Insert after part-text, before any hint/solution buttons
    partText.insertAdjacentElement('afterend', area);
  });
});

// Clear all answers (with confirmation)
function clearAnswers() {
  if (!confirm('למחוק את כל הפתרונות שכתבת? פעולה זו לא ניתנת לביטול.')) return;
  document.querySelectorAll('.answer-area textarea').forEach(ta => {
    ta.value = '';
    try { localStorage.removeItem(ta.dataset.key); } catch (e) {}
  });
}
