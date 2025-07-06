
let productIndex = 0;

function addProduct() {
  const container = document.getElementById("products");
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <label>Nama Produk:</label><input type="text" name="productName${productIndex}" required>
    <label>Deskripsi Produk:</label><input type="text" name="productDesc${productIndex}" required>
    <label>Harga Produk:</label><input type="number" name="productPrice${productIndex}" required>
    <label>Gambar Produk:</label><input type="file" onchange="loadImg(event, ${productIndex})" required>
    <img id="preview${productIndex}" data-img="" style="max-width:80px;margin-top:5px"/>
  `;
  container.appendChild(div);
  productIndex++;
}

function loadImg(event, index) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = document.getElementById("preview" + index);
    img.src = reader.result;
    img.setAttribute("data-img", reader.result);
  };
  reader.readAsDataURL(event.target.files[0]);
}

function previewLogo() {
  const input = document.getElementById('logoImg');
  const reader = new FileReader();
  reader.onload = function () {
    const preview = document.getElementById('logoPreview');
    preview.src = reader.result;
    preview.setAttribute("data-img", reader.result);
  };
  if (input.files[0]) {
    reader.readAsDataURL(input.files[0]);
  }
}

function previewSite() {
  const name = document.getElementById("storeName").value;
  const desc = document.getElementById("storeDesc").value;
  const color = document.getElementById("themeColor").value;
  const waNumber = document.getElementById("waNumber").value;
  const logo = document.getElementById("logoPreview").getAttribute("data-img") || "";

  let products = [];
  for (let i = 0; i < productIndex; i++) {
    products.push({
      name: document.querySelector(`[name=productName${i}]`).value,
      desc: document.querySelector(`[name=productDesc${i}]`).value,
      price: document.querySelector(`[name=productPrice${i}]`).value,
      img: document.getElementById(`preview${i}`).getAttribute("data-img") || ""
    });
  }

  const html = generateGalaxyHTML(name, desc, color, products, waNumber, logo);
  const previewWindow = window.open("", "_blank");
  previewWindow.document.write(html);
  previewWindow.document.close();
}

document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("storeName").value;
  const desc = document.getElementById("storeDesc").value;
  const color = document.getElementById("themeColor").value;
  const waNumber = document.getElementById("waNumber").value;
  const logo = document.getElementById("logoPreview").getAttribute("data-img") || "";

  let products = [];
  for (let i = 0; i < productIndex; i++) {
    products.push({
      name: document.querySelector(`[name=productName${i}]`).value,
      desc: document.querySelector(`[name=productDesc${i}]`).value,
      price: document.querySelector(`[name=productPrice${i}]`).value,
      img: document.getElementById(`preview${i}`).getAttribute("data-img") || ""
    });
  }

  const html = generateGalaxyHTML(name, desc, color, products, waNumber, logo);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "store.html";
  link.click();
});

function generateGalaxyHTML(storeName, storeDesc, themeColor, products, wa, logo) {
  const productHTML = products.map(p => `
    <div class="product" style="transition:transform .2s, box-shadow .3s;">
      <img src="${p.img}" alt="${p.name}" style="width:100px;height:100px;object-fit:cover;border-radius:8px;display:block;margin:0 auto .5rem;">
      <div style="text-align:center">
        <h3 style='margin:0.3rem 0'>${p.name}</h3>
        <p style='margin:0'>${p.desc}</p>
        <strong>Rp ${parseInt(p.price).toLocaleString()}</strong><br>
        <a href="https://wa.me/${wa}?text=Assalamualaikum%20bang%2C%20mau%20order%20${encodeURIComponent(p.name)}%2C%20apakah%20masih%3F" target="_blank" class="order-btn">Order</a>
      </div>
    </div>
  `).join('');

  return `
    <html lang="id">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${storeName}</title>
      <style>
        body {
          font-family: 'Segoe UI', sans-serif;
          margin: 0;
          padding: 1rem;
          background: linear-gradient(to right, #0f0c29, #302b63, #24243e);
          color: white;
          animation: fadeIn 1s ease;
        }
        h1 { text-align: center; color: ${themeColor}; font-size: 1.6rem; }
        .logo { text-align: center; margin-bottom: 1rem; }
        .logo img { max-width: 120px; border-radius: 50%; }
        .product:hover {
          transform: scale(1.02);
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
        .order-btn {
          background: #00d2ff;
          color: black;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          font-weight: bold;
          display: inline-block;
          transition: transform 0.1s ease;
        }
        .order-btn:active { transform: scale(0.96); }
        footer {
          text-align: center;
          font-size: 0.8rem;
          margin-top: 2rem;
          color: #bbb;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
    </head>
    <body>
      <div class="logo">${logo ? `<img src="${logo}" alt="Logo Toko" />` : ''}</div>
      <h1>${storeName}</h1>
      <p style="text-align:center">${storeDesc}</p>
      ${productHTML}
      <footer>&copy; 2025 Copyright By Dinns</footer>
    </body>
    </html>`;
}
