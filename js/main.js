/**
 * CAMERA MARCENARIA - MAIN INTERACTIVITY & BUSINESS LOGIC
 * WhatsApp: 5554993126163
 * Passo Fundo - RS
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initProductFilter();
  initCalculator();
  initFaqAccordion();
  initGalleryModal();
  initSmoothScroll();
});

/* ==========================================================================
   Navbar & Mobile Menu
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Sticky header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }
}

/* ==========================================================================
   Product Catalog Filter
   ========================================================================== */
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   Calculadora de Orçamento & Simulador de Medidas
   ========================================================================== */
function initCalculator() {
  const productSelect = document.getElementById('calc-product');
  const thicknessSelect = document.getElementById('calc-thickness');
  const lengthInput = document.getElementById('calc-length');
  const widthInput = document.getElementById('calc-width');
  const finishSelect = document.getElementById('calc-finish');

  const summaryProduct = document.getElementById('sum-product');
  const summaryDimensions = document.getElementById('sum-dimensions');
  const summaryArea = document.getElementById('sum-area');
  const summaryFinish = document.getElementById('sum-finish');
  const calcBtn = document.getElementById('calc-whatsapp-btn');

  function updateCalculator() {
    if (!productSelect || !lengthInput || !widthInput) return;

    const productName = productSelect.options[productSelect.selectedIndex].text;
    const thickness = thicknessSelect.value;
    const lengthCm = parseFloat(lengthInput.value) || 0;
    const widthCm = parseFloat(widthInput.value) || 0;
    const finish = finishSelect.options[finishSelect.selectedIndex].text;

    // Area in square meters (m²)
    const areaM2 = (lengthCm * widthCm) / 10000;
    const formattedArea = areaM2 > 0 ? areaM2.toFixed(2) + ' m²' : '-- m²';

    if (summaryProduct) summaryProduct.textContent = productName;
    if (summaryDimensions) {
      summaryDimensions.textContent = `${lengthCm} cm × ${widthCm} cm (${thickness})`;
    }
    if (summaryArea) summaryArea.textContent = formattedArea;
    if (summaryFinish) summaryFinish.textContent = finish;

    // Build WhatsApp URL
    const phone = '5554993126163';
    let text = `Olá Marcenaria Camera! Gostaria de um orçamento para:\n\n`;
    text += `🪵 *Produto:* ${productName}\n`;
    text += `📐 *Medidas:* ${lengthCm} cm (comprimento) × ${widthCm} cm (largura)\n`;
    text += `📏 *Espessura:* ${thickness}\n`;
    if (areaM2 > 0) {
      text += `📊 *Área Total:* ${areaM2.toFixed(2)} m²\n`;
    }
    text += `✨ *Acabamento:* ${finish}\n\n`;
    text += `Poderiam me informar valores e prazos de entrega? Obrigado!`;

    const encodedText = encodeURIComponent(text);
    if (calcBtn) {
      calcBtn.href = `https://wa.me/${phone}?text=${encodedText}`;
    }
  }

  const inputs = [productSelect, thicknessSelect, lengthInput, widthInput, finishSelect];
  inputs.forEach(input => {
    if (input) {
      input.addEventListener('input', updateCalculator);
      input.addEventListener('change', updateCalculator);
    }
  });

  // Run initial calculation
  updateCalculator();
}

/* ==========================================================================
   FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other items
        faqItems.forEach(i => i.classList.remove('active'));

        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   Gallery Modal / Lightbox
   ========================================================================== */
function initGalleryModal() {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const closeBtn = document.querySelector('.modal-close');
  const galleryItems = document.querySelectorAll('.gallery-item, .open-lightbox');

  if (!modal || !modalImg) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-title, h3, h4');
      if (img) {
        modalImg.src = img.src;
        modalCaption.textContent = title ? title.textContent : 'Madeira Teca Nobre - Marcenaria Camera';
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   Smooth Scrolling for Anchor Links
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
