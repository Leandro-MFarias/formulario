const form = document.getElementById('form')
const inputs = document.querySelectorAll('.item')
const enviado = document.getElementById('enviado')
const btn = document.getElementById('btn')
const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const telRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}\-?[0-9]{4}$/;

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let allFieldsValid = true

    inputs.forEach(input => {
        if (!validateInput(input)) {
            allFieldsValid = false
        }
    })

    if (allFieldsValid) {
        form.submit()
        btn.classList.add('hide')
        enviado.classList.remove('hide')
    } else {
        enviado.classList.add('hide')
    }
})

inputs.forEach(input => {
    input.addEventListener('blur', () =>{
        validateInput(input)
    })
})

function validateInput(input) {
    if (input.value.trim() === '') {
        validateInputFalse(input)
        return false
    } else {   
        if(input.type === 'email' && !emailRegex.test(input.value)) {
            validateInputFalse(input)
            return false
        }

        if(input.type === 'tel' && !telRegex.test(input.value)) {
            validateInputFalse(input)
            return false
        }

        input.classList.remove('text-error')
        input.classList.add('text-correct')
        input.nextElementSibling.classList.add('hide')
        return true
    }
}

function validateInputFalse(input) {
    input.classList.remove('text-correct')
    input.classList.add('text-error')
    input.nextElementSibling.classList.remove('hidden')
}