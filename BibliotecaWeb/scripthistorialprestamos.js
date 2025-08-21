// Usuario actual
const usuarioActual = "usuario1";

// Historial de préstamos simulado
const historialPrestamos = [{
        usuario: "usuario1",
        titulo: "Cien Años de Soledad",
        fechaPrestamo: "2025-06-01",
        fechaDevolucion: "2025-06-15",
        estado: "devuelto"
    },
    {
        usuario: "usuario1",
        titulo: "1984",
        fechaPrestamo: "2025-07-10",
        fechaDevolucion: null,
        estado: "prestado"
    },
    {
        usuario: "usuario2",
        titulo: "El Quijote",
        fechaPrestamo: "2025-07-01",
        fechaDevolucion: "2025-07-15",
        estado: "devuelto"
    }
];

// Mostrar historial del usuario actual
function mostrarHistorial() {
    const cuerpo = document.getElementById("historial-body");
    cuerpo.innerHTML = "";

    const prestamosUsuario = historialPrestamos.filter(p => p.usuario === usuarioActual);

    if (prestamosUsuario.length === 0) {
        cuerpo.innerHTML = "<tr><td colspan='4'>No hay historial de préstamos.</td></tr>";
        return;
    }

    prestamosUsuario.forEach(prestamo => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
      <td>${prestamo.titulo}</td>
      <td>${formatearFecha(prestamo.fechaPrestamo)}</td>
      <td>${prestamo.fechaDevolucion ? formatearFecha(prestamo.fechaDevolucion) : "-"}</td>
      <td class="${prestamo.estado}">${prestamo.estado.toUpperCase()}</td>
    `;

        cuerpo.appendChild(fila);
    });
}

// Función para formatear fecha
function formatearFecha(fecha) {
    if (!fecha) return "";
    const f = new Date(fecha);
    return f.toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" });
}

mostrarHistorial();