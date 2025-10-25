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


window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const mainContent = document.getElementById("main-content");

  // Setelah halaman benar-benar load, sembunyikan preloader pelan-pelan
  setTimeout(() => {
    if (preloader) preloader.classList.add("fade-out");
    setTimeout(() => {
      if (preloader) preloader.classList.add("hidden");
      if (mainContent) mainContent.classList.remove("hidden");
    }, 300);
  }, 500); // delay kecil biar efeknya smooth

  // Delegasi event ke seluruh dokumen untuk handle klik link (termasuk navbar)
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("javascript") ||
      link.hasAttribute("target")
    ) return;

    e.preventDefault();

    // Sembunyikan konten dan tampilkan preloader
    if (mainContent) mainContent.classList.add("hidden");
    if (preloader) preloader.classList.remove("hidden", "fade-out");

    // Delay supaya animasi preloader terlihat
    // setTimeout(() => {
      window.location.href = href;
    // }, 600);
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


(function () {
  // Jika ini di dalam iframe (player.html)
  if (window.self !== window.top) {
    const audio = document.getElementById("bgm");

    if (audio) {
      audio.volume = 0.5;

      // Fungsi untuk mencoba play
      const tryPlay = () => {
        audio.play().then(() => {
          document.removeEventListener("scroll", tryPlay);
          document.removeEventListener("click", tryPlay);
          document.removeEventListener("touchstart", tryPlay);
        }).catch(() => {});
      };

      // Coba autoplay
      audio.play().catch(() => {
        document.addEventListener("scroll", tryPlay, { once: true });
        document.addEventListener("click", tryPlay, { once: true });
        document.addEventListener("touchstart", tryPlay, { once: true });
      });

      // Hentikan musik saat tab ditutup
      window.addEventListener("beforeunload", () => {
        audio.pause();
      });
    }
    return;
  }

  // Jika ini halaman utama
  const existing = document.getElementById("bgm-frame");
  if (!existing) {
    const iframe = document.createElement("iframe");
    iframe.src = "player.html";
    iframe.id = "bgm-frame";
    iframe.style.display = "none";
    document.body.appendChild(iframe);
  }
})();
