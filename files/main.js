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

async function loadProjects() {
  const grid = document.getElementById('projects-grid');
  const errorEl = document.getElementById('projects-error');

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`
    );
    if (!res.ok) throw new Error('GitHub API error');
    const repos = await res.json();

    const filtered = repos.filter(r => !r.fork).slice(0, 9);

    grid.innerHTML = '';

    if (filtered.length === 0) {
      grid.innerHTML = '<p style="color:var(--text-muted);font-size:0.875rem">No public repositories found.</p>';
      return;
    }

    filtered.forEach(repo => {
      const color = repo.language ? (LANG_COLORS[repo.language] || '#888') : null;
      const desc = repo.description || 'No description provided.';
      const stars = repo.stargazers_count;

      const card = document.createElement('a');
      card.href = repo.html_url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.className = 'project-card';
      card.innerHTML = `
        <div class="project-name">${escapeHtml(repo.name)}</div>
        <div class="project-desc">${escapeHtml(desc)}</div>
        <div class="project-meta">
          ${color ? `<span class="project-lang"><span class="lang-dot" style="background:${color}"></span>${escapeHtml(repo.language)}</span>` : ''}
          ${stars > 0 ? `<span class="project-stars">★ ${stars}</span>` : ''}
          <span class="project-link">View ↗</span>
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

loadProjects();
