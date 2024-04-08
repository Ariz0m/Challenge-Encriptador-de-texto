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
        console.log(`El array a encriptar es: ${palabra} ${typeof(palabra)}. ${textoDividido}`);
        if (lista === vocales) {
            for (let i = 0; i < palabra.length; ) {
                console.log(`Se está recorriendo la palabra ${palabra}. La longitud de la palabra es ${palabra.length}.`);
                if (buscarCoincidencia(palabra[i], lista)) {
                    console.log(`El valor de i es ${i}.`);
                    let pos = buscarPosicion(palabra[i], lista);
                    if (i === palabra.length - 1) {    
                        textoDividido[palabras] = i > 0 ? `${palabra.substring(0, i)}${otraLista(lista)[pos]}${palabra.substring(i + 1)}` : `${otraLista(lista)[pos]}${palabra.substring(i + 1)}`;
                        console.log(`La parte del array ahora es: ${textoDividido[palabras]}`);
                        palabra = textoDividido[palabras];
                        break;
                    }
                    else {
                        textoDividido[palabras] = i > 0 ? `${palabra.substring(0, i)}${otraLista(lista)[pos]}${palabra.substring(i + 1)}` : `${otraLista(lista)[pos]}${palabra.substring(i + 1)}`;
                        console.log(`La parte del array ahora es: ${textoDividido[palabras]}`);
                        palabra = textoDividido[palabras];
                        i += otraLista(lista)[pos].length;
                        console.log(`Se añadió a i ${otraLista(lista)[pos].length}`);
                    }
                } else if (!buscarCoincidencia(palabra[i], lista)) {
                    i++;
                    console.log(`Debido a que no se encontraron coincidencias, se pasa a la siguiente letra.`);
                }
            }
        }
        else if (lista === encriptadas) {
            if (buscarCoincidencia(palabra, lista)) {
                while (buscarCoincidencia(palabra, lista)) {
                    console.log(textoDividido);
                    let pos = buscarPosicion(palabra, lista);
                    textoDividido[palabras] = pos[0] > 0 ? `${palabra.substring(0, pos[0])}${otraLista(lista)[pos[1]]}${palabra.substring(pos[0] + (lista[pos[1]].length))}` : `${otraLista(lista)[pos[1]]}${palabra.substring(pos[0] + lista[pos[1]].length)}`;
                    palabra = textoDividido[palabras];
                    console.log(`xdddd ${textoDividido}`);   
                }
            } else {palabra++}
        }
    }
    console.log(textoDividido);
    console.log(`El texto encriptado es ${textoDividido.join(' ')}.`);
    return textoDividido.join(' ');
}

function desencriptar(palabraADesencriptar) {
    
}
//Esto solo es para ver si se pone si recuerdo bien cómo usar los comandos de git. It didn't work xd But I'd learned how to do it correctly

function buscarCoincidencia(elemento, lista) {
    console.log(`Se están buscando las coincidencias de ${elemento} en ${lista}`);
    if (lista === vocales) {
        for (contenido in lista) {
            contenido = parseInt(contenido);
            if (lista[contenido] === elemento) { 
                    return true;
                } else {console.log(`No se encontraron coincidencias.`);}
        }
    }
    else if (lista === encriptadas) {
        for (contenido in lista) {
            console.log(`${contenido} ${lista[contenido]}`);
            if (elemento.includes(lista[contenido])) {
                return true;
            } else {console.log(`No se encontraron coincidencias, perro.`);}
        }
    }
}

function buscarPosicion(elemento, lista) {
    console.log(`Se está buscando la posición de ${elemento} en ${lista}`);
    if (lista === vocales) {
        for (pos in lista) {
            pos = parseInt(pos);
            if (lista[pos] === elemento) {
                console.log(`Posición encontrada en ${pos}`);
                return pos;
            }
        }
    }
    else if (lista === encriptadas) {
        for (pos in lista) {
            pos = parseInt(pos);
            console.log(elemento.indexOf(lista[pos]));
            if (elemento.indexOf(lista[pos]) !== -1) {
                console.log(`La condition is true && ${elemento.indexOf(lista[pos])}`);
                return [elemento.indexOf(lista[pos]), pos];
            }
        }
    }
}

condicionesIniciales();