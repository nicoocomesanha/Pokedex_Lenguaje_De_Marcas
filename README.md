
# 🗺️ Explorador de la PokéDex - Proyecto Final ASIR

¡Bienvenido al **Explorador de la PokéDex**! Este proyecto ha sido desarrollado como el trabajo final para el módulo de **Lenguajes de Marcas y Sistemas de Gestión de Información** del ciclo superior en Administración de Sistemas Informáticos en Red (ASIR).

La aplicación es una plataforma web interactiva que procesa, estructura y filtra información detallada de diferentes Pokémon, consumiendo los datos directamente desde una base de datos local estructurada.

## 🌐 Demo en Vivo
Puedes interactuar con el proyecto en tiempo real a través del siguiente enlace:
👉 **[Ver PokéDex Online](https://nicoocomesanha.github.io/Pokedex_Lenguaje_De_Marcas/)**

## 👤 Autor
* **Nombre:** Nicolás Comesaña Saborido
* **Curso:** ASIR (Administración de Sistemas Informáticos en Red)
* **Centro:** Colegio Montecastelo
* **Año:** 2026
* **Contacto:** nicolas.comesana.saborido@fpfomento.com

---

## 🚀 Tecnologías y Herramientas Utilizadas

* **HTML5:** Estructuración semántica y modular de las diferentes vistas de la aplicación (`index.html`, `main.html`, `despedida.html`, `juego.html`).
* **CSS3:** Diseño responsivo (adaptable a múltiples dispositivos) implementado mediante **Flexbox**, variables nativas, transiciones avanzadas y efectos visuales inspirados en la estética de la PokéDex clásica.
* **XML (Extensible Markup Language):** Almacenamiento local de datos estructurados (`fase1.xml`) conteniendo especificaciones de cada Pokémon (ID, Tipo, Generación, Estadísticas, Habilidades, Evoluciones y recursos gráficos).
* **DTD (Document Type Definition):** Reglas de validación semántica (`pokedex.dtd`) encargadas de asegurar la integridad y la correcta jerarquía de los nodos del fichero XML.
* **JavaScript (Vanilla):** Lógica de control asíncrona mediante la API `fetch` para la lectura del fichero de datos, procesamiento con `DOMParser`, filtrado interactivo en tiempo real (`.filter()`) y manipulación del árbol DOM.
* **HTML5 Canvas:** Desarrollo completo de un minijuego interactivo estilo *Arkanoid* integrado de forma nativa en el flujo web.

---

## 📁 Estructura del Repositorio

El proyecto se compone de los siguientes ficheros principales en su raíz:

```text
├── index.html        # Pantalla de bienvenida y portada del proyecto
├── main.html         # Panel principal con visor dinámico y paneles de filtrado
├── despedida.html    # Sección de créditos, datos de contacto del autor y enlaces
├── juego.html        # Interfaz de renderizado para el minijuego de Canvas
├── estilo.css        # Hoja de estilos globales compartida y responsive
├── script.js         # Motor lógico de carga XML, manipulación del DOM y juego
├── fase1.xml         # Archivo de persistencia de datos de los Pokémon
├── pokedex.dtd       # Esquema de validación estructural para el XML
├── POKEDEX (1).pdf   # Documentación de la presentación oficial del proyecto
└── README.md         # Documento de presentación del repositorio (este archivo)
