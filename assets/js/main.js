
const btnTheme = document.getElementById( "theme_btn" ); // BOTON OSCURO/CLARO

const body = document.body;                              // BODY

const cartBtnOpen = document.getElementById("cart-btn"); // BOLSA UBICADA EN HEADER

const cartBtnClose = document.getElementById("close-cart"); // X MOSTRADA EN EL CART COTAINER

const btnMenu = document.getElementById( "btn_menu" );       // BOTON ABRIR MENU

const menu = document.getElementById( "menu" );              //  MENU OCULTO

const menuClose = document.getElementById( "close_menu" );   // X MOSTRADA EN EL MENU 

const menuProductos = document.getElementById( "productos" ); // ETIQUETA P DENTRO DE MENU DESPLEGADO

const menuHome = document.getElementById( "home" );          // ETIQUETA P DENTRO DEL MENU DESPLEGADO

const fptd = document.getElementById( "discover" );          // IMAGEN DE PRODUCTO DESTACADO

const header = document.querySelector("header");            // HEADER

const menuFiltros = document.getElementById("filter_contain"); // MENU PARA FILTRAR PRODUCTOS

const productContain = document.querySelector(`#products_contain`); // CONTENEDOR DE PRODUCTOS GENERALES

const cartContainer = document.getElementById("cart-container"); // CONTENEDOR CART GENERAL

const cartProductsSelected = document.getElementById("cart-content"); // CONTENEDOR DE PRODUCTOS SELECCIONADOS

const counter = document.getElementById('bag_count');             // CONTADOR DEL ICONO BAG 

const sumarItem = document.getElementById("sumar")

const totalCart = document.getElementById("totalCart")

let sumaArticulos = 0

const changeOne = document.getElementById("change1")

const changeTwo = document.getElementById("change2")

const itemsPFiltrado = []

const tarjetaG = document.getElementsByClassName("card_article")

const imgCard = document.getElementsByClassName("article_img")



const themeDark = () => {
    if( btnTheme.classList.contains("bx-moon") ){
        btnTheme.classList.replace("bx-moon", "bx-sun")
    }else{
        btnTheme.classList.replace("bx-sun", "bx-moon")
    }
    body.classList.toggle( "dark" )
    fptd.classList.toggle( "bg" )
};


/// FUNCION PARA DETECTAR SCROLL

window.addEventListener( "scroll", () =>{
    if(scrollY >= 50){
        header.classList.add("scroll-bg")
    }else{
        header.classList.remove("scroll-bg")
    }
});

/// FUNCION PARA ALTERNAR COLOR DE MENUS

window.addEventListener( "scroll", () =>{
    if(scrollY >= 750){
        changeOne.classList.remove("change")
        changeTwo.classList.add("change")
    } else {
        changeOne.classList.add("change")
        changeTwo.classList.remove("change")
    }
});

/// FUNCION PARA OCULTAR LOADED
const loadComponent = () => {
    const loaderC = document.getElementById("loader")
    
    setTimeout( () => {
        loaderC.classList.add("chao")
    }, 4500)
}


/// DOM CONTENT LOADED

document.addEventListener( "DOMContentLoaded", () =>{
    loadComponent()
    getLocalStorag()
    carrito = JSON.parse(window.localStorage.getItem("cart"))
});

/// EVENLISTENER MOSTRAR MENU Y CART CONTEINER

btnTheme.addEventListener( "click", () => themeDark()); // EJECUTA LA FUNCION themeDark

cartBtnOpen.addEventListener( "click", () => cartContainer.classList.remove("hide") );

cartBtnClose.addEventListener( "click", () => cartContainer.classList.add("hide")  );

btnMenu.addEventListener( "click", () => menu.classList.remove("hide") );

menuClose.addEventListener( "click", () => menu.classList.add("hide")  );

menuProductos.addEventListener( "click", () => menu.classList.add("hide")  ); // ETIQUETA P DEL MENU

menuHome.addEventListener( "click", () => menu.classList.add("hide")  );    // ETIQUETA P DEL MENU


const move = () => {
    imgCard.classList.add("move")
}

const unMove = () => {
    imgCard.classList.remove("move")
}


/// CREACION DE PRODUCTOS GENERALES

