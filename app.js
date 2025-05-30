orderForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Show loading state
  const submitBtn = orderForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;
  submitBtn.textContent = 'Processing...';
  submitBtn.disabled = true;

  try {
    // Get form values
    const orderData = {
      name: document.getElementById('full-name').value,
      phone: document.getElementById('phone').value,
      phone2: document.getElementById('phone2').value || '',
      governorate: document.getElementById('governorate').value,
      address: document.getElementById('address').value,
      paymentMethod: document.querySelector('input[name="payment"]:checked').value,
      totalPrice: document.getElementById('total-price').textContent.replace('Total: ', ''),
      productType: currentProduct,
      materialType: materialType,
      design: [], // We'll add the bracelet design here
      status: 'pending',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    // Get all charms in bracelet
    const slots = document.querySelectorAll('.slot img[data-type="special"], .slot img[data-type="rare"], .slot img[data-type="custom"]');
    orderData.design = Array.from(slots).map(slot => ({
      type: slot.dataset.type,
      src: slot.src.split('/').pop(), // Store just the filename
      charmName: slot.dataset.charm || 'custom'
    }));

    // If paying with Cliq, handle the payment proof
    if (orderData.paymentMethod === 'Cliq') {
      const file = document.getElementById('payment-proof').files[0];
      if (file) {
        try {
          const storageRef = storage.ref('payment-proofs/' + Date.now() + '-' + file.name);
          await storageRef.put(file);
          orderData.paymentProofUrl = await storageRef.getDownloadURL();
        } catch (error) {
          console.error('Error uploading payment proof:', error);
          alert('Error uploading payment proof. Please try again.');
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
          return;
        }
      } else {
        alert('Please upload proof of payment for Cliq payment');
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        return;
      }
    }

    // Save order to Firestore
    const docRef = await db.collection('orders').add(orderData);
    
    // Show confirmation
    document.getElementById('order-id').textContent = docRef.id;
    orderModal.style.display = 'none';
    orderConfirmation.style.display = 'flex';
    
    // Reset form
    orderForm.reset();
    paymentProofContainer.style.display = 'none';
  } catch (error) {
    console.error('Error saving order: ', error);
    alert('Error saving order: ' + error.message);
  } finally {
    submitBtn.textContent = originalBtnText;
    submitBtn.disabled = false;
  }
});

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
