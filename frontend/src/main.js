import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ==========================================================================
   SMOOTH SCROLLING (Lenis)
   ========================================================================== */
let lenis;
if (!prefersReducedMotion) {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease-out-expo
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

/* ==========================================================================
   CUSTOM CURSOR & FLOAT PREVIEW IMAGE
   ========================================================================== */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
const cursorImageContainer = document.getElementById('cursor-image-container');
const cursorImage = document.getElementById('cursor-image');

if (!prefersReducedMotion && cursor && cursorFollower) {
  // Positional quicksetters for high performance cursor movements
  const setCursorX = gsap.quickTo(cursor, 'left', { duration: 0.1, ease: 'power2.out' });
  const setCursorY = gsap.quickTo(cursor, 'top', { duration: 0.1, ease: 'power2.out' });
  
  const setFollowerX = gsap.quickTo(cursorFollower, 'left', { duration: 0.3, ease: 'power3.out' });
  const setFollowerY = gsap.quickTo(cursorFollower, 'top', { duration: 0.3, ease: 'power3.out' });
  
  const setImageContainerX = gsap.quickTo(cursorImageContainer, 'left', { duration: 0.4, ease: 'power3.out' });
  const setImageContainerY = gsap.quickTo(cursorImageContainer, 'top', { duration: 0.4, ease: 'power3.out' });

  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    
    setCursorX(clientX);
    setCursorY(clientY);
    
    setFollowerX(clientX);
    setFollowerY(clientY);
    
    setImageContainerX(clientX);
    setImageContainerY(clientY);
  });

  // Standard hover state logic
  const interactiveElements = document.querySelectorAll('a, button, select, textarea, input');
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
      cursorFollower.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
      cursorFollower.classList.remove('hovered');
    });
  });

  // Project cards (PLAY text state)
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      cursor.classList.add('play-state');
      cursorFollower.classList.add('play-state');
    });
    card.addEventListener('mouseleave', () => {
      cursor.classList.remove('play-state');
      cursorFollower.classList.remove('play-state');
    });
  });

  // Services item hover preview image logic
  const serviceItems = document.querySelectorAll('.service-item');
  serviceItems.forEach((item) => {
    const imageUrl = item.getAttribute('data-image-url');
    
    item.addEventListener('mouseenter', () => {
      if (imageUrl && cursorImage && cursorImageContainer) {
        cursorImage.src = imageUrl;
        cursorImageContainer.classList.add('active');
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
      }
    });

    item.addEventListener('mouseleave', () => {
      if (cursorImageContainer) {
        cursorImageContainer.classList.remove('active');
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
      }
    });
  });
}

/* ==========================================================================
   PRELOADER & HERO ENTRANCE ANIMATIONS
   ========================================================================== */
const preloader = document.getElementById('preloader');
const progressFill = document.getElementById('progress-fill');
const loaderPercentage = document.getElementById('loader-percentage');

const runEntranceAnimations = () => {
  // Hero entry animation
  const tl = gsap.timeline();
  
  tl.to('.hero-bg-video', {
    scale: 1,
    duration: 2.2,
    ease: 'power3.out'
  });

  tl.to('.hero-title span', {
    y: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: 'power4.out'
  }, '-=1.8');

  tl.to('.hero-eyebrow', {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.8');

  tl.to('.hero-cta-wrapper', {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.8');

  tl.to('.scroll-indicator', {
    opacity: 1,
    duration: 1.5,
    ease: 'power2.out'
  }, '-=0.5');
};

const initPreloader = () => {
  let percentage = 0;
  const interval = setInterval(() => {
    const step = Math.floor(Math.random() * 15) + 3;
    percentage = Math.min(100, percentage + step);
    
    if (progressFill) progressFill.style.width = `${percentage}%`;
    if (loaderPercentage) loaderPercentage.textContent = percentage.toString().padStart(2, '0');
    
    if (percentage >= 100) {
      clearInterval(interval);
      
      if (preloader) {
        gsap.to(preloader, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            preloader.style.display = 'none';
            runEntranceAnimations();
          }
        });
      } else {
        runEntranceAnimations();
      }
    }
  }, 100);
};

window.addEventListener('DOMContentLoaded', initPreloader);

/* ==========================================================================
   SCROLLED HEADER STYLING
   ========================================================================== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

/* ==========================================================================
   MOBILE MENU DRAWER
   ========================================================================== */
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

if (menuToggle && mobileNav) {
  const toggleMobileMenu = () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mobileNav.setAttribute('aria-hidden', isExpanded);
    mobileNav.classList.toggle('active');
    
    document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
    if (lenis) {
      if (isExpanded) lenis.start();
      else lenis.stop();
    }
  };

  menuToggle.addEventListener('click', toggleMobileMenu);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMobileMenu();
    });
  });
}

/* ==========================================================================
   HORIZONTAL SCROLL (PORTFOLIO SECTION)
   ========================================================================== */
const portfolioSection = document.getElementById('portfolio');
const portfolioSticky = document.getElementById('portfolio-sticky');
const portfolioTrack = document.getElementById('portfolio-track');

