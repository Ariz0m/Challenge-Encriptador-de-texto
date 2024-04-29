function asignarTexto(elemento, texto) {
    let elementoHTML = document.getElementById(elemento);
    elementoHTML.innerHTML = texto;
}

function obtenerTexto() {
    return document.getElementById('area-texto').value;
}

const contenidoARevisar = accion => accion === 'encriptar' ? vocales : encriptadas;
let otraLista = lista => lista === vocales ? encriptadas : vocales;
const vocales = ['e', 'i', 'a', 'o', 'u'];
const encriptadas = ['enter', 'imes', 'ai', 'ober', 'ufat'];
var controlDeBoton = false;

function validarTexto() {
    let texto = obtenerTexto();
    texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    document.getElementById('area-texto').value = texto;
}

function encriptar(accion) {
    let textoPlano = obtenerTexto();
    let lista = contenidoARevisar(accion);
    console.log(`El texto ingresado fue ${textoPlano} y la lista que se se usará es ${lista}.`);
    if (validador(textoPlano, lista)) {
        asignarTexto('parrafo-caja', encriptador(textoPlano, lista));
        crearBotonCopiar();
    }
}

function validador(textoPlano, lista) {
    for (contenido in lista) {
        if (textoPlano.includes(lista[contenido])) {
            console.log(`${textoPlano} es un texto válido y se encriptará.`);
            return true;
        }
    }
}

function encriptador(textoPlano, lista) {
    let textoDividido = textoPlano.split(' ');
    for (palabras in textoDividido) {
        let palabra = textoDividido[palabras];
        if (lista === vocales) {
            for (let i = 0; i < palabra.length; ) {
                console.log(`Se está recorriendo la palabra ${palabra}.`);
                if (buscarCoincidencia(palabra[i], lista)) {
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
                    let pos = buscarPosicion(palabra, lista);
                    textoDividido[palabras] = pos[0] > 0 ? `${palabra.substring(0, pos[0])}${otraLista(lista)[pos[1]]}${palabra.substring(pos[0] + (lista[pos[1]].length))}` : `${otraLista(lista)[pos[1]]}${palabra.substring(pos[0] + lista[pos[1]].length)}`;
                    palabra = textoDividido[palabras];
                }
            } else {palabra++}
        }
    }
    return textoDividido.join(' ');
}

//Esto solo es para ver si se pone si recuerdo bien cómo usar los comandos de git. It didn't work xd But I'd learned how to do it correctly

function buscarCoincidencia(elemento, lista) {
    console.log(`Se están buscando las coincidencias de ${elemento} en ${lista}`);
    if (lista === vocales) {
        for (contenido in lista) {
            if (lista[contenido] === elemento) { 
                return true;
            }
        }
    }
    else if (lista === encriptadas) {
        for (contenido in lista) {
            if (elemento.includes(lista[contenido])) {
                return true;
            }
        }
    }
}

function buscarPosicion(elemento, lista) {
    console.log(`Se está buscando la posición de ${elemento} en ${lista}`);
    if (lista === vocales) {
        for (pos in lista) {
            if (lista[pos] === elemento) {
                console.log(`Posición encontrada en ${pos}.`);
                return pos;
            }
        }
    }
    else if (lista === encriptadas) {
        for (pos in lista) {
            if (elemento.indexOf(lista[pos]) !== -1) {
                console.log(`Coincidence find at position ${elemento.indexOf(lista[pos])}.`)
                return [elemento.indexOf(lista[pos]), pos];
            }
        }
    }
}

function crearBotonCopiar() {
    if (!controlDeBoton) {
        document.getElementById("muñeco").remove();
        document.getElementById('titulo-caja').remove();
        document.getElementById('parrafo-caja').style.fontSize = '24px';
        let newElement = document.createElement("button");
        newElement.id = 'copiar';
        newElement.innerHTML = 'Copiar';
        newElement.className = 'boton';
        newElement.onclick = copiarContenido;
        let parentElement = document.querySelector('.caja-texto');
        parentElement.appendChild(newElement);
        controlDeBoton = true;
    }
}

async function copiarContenido() {
    let texto = document.getElementById('parrafo-caja').innerHTML;
    try {
      await navigator.clipboard.writeText(texto);
      console.log('Contenido copiado al portapapeles');
    } catch (err) {
      alert('Error al copiar: ', err);
    }
  }