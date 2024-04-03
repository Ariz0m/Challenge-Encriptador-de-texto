function asignarTexto(elemento, texto) {
    let elementoHTML = document.getElementById(elemento);
    elementoHTML.innerText = texto;
}

function obtenerTexto(elemento) {
    return document.getElementById(elemento).value;
}

function condicionesIniciales() {
    document.getElementById('area-texto').setAttribute('placeholder', 'Ingrese el texto aquí.');
    asignarTexto('titulo-caja', 'Ningún mensaje fue encontrado.');
    asignarTexto('parrafo-caja', 'Ingresa el texto que desees encriptar o desencriptar.');
    console.log(`Se han preparado las condicones iniciales de la página.`);
}

function limpiarRecuadro() {
    asignarTexto('titulo-caja', '');
    asignarTexto('parrafo-caja', '');
    console.log('Se limpió el recuadro de texto.');
}

function mensajeNoValido() {
    asignarTexto('titulo-caja', 'El texto ingresado no es válido.');
    asignarTexto('parrafo-caja', 'Por favor, ingrese otro mensaje.');
    console.log('Se ingresó un mensaje no válido.');
}

const contenidoARevisar = accion => accion === 'encriptar' ? vocales : encriptadas;
let otraLista = lista => lista === vocales ? encriptadas : vocales;
const vocales = ['e', 'i', 'a', 'o', 'u'];
const encriptadas = ['enter', 'imes', 'ai', 'ober', 'ufat'];

function encriptar(accion) {
    let textoPlano = obtenerTexto('area-texto');
    let lista = contenidoARevisar(accion);
    console.log(`El texto ingresado fue ${textoPlano} y la lista que se se usará es ${lista}.`);
    if (validador(textoPlano, lista)) {
        limpiarRecuadro();
        asignarTexto('titulo-caja', encriptador(textoPlano, lista));
    }
}

function validador(textoPlano, lista) {
    for (contenido in lista) {
        contenido = parseInt(contenido);
        console.log(`Se está revisando la lista ${lista} y estamos en la posición ${contenido}. El largo de la lista es ${lista.length}.`);
        if (textoPlano.includes(lista[contenido])) {
            console.log(`${textoPlano} es un texto válido y se encriptará.`);
            return true;
        }
        else if(contenido === lista.length - 1) {
            limpiarRecuadro();
            mensajeNoValido();
        }
    }
}

function encriptador(textoPlano, lista) {
    console.log('Se está empezando a encriptar el texto.');
    let textoDividido = textoPlano.split(' ');
    console.log(textoDividido);
    for (palabras in textoDividido) {
        palabras = parseInt(palabras);
        let palabra = textoDividido[palabras];
        console.log(`El array a encriptar es: ${palabra}`);
        for (let i = 0; i < textoDividido[palabras].length; ) {
            console.log(`Se está recorriendo la palabra ${palabra}. La longitud de la palabra es ${palabra.length}.`);
            if (buscarCoincidencia(palabra[i], lista)) {
                let pos = buscarPosicion(palabra[i], lista);
                textoDividido[palabras] = i > 0 ? `${palabra.substring(0, i)}${otraLista(lista)[pos]}${palabra.substring(i + 1)}` : `${otraLista(lista)[pos]}${palabra.substring(i + 1)}`;
                console.log(textoDividido[palabras]);
                i += otraLista(lista)[pos].length - 1;
            } else {
                i++;
                console.log(`Debido a que no se encontraron coincidencias, se pasa a la siguiente letra.`);
            }
        }
    }
    console.log(`El texto encriptado es ${textoDividido.join(' ')}.`);
    return textoDividido.join(' ');
}

function buscarCoincidencia(n, r) {
    console.log(`Se están buscando las coincidencias de ${n} en ${r}`);
    for (contenido in r) {
        contenido = parseInt(contenido);
        if (r[contenido] === n) { 
            return true;
        } else {console.log(`No se encontraron coincidencias.`);}
    }
}

function buscarPosicion(n, r) {
    console.log(`Se está buscando la posición de ${n} en ${r}`);
    for (pos in r) {
        pos = parseInt(pos);
        if (r[pos] === n) {
            console.log(`Posición encontrada en ${pos}`);
            return pos;
        }
    }
}

condicionesIniciales();