const charms = document.querySelectorAll('.charm');
const slots = document.querySelectorAll('.slot');

charms.forEach(charm => {
  charm.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', charm.dataset.id);
    e.dataTransfer.setDragImage(charm, 25, 25);
  });
});

slots.forEach(slot => {
  slot.addEventListener('dragover', e => e.preventDefault());

  slot.addEventListener('drop', e => {
    e.preventDefault();
    const charmId = e.dataTransfer.getData('text/plain');
    const charmImg = document.createElement('img');
    charmImg.src = `charms/${charmId}.png`;
    charmImg.classList.add('charm');
    charmImg.dataset.id = charmId;

    slot.innerHTML = '';
    slot.appendChild(charmImg);
  });
});

document.getElementById('saveBtn').addEventListener('click', async () => {
  const layout = Array.from(slots).map(slot => {
    const img = slot.querySelector('img');
    return img ? img.dataset.id : null;
  });

  console.log('Bracelet Layout:', layout);

  // Save to Firebase
  await saveBracelet(layout);
});
