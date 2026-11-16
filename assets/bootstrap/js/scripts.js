/* =========================================================
   SCRIPTS: filtro por tipo + carrito de compras (página Productos)
   Solo jQuery 3.7.1 + Bootstrap 5.3.8 (sin plugins externos).
   El carrito sigue la estructura de jQuery Smart Cart:
   .sc-product-item / .sc-add-to-cart / .sc-cart-item-list /
   .sc-cart-item-qty / .sc-cart-remove / .sc-cart-empty-msg
   Requiere productos.js (array "productos") cargado antes.
   ========================================================= */
$(document).ready(function () {

    // Este archivo también se carga en otras páginas: si no hay catálogo, no hace nada
    if ($("#lista-productos").length === 0) { return; }


    function formatear(numero) {
        return "$" + Number(numero).toLocaleString("es-AR");
    }

    /* ===== 1. Dibujar las cards desde el array ===== */
    function crearCard(p) {
        return '' +
        '<div class="col" data-tipo="' + p.tipo + '">' +
            '<article class="card card-vino sc-product-item h-100" data-cosecha="' + p.cosecha + '">' +
                '<img data-name="product_image" src="' + p.img + '" class="card-img-top" alt="Botella y copa de ' + p.nombre + '">' +
                '<div class="card-body d-flex flex-column">' +
                    '<h2 class="card-title" data-name="product_name">' + p.nombre + '</h2>' +
                    '<p class="card-text" data-name="product_desc">' + p.descripcion + '</p>' +
                    '<p class="precio mt-auto">' + formatear(p.precio) + '</p>' +
                    '<input name="product_price" value="' + p.precio + '" type="hidden">' +
                    '<input name="product_id" value="' + p.id + '" type="hidden">' +
                    '<button class="btn btn-salud sc-add-to-cart w-100" type="button">Añadir al carrito</button>' +
                '</div>' +
            '</article>' +
        '</div>';
    }

    var html = "";
    $.each(productos, function (i, p) { html += crearCard(p); });
    $("#lista-productos").html(html);

    /* ===== 2. Filtro por tipo de vino (desplegable) ===== */
    // Al arrancar está elegido "Todos", así que esa opción sale de la lista
    $(".filtro-menu .dropdown-item[data-valor='todos']").parent().hide();

    $(".filtro-menu .dropdown-item").click(function () {

        var tipo = $(this).data("valor");   // "todos", "tinto", "blanco" o "rosado"

        // Muestra arriba el tipo elegido
        $("#filtro-texto").text($(this).text());

        // Vuelve a mostrar todas las opciones y saca solo la elegida
        $(".filtro-menu li").show();
        $(this).parent().hide();

        // Muestra u oculta las cards
        if (tipo === "todos") {
            $(".productos-pagina [data-tipo]").show();
        } else {
            $(".productos-pagina [data-tipo]").hide();
            $(".productos-pagina [data-tipo='" + tipo + "']").show();
        }
    });

    /* ===== 3. Carrito ===== */
    var MAX_UNIDADES = 99;
    var carrito = [];   // [{ id, nombre, precio, imagen, cantidad }]

    var $lista    = $("#sc-cart-item-list");
    var $contador = $("#contador-carrito");

    function buscar(id) {
        for (var i = 0; i < carrito.length; i++) {
            if (String(carrito[i].id) === String(id)) { return carrito[i]; }
        }
        return null;
    }

    /* Lee los datos del producto desde la card (igual que Smart Cart) */
    function leerProducto($card) {
        return {
            id:       $card.find("input[name='product_id']").val(),
            nombre:   $.trim($card.find("[data-name='product_name']").text()),
            precio:   parseFloat($card.find("input[name='product_price']").val()) || 0,
            imagen:   $card.find("[data-name='product_image']").attr("src"),
            cantidad: 1
        };
    }

    /* Marca las cards y los botones según lo que hay en el carrito */
    function sincronizarProductos() {
        $(".sc-product-item").each(function () {
            var $card = $(this);
            var enCarrito = !!buscar($card.find("input[name='product_id']").val());

            $card.toggleClass("sc-added-item", enCarrito);
            $card.find(".sc-add-to-cart")
                .toggleClass("btn-quitar", enCarrito)
                .text(enCarrito ? "Quitar del carrito" : "Añadir al carrito");
        });
    }

    function dibujar() {
        var unidades = 0, subtotal = 0;

        $lista.empty();

        if (carrito.length === 0) {
            $lista.append($("<p>", { "class": "sc-cart-empty-msg", text: "Tu carrito está vacío. Sumá tus vinos favoritos." }));
        }

        $.each(carrito, function (i, item) {
            unidades += item.cantidad;
            subtotal += item.precio * item.cantidad;

            var $fila = $("<div>", { "class": "sc-cart-item list-group-item d-flex gap-3 position-relative px-0", "data-id": item.id });

            $fila.append($("<img>", { src: item.imagen, alt: item.nombre }));

            var $info = $("<div>", { "class": "sc-cart-item-info" });
            $info.append($("<h3>", { "class": "sc-cart-item-name", text: item.nombre }));
            $info.append($("<p>", { "class": "sc-cart-item-price", text: formatear(item.precio) + " c/u" }));
            $info.append(
                $("<input>", {
                    "class": "form-control form-control-sm sc-cart-item-qty",
                    type: "number", min: 1, max: MAX_UNIDADES, value: item.cantidad,
                    "aria-label": "Cantidad de " + item.nombre
                })
            );
            $info.append($("<p>", { "class": "sc-cart-item-summary", text: formatear(item.precio * item.cantidad) }));
            $fila.append($info);

            $fila.append($("<button>", {
                "class": "sc-cart-remove btn-close", type: "button",
                "aria-label": "Quitar " + item.nombre + " del carrito"
            }));

            $lista.append($fila);
        });

        // El número del navbar es la cantidad total de botellas
        $contador.text(unidades);
        $("#sc-cart-unidades").text(unidades);
        $("#sc-cart-subtotal").text(formatear(subtotal));
        $("#sc-cart-vaciar, #sc-cart-finalizar").prop("disabled", carrito.length === 0);

        sincronizarProductos();
    }

    /* Botón "Añadir al carrito" / "Quitar del carrito" */
    $(document).on("click", ".sc-add-to-cart", function () {
        var producto = leerProducto($(this).closest(".sc-product-item"));

        if (buscar(producto.id)) {
            carrito = $.grep(carrito, function (it) { return String(it.id) !== String(producto.id); });
        } else {
            carrito.push(producto);
        }
        dibujar();
    });

    /* Cambiar cantidad */
    $lista.on("change", ".sc-cart-item-qty", function () {
        var item = buscar($(this).closest(".sc-cart-item").data("id"));
        var cantidad = parseInt($(this).val(), 10);

        if (isNaN(cantidad) || cantidad < 1) { cantidad = 1; }
        if (cantidad > MAX_UNIDADES) { cantidad = MAX_UNIDADES; }

        if (item) { item.cantidad = cantidad; }
        dibujar();
    });

    /* Quitar un producto desde el carrito */
    $lista.on("click", ".sc-cart-remove", function () {
        var id = $(this).closest(".sc-cart-item").data("id");
        carrito = $.grep(carrito, function (it) { return String(it.id) !== String(id); });
        dibujar();
    });

    /* Vaciar carrito */
    $("#sc-cart-vaciar").on("click", function () {
        carrito = [];
        dibujar();
    });

    /* Finalizar compra */
    $("#carrito-form").on("submit", function (e) {
        e.preventDefault();
        if (carrito.length === 0) { return; }

        var total = 0, unidades = 0;
        var $resumen = $("#sc-cart-resumen-compra").empty();

        $.each(carrito, function (i, item) {
            total += item.precio * item.cantidad;
            unidades += item.cantidad;
            $resumen.append($("<li>", { text: item.cantidad + " × " + item.nombre + " — " + formatear(item.precio * item.cantidad) }));
        });

        $("#sc-cart-total-compra").text(formatear(total));
        $("#sc-cart-unidades-compra").text(unidades);

        $("#carrito-contenido").addClass("d-none");
        $("#carrito-confirmacion").removeClass("d-none");

        carrito = [];
        dibujar();
    });

    /* Volver al carrito después de la confirmación */
    $("#sc-cart-seguir").on("click", function () {
        $("#carrito-confirmacion").addClass("d-none");
        $("#carrito-contenido").removeClass("d-none");
    });

    /* Al cerrar el panel, se restaura la vista normal */
    $("#carritoPanel").on("hidden.bs.offcanvas", function () {
        $("#carrito-confirmacion").addClass("d-none");
        $("#carrito-contenido").removeClass("d-none");
    });

    dibujar();

});