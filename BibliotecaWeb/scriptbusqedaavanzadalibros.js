// Base de datos simulada de libros
const books = [
    {
      title: "Cien Años de Soledad",
      author: "Gabriel García Márquez",
      isbn: "978-3-16-148410-0",
      subject: "Realismo Mágico",
      publisher: "Sudamericana"
    },
    {
      title: "El Amor en los Tiempos del Cólera",
      author: "Gabriel García Márquez",
      isbn: "978-0-14-015751-2",
      subject: "Romance",
      publisher: "Penguin Books"
    },
    {
      title: "Don Quijote de la Mancha",
      author: "Miguel de Cervantes",
      isbn: "978-84-376-0494-7",
      subject: "Clásico",
      publisher: "Espasa"
    },
    {
      title: "1984",
      author: "George Orwell",
      isbn: "978-0-452-28423-4",
      subject: "Distopía",
      publisher: "Secker & Warburg"
    }
    // Puedes agregar más libros aquí
  ];
  
  // Función de búsqueda avanzada
  function searchBooks() {
    const title = document.getElementById("search-title").value.toLowerCase();
    const author = document.getElementById("search-author").value.toLowerCase();
    const isbn = document.getElementById("search-isbn").value.toLowerCase();
    const subject = document.getElementById("search-subject").value.toLowerCase();
    const publisher = document.getElementById("search-publisher").value.toLowerCase();
  
    const filtered = books.filter(book => {
      return (!title || book.title.toLowerCase().includes(title)) &&
             (!author || book.author.toLowerCase().includes(author)) &&
             (!isbn || book.isbn.toLowerCase().includes(isbn)) &&
             (!subject || book.subject.toLowerCase().includes(subject)) &&
             (!publisher || book.publisher.toLowerCase().includes(publisher));
    });
  
    renderResults(filtered);
  }
  
  // Renderizar resultados
  function renderResults(results) {
    const container = document.getElementById("results");
    container.innerHTML = "";
  
    if (results.length === 0) {
      container.innerHTML = "<p>No se encontraron libros.</p>";
      return;
    }
  
    results.forEach(book => {
      const div = document.createElement("div");
      div.className = "book-card";
      div.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Autor:</strong> ${book.author}</p>
        <p><strong>ISBN:</strong> ${book.isbn}</p>
        <p><strong>Tema:</strong> ${book.subject}</p>
        <p><strong>Editorial:</strong> ${book.publisher}</p>
      `;
      container.appendChild(div);
    });
  }