function createCardProductGeneral(product){
    const articleC = document.createElement("article")
      articleC.className = "card_article"
      articleC.onmouseover = "move()"
      articleC.onmouseout = "unMove()"
    
    articleC.innerHTML = `
        <button class="add" id="${product.id}">+</button>
        <img src="${product.image}" alt="" class="article_img">
        <div class="article_description">
          <h4>$ ${product.price}</h4>
          <p> Disponibilidad: ${product.quantity}</p>
          <h5 class="txtkalan">${product.name}</h5>
        </div>
      `
    productContain.append(articleC)
};


/// MOSTRAR PRODUCTOS 

const carrito = []

itemsP.forEach(product => {
    createCardProductGeneral(product);

    const addCart = document.getElementById(product.id)
    addCart.addEventListener("click", () => {
        agregarAlCarrito(product.id)
    })
});


/// FORMANDO ARRAY ITEM SELECTED

counter.innerText = 0

const agregarAlCarrito = (prodId) => {
    
    addProduct(prodId);
    actualizarCart();
    counter.innerText = carrito.length;
};

let cartActual
function addProduct( prodId ){
    //let cartActual = JSON.parse(window.localStorage.getItem("cart"))
    let itemAdd = carrito.find( (item) => item.id === prodId )
    
    if( itemAdd && itemAdd.quantity > itemAdd.qs ){
        let index = carrito.indexOf( itemAdd )
        //cartActual[index].qs++
        carrito[index].qs++
        //window.localStorage.setItem("cart", JSON.stringify(cartActual))
    }
    if (itemAdd == undefined){
        const itemSelected = itemsP.find( item => item.id === prodId )
        itemSelected.qs = 1
        carrito.push( itemSelected )
        //window.localStorage.setItem("cart", JSON.stringify(carrito))
    }
    
}


/// CREACION DE TARJETA DENTRO DE CART CONTEINER

function createCardProductSelected(productSelected){
    const cardsInCart = document.createElement("div");
    cardsInCart.className = "cards_in_cart"
    cardsInCart.id = "cards_in_cart"

    cardsInCart.innerHTML = `
        <img src="${productSelected.image}" alt="producto seleccionado">
        <div class="cic_description">
            <h4>${productSelected.name}</h4>
            <p>Stock ${productSelected.quantity} |<span id="cic_precio">$ ${productSelected.price}</span></p>
            <h5 id="s_total">Sub Total: $ ${productSelected.price * productSelected.qs} </h5>
            <div class="resumen">
                <div>
                    <button onclick="restar(${productSelected.id})">-</button>
                    <p>${productSelected.qs}</p>
                    <button id="sumar" onclick="sumar(${productSelected.id})">+</button>
                </div>
                <i class='bx bxs-trash-alt bx-md' onclick="eliminarDelCarrito(${productSelected.id})"></i>
            </div>
        </div>
        `
    
    cartProductsSelected.append(cardsInCart)
};

// MOSTRAR TARJETAS DE PRODUCTOS SELECCIONADOS

const actualizarCart = () => {
    cartProductsSelected.innerHTML= ""
    
    carrito.forEach(productSelected =>{
        createCardProductSelected(productSelected)
    });
}

/// ELIMINAR DEL CARRITO

const eliminarDelCarrito = (prodId) => {
    const x = carrito.find( (prod) => prod.id === prodId)
    const index = carrito.indexOf(x)
    carrito.splice(index, 1)
    actualizarCart()
    counter.innerHTML = carrito.length
}

/// FUNCION RESTAR
const restar = (prodId) => {
    const resItem = carrito.find( (prod) => prod.id === prodId)
    const index = carrito.indexOf(resItem)
    if (resItem.qs > 1){
        
        carrito[index].qs--
    } else {
        carrito.splice(index, 1)
    }
    actualizarCart()
    counter.innerHTML = carrito.length
}

/// FUNCION SUMAR ARTICULOS

const sumar = (prodId) => {
    const sumItem = carrito.find( (prod) => prod.id === prodId)
    const index = carrito.indexOf(sumItem)
    if (sumItem.quantity > sumItem.qs){
        carrito[index].qs++
    }

    actualizarCart()
    counter.innerHTML = carrito.length
    
}

const getLocalStorag = () => {
    let cart = window.localStorage.getItem("cart")
    if (cart){
        cart = JSON.parse( cart )
        console.log(cart);
    } else {
        window.localStorage.setItem("cart", JSON.stringify([]))
    }
}


/*
const sumaTotalMount = (prodId) => {
        
    carrito.forEach( Items => {
    sumaArticulos += (Items.qs * Items.price)
    })
    totalCart.textContent = sumaArticulos
}*/


