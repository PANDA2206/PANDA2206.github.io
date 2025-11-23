/*
 * Main JavaScript for Pankaj Rathi's portfolio
 *
 * This file contains behaviour to enhance interactivity across the site:
 * - Mobile navigation toggling
 * - Typing animation on the hero subtitle
 * - Animated counters on the hero metrics
 * - Charts on the skills and experience pages
 * - Filtering on the projects page
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Typing animation for hero subtitle
  const typedElement = document.getElementById('typedText');
  if (typedElement) {
    const phrases = [
      'AI & Robotics Enthusiast',
      'Machine Learning Engineer',
      'Data Scientist'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let currentPhrase = '';
    let deleting = false;
    function typeLoop() {
      const full = phrases[phraseIndex];
      if (!deleting) {
        currentPhrase = full.substring(0, charIndex++);
      } else {
        currentPhrase = full.substring(0, charIndex--);
      }
      typedElement.textContent = currentPhrase;
      let delay = deleting ? 50 : 100;
      if (!deleting && charIndex === full.length) {
        delay = 1500;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 500;
      }
      setTimeout(typeLoop, delay);
    }
    typeLoop();
  }

  // Animated counters
  const counters = document.querySelectorAll('.count');
  if (counters.length) {
    counters.forEach(counter => {
      const animateCounter = () => {
        const target = +counter.dataset.target;
        const increment = Math.max(1, Math.floor(target / 200));
        function update() {
          const current = +counter.innerText;
          if (current < target) {
            counter.innerText = current + increment;
            requestAnimationFrame(update);
          } else {
            counter.innerText = target;
          }
        }
        update();
      };
      // Trigger animation when element enters viewport
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter();
            observer.disconnect();
          }
        });
      }, { threshold: 0.6 });
      observer.observe(counter);
    });
  }

  // Skills radar chart
  const skillsChartEl = document.getElementById('skillsChart');
  if (skillsChartEl) {
    new Chart(skillsChartEl, {
      type: 'radar',
      data: {
        labels: [
          'Programming',
          'Data Engineering',
          'AI & ML',
          'Generative AI & LLMs',
          'Cloud & Infrastructure',
          'Statistical & Analysis'
        ],
        datasets: [
          {
            label: 'Proficiency (1–10)',
            data: [9, 8, 8, 7, 7, 7],
            backgroundColor: 'rgba(100, 255, 218, 0.2)',
            borderColor: '#64ffda',
            pointBackgroundColor: '#64ffda',
            pointBorderColor: '#64ffda',
            pointHoverBackgroundColor: '#0a192f',
            pointHoverBorderColor: '#64ffda'
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            angleLines: { color: '#1c3552' },
            grid: { color: '#1c3552' },
            suggestedMin: 0,
            suggestedMax: 10,
            pointLabels: { color: '#8892b0', font: { size: 12 } },
            ticks: { backdropColor: 'transparent', color: '#8892b0', stepSize: 2 }
          }
        },
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Skill Proficiency',
            color: '#ccd6f6',
            font: { size: 16, weight: '600' }
          }
        }
      }
    });
  }

  // Experience bar chart
  const experienceChartEl = document.getElementById('experienceChart');
  if (experienceChartEl) {
    new Chart(experienceChartEl, {
      type: 'bar',
      data: {
        labels: [
          'Sereact GmbH',
          'IAV GmbH',
          'Cotinga GmbH',
          'Bharat Electronics',
          'ONGC'
        ],
        datasets: [
          {
            label: 'Duration (months)',
            data: [3, 7, 7, 6, 3],
            backgroundColor: '#64ffda',
            borderColor: '#64ffda',
            borderWidth: 1,
            borderRadius: 5
          }
        ]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            ticks: { color: '#8892b0', stepSize: 2 },
            grid: { color: '#1c3552' },
            title: {
              display: true,
              text: 'Months',
              color: '#ccd6f6',
              font: { size: 14, weight: '600' }
            }
          },
          y: {
            ticks: { color: '#8892b0' },
            grid: { color: '#1c3552' }
          }
        },
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Experience Duration',
            color: '#ccd6f6',
            font: { size: 16, weight: '600' }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  // Projects filtering
  const filterLinks = document.querySelectorAll('.filter-link');
  const projectItems = document.querySelectorAll('.project-item');
  if (filterLinks.length && projectItems.length) {
    filterLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const filter = link.dataset.filter;
        filterLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        projectItems.forEach(item => {
          // Determine if item should be shown
          if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          } else {
            item.style.display = 'none';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
          }
        });
      });
    });
  }
});