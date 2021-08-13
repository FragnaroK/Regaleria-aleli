const totalSec = 2; // * CANTIDAD DE SECCIONES
var actualDir;      // * DIRECCION ACTUAL
const loader = document.getElementById('loader');
const fakeMain = document.getElementById('fakeMain');

fakeMain.onwheel = () => {return false};
fakeMain.ontouchmove = () => {return false};
window.onload = () => {loadScreen(); resize();} // * Reacomoda posicion durante carga y se ajusta a la pantalla
window.addEventListener('resize', () => {resize();}, {passive: true} ); // * Escuchar eventos de redimension para reajustar a la pantalla
document.querySelectorAll('.btn').forEach( el => { // * Escucha eventos de click en cada boton para pasar a otra seccion
    el.addEventListener('click', e => {
        let id = e.target.getAttribute('id'); // TODO: Obtengo contenido del atributo id del elemento.
        nextSection(verificarSeccion(id));    // TODO: Verifico el id del elemento para identificar la seccion solicitada.
                                              // TODO: Una vez verificado, posiciono el scroll en la seccion solicitada. 
                                              // ! La VERIFICACION fue necesaria para evitar colicion de atributos id entre etiquetas HTML y que sea entendible en el mismo.
    }, {passive: true} )
})
// * PANTALLA DE CARGA
function loadScreen() {
    setTimeout(() => {
        fakeMain.classList.remove('hide'); // * Muestra contenido mientras esta activa la pantalla de carga
    }, 1000);
    setTimeout(() => {
        loader.classList.add('hidding'); // * empieza animacion fade
    }, 3000);
    setTimeout(() => {
        loader.classList.add('hide'); // * pantalla de carga ocultada totalmente
    }, 3800);
}
// * FUNCION RESPONSABLE DE REDIMENSIONAR
function resize() {
    let height = document.documentElement.clientHeight;
    let width = document.documentElement.clientWidth;
    let fakeMainDef = document.querySelector('.fakeMain');
    let mainDef =  document.querySelector('main');
    let sectionDef = document.getElementsByClassName('seccion');
    fakeMainDef.style.width = width * totalSec + 'px';  // * redimensiona el div .fakeMain para lograr un correcto ajuste de pantalla y no afectar al no deseado Scroll
    fakeMainDef.style.height = height * totalSec + 'px';
    mainDef.style.height = height + 'px';
    for (const section of sectionDef) {     // * Establece height de cada una de las secciones
            section.style.height = height + 'px';
        }
    if (actualDir != undefined){ // * Permite que si se reinicia la pagina, vuelva a la seccion de origen
        nextSection(actualDir);
    }  else {
        nextSection('bienvenida');
    }
}
// * FUNCION RESPONSABLE DE POSICIONAR EN LA SECCION SOLICITADA
function nextSection(section) { 
    let e = document.querySelector('#' + section);
    actualDir = section;
        e.scrollIntoView({ // * Redirige el scroll hacia la posicion de la seccion
            behavior: 'smooth', 
            block: 'center' });
}
// * FUNCION RESPONSABLE DE VERIFICACION DE SECCION
function verificarSeccion(btn) {
        let section;
        switch (btn) {
            case 'bienvenidaBtn':
                section = 'bienvenida'
                break;
            case 'productosBtn':
                section = 'productos'
                break;
            case 'sobreNosotrosBtn':
                section = 'sobreNosotros'
                break;
            default:
                break;
        }
    return section; // * Retorna la seccion
}