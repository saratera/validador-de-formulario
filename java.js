let Valido = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');
        Valido.clearErrors();

        for(let i=0;i<inputs.length;i++) {
            let input = inputs[i];
            let check = Valido.checkInput(input);
            if(check !== true){
                send = false;
                Valido.showError(input, check);
            }
        }

        
        if(send) {
            form.submit();
        }

    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');

        if(rules !== null) {
            rules = rules.split('|');
            for(let k in rules) {
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Campo etá vazio';
                        }

                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return ' Campo tem que ter peço menos '+rDetails+' caracters';
                        }

                    break;

                                    
                }
            }
        }

        return true;
    },
    showError:(input, error) => {
        input.style.borderColor = 'red';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.inserBefore(errorElement, input.ElementSibling);

    },
    clearErrors:() =>{
        let inputs = form.querySelectorAll('input');
        for(let i=0;i<inputs.length;i++){
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i=0;i<errorElements.length;i++) {
            errorElements[i].remove();
        }
    
    }

};

let form = document.querySelector('.validador');
form.addEventListener('submit', Valido.handleSubmit);