// Script untuk memanggil file komponen HTML
document.querySelectorAll('[data-include]').forEach(el => {
  const file = el.getAttribute('data-include');
  
  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error(`Gagal memuat: ${file}`);
      return res.text();
    })
    .then(html => {
      el.outerHTML = html;
    })
    .catch(err => console.error(err));
});


document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const mainContent = document.getElementById("main-content");

  // Sembunyikan konten saat preloader aktif
  if (mainContent) {
    mainContent.classList.add("hidden");
  }

  // Setelah 1 detik, tampilkan konten dan fade out preloader
  setTimeout(() => {
    if (preloader) preloader.classList.add("hidden");
    if (mainContent) mainContent.classList.remove("hidden");
  }, 1000);

  // Handle klik link
  document.querySelectorAll("a").forEach(link => {
    const href = link.getAttribute("href");

    if (
      href &&
      !href.startsWith("#") &&
      !href.startsWith("javascript") &&
      !link.hasAttribute("target")
    ) {
      link.addEventListener("click", e => {
        e.preventDefault();

        // Langsung sembunyikan konten tanpa animasi
        if (mainContent) mainContent.classList.add("hidden");

        // Langsung tampilkan preloader (tanpa fade-in)
        if (preloader) preloader.classList.remove("hidden");

        setTimeout(() => {
          window.location.href = href;
        }, 800); // Delay supaya preloader terlihat
      });
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const galleryWrapper = document.getElementById("gallery-wrapper");
  const phoneNumber = "6282333045805"; // format internasional
  const messageTemplate = (name, price) =>
    `Halo, saya tertarik untuk rental ${name} dengan harga Rp${price.toLocaleString(
      "id-ID"
    )}/hari. Apakah masih tersedia?`;

  // Buat row per 3 item
  for (let i = 0; i < galleryData.length; i += 3) {
    const group = galleryData.slice(i, i + 3);
    const section = document.createElement("div");
    section.classList.add("gallery_section_2");

    let rowHTML = '<div class="row">';
    group.forEach((item) => {
      const formattedPrice = `Mulai dari Rp${item.price.toLocaleString(
        "id-ID"
      )}/hari`;
      const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        messageTemplate(item.name, item.price)
      )}`;

      rowHTML += `
        <div class="col-md-4 col-sm-6 col-12 mb-4">
          <div class="gallery_box">
            <div class="gallery_img">
              <img src="${item.img}" alt="${item.name}">
            </div>
            <h3 class="types_text">${item.name}</h3>
            <p class="looking_text">${formattedPrice}</p>
            <div class="read_bt">
              <a href="${waLink}" target="_blank">
                <i class="fab fa-whatsapp"></i> Book Now
              </a>
            </div>
          </div>
        </div>
      `;
    });

    rowHTML += "</div>";
    section.innerHTML = rowHTML;
    galleryWrapper.appendChild(section);
  }
});
