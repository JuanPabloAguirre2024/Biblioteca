const usuarioActual = "usuario1";

// Simulación de historial de préstamos
let prestamos = [{
        id: 1,
        usuario: "usuario1",
        titulo: "Cien Años de Soledad",
        fechaPrestamo: "2025-07-01",
        fechaDevolucion: null,
        estado: "prestado"
    },
    {
        id: 2,
        usuario: "usuario1",
        titulo: "1984",
        fechaPrestamo: "2025-06-10",
        fechaDevolucion: "2025-06-20",
        estado: "devuelto"
    },
    {
        id: 3,
        usuario: "usuario1",
        titulo: "Don Quijote",
        fechaPrestamo: "2025-07-10",
        fechaDevolucion: null,
        estado: "prestado"
    }
];

// Función para mostrar los préstamos del usuario actual
function mostrarPrestamos() {
    const tbody = document.getElementById("tabla-prestamos");
    tbody.innerHTML = "";

    const prestamosUsuario = prestamos.filter(p => p.usuario === usuarioActual);

    if (prestamosUsuario.length === 0) {
        tbody.innerHTML = "<tr><td colspan='5'>No hay préstamos registrados.</td></tr>";
        return;
    }

    prestamosUsuario.forEach(p => {
                const fila = document.createElement("tr");

                fila.innerHTML = `
      <td>${p.titulo}</td>
      <td>${formatearFecha(p.fechaPrestamo)}</td>
      <td>${p.fechaDevolucion ? formatearFecha(p.fechaDevolucion) : "-"}</td>
      <td class="${p.estado === 'devuelto' ? 'devuelto' : ''}">${p.estado.toUpperCase()}</td>
      <td>
        ${p.estado === "prestado" ? `<button onclick="devolverLibro(${p.id})">Devolver</button>` : "✔️"}
      </td>
    `;

    tbody.appendChild(fila);
  });
}

// Función para formatear fecha
function formatearFecha(fecha) {
  const f = new Date(fecha);
  return f.toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" });
}

// Simular confirmación de bibliotecario
function confirmarRecepcion(libro) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ Confirmación de recepción del libro "${libro.titulo}" por el bibliotecario.`);
      resolve(true);
    }, 1000); // Simula un retardo de confirmación
  });
}

// Función para devolver un libro
async function devolverLibro(id) {
  const libro = prestamos.find(p => p.id === id);
  if (!libro || libro.estado === "devuelto") return;

  const confirmar = confirm(`¿Deseas devolver el libro "${libro.titulo}"?`);
  if (!confirmar) return;

  const confirmado = await confirmarRecepcion(libro);

  if (confirmado) {
    libro.estado = "devuelto";
    libro.fechaDevolucion = new Date().toISOString().split("T")[0];

    alert(`📚 El libro "${libro.titulo}" fue devuelto con éxito.`);
    mostrarPrestamos();
  }
}

mostrarPrestamos();