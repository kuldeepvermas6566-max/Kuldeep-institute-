document.addEventListener("DOMContentLoaded", () => {
  const c = SITE_CONFIG;

  // ---- Static site text/settings ----
  document.querySelectorAll("[data-institute-name]").forEach(el => el.textContent = c.instituteName);
  document.querySelectorAll("[data-short-name]").forEach(el => el.textContent = c.shortName);
  document.querySelectorAll("[data-tagline]").forEach(el => el.textContent = c.tagline);
  document.querySelectorAll("[data-hero-heading]").forEach(el => el.textContent = c.heroHeading);
  document.querySelectorAll("[data-hero-sub]").forEach(el => el.textContent = c.heroSub);
  document.querySelectorAll("[data-phone]").forEach(el => el.textContent = c.phone);
  document.querySelectorAll("[data-email]").forEach(el => el.textContent = c.email);
  document.querySelectorAll("[data-years]").forEach(el => el.textContent = c.yearsExperience + "+");
  document.querySelectorAll("[data-students]").forEach(el => el.textContent = c.studentsTrained);
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  const visitEl = document.getElementById("visit-branches");
  if (visitEl) visitEl.textContent = `${c.branches.length} Location${c.branches.length > 1 ? "s" : ""}`;

  const waLink = document.getElementById("wa-float-link");
  if (waLink) waLink.href = `https://wa.me/${c.whatsapp}`;
  document.querySelectorAll("[data-tel-link]").forEach(el => el.href = `tel:${c.phone.replace(/\s/g, "")}`);

  // ---- Why choose us ----
  const whyGrid = document.getElementById("why-grid");
  if (whyGrid) {
    whyGrid.innerHTML = c.whyChooseUs.map(w => `
      <div class="why-card reveal">
        <div class="icon">${w.icon}</div>
        <h4>${w.title}</h4>
        <p>${w.desc}</p>
      </div>
    `).join("");
  }

  // ---- Branches ----
  const branchGrid = document.getElementById("branch-grid");
  if (branchGrid) {
    branchGrid.innerHTML = c.branches.map(b => `
      <div class="branch-card reveal">
        <h4>${b.name}</h4>
        <p>${b.area}</p>
        <p>${b.phone}</p>
      </div>
    `).join("");
  }

  // ---- Courses: load from Firebase Realtime Database ----
  const ladder = document.getElementById("course-ladder");
  const courseSelect = document.getElementById("course-select");

  function renderCourses(courses) {
    // courses = array of {key, ...data}, sorted by level
    courses.sort((a, b) => (a.level || 0) - (b.level || 0));

    if (ladder) {
      if (courses.length === 0) {
        ladder.innerHTML = `<p style="color:var(--ink-soft);padding:20px 0;">Courses jald hi add honge.</p>`;
      } else {
        ladder.innerHTML = courses.map(course => `
          <a class="rung reveal" href="course.html?id=${course.key}">
            <div class="rung-level">${String(course.level || 1).padStart(2, "0")}</div>
            <div class="rung-body">
              <h3><span class="code mono">${course.code || ""}</span>${course.name}</h3>
              <p>${course.desc || ""}</p>
            </div>
            <div class="rung-meta">
              <div class="dur">${course.duration || ""}</div>
              <div class="fee">${course.fee || ""}</div>
            </div>
          </a>
        `).join("");
      }
    }

    if (courseSelect) {
      courseSelect.innerHTML = `<option value="">Select a course</option>` +
        courses.map(course => `<option value="${course.name}">${course.name}</option>`).join("");
    }

    initRevealAnimations();
  }

  if (typeof db !== "undefined") {
    db.ref("courses").on("value", (snapshot) => {
      const val = snapshot.val() || {};
      const courses = Object.keys(val).map(key => ({ key, ...val[key] }));
      renderCourses(courses);
    }, (err) => {
      console.error("Could not load courses:", err);
      if (ladder) ladder.innerHTML = `<p style="color:var(--ink-soft);">Courses load nahi ho paaye.</p>`;
    });
  }

  // ---- Enquiry form -> Firebase Realtime Database ----
  const form = document.getElementById("enquiry-form");
  const msg = document.getElementById("form-msg");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        email: form.email.value.trim(),
        course: form.course.value,
        message: form.message.value.trim(),
        createdAt: new Date().toISOString()
      };

      if (typeof db === "undefined") {
        msg.textContent = "Firebase config set nahi hai — firebase-config.js file check karo.";
        msg.className = "form-msg err";
        return;
      }

      try {
        await db.ref("enquiries").push(data);
        msg.textContent = "Enquiry submit ho gayi! Hum jaldi contact karenge.";
        msg.className = "form-msg ok";
        form.reset();
      } catch (err) {
        msg.textContent = "Kuch galat ho gaya, dobara try karo.";
        msg.className = "form-msg err";
        console.error(err);
      }
    });
  }

  initRevealAnimations();
});

// ---- Scroll reveal animation ----
function initRevealAnimations() {
  const els = document.querySelectorAll(".reveal:not(.revealed)");
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("revealed"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}
