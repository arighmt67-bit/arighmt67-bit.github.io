const GITHUB_USERNAME = 'arighmt67-bit';

const LANG_COLORS = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python: '#3572A5',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Java: '#B07219',
  Shell: '#89E051',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  PHP: '#4F5D95',
  Ruby: '#CC342D',
  Go: '#00ADD8',
  Rust: '#DEA584',
  Swift: '#FA7343',
  'C++': '#F34B7D',
  C: '#555555',
};

const projectImages = {
  'ssh-server-configuration-dicoding': 'ssh-server-configuration-dicoding/linux.jpg',
  'expense-tracker': 'Expense Tracker.png',
  'bookbase': 'Bookbase.png',
  'personal-notes': 'PersonalNotes.png',
  'flutter-google-office-app': 'FlutterGoogle.png',
  'building-a-web-server': 'WebServer.png',
  'bookshelf-api': 'BookshelfAPI.png'
};

async function loadProjects() {
  const grid = document.getElementById('projects-grid');
  const errorEl = document.getElementById('projects-error');

  try {
    // Create and insert the manual SSH card first
    const sshCard = document.createElement('a');
    sshCard.href = 'https://github.com/arighmt67-bit/ssh-server-configuration-dicoding';
    sshCard.target = '_blank';
    sshCard.rel = 'noopener noreferrer';
    sshCard.className = 'project-card';
    sshCard.innerHTML = `
      <div class="project-card-img">
        <img src="ssh-server-configuration-dicoding/linux.jpg" alt="ssh-server-configuration-dicoding" loading="lazy" />
      </div>
      <div class="project-card-content">
        <div class="project-name">ssh-server-configuration-dicoding</div>
        <div class="project-desc">Proyek akhir dari kelas Menjadi Linux System Administrator (Dicoding).</div>
        <div class="project-meta">
          <span class="project-lang"><span class="lang-dot" style="background:#89E051"></span>Shell</span>
          <span class="project-link">View ↗</span>
        </div>
      </div>
    `;
    grid.appendChild(sshCard);

    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`
    );
    if (!res.ok) throw new Error('GitHub API error');
    const repos = await res.json();

    const filtered = repos.filter(r => !r.fork && r.name !== 'ios-book-discovery-app').slice(0, 9);

    if (filtered.length === 0) {
      const noReposMsg = document.createElement('p');
      noReposMsg.style.color = 'var(--text-muted)';
      noReposMsg.style.fontSize = '0.875rem';
      noReposMsg.textContent = 'No public repositories found.';
      grid.appendChild(noReposMsg);
      return;
    }

    filtered.forEach(repo => {
      const color = repo.language ? (LANG_COLORS[repo.language] || '#888') : null;
      const desc = repo.description || 'No description provided.';
      const stars = repo.stargazers_count;

      const imgSrc = projectImages[repo.name];
      const imgHTML = imgSrc 
        ? `<div class="project-card-img">
             <img src="${imgSrc}" alt="${escapeHtml(repo.name)}" loading="lazy" />
           </div>` 
        : '';

      const card = document.createElement('a');
      card.href = repo.html_url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.className = 'project-card';
      card.innerHTML = `
        ${imgHTML}
        <div class="project-card-content">
          <div class="project-name">${escapeHtml(repo.name)}</div>
          <div class="project-desc">${escapeHtml(desc)}</div>
          <div class="project-meta">
            ${color ? `<span class="project-lang"><span class="lang-dot" style="background:${color}"></span>${escapeHtml(repo.language)}</span>` : ''}
            ${stars > 0 ? `<span class="project-stars">★ ${stars}</span>` : ''}
            <span class="project-link">View ↗</span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

  } catch (err) {
    grid.innerHTML = '';
    errorEl.hidden = false;
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const experienceData = {
  1: {
    title: 'Fencer',
    org: 'Tangerang Fencing Association (IKASI Kota Tangerang)',
    date: '2013–2018',
    items: [
      'Competed in regional fencing tournaments, multiple podium finishes.',
      'Reached Top 32 at 2015 National Championship.',
      'Learned discipline, perseverance, focus under pressure.',
    ],
  },
  2: {
    title: 'UI/UX Design Awardee',
    org: 'Binar Academy Scholarship Batch 2',
    date: 'Dec 2018–Feb 2019',
    items: [
      'Selected as 1 of 17 participants.',
      'Contributed to "Let\'s Talk" app connecting people seeking emotional support with listeners.',
      'Responsible for user research and UI/UX design in Figma.',
    ],
    viewLink: 'https://drive.google.com/file/d/1tS6bRfcnq8LwS0oOmg96kk3csSVon7ER/view?usp=drive_link',
  },
  3: {
    title: 'Barista (Part-time)',
    org: 'Kopilim',
    date: 'Feb 2018–Jan 2021',
    items: [
      'Worked part-time while studying full-time.',
      'Enhanced communication and hospitality skills.',
      'Developed discipline, adaptability, time management.',
    ],
  },
  4: {
    title: 'Activation Specialist (Internship)',
    org: 'Mekari',
    date: 'Dec 2021–June 2022',
    items: [
      'Supported customer onboarding and product adoption.',
      'Collaborated with diverse customers.',
      'Strengthened communication, problem-solving, customer experience skills.',
    ],
  },
  5: {
    title: 'Tech Support Officer (Full-time)',
    org: 'Sekolah.mu',
    date: 'Oct 2025–Present',
    items: [
      'Provide technical support, resolve IT issues, manage system access.',
      'Prepare devices for onboarding.',
      'Strengthened analytical thinking and troubleshooting skills.',
    ],
  },
  6: {
    title: 'AWS re/Start Program',
    org: 'Orbit Future Academy',
    date: 'March–June 2026',
    items: [
      'Completed intensive cloud engineering program (AWS, Linux, Python, networking, security, DevOps).',
      'Hands-on cloud infrastructure experience.',
      'Strengthened problem-solving and sysadmin skills.',
    ],
  },
};

const modalBackdrop = document.getElementById('experience-modal');
const modalTitle = document.getElementById('experience-modal-title');
const modalOrg = document.getElementById('experience-modal-org');
const modalDate = document.getElementById('experience-modal-date');
const modalList = document.getElementById('experience-modal-list');
const modalClose = document.getElementById('experience-modal-close');

function openExperienceModal(id) {
  const experience = experienceData[id];
  if (!experience) return;

  modalTitle.textContent = experience.title;
  modalOrg.textContent = experience.org;
  modalDate.textContent = experience.date;
  modalList.innerHTML = experience.items
    .map(item => `<li>${escapeHtml(item)}</li>`)
    .join('');
  
  // Remove existing view button if any
  const existingViewBtn = document.querySelector('.modal-view-btn');
  if (existingViewBtn) existingViewBtn.remove();

  // Add view button if viewLink exists
  if (experience.viewLink) {
    const viewBtn = document.createElement('a');
    viewBtn.href = experience.viewLink;
    viewBtn.target = '_blank';
    viewBtn.rel = 'noopener';
    viewBtn.className = 'btn btn-primary modal-view-btn';
    viewBtn.textContent = 'View ↗';
    modalList.parentElement.appendChild(viewBtn);
  }

  modalBackdrop.classList.add('active');
  modalBackdrop.setAttribute('aria-hidden', 'false');
}

function closeExperienceModal() {
  modalBackdrop.classList.remove('active');
  modalBackdrop.setAttribute('aria-hidden', 'true');
}

modalClose.addEventListener('click', closeExperienceModal);
modalBackdrop.addEventListener('click', event => {
  if (event.target === modalBackdrop) {
    closeExperienceModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modalBackdrop.classList.contains('active')) {
    closeExperienceModal();
  }
});

document.querySelectorAll('.experience-btn').forEach(button => {
  button.addEventListener('click', () => {
    openExperienceModal(button.dataset.experienceId);
  });
});

const blogCarousel = document.querySelector('.blog-carousel');
const carouselTrack = document.querySelector('.blog-carousel-track');
const blogDots = document.getElementById('blog-carousel-dots');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const blogSlides = Array.from(document.querySelectorAll('.blog-slide'));
let currentSlide = 0;
let carouselInterval = null;
const CAROUSEL_INTERVAL_MS = 4000;

function updateBlogCarousel() {
  const offset = currentSlide * -100;
  carouselTrack.style.transform = `translateX(${offset}%)`;
  blogDots.querySelectorAll('.carousel-dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
  prevButton.disabled = currentSlide === 0;
  nextButton.disabled = currentSlide === blogSlides.length - 1;
}

function createBlogDots() {
  blogSlides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Show slide ${index + 1}`);
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateBlogCarousel();
    });
    blogDots.appendChild(dot);
  });
}

function startCarouselAutoSlide() {
  stopCarouselAutoSlide();
  carouselInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % blogSlides.length;
    updateBlogCarousel();
  }, CAROUSEL_INTERVAL_MS);
}

function stopCarouselAutoSlide() {
  if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = null;
  }
}

prevButton.addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide -= 1;
    updateBlogCarousel();
  }
});

nextButton.addEventListener('click', () => {
  if (currentSlide < blogSlides.length - 1) {
    currentSlide += 1;
    updateBlogCarousel();
  }
});

blogCarousel.addEventListener('mouseenter', stopCarouselAutoSlide);
blogCarousel.addEventListener('mouseleave', startCarouselAutoSlide);

createBlogDots();
updateBlogCarousel();
startCarouselAutoSlide();

const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

const navLinkItems = document.querySelectorAll('.nav-links a');

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

const formSubmit = document.getElementById('form-submit');
if (formSubmit) {
  formSubmit.addEventListener('click', () => {
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }
    window.location.href =
      'mailto:arirahmatromadhon@gmail.com' +
      '?subject=Portfolio Contact from ' + encodeURIComponent(name) +
      '&body=' + encodeURIComponent(message) +
      '%0A%0AFrom: ' + encodeURIComponent(email);
  });
}

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const sectionId = entry.target.id;
      const matchingLink = Array.from(navLinkItems).find(link => link.getAttribute('href') === `#${sectionId}`);
      if (!matchingLink) return;

      if (entry.isIntersecting) {
        matchingLink.classList.add('active');
      } else {
        matchingLink.classList.remove('active');
      }
    });
  },
  { threshold: 0.4 }
);

const observedSections = [
  document.querySelector('#about-full'),
  document.querySelector('#skills'),
  document.querySelector('#experiences'),
  document.querySelector('#portfolio'),
  document.querySelector('#blogs'),
  document.querySelector('#contact-me')
].filter(Boolean);
observedSections.forEach(section => sectionObserver.observe(section));

const scrollTopBtn = document.getElementById('scroll-top-btn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

loadProjects();
