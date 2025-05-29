// In the addCharmToSlot function, replace with this:
function addCharmToSlot(slot) {
  // Don't allow selecting sold out charms
  if (selectedCharm.classList.contains('sold-out')) {
    alert('This charm is sold out!');
    return;
  }

  const charmSrc = selectedCharm.src.split('/').pop();
  if (usedCharms.has(charmSrc)) {
    alert('This charm is already used on the bracelet!');
    return;
  }

  // Clear the slot completely first
  slot.innerHTML = '';

  // Add base charm to slot first
  const baseImg = document.createElement('img');
  if (materialType === 'silver') {
    baseImg.src = 'basecharms/silver.png';
    baseImg.alt = 'Silver Base';
  } else if (materialType === 'gold') {
    baseImg.src = 'basecharms/gold.png';
    baseImg.alt = 'Gold Base';
  } else if (materialType === 'mix') {
    const isGold = parseInt(slot.dataset.index) % 2 === 0;
    baseImg.src = isGold ? 'basecharms/gold.png' : 'basecharms/silver.png';
    baseImg.alt = isGold ? 'Gold Base' : 'Silver Base';
  }
  baseImg.dataset.type = 'base';
  slot.appendChild(baseImg);

  // Then add the selected charm
  const newImg = selectedCharm.cloneNode();
  newImg.classList.remove('selected');
  newImg.dataset.charm = charmSrc;
  slot.appendChild(newImg);
  usedCharms.add(charmSrc);

  // Update counts
  const newType = selectedCharm.dataset.type;
  if (newType === 'special') {
    if (includedSpecialUsed < products[currentProduct].includedSpecial) {
      includedSpecialUsed++;
    } else {
      specialCount++;
    }
  } else if (newType === 'rare') {
    rareCount++;
  }

  updateCharmUsage();
  calculatePrice();
  selectedCharm = null;
  document.querySelectorAll('.charm').forEach(c => c.classList.remove('selected'));
}

// In the initCharms function, update the sold-out styling:
function initCharms() {
  specialCharmsGrid.innerHTML = '';
  rareCharmsGrid.innerHTML = '';

  specialCharms.forEach((charm, index) => {
    const charmEl = createCharm('charms/' + charm.src, 'Special Charm ' + (index+1), 'special');
    charmEl.classList.add('special');
    charmEl.dataset.charm = charm.src;
    
    if (charm.soldOut) {
      charmEl.classList.add('sold-out');
      charmEl.style.opacity = '0.5'; // Add this line
      const soldOutLabel = document.createElement('div');
      soldOutLabel.className = 'sold-out-label';
      soldOutLabel.textContent = 'Sold Out';
      charmEl.appendChild(soldOutLabel);
    }
    
    specialCharmsGrid.appendChild(charmEl);
  });
  
  rareCharms.forEach((charm, index) => {
    const charmEl = createCharm('rares/' + charm.src, 'Rare Charm ' + (index+1), 'rare');
    charmEl.classList.add('rare');
    charmEl.dataset.charm = charm.src;
    
    if (charm.soldOut) {
      charmEl.classList.add('sold-out');
      charmEl.style.opacity = '0.5'; // Add this line
      const soldOutLabel = document.createElement('div');
      soldOutLabel.className = 'sold-out-label';
      soldOutLabel.textContent = 'Sold Out';
      charmEl.appendChild(soldOutLabel);
    }
    
    rareCharmsGrid.appendChild(charmEl);
  });
}

// Also update the createCharm function to handle sold-out charms:
function createCharm(src, alt, type) {
  const charm = document.createElement('img');
  charm.className = 'charm';
  charm.src = src;
  charm.alt = alt;
  charm.dataset.type = type;
  
  charm.addEventListener('click', function() {
    if (this.classList.contains('sold-out')) {
      alert('This charm is sold out!');
      return;
    }
    
    document.querySelectorAll('.charm').forEach(c => c.classList.remove('selected'));
    this.classList.add('selected');
    selectedCharm = this;
  });
  
  return charm;
}
