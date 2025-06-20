
async function loadProjects(type) {
  const containerId = type === "ongoing" ? "ongoing-projects" : "completed-projects";
  const container = document.getElementById(containerId);
  if (!container) return;

  const projectSlugs = ["delta-konutlari", "novus-ofis-plaza"];
  let isFirst = true;

  for (const slug of projectSlugs) {
    try {
      const res = await fetch(`projects/${slug}.json`);
      if (!res.ok) throw new Error("Veri alınamadı: " + slug);
      const data = await res.json();

      if (data.projectType !== type) continue;

      const html = `
        <div class="carousel-item ${isFirst ? "active" : ""}">
          <img src="\${data.coverImage}" class="d-block w-100" alt="\${data.title}">
          <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
            <h5>\${data.title}</h5>
            <p>\${data.location}</p>
          </div>
        </div>
      `;
      container.innerHTML += html;
      isFirst = false;

    } catch (err) {
      console.error("Hata:", err);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadProjects("ongoing");
  loadProjects("completed");
});
