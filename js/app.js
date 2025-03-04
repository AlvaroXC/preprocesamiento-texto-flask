const resultado = document.getElementById('resultado');
const formulario = document.getElementById('formulario');

window.addEventListener('DOMContentLoaded', ()=>{
    formulario.addEventListener('submit', procesarTexto);
})


function procesarTexto(e){
    e.preventDefault();
    validarFormulario()
}

function validarFormulario(){
    const textAreaValue = document.getElementById('text').value;
    console.log(textAreaValue)
    if(textAreaValue.trim()=== ''){
        mostrarError('El campo de texto no puede ir vacio');
        return;
    }else{
        consultarAPI(textAreaValue)
    }

}

function mostrarError(mensaje){
    const existAlert = document.querySelector('.alerta');
    if(!existAlert){
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded',
            'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'alerta');
        alerta.innerHTML = `<strong class= "font-bold"> ¡Error! </strong>
            <span class="block">${mensaje}</span>
        `;
        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove()
        }, 4000);

    }

}

async function consultarAPI(text){
    const url = 'http://127.0.0.1:5000/api/preprocess-text'
    
    mostrarSpinner();


    try {
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"text": text})
        });
        const data = await response.json();

        limpiarHTML();

        mostrarResultadoPreprocesamiento(data)
        
    } catch (error) {
        console.log(error);
    }
}


function limpiarHTML(){
    while(resultado.hasChildNodes()){
        resultado.removeChild(resultado.firstChild);
    }
}

function mostrarSpinner(){

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML= `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;
    resultado.appendChild(divSpinner);
}