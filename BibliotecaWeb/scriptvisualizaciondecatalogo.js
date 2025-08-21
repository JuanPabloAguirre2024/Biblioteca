// Simulación de datos: array de libros
const books = [
    { title: "Libro A", author: "Autor 1", genre: "Ficción", category: "Novela", year: 2021 },
    { title: "Libro B", author: "Autor 2", genre: "No ficción", category: "Ensayo", year: 2019 },
    { title: "Libro C", author: "Autor 1", genre: "Fantasía", category: "Novela", year: 2020 },
    { title: "Libro D", author: "Autor 3", genre: "Histórico", category: "Biografía", year: 2018 },
    // ... puedes añadir más datos aquí
  ];
  
  // Parámetros de control
  let currentPage = 1;
  const itemsPerPage = 4;
  
  // Elementos del DOM
  const elCategory = document.getElementById("filter-category");
  const elAuthor = document.getElementById("filter-author");
  const elGenre = document.getElementById("filter-genre");
  const elSortField = document.getElementById("sort-field");
  const elSortDir = document.getElementById("sort-dir");
  const elBookList = document.getElementById("book-list");
  const elPrev = document.getElementById("prev-page");
  const elNext = document.getElementById("next-page");
  const elPageInfo = document.getElementById("page-info");
  
  // Funciones auxiliares
  function getUnique(field) {
    return [...new Set(books.map(b => b[field]))].sort();
  }
  
  function populateFilters() {
    getUnique("category").forEach(val => {
      const opt = document.createElement("option"); opt.value = val; opt.textContent = val;
      elCategory.appendChild(opt);
    });
    getUnique("author").forEach(val => {
      const opt = document.createElement("option"); opt.value = val; opt.textContent = val;
      elAuthor.appendChild(opt);
    });
    getUnique("genre").forEach(val => {
      const opt = document.createElement("option"); opt.value = val; opt.textContent = val;
      elGenre.appendChild(opt);
    });
  }
  
  function applyFilters(list) {
    const cat = elCategory.value;
    const auth = elAuthor.value;
    const gen = elGenre.value;
    return list.filter(b =>
      (cat ? b.category === cat : true) &&
      (auth ? b.author === auth : true) &&
      (gen ? b.genre === gen : true)
    );
  }
  
  function applySort(list) {
    const field = elSortField.value;
    const dir = elSortDir.value;
    return list.slice().sort((a, b) => {
      const va = a[field], vb = b[field];
      if (va < vb) return dir === "asc" ? -1 : 1;
      if (va > vb) return dir === "asc" ? 1 : -1;
      return 0;
    });
  }
  
  function displayPage() {
    let result = applyFilters(books);
    result = applySort(result);
    const totalPages = Math.ceil(result.length / itemsPerPage);
    currentPage = Math.min(Math.max(1, currentPage), totalPages);
    const start = (currentPage - 1) * itemsPerPage;
    const pageItems = result.slice(start, start + itemsPerPage);
  
    elBookList.innerHTML = pageItems.map(b => `
      <div class="book-card">
        <h3>${b.title}</h3>
        <p><strong>Autor:</strong> ${b.author}</p>
        <p><strong>Género:</strong> ${b.genre}</p>
        <p><strong>Categoría:</strong> ${b.category}</p>
        <p><strong>Año:</strong> ${b.year}</p>
      </div>
    `).join("") || "<p>No hay libros para mostrar.</p>";
  
    elPrev.disabled = currentPage === 1;
    elNext.disabled = currentPage === totalPages || totalPages === 0;
    elPageInfo.textContent = `Página ${currentPage} de ${totalPages || 1}`;
  }
  
  // Eventos
  [elCategory, elAuthor, elGenre, elSortField, elSortDir].forEach(el =>
    el.addEventListener("change", () => { currentPage = 1; displayPage(); })
  );
  
  elPrev.addEventListener("click", () => { currentPage--; displayPage(); });
  elNext.addEventListener("click", () => { currentPage++; displayPage(); });
  
  // Inicialización
  populateFilters();
  displayPage();