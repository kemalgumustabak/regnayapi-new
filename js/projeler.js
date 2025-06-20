
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function loadProjectList(type) {
  const projectList = document.getElementById("projectList");
  const pageTitle = document.getElementById("pageTitle");
  if (!projectList) return;

  pageTitle.textContent = type === "ongoing" ? "Devam Eden Projeler" : "Tamamlanmış Projeler";

  const projectSlugs = ["delta-konutlari", "novus-ofis-plaza"];

  for (const slug of projectSlugs) {
    try {
      const res = await fetch(`projects/${slug}.json`);
      if (!res.ok) continue;
      const data = await res.json();

      if (data.projectType !== type) continue;

      const html = `
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <img src="\${data.coverImage}" class="card-img-top" alt="\${data.title}">
            <div class="card-body">
              <h5 class="card-title">\${data.title}</h5>
              <p class="card-text">\${data.shortDescription}</p>
              <a href="proje.html?slug=\${data.slug}" class="btn btn-outline-primary">Detay</a>
            </div>
          </div>
        </div>
      `;
      projectList.innerHTML += html;

    } catch (err) {
      console.error("Proje yüklenemedi:", slug, err);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const type = getQueryParam("type") || "ongoing";
  loadProjectList(type);
});
