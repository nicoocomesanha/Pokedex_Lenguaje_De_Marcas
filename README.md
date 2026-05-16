# 🗺️ Explorador de la PokéDex - Proyecto Final Lenguaje de Marcas 1º ASIR

¡Bienvenido al **Explorador de la PokéDex**! Este proyecto ha sido desarrollado como el trabajo final para el módulo de **Lenguajes de Marcas y Sistemas de Gestión de Información** del ciclo superior en Administración de Sistemas Informáticos en Red (ASIR).

El objetivo principal es construir una aplicación web estática e interactiva que sirva para listar, filtrar y visualizar detalladamente información de diferentes Pokémon consumiendo los datos directamente desde un origen estructurado XML local.

## 👤 Autor
* **Nombre:** Nicolás Comesaña Saborido
* **Curso:** ASIR (Administración de Sistemas Informáticos en Red)
* **Año:** 2026
* **Contacto:** nicolas.comesana.saborido@fpfomento.com

---

## 🚀 Tecnologías y Herramientas Utilizadas

* **HTML5:** Estructuración semántica de las diferentes páginas de la aplicación (`index.html`, `main.html`, `despedida.html`, `juego.html`).
* **CSS3:** Diseño responsivo (adaptable a móviles y tablets) mediante el uso de **Flexbox**, variables, transiciones y degradados dinámicos simulando la estética de la PokéDex clásica.
* **XML (Extensible Markup Language):** Base de datos local estructurada (`fase1.xml`) donde se almacena la información detallada de cada Pokémon (ID, Tipo, Generación, Estadísticas, Habilidades, Evoluciones, Descripción y URL de la Imagen).
* **DTD (Document Type Definition):** Reglas de validación semántica y estructural (`pokedex.dtd`) para garantizar la integridad y el correcto formato de los datos del fichero XML.
* **JavaScript (Vanilla):** Lógica encargada de la comunicación asíncrona mediante la API `fetch` para la lectura del fichero XML, procesamiento sintáctico mediante `DOMParser`, filtrado dinámico en tiempo real (`.filter()`) y manipulación del DOM para renderizar tarjetas y ventanas modales informativas.
* **HTML5 Canvas:** Implementación de un minijuego interactivo estilo *Arkanoid* (`juego.html`) integrado dentro de la web utilizando el motor lógico en `script.js`.

---

## 📁 Estructura del Proyecto

El repositorio se compone de los siguientes ficheros principales (deben estar en la raíz para su correcto funcionamiento):

```text
├── index.html        # Página de bienvenida / Portada de la aplicación
├── main.html         # Panel principal del explorador de la PokéDex y filtros
├── despedida.html    # Sección de créditos del autor y enlaces finales
├── juego.html        # Contenedor del minijuego Arkanoid basado en Canvas
├── estilo.css        # Hoja de estilos compartida (Responsive Design)
├── script.js         # Lógica de carga XML, renderizado de tarjetas, modales y motor del juego
├── fase1.xml         # Archivo fuente con la información de los Pokémon
├── pokedex.dtd       # Archivo de validación de estructura para el XML
├── POKEDEX (1).pdf   # Documentación de la presentación oficial del proyecto
└── README.md         # Este archivo de presentación
