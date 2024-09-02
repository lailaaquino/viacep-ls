const cepForm = document.querySelector('#cep'); //elementos do form
const cepErrorForm = document.querySelector('#cepError')
const streetForm = document.querySelector('#street');
const numberForm = document.querySelector('#number');
const neighborhoodForm = document.querySelector('#neighborhood');
const stateForm = document.querySelector('#state');
const cityForm = document.querySelector('#city');

cepForm.addEventListener('blur', () => {
    const cep = cepForm.value.replace(/\D/g, ''); //remove oq não é número

    if (cep.length===8) { //verificar tamanho do cep
        fetch(`https://viacep.com.br/ws/${cep}/json/`) //requisição api
        .then(response => response.json())
        .then(data => {
            if (data.erro) { //se for invalido
                showCepError(); //erro e limpar
                clearFields();
            } else {
                fillFields(data); //preenche com dados da api
                hideCepError();
            }
        })
        .catch(() => { //trata erros e exceções 
            showCepError();
            clearFields();
        });
    } else {
        showCepError(); //erro se não tiber 8 dígitos 
    }
});

function fillFields(data) {
    streetForm.value = data.logradouro; //acessa e preenche dados dos campos com dados da api
    neighborhoodForm.value = data.bairro;
    cityForm.value = data.localidade;
    stateForm.value = data.uf;
}

function clearFields() { //limpar qnd cep invalido
    streetForm.value = '';
    neighborhoodForm.value = '';
    cityForm.value = '';
    stateForm.value = '';
}

function showCepError () { //exibe erro 
    cepErrorForm.classList.remove('hidden');
    cepErrorForm.classList.add('input-cep-error');
}

function hideCepError () { //oculta erro 
    cepErrorForm.classList.add('hidden');
    cepErrorForm.classList.remove('input-cep-error');
}