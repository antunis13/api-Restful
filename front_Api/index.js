const API_URL = 'http://localhost:8080/api/products'


const form = document.querySelector('#form') 
const edit = document.querySelector('#edit')
const formEdit = document.querySelector('#formEdit')
const register = document.querySelector('#register')

function addingRemoveBtnEvent(){
    const removeButtons = document.querySelectorAll('.remove-button')
    removeButtons.forEach(button => {
        button.onclick = function(e) {
            e.preventDefault()
            const id = this.dataset.id

            fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            }).then(response => {
            response.json().then(data =>{
                if(data.message === 'success'){
                    obterLista()
                    alert('Produto excluído com sucesso')
                }else{
                    alert('Ocorreu um erro, tente novamente.')
                }
            })
            }) 
        }
    })
}

function addingEditBtnEvent(){
    const editButtons = document.querySelectorAll('.edit-button')
    editButtons.forEach(button => {
        button.onclick = function(e) {
            e.preventDefault()
            register.classList.add('hidden')
            edit.classList.remove('hidden')

            const id = this.dataset.id
            const name = this.dataset.name
            const brand = this.dataset.brand
            const price = this.dataset.price

            document.forms['formEdit'].id.value = id
            document.forms['formEdit'].name.value = name
            document.forms['formEdit'].brand.value = brand
            document.forms['formEdit'].price.value = price
        }
    })
}

function obterLista(){
    const productsList = document.querySelector('#products-list') 
    fetch(API_URL).then(response =>{
        response.json().then(data =>{
         const productsHtml = data.map(products => `
                <li>
                    ${products.name} -   ${products.brand} -   ${products.price} -
                    <a href="#" class="edit-button"
                        data-id="${products._id}"
                        data-name="${products.name}"
                        data-brand="${products.brand}"
                        data-price="${products.price}"
                    >
                        [Editar]
                    </a> 
                    <a href="#" class="remove-button" data-id="${products._id}">[Excluir]</a> 
                </li>    
            `).join('')
            
            productsList.innerHTML = productsHtml

            addingRemoveBtnEvent()
            addingEditBtnEvent()
        })
    })//.catch(error => console.log(error))
}

obterLista()

form.onsubmit = function(e){
    e.preventDefault()

    const name = document.forms['form'].name.value
    const brand = document.forms['form'].brand.value
    const price = document.forms['form'].price.value

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            brand,
            price,
        })
    }).then(response =>{
       response.json().then(data =>{
        if(data.message === 'success'){
            form.reset()
            obterLista()
            alert('Cadastro realizado com sucesso')
        }else{
            alert('Ocorreu um erro, tente novamente')
        }
       })
    })
}

formEdit.onsubmit = function(e){
    e.preventDefault()
    const id = document.forms['formEdit'].id.value
    const name = document.forms['formEdit'].name.value
    const brand = document.forms['formEdit'].brand.value
    const price = document.forms['formEdit'].price.value

    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers:{
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            name,
            brand,
            price,
        })
    }).then(response => {
            response.json().then(data =>{
                if(data.message === 'success'){
                    formEdit.reset()
                    edit.classList.add('hidden')
                    obterLista()
                    alert('Produto alterado com sucesso')
                }else{
                    alert('Ocorreu um erro, tente novamente.')
                }
            })
        }) 
}