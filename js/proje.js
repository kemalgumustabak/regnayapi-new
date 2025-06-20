
function getSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug");
}

async function loadProjectDetail() {
  const slug = getSlug();
  if (!slug) return;

  try {
    const res = await fetch(`projects/${slug}.json`);
    if (!res.ok) throw new Error("Proje bulunamadı");
    const data = await res.json();

    const detailEl = document.getElementById("projectDetail");

    let gallery = "";
    if (data.projectImages && data.projectImages.length > 0) {
      gallery = '<div class="row">';
      data.projectImages.forEach((img) => {
        gallery += `
          <div class="col-md-4 mb-3">
            <img src="\${img}" class="img-fluid rounded shadow-sm" alt="Proje Görseli">
          </div>
        `;
      });
      gallery += "</div>";
    }

    detailEl.innerHTML = `
      <h2 class="mb-4">\${data.title}</h2>
      <p><strong>Lokasyon:</strong> \${data.location}</p>
      <p><strong>Yıl:</strong> \${data.year}</p>
      <p><strong>Müşteri:</strong> \${data.costumer}</p>
      <p class="mt-4">\${data.longDescription}</p>
      \${gallery}
    `;

  } catch (err) {
    console.error("Detay yükleme hatası:", err);
    document.getElementById("projectDetail").innerHTML = "<p class='text-danger'>Proje bilgisi yüklenemedi.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadProjectDetail);
