// Esperamos a que la ventana cargue completamente
window.onload = function() {
    // Referencias a los contenedores del HTML
    var cajaResultados = document.getElementById('tarjetas-contenedor');
    var seccionFiltros = document.getElementById('botones-filtro');

    // Cargamos el XML con fecth
    fetch('fase1.xml')
        .then(function(respuesta) {
            return respuesta.text(); // Convertimos a texto
        })
        .then(function(textoXML) {
            // Parseamos el XML para que pueda ser manipulable
            var analizador = new DOMParser();
            var xmlDoc = analizador.parseFromString(textoXML, "application/xml");
            
            // Seleccionamos todo de <Pokemon>
            var todosLosPokemons = Array.from(xmlDoc.getElementsByTagName('Pokemon'));

            
            mostrarLista(todosLosPokemons);
            configurarFiltros(todosLosPokemons);

            // Generamos el boton reset de los filtros para que se vuelvan a ver todos los pokemon
            var btnReset = document.getElementById('reset-filtro');
            if (btnReset) {
                btnReset.onclick = function() {
                    mostrarLista(todosLosPokemons);
                };
            }
        })
        .catch(function(error) {
            console.error("Error al cargar el XML:", error);
        });

    // Generamos el HTML dinamicamente
    function mostrarLista(lista) {
        cajaResultados.innerHTML = ''; 

        lista.forEach(function(item) {
            // Aplicamos las variables para obtener la información hecha con XML
            var nombrePk = item.getElementsByTagName('Nombre')[0].textContent; 
            var infoPk = item.getElementsByTagName('Descripcion')[0].textContent;
            var rutaImagen = item.getElementsByTagName('Foto')[0].textContent;
            var etiquetaTipo = item.getAttribute('tipo');
            var habilidadPk = item.getElementsByTagName('Habilidad')[0].textContent;
            var EvolucionPk = item.getElementsByTagName('Evoluciones')[0].textContent;

            // Creamos la tarjeta del pokemon
            var divTarjeta = document.createElement('div');
            divTarjeta.className = 'tarjeta';
            
            // Hacemos que se abra el Modal
            divTarjeta.onclick = function() {
                lanzarModal(nombrePk, infoPk,EvolucionPk);
            };

            divTarjeta.innerHTML = `
                <img src="${rutaImagen}" alt="${nombrePk}">
                <div class="info">
                    <h3>${nombrePk}</h3>
                    <p class="tipo-label"><strong>Tipo:</strong> ${etiquetaTipo}</p>
                    <p class="habilidad-label"><strong>Habilidad:</strong> ${habilidadPk}</p> 
                </div>
            `;
            cajaResultados.appendChild(divTarjeta);
        });
    }

    // Introducimos la funcion para hacer el filtrado en el aside
    function configurarFiltros(datosCompletos) {
        var tiposUnicos = [];
        datosCompletos.forEach(function(p) {
            var t = p.getAttribute('tipo');
            if (!tiposUnicos.includes(t)) {
                tiposUnicos.push(t);
            }
        });

        tiposUnicos.forEach(function(tipo) {
            var boton = document.createElement('button');
            boton.textContent = tipo;
            boton.className = 'btn-filtro';
            
            boton.onclick = function() {
                // Filtramos el tipo para que aparezca en lista
                var listaFiltrada = datosCompletos.filter(function(pk) {
                    return pk.getAttribute('tipo') === tipo;
                });
                mostrarLista(listaFiltrada);
            };
            seccionFiltros.appendChild(boton);
        });
    }
};

// Aplicamos la logica del Modal
function lanzarModal(titulo, contenido,evoluciones) {
    var ventanaModal = document.getElementById('miModal');
    
// Introducimos el nombre, descripcion y evoluciones de los Pk para que aparezcan en el modal
    ventanaModal.querySelector('h2').textContent = titulo;
    document.getElementById('descripcion-modal').textContent = contenido
    document.getElementById('evolucion-modal').textContent = evoluciones

    
    ventanaModal.style.display = 'flex'; // Cambiamos a flex para que se pueda ver
}

// Funcion para cerrar el modal
function toggleModal() {
    var ventanaModal = document.getElementById('miModal');
    ventanaModal.style.display = 'none';
}


// SCRIPT JUEGO
var canvas = document.getElementById("juego");
var ctx = canvas.getContext("2d");

// VARIABLES BOLA (MÁS RÁPIDO O LENTO DX/DY)
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;

// VARIABLES PALA
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

// VARIABLES MURO (AÑADIR O QUITAR)
var brickRowCount = 8; // ALTO
var brickColumnCount = 8; //ANCHO
// TAMAÑOS CANVA
var brickWidth = 40; 
var brickHeight = 15;
var brickPadding = 5;
var brickOffsetTop = 40;
var brickOffsetLeft = 20;

// MATRIZ LADRILLOS
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// PUNTUACIÓN Y VIDAS
var score = 0;
var lives = 3;

// EVENTOS TECLADO Y RATÓN
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) { rightPressed = true; }
    else if(e.keyCode == 37) { leftPressed = true; }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) { rightPressed = false; }
    else if(e.keyCode == 37) { leftPressed = false; }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

// DETECCIÓN ERRORES
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0; // Gracias a esto se rompe el ladrillo
                    score++;
                    if(score == brickRowCount * brickColumnCount) {
                        alert("¡FELICIDADES, HAS GANADO!"); // ALERTA FELICITACIÓN
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// DIBUJO BOLA
function drawBall() {
    ctx.beginPath();
    // Creamos un gradiente radial (un círculo de luz)
    // Los parámetros son: x, y del centro de luz, radio pequeño, x, y del círculo, radio grande
    var gradient = ctx.createRadialGradient(x - 3, y - 3, 1, x, y, ballRadius);
    gradient.addColorStop(0, "white");    // El "reflejo" de luz en el centro
    gradient.addColorStop(1, "#FF0000"); // COLOR BOLA BORDES
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.closePath();
}

//DIBUJO PALA

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD"; // COLOR PALA
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
    ctx.closePath();
}

//DIBUJO LADRILLOS

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.strokeStyle = "white"; // BORDE PARA SEPARAR LADRILLOS
                ctx.lineWidth = 2;
                ctx.strokeRect(brickX, brickY, brickWidth, brickHeight);
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                var colores = ["#FF5733", "#FFC300", "#DAF7A6", "#33FF57", "#33FFF3", "#3357FF", "#8A33FF", "#FF33A8"];  // ARRAY PARA TENER DISTINTOS COLORES EN LADRILLOS
                ctx.fillStyle = colores[r]; // USAMOS 'R' YA QUE ES LA FILA
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore() { //COLOR RESULTADO
    ctx.font = "bold 16px 'Courier New'"; // LETRA ARCADE
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Puntos: " + score, 8, 20);
}

function drawLives() { //COLOR VIDAS
    ctx.font = "bold 16px 'Courier New'";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Vidas: " + lives, canvas.width - 75, 20);
}

// BUCLE (MOTOR)
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    // REBOTES IZQUIERDA / DERECHA
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    
    // REBOTE PARED SUPERIOR
    if(y + dy < ballRadius) {
        dy = -dy;
    } 
    // LOGICA CAÍDA
    else if(y + dy > canvas.height - ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy; // REBOTE PALA
        }
        else {
            lives--;
            if(!lives) {
                alert("FIN DEL JUEGO"); // PIERDES JUEGO
                document.location.reload();
            } else {
                // REINICIAR AL PRINCIPIO
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    // MOVIMIENTO PALA
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

// EMPEZAR EL JUEGO
draw();