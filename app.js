/**
 * APPLICATION RENDER ENGINE
 * Injects content.js data dynamically into DOM elements.
 */
document.addEventListener("DOMContentLoaded", () => {
  const data = portfolioData;

  // Render Hero Information
  document.getElementById("hero-title").textContent = data.personal.name;
  document.getElementById("hero-subtitle").textContent = `-- ${data.personal.subtitle}`;
  document.getElementById("hero-about").textContent = data.personal.about;
  document.getElementById("meta-location").textContent = data.personal.location;
  document.getElementById("meta-phone").textContent = data.personal.phone;
  document.getElementById("meta-email").textContent = data.personal.email;
  document.getElementById("meta-edu").textContent = "MSc Industrial Design (LUT)";
  
  // Set PDF Links
  const pdfBtn = document.getElementById("btn-download-pdf");
  pdfBtn.setAttribute("href", data.personal.pdfPath);
  document.getElementById("pdf-frame").setAttribute("src", data.personal.pdfPath);

  // Render Metrics
  const statsContainer = document.getElementById("stats-container");
  data.stats.forEach(stat => {
    const card = document.createElement("div");
    card.className = "stat-card";
    card.innerHTML = `<div class="stat-num">${stat.num}</div><div class="stat-desc">${stat.label}</div>`;
    statsContainer.appendChild(card);
  });

  // Render Clients
  const clientsContainer = document.getElementById("clients-container");
  data.clients.forEach(client => {
    const tag = document.createElement("span");
    tag.className = "client-pill";
    tag.textContent = client;
    clientsContainer.appendChild(tag);
  });

  // Render Projects
  const projectsContainer = document.getElementById("projects-container");
  data.projects.forEach((proj, idx) => {
    const card = document.createElement("article");
    card.className = `project-card ${idx % 2 !== 0 ? 'alt' : ''}`;
    
    const skillsHtml = proj.skills.map(s => `<span class="skill-tag">${s}</span>`).join('');
    
    card.innerHTML = `
      <div class="project-info">
        <span class="project-badge">${proj.badge}</span>
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.description}</p>
        <div class="project-skills">${skillsHtml}</div>
      </div>
      <div class="project-media">
        <img src="${proj.image}" alt="${proj.title}" onerror="this.src='https://via.placeholder.com/600x400?text=${encodeURIComponent(proj.title)}'">
      </div>
    `;
    projectsContainer.appendChild(card);
  });

  // Render Experience Timeline
  const expContainer = document.getElementById("experience-container");
  data.experience.forEach(item => {
    const el = document.createElement("div");
    el.className = "timeline-item";
    el.innerHTML = `
      <div class="timeline-date">${item.period}</div>
      <div class="timeline-role">${item.role}</div>
      <div class="timeline-company">${item.company}</div>
      <div class="timeline-desc">${item.desc}</div>
    `;
    expContainer.appendChild(el);
  });

  // Render Education
  const eduContainer = document.getElementById("education-container");
  data.education.forEach(item => {
    const el = document.createElement("div");
    el.className = "timeline-item";
    el.innerHTML = `
      <div class="timeline-date">${item.period}</div>
      <div class="timeline-role">${item.degree}</div>
      <div class="timeline-company">${item.school}</div>
    `;
    eduContainer.appendChild(el);
  });

  // Render Awards
  const awardsContainer = document.getElementById("awards-container");
  data.awards.forEach(item => {
    const card = document.createElement("div");
    card.className = "award-card";
    card.innerHTML = `
      <div class="award-title">${item.title}</div>
      <div class="award-project">${item.project}</div>
    `;
    awardsContainer.appendChild(card);
  });

  // Footer Contacts & Year
  document.getElementById("footer-contact-info").innerHTML = `
    <p><strong>Phone:</strong> ${data.personal.phone}</p>
    <p><strong>Email:</strong> <a href="mailto:${data.personal.email}">${data.personal.email}</a></p>
    <p><strong>Location:</strong> ${data.personal.location}</p>
  `;
  document.getElementById("year").textContent = new Date().getFullYear();
});
