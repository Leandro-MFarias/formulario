const btn = document.getElementById("btn")
const form = document.getElementById('form')
const campos = document.querySelectorAll('.obrigatorio')
const textError = document.querySelectorAll('.span')
const enviado = document.getElementById('enviado')
const textoObrigatorio = document.getElementById('texto-obrigatorio')
const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const telRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}\-?[0-9]{4}$/

form.addEventListener('submit', (event) => {
    event.preventDefault()
    examinar()
})

function invalido(index) {
    campos[index].classList.add('text-error')
    textError[index].classList.remove('hidden-span')
    textError[index].classList.add('error-text', 'visivel')
    campos[index].classList.remove("text-correct")
}

function valido(index) {
    campos[index].classList.remove('text-error')
    textError[index].classList.remove('error-text', 'visivel')
    textError[index].classList.add('hidden-span')
    campos[index].classList.add('text-correct')
}

function validarCampo(campo, index) {
    if (campo.type === 'email') {
        if (!emailRegex.test(campo.value)) {
            invalido(index)
            return false;
        } else {
            valido(index)
            return true;
        }
    } else if (campo.type === 'tel') {
        if (!telRegex.test(campo.value)) {
            invalido(index)
            return false;
        } else {
            valido(index)
            return true;
        }
    } else {
        if (campo.value.length < 3) {
            invalido(index)
            return false;
        } else {
            valido(index)
            return true;
        }
    }
}

function examinar() {
    let camposValidos = true

    campos.forEach((campo, index) => {
        if(!validarCampo(campo, index)) {
            camposValidos = false
        }
    })

    if(camposValidos) {
        form.submit()

        campos.forEach((campo) => {
            campo.classList.add('hide')
        })

        textError.forEach((campo)=> {
            campo.classList.add('hide')
        })
        
        textoObrigatorio.classList.add('hide')
        btn.classList.add('hide')
        enviado.classList.remove('hide')
    } else {
        return;
    }
}

campos.forEach((campo, index) => {
    campo.addEventListener('input', () => validarCampo(campo, index))
})

campos.forEach((campo, index) => {
    campo.addEventListener('blur', () => validarCampo(campo, index))
})