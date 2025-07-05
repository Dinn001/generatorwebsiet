
let productIndex = 0;

function addProduct() {
  const container = document.getElementById("productContainer");
  const productHTML = `
    <div class="product" style="border:1px solid #ccc;padding:1rem;margin:1rem 0">
      <label>Nama Produk:</label>
      <input type="text" name="productName${productIndex}" required>
      
      <label>Deskripsi:</label>
      <textarea name="productDesc${productIndex}" required></textarea>
      
      <label>Harga:</label>
      <input type="number" name="productPrice${productIndex}" required>
      
      <label>Link Order (WA):</label>
      <input type="text" name="productLink${productIndex}" required>
      
      <label>Gambar Produk:</label>
      <input type="file" name="productImg${productIndex}" accept="image/*" onchange="previewImage(event, ${productIndex})">
      <br>
      <img id="preview${productIndex}" src="" style="max-width:150px;margin-top:10px" />
    </div>
  `;
  container.insertAdjacentHTML('beforeend', productHTML);
  productIndex++;
}

function previewImage(event, index) {
  const reader = new FileReader();
  reader.onload = function(){
    document.getElementById(`preview${index}`).src = reader.result;
    document.getElementById(`preview${index}`).setAttribute("data-img", reader.result);
  };
  reader.readAsDataURL(event.target.files[0]);
}

document.getElementById("storeForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const name = document.getElementById("storeName").value;
  const desc = document.getElementById("storeDesc").value;
  const color = document.getElementById("themeColor").value;
  
  let products = [];
  for (let i = 0; i < productIndex; i++) {
    const p = {
      name: document.querySelector(`[name=productName${i}]`).value,
      desc: document.querySelector(`[name=productDesc${i}]`).value,
      price: document.querySelector(`[name=productPrice${i}]`).value,
      link: document.querySelector(`[name=productLink${i}]`).value,
      img: document.getElementById(`preview${i}`).getAttribute("data-img") || ""
    };
    products.push(p);
  }

  const websiteHTML = generateHTML(name, desc, color, products);
  download("store.html", websiteHTML);
});

function generateHTML(storeName, storeDesc, themeColor, products) {
  let productHTML = products.map(p => `
    <div style="border:1px solid #ccc;padding:1rem;margin:1rem 0">
      <img src="${p.img}" style="max-width:150px;display:block;margin-bottom:10px"/>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <strong>Rp ${parseInt(p.price).toLocaleString()}</strong><br>
      <a href="${p.link}" target="_blank">Order</a>
    </div>
  `).join('');

  return `
    <html>
    <head>
      <title>${storeName}</title>
      <style>
        body { font-family: sans-serif; background: #f9f9f9; padding:2rem; color:#333 }
        h1 { color: ${themeColor}; }
      </style>
    </head>
    <body>
      <h1>${storeName}</h1>
      <p>${storeDesc}</p>
      ${productHTML}
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
