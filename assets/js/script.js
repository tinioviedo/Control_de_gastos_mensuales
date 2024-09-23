let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionesGastos = [];  // Lista para almacenar descripciones de gastos
let gastoActual = null;  // Variable para almacenar el índice del gasto que se está editando

// Cuando usuario hace clic en botón agregar gasto
function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = parseFloat(document.getElementById('valorGasto').value);
    let descripcionGasto = "";  // Inicializamos la descripción como una cadena vacía

    // Verificamos si estamos editando un gasto
    if (gastoActual === null) {
        descripcionGasto = prompt("Ingresa una descripción para el gasto:");  // Solicitamos la descripción mediante prompt

        // Verificamos si el gasto es mayor a 150 para mostrar la alerta
        if (valorGasto > 150) {
            alert("¡Atención! Este gasto supera los $150.");
        }
    } else {
        // Si estamos editando, usamos la descripción actual
        descripcionGasto = listaDescripcionesGastos[gastoActual];
    }

    console.log(nombreGasto);
    console.log(valorGasto);
    console.log(descripcionGasto);

    // Si estamos editando un gasto, actualizamos
    if (gastoActual !== null) {
        // Preguntamos si desea modificar la descripción
        if (confirm("¿Deseas modificar la descripción del gasto?")) {
            descripcionGasto = prompt("Ingresa la nueva descripción:", listaDescripcionesGastos[gastoActual]);
        }
        listaNombresGastos[gastoActual] = nombreGasto;
        listaValoresGastos[gastoActual] = valorGasto;
        listaDescripcionesGastos[gastoActual] = descripcionGasto;  // Actualizamos la descripción
        gastoActual = null;  // Reiniciamos para agregar un nuevo gasto en el futuro
        document.getElementById('botonFormulario').innerText = 'Agregar Gasto';  // Cambiamos el texto de nuevo
    } else { // Si no estamos editando, agregamos un nuevo gasto
        listaNombresGastos.push(nombreGasto);
        listaValoresGastos.push(valorGasto);
        listaDescripcionesGastos.push(descripcionGasto);  // Guardar la descripción
    }

    console.log(listaNombresGastos);
    console.log(listaValoresGastos);
    actualizarListaGastos();
}

function actualizarListaGastos() {
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = ''; //se coloca vacio el inicio, para que cada que agregue un elemento, recorra y lo actualice
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcionGasto = listaDescripcionesGastos[posicion];  // Obtener la descripción de la lista
        
        // Crear la lista de gastos con nombre, valor y descripción
        htmlLista += `<li>${elemento} - USD ${valorGasto.toFixed(2)} 
                     <p>${descripcionGasto ? descripcionGasto : 'Sin descripción'}</p>  <!-- Mostrar descripción si existe -->
                     <button onclick="eliminarGasto(${posicion});">Eliminar</button>
                     <button onclick="modificarGasto(${posicion});">Editar</button>  <!-- Botón de modificar -->
                     </li>`;  //uso un template string
                     
        // Se calcula el total de gastos
        totalGastos += valorGasto;
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();
}

function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionesGastos.splice(posicion, 1);  // Eliminar también la descripción
    actualizarListaGastos();
}

// Función para modificar un gasto
function modificarGasto(posicion) {
    // Cargamos los datos del gasto en los campos de entrada
    document.getElementById('nombreGasto').value = listaNombresGastos[posicion];
    document.getElementById('valorGasto').value = listaValoresGastos[posicion];

    // Establecer el índice del gasto que se está editando
    gastoActual = posicion;  
    document.getElementById('botonFormulario').innerText = 'Actualizar';  // Cambiar el texto del botón
}



//bor
    
//hacer un bucle, para el arreglo
