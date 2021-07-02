// VARIABLES
const formulario = document.querySelector('#enviar-mail');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const btnEnviar = document.querySelector('#enviar');
const bntReset = document.querySelector('#resetBtn');

// expresion regular para validar los emials
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


// EVENTS
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', inicioApp);
    email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);
    formulario.addEventListener('submit', enviarEmail);
    bntReset.addEventListener('click', resetFormulario);
};


// FUNCTIONS
function inicioApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
    bntReset.disabled = true;
    bntReset.classList.add('cursor-not-allowed', 'opacity-50');
};

function validarCampo( e ) {
    if ( e.target.value.length > 0 ) {
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');

        const error = document.querySelector('p.error');
        if ( error ) {
            error.remove();
        };
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError( 'Todos los campos son obligatorios' );
    };


    // validar solo el email
    if ( e.target.type === 'email' ) {
        if ( er.test( e.target.value ) ) {
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError( 'Email no valido' );
        };
    };

    if ( er.test( email.value ) && asunto.value !== '' && mensaje !== '' ) {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove ('cursor-not-allowed', 'opacity-50');
    };

    if ( er.test( email.value ) || asunto.value !== '' || mensaje !== '' ) {
        bntReset.disabled = false;
        bntReset.classList.remove ('cursor-not-allowed', 'opacity-50');
    };
};

function mostrarError( mensaje ) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add( 'text-center', 'bg-red-500', 'text-white', 'font-bold', 'uppercase', 'p-5', 'my-10', 'error');

    const errores = document.querySelectorAll('.error');

    // mientras no se haya escrito nada en el input se muestra el error
    if ( errores.length === 0 ) {
        formulario.appendChild(mensajeError);
    };
};

function enviarEmail(e) {
    e.preventDefault();

    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    const parrafo = document.createElement('p');
    parrafo.textContent = 'Email enviado';
    parrafo.classList.add('text-center', 'bg-green-600', 'text-white', 'font-bold', 'uppercase', 'my-10', 'p-4', )

    setTimeout( () => {
        spinner.style.display = 'none';
        formulario.insertBefore( parrafo, spinner );

        setTimeout( () => {
            parrafo.remove();
            resetFormulario();
        }, 3000 );
    
    }, 3000 );
};

function resetFormulario() {
    inicioApp();

    formulario.reset();
};