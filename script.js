
let productIndex = 0;

function addProduct() {
  const container = document.getElementById("productContainer");
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <label>Nama Produk:</label>
    <input type="text" name="productName${productIndex}" required>
    <label>Deskripsi:</label>
    <textarea name="productDesc${productIndex}" required></textarea>
    <label>Harga:</label>
    <input type="number" name="productPrice${productIndex}" required>
    <label>Gambar Produk:</label>
    <input type="file" name="productImg${productIndex}" accept="image/*" onchange="previewImage(event, ${productIndex})">
    <br><img id="preview${productIndex}" src="" data-img="" />
  `;
  container.appendChild(div);
  productIndex++;
}

function previewImage(event, index) {
  const reader = new FileReader();
  reader.onload = function(){
    const preview = document.getElementById(`preview${index}`);
    preview.src = reader.result;
    preview.setAttribute("data-img", reader.result);
  };
  reader.readAsDataURL(event.target.files[0]);
}

document.getElementById("storeForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("storeName").value;
  const desc = document.getElementById("storeDesc").value;
  const color = document.getElementById("themeColor").value;
  const waNumber = document.getElementById("waNumber").value;

  let products = [];
  for (let i = 0; i < productIndex; i++) {
    products.push({
      name: document.querySelector(`[name=productName${i}]`).value,
      desc: document.querySelector(`[name=productDesc${i}]`).value,
      price: document.querySelector(`[name=productPrice${i}]`).value,
      img: document.getElementById(`preview${i}`).getAttribute("data-img") || ""
    });
  }

  const html = generateHTML(name, desc, color, products, waNumber);
  download("store.html", html);
});

function generateHTML(storeName, storeDesc, themeColor, products, wa) {
  const productHTML = products.map(p => `
    <div style="border:1px solid #ccc;padding:1rem;margin:1rem 0">
      <img src="${p.img}" style="max-width:150px;display:block;margin-bottom:10px"/>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <strong>Rp ${parseInt(p.price).toLocaleString()}</strong><br>
      <a href="https://wa.me/${wa}?text=Saya+mau+beli+${encodeURIComponent(p.name)}" target="_blank">Order</a>
    </div>
  `).join('');

  return `
    <html>
    <head>
      <title>${storeName}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body { font-family: sans-serif; background: #f9f9f9; padding:2rem; color:#333 }
        h1 { color: ${themeColor}; }
      </style>
    </head>
    <body>
      <h1>${storeName}</h1>
      <p>${storeDesc}</p>
      ${productHTML}
      <footer style="margin-top:2rem;color:#999;font-size:0.8rem">&copy; 2025 Copyright By Dinns</footer>
    </body>
    </html>
  `;
}

function download(filename, content) {
  const blob = new Blob([content], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function previewSite() {
  const name = document.getElementById("storeName").value;
  const desc = document.getElementById("storeDesc").value;
  const color = document.getElementById("themeColor").value;
  const waNumber = document.getElementById("waNumber").value;

  let products = [];
  for (let i = 0; i < productIndex; i++) {
    products.push({
      name: document.querySelector(`[name=productName${i}]`).value,
      desc: document.querySelector(`[name=productDesc${i}]`).value,
      price: document.querySelector(`[name=productPrice${i}]`).value,
      img: document.getElementById(`preview${i}`).getAttribute("data-img") || ""
    });
  }

  const html = generateHTML(name, desc, color, products, waNumber);
  const previewWindow = window.open("", "_blank");
  previewWindow.document.write(html);
  previewWindow.document.close();
}