if (portfolioTrack && portfolioSticky && !prefersReducedMotion) {
  const mq = window.matchMedia('(min-width: 1025px)');
  
  let scrollTween;

  const initHorizontalScroll = () => {
    if (mq.matches) {
      const trackWidth = portfolioTrack.scrollWidth;
      const amountToScroll = trackWidth - window.innerWidth;
      
      portfolioSection.style.height = `${amountToScroll + window.innerHeight}px`;

      scrollTween = gsap.to(portfolioTrack, {
        x: -amountToScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: portfolioSection,
          start: 'top top',
          end: `+=${amountToScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    } else {
      portfolioSection.style.height = 'auto';
      if (scrollTween) {
        scrollTween.scrollTrigger.kill(true);
        scrollTween.kill();
      }
      gsap.set(portfolioTrack, { x: 0 });
    }
  };

  initHorizontalScroll();
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
    initHorizontalScroll();
  });
}

// Hover project card -> Play muted video loop
const hoverVideoCards = document.querySelectorAll('.project-card');
hoverVideoCards.forEach((card) => {
  const video = card.querySelector('.project-hover-video');
  if (video) {
    card.addEventListener('mouseenter', () => {
      video.play().catch(() => {});
    });
    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  }
});

/* ==========================================================================
   VIDEO PLAYER MODAL
   ========================================================================== */
const videoModal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
const modalClose = document.getElementById('modal-close');
const modalBackdrop = document.getElementById('modal-backdrop');
const btnShowreel = document.getElementById('btn-showreel');
const projectCards = document.querySelectorAll('.project-card');

const defaultReelUrl = 'https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-a-man-filming-with-a-professional-camera-42823-large.mp4';

const openVideoModal = (videoUrl) => {
  if (videoModal && modalVideo) {
    modalVideo.src = videoUrl || defaultReelUrl;
    videoModal.classList.add('active');
    videoModal.setAttribute('aria-hidden', 'false');
    modalVideo.play();
    
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  }
};

const closeVideoModal = () => {
  if (videoModal && modalVideo) {
    videoModal.classList.remove('active');
    videoModal.setAttribute('aria-hidden', 'true');
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.src = '';
    
    document.body.style.overflow = 'auto';
    if (lenis) lenis.start();
  }
};

if (btnShowreel) {
  btnShowreel.addEventListener('click', () => openVideoModal(defaultReelUrl));
}

projectCards.forEach((card) => {
  card.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') {
      const videoUrl = card.getAttribute('data-video-url');
      openVideoModal(videoUrl);
    }
  });
});

const playButtons = document.querySelectorAll('.project-btn-play');
playButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.project-card');
    if (card) {
      const videoUrl = card.getAttribute('data-video-url');
      openVideoModal(videoUrl);
    }
  });
});

if (modalClose && modalBackdrop) {
  modalClose.addEventListener('click', closeVideoModal);
  modalBackdrop.addEventListener('click', closeVideoModal);
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
      closeVideoModal();
    }
  });
}

/* ==========================================================================
   CONTACT MODAL FORM
   ========================================================================== */
const contactModal = document.getElementById('contact-modal');
const contactModalBackdrop = document.getElementById('contact-modal-backdrop');
const contactModalClose = document.getElementById('contact-modal-close');
const btnOpenForm = document.getElementById('btn-open-form');
const btnNavContact = document.getElementById('btn-nav-contact');
const mobileNavContact = document.getElementById('mobile-nav-contact');
const projectForm = document.getElementById('project-form');
const successMsg = document.getElementById('success-msg');

const openContactModal = (e) => {
  if (e) e.preventDefault();
  if (contactModal) {
    contactModal.classList.add('active');
    contactModal.setAttribute('aria-hidden', 'false');
    
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  }
};

const closeContactModal = () => {
  if (contactModal) {
    contactModal.classList.remove('active');
    contactModal.setAttribute('aria-hidden', 'true');
    
    setTimeout(() => {
      if (projectForm) {
        projectForm.reset();
        projectForm.style.display = 'flex';
      }
      if (successMsg) successMsg.classList.remove('active');
    }, 500);
    
    document.body.style.overflow = 'auto';
    if (lenis) lenis.start();
  }
};

if (btnOpenForm) btnOpenForm.addEventListener('click', openContactModal);
if (btnNavContact) btnNavContact.addEventListener('click', openContactModal);
if (mobileNavContact) mobileNavContact.addEventListener('click', openContactModal);

if (contactModalClose && contactModalBackdrop) {
  contactModalClose.addEventListener('click', closeContactModal);
  contactModalBackdrop.addEventListener('click', closeContactModal);
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('active')) {
      closeContactModal();
    }
  });
}

if (projectForm) {
  projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = projectForm.querySelector('.btn-form-submit');
    const submitBtnText = submitBtn.querySelector('span');
    if (submitBtnText) submitBtnText.textContent = 'ENVIANDO...';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      projectForm.style.display = 'none';
      if (successMsg) successMsg.classList.add('active');
      
      if (submitBtnText) submitBtnText.textContent = 'ENVIAR PROPOSTA';
      submitBtn.style.opacity = '1';
      submitBtn.disabled = false;
      
      setTimeout(closeContactModal, 3500);
    }, 1500);
  });
}
