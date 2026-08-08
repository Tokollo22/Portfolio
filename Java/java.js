document.addEventListener("DOMContentLoaded", () => {

  const ProjectsBtn=document.querySelector(".Projects-btn");
  
  ProjectsBtn.addEventListener("Click",()=> {
    window.location.href="#Projects";
  });

  const cards = document.querySelectorAll(".reveal-card");

  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    { threshold: 0.25 }
  );

  cards.forEach((card) => {
    observer.observe(card);

    const updateCardPosition = () => {
      const rect = card.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const isVisible = rect.top < viewportHeight * 0.95 && rect.bottom > 0;

      if (!isVisible) {
        card.style.setProperty("--card-offset", "80px");
        card.style.opacity = "0";
        return;
      }

      const progress = Math.min(
        Math.max((viewportHeight * 0.8 - rect.top) / (viewportHeight * 0.5), 0),
        1
      );
      const offset = (1 - progress) * 24;

      card.classList.add("is-visible");
      card.style.setProperty("--card-offset", `${offset}px`);
      card.style.opacity = "1";
    };

    window.addEventListener("scroll", updateCardPosition, { passive: true });
    window.addEventListener("resize", updateCardPosition);
    updateCardPosition();
  });

  
});
