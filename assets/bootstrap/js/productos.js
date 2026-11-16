/* =========================================================
   PRODUCTOS: catálogo de vinos (solo datos)
   Lo usa scripts.js para dibujar las cards y armar el carrito.
   ========================================================= */

/* ===== Catálogo de vinos (en el mismo orden que el wireframe) ===== */
const productos = [
    {
        id: 1,
        nombre: "Malbec Reserva",
        tipo: "tinto",
        cosecha: 2021,
        precio: 14500,
        descripcion: "Tinto. Cuerpo intenso, notas a frutos rojos.",
        img: "img/productos_malbec_reserva.png"
    },
    {
        id: 2,
        nombre: "Cabernet Sauvignon",
        tipo: "tinto",
        cosecha: 2020,
        precio: 13800,
        descripcion: "Tinto. Taninos firmes, final largo.",
        img: "img/productos_cabernet_sauvignon.png"
    },
    {
        id: 3,
        nombre: "Chardonnay",
        tipo: "blanco",
        cosecha: 2023,
        precio: 14000,
        descripcion: "Blanco. Fresco, cítrico y frutal.",
        img: "img/productos_chardonay_blanco.png"
    },
    {
        id: 4,
        nombre: "Torrontés",
        tipo: "blanco",
        cosecha: 2023,
        precio: 14200,
        descripcion: "Blanco. Aromático, floral y suave.",
        img: "img/productos_torrontes_blanco.png"
    },
    {
        id: 5,
        nombre: "Syrah",
        tipo: "tinto",
        cosecha: 2021,
        precio: 15200,
        descripcion: "Tinto. Especiado, con notas a pimienta y ciruela.",
        img: "img/productos_syrah.png"
    },
    {
        id: 6,
        nombre: "Merlot",
        tipo: "tinto",
        cosecha: 2022,
        precio: 13500,
        descripcion: "Tinto. Suave, redondo y de taninos amables.",
        img: "img/productos_merlot.png"
    },
    {
        id: 7,
        nombre: "Sauvignon Blanc",
        tipo: "blanco",
        cosecha: 2023,
        precio: 13900,
        descripcion: "Blanco. Vibrante, herbal y de final fresco.",
        img: "img/productos_sauvignon_blanco.png"
    },
    {
        id: 8,
        nombre: "Chenin Blanc",
        tipo: "blanco",
        cosecha: 2022,
        precio: 13700,
        descripcion: "Blanco. Fresco, con notas a pera y miel.",
        img: "img/productos_chenin_blanco.png"
    },
    {
        id: 9,
        nombre: "Rosé de Malbec",
        tipo: "rosado",
        cosecha: 2023,
        precio: 14100,
        descripcion: "Rosado. Frutado, con notas a frutilla y cereza.",
        img: "img/productos_rose_malbec.png"
    },
    {
        id: 10,
        nombre: "Rosé de Pinot Noir",
        tipo: "rosado",
        cosecha: 2023,
        precio: 14300,
        descripcion: "Rosado. Delicado y fresco, con toques cítricos.",
        img: "img/productos_rose_pinot_noir.png"
    },
    {
        id: 11,
        nombre: "Rosé de Bonarda",
        tipo: "rosado",
        cosecha: 2023,
        precio: 13600,
        descripcion: "Rosado. Jugoso, con notas a frambuesa.",
        img: "img/productos_rose_bonarda.png"
    },
    {
        id: 12,
        nombre: "Espumante Rosé",
        tipo: "rosado",
        cosecha: 2022,
        precio: 16800,
        descripcion: "Rosado. Delicado, con burbuja cremosa.",
        img: "img/productos_rose_espumante.png"
    }
];