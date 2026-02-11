(function(){
  const $ = (id) => document.getElementById(id);

  // Footer year
  const y = $("year");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile nav
  const navToggle = $("navToggle");
  const navMenu = $("navMenu");
  if (navToggle && navMenu){
    navToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("show");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        navMenu.classList.remove("show");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Theme toggle (persist)
  const themeToggle = $("themeToggle");
  const saved = localStorage.getItem("theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);

  if (themeToggle){
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  // Copy message
  const copyBtn = $("copyBtn");
  if (copyBtn){
    copyBtn.addEventListener("click", async () => {
      const name = ($("name")?.value || "").trim();
      const email = ($("email")?.value || "").trim();
      const msg = ($("message")?.value || "").trim();

      const text =
`Name: ${name}
Email: ${email}

Message:
${msg}`.trim();

      try{
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = "Copied!";
        setTimeout(() => (copyBtn.textContent = "Copy message"), 1200);
      }catch(e){
        alert("Could not copy. Please copy manually.");
      }
    });
  }
})();