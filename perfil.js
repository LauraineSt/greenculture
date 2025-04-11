function showCard(n) {
    document.querySelectorAll('.profile-card').forEach(card => card.classList.remove('active'));
    document.getElementById(`card${n}`).classList.add('active');
  }
  