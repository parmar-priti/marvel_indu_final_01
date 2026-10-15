/**
 * MARVEL TECHNO INDUSTRIES — CORPORATE JAVASCRIPT
 * Tagline: "DISCIPLINE DELIVERS QUALITY"
 * Updated with Machinery Fleet filtering and Sora precision interactions
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. CUSTOM DESKTOP CURSOR WITH SMOOTH LERP PHYSICS
  // ==========================================================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isCursorActive = false;

  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (isFinePointer && cursorDot && cursorRing) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isCursorActive) {
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
        isCursorActive = true;
      }

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    const animateCursor = () => {
      const speed = 0.18;
      ringX += (mouseX - ringX) * speed;
      ringY += (mouseY - ringY) * speed;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);

    const interactiveSelectors = 'a, button, input, select, textarea, .product-card, .capability-card, .machine-card, .why-card, .quality-protocol-item, .filter-btn';
    
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        document.body.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        document.body.classList.remove('cursor-hover');
      }
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
      isCursorActive = false;
    });

    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
      isCursorActive = true;
    });
  }

  // ==========================================================================
  // 2. STICKY HEADER SCROLL TRANSITION
  // ==========================================================================
  const header = document.getElementById('siteHeader');

  const handleHeaderScroll = () => {
    if (!header) return;
    if (window.scrollY > 35) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ==========================================================================
  // 3. MOBILE NAVIGATION DRAWER
  // ==========================================================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMobileNav = (forceState) => {
    if (!hamburgerBtn || !mobileNavDrawer) return;
    const shouldOpen = forceState !== undefined ? forceState : !mobileNavDrawer.classList.contains('open');

    if (shouldOpen) {
      hamburgerBtn.classList.add('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      mobileNavDrawer.classList.add('open');
      mobileNavDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      hamburgerBtn.classList.remove('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      mobileNavDrawer.classList.remove('open');
      mobileNavDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => toggleMobileNav());
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMobileNav(false));
  });

  // ==========================================================================
  // 4. SCROLL REVEAL (INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal-fade-up');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  }

  const heroSection = document.getElementById('hero');
  if (heroSection) {
    setTimeout(() => {
      heroSection.classList.add('loaded');
    }, 150);
  }

  // ==========================================================================
  // 5. ACTIVE NAV LINK ON SCROLL
  // ==========================================================================
  const sections = document.querySelectorAll('section[id], footer[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  const updateActiveNavLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // ==========================================================================
  // 6. MACHINERY FLEET INTERACTIVE CATEGORY FILTER
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const machineCards = document.querySelectorAll('.machine-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      machineCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCategory === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.classList.add('is-revealed');
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================================================
  // 7. INTERACTIVE CONTACT / QUOTE MODAL
  // ==========================================================================
  const modalOverlay = document.getElementById('contactModalOverlay');
  const closeModalBtn = document.getElementById('closeContactModal');
  const openModalButtons = document.querySelectorAll('.open-contact-modal');
  const quoteForm = document.getElementById('quoteEnquiryForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');
  const requirementSelect = document.getElementById('contactRequirement');
  const messageInput = document.getElementById('contactMessage');

  const openModal = (preselectedCategory, customNote) => {
    if (!modalOverlay) return;
    if (preselectedCategory && requirementSelect) {
      let matched = false;
      for (let i = 0; i < requirementSelect.options.length; i++) {
        if (requirementSelect.options[i].text.toLowerCase().includes(preselectedCategory.toLowerCase())) {
          requirementSelect.selectedIndex = i;
          matched = true;
          break;
        }
      }
      if (!matched && customNote && messageInput) {
        messageInput.value = `Inquiry regarding: ${customNote}`;
      }
    }
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    toggleMobileNav(false);
  };

  const closeModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openModalButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Product card click hooks
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach((card) => {
    const actionBtn = card.querySelector('.product-card-action');
    const title = card.querySelector('.product-title');
    const categoryName = title ? title.textContent.trim() : '';

    if (actionBtn) {
      actionBtn.style.cursor = 'pointer';
      actionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(categoryName, categoryName);
      });
    }

    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      openModal(categoryName, categoryName);
    });
  });

  // Machine card click hooks
  machineCards.forEach((mCard) => {
    mCard.style.cursor = 'pointer';
    mCard.addEventListener('click', () => {
      const machineTitle = mCard.querySelector('.machine-title')?.textContent.trim() || 'Machinery';
      openModal('Precision CNC Machining Only', `Machinery capability: ${machineTitle}`);
    });
  });

  // Form submission handling (Modal & Contact Page)
  const formsToHandle = [
    document.getElementById('quoteEnquiryForm'),
    document.getElementById('contactPageForm')
  ].filter(Boolean);

  formsToHandle.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const feedbackAlert = form.querySelector('.form-feedback-alert') || formSuccessAlert;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Submitting...';
      }

      setTimeout(() => {
        if (feedbackAlert) {
          feedbackAlert.classList.add('show');
        }
        if (submitBtn) {
          submitBtn.innerHTML = 'Inquiry Sent ✓';
          submitBtn.style.backgroundColor = '#10b981';
          submitBtn.style.borderColor = '#10b981';
        }
        form.reset();

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `Send Inquiry <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
            submitBtn.style.backgroundColor = '';
            submitBtn.style.borderColor = '';
          }
        }, 4000);
      }, 500);
    });
  });

  // ==========================================================================
  // 8. BACK TO TOP SMOOTH SCROLL
  // ==========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // 9. HERO 3-VIDEO SLIDESHOW (5-SECOND AUTO-ROTATION)
  // ==========================================================================
  const heroVideos = document.querySelectorAll('.hero-video-slide');
  const slideIndicators = document.querySelectorAll('.slide-indicator');
  let currentSlideIndex = 0;
  let slideInterval = null;

  const showSlide = (index) => {
    if (!heroVideos.length) return;
    heroVideos.forEach((v, idx) => {
      if (idx === index) {
        v.classList.add('active');
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.classList.remove('active');
      }
    });

    slideIndicators.forEach((ind, idx) => {
      if (idx === index) {
        ind.classList.add('active');
      } else {
        ind.classList.remove('active');
      }
    });

    currentSlideIndex = index;
  };

  const nextSlide = () => {
    if (!heroVideos.length) return;
    const nextIdx = (currentSlideIndex + 1) % heroVideos.length;
    showSlide(nextIdx);
  };

  if (heroVideos.length > 1) {
    slideInterval = setInterval(nextSlide, 5000);

    slideIndicators.forEach((btn) => {
      btn.addEventListener('click', () => {
        clearInterval(slideInterval);
        const targetIdx = parseInt(btn.getAttribute('data-slide'), 10) || 0;
        showSlide(targetIdx);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  // ==========================================================================
  // 10. IMPACT NUMBER COUNT-UP ANIMATION
  // ==========================================================================
  const statElements = document.querySelectorAll('.count-up-number');

  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 1800;
    const start = 0;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quartic
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (target - start) * easeOut);
      el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
      }
    };

    requestAnimationFrame(updateCount);
  };

  if ('IntersectionObserver' in window && statElements.length > 0) {
    const statObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statElements.forEach((el) => statObserver.observe(el));
  } else {
    statElements.forEach((el) => animateCounter(el));
  }

  // ==========================================================================
  // 11. MOBILE NAVIGATION ACCORDIONS
  // ==========================================================================
  const mobileNavGroups = document.querySelectorAll('.mobile-nav-group');
  mobileNavGroups.forEach((grp) => {
    const headerBtn = grp.querySelector('.mobile-nav-group-header');
    if (headerBtn) {
      headerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = grp.classList.contains('open');
        mobileNavGroups.forEach((g) => g.classList.remove('open'));
        if (!isOpen) {
          grp.classList.add('open');
        }
      });
    }
  });

  // ==========================================================================
  // 12. CERTIFICATE LIGHTBOX MODAL
  // ==========================================================================
  const certBoxes = document.querySelectorAll('.certificate-preview-box');
  const certModal = document.getElementById('certModalOverlay');
  const certCloseBtn = document.getElementById('certModalClose');

  if (certBoxes.length && certModal) {
    certBoxes.forEach((box) => {
      box.addEventListener('click', () => {
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    if (certCloseBtn) {
      certCloseBtn.addEventListener('click', () => {
        certModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        certModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && certModal.classList.contains('active')) {
        certModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ==========================================================================
  // 14. PREVENT PARENT DROPDOWN CLICK & DESKTOP HOVER BEHAVIOR
  // ==========================================================================
  const dropdownParents = document.querySelectorAll('.nav-item-dropdown > .nav-link');
  dropdownParents.forEach((parentLink) => {
    parentLink.addEventListener('click', (e) => {
      e.preventDefault();
      // Clicking parent label must not navigate directly to a page
    });
  });

  // Ensure newly opened page scrolls to top
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

});

