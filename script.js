const pages = document.querySelectorAll('.page');
const counter = document.getElementById('pageCounter');
const whatsappBtn = document.getElementById('whatsappBtn');
const book = document.querySelector('.book');
const pageSound = document.getElementById('pageSound');


let current = 0;
const total = pages.length;
let startX = 0;
let zoomOpen = false;

/* ==========================
   ACTUALIZAR PÁGINAS
========================== */
function updatePages() {
  if (pageSound) {
  pageSound.currentTime = 0;
  pageSound.volume = 0.35; // 🔥 suave, elegante
  pageSound.play();
}

  pages.forEach((page, index) => {
    page.classList.remove('active', 'prev');

    if (index === current) page.classList.add('active');
    else if (index < current) page.classList.add('prev');
  });

  if (counter) {
    counter.textContent = `${current + 1} / ${total}`;
  }

  if (whatsappBtn) {
    const msg = encodeURIComponent(
      `Hola 👋 Como esta ? Es de mi interes los productos del catálogo Desco, página ${current + 1}`
    );
    whatsappBtn.href = `https://wa.me/573245961645?text=${msg}`;
  }
}

/* ==========================
   BOTONES
========================== */
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

nextBtn?.addEventListener('click', () => {
  if (zoomOpen) return;
  if (current < total - 1) {
    current++;
    updatePages();
  }
});

prevBtn?.addEventListener('click', () => {
  if (zoomOpen) return;
  if (current > 0) {
    current--;
    updatePages();
  }
});

/* ==========================
   SWIPE TÁCTIL (MOBILE)
========================== */
book.addEventListener('touchstart', e => {
  if (zoomOpen) return;
  startX = e.touches[0].clientX;
});

book.addEventListener('touchend', e => {
  if (zoomOpen) return;

  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (diff > 60 && current < total - 1) {
    current++;
    updatePages();
  }

  if (diff < -60 && current > 0) {
    current--;
    updatePages();
  }
});

/* ==========================
   PRECARGA DE IMÁGENES
========================== */
pages.forEach(page => {
  const imgEl = page.querySelector('img');
  if (!imgEl) return;

  const img = new Image();
  img.src = imgEl.src;
});

/* ==========================
   ZOOM MODAL
========================== */
const zoomModal = document.getElementById('zoomModal');
const zoomImage = document.getElementById('zoomImage');
const zoomClose = document.getElementById('zoomClose');

pages.forEach(page => {
  const img = page.querySelector('img');
  if (!img) return;

  img.style.cursor = 'zoom-in';

  img.addEventListener('click', () => {
    zoomOpen = true;
    zoomImage.src = img.src;
    zoomModal.classList.add('active');
  });
});

zoomClose.addEventListener('click', () => {
  zoomOpen = false;
  zoomModal.classList.remove('active');
});

zoomModal.addEventListener('click', e => {
  if (e.target === zoomModal) {
    zoomOpen = false;
    zoomModal.classList.remove('active');
  }
});

/* ==========================
   INIT
========================== */
updatePages();
