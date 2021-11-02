let url = 'http://localhost:4000/users/'
let btnSend = document.getElementById('btnSend')
let btnId = document.getElementById('btnId')
let btnDelete = document.getElementById('btnDelete')
let btnEdit = document.getElementById('btnEdit')

//petición POST (creacion) para crear
//captura de evento con el envio del formulario
//async requerido por await (funciones asincroninas)
btnSend.addEventListener('click', async(e) =>{
    //previene el evento
    e.preventDefault()
    //captura de los campos de texto y almacena el valor de dichos campos en variables
    let firstName = document.getElementById('name').value
    let lastName = document.getElementById('lastName').value
    let email = document.getElementById('email').value

    
    //consumo de peticiones
    //await resuelve la promesas que responde fetch
    await fetch(url,{
        //para la clave método su par valor es la peticion tipo POST
        method: 'POST',
        //la propiedad body define un objeto con la información recibida
        //Conversión a JSON con estructura stringigy - objeto con estructura JSON
        body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            e_mail: email
        }),
        //headers - configuración en POSTMAN para caracteres especiles
        headers:{
            "Content-Type": "application/json; charset=UTF-8"
        }

    })
})

// petición GET (lectura) para buscar

 btnId.addEventListener("click", async() =>{
     //¿Qué busco?
     let net_mail = document.getElementById('email').value
     console.log(net_mail)
    //¿Donde busco?

    //consumo de peticiones
    //await resuelve la promesas que responde fetch
     const resp = await fetch(url)
     const data  = await resp.json()
     console.log(data)

     //find: recpore listas o para los arreglos
    //comparación dela propiedad correo de cada uno de los objetos
    //find responde con el objeto a la coincidencia encontrada
     const lookUp = data.find(user => user.e_mail.toLowerCase() === net_mail.toLowerCase())
     console.log(lookUp)

     

    document.getElementById("email").readOnly=true
    
    //desestructuramos
     const{first_name, last_name, e_mail, id} = lookUp

     //
     document.getElementById('name').value = first_name
     document.getElementById('lastName').value = last_name
     document.getElementById('email').value = e_mail
     document.getElementById('id').value = id

 })
// petición PUT (modificacion) para buscar

 btnEdit.addEventListener("click", async() =>{
     let id = document.getElementById('id').value
     let firstName = document.getElementById('name').value
     let lastName = document.getElementById('lastName').value
     let email = document.getElementById('email').value 

     await fetch(url+id,{
         method: 'PUT',
         body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            e_mail: email
         }),
         headers:{
             "Content-Type": "application/json; charset=UTF-8"
        }

     })

 })



 btnDelete.addEventListener('click',async(e) =>{
     let id =document.getElementById('id').value
     console.log(id)
  
         await fetch(url+id,{
             method:'DELETE'    
           })

     })
// ---------------------------------------------------------------------------------------------------------------------
let list = document.getElementById('list')

document.addEventListener('DOMContentLoaded', async() => {
    
    const resp = await fetch(url)
    const data  = await resp.json()

    
    
    data.forEach(film => {
        const {first_name,last_name,e_mail,id} = film;
        listarCita.innerHTML += `
                        <td>${id}</td>
                        <td>${first_name}</td>
                        <td>${last_name}</td>
                        <td>${e_mail}</td>
                        <td><button id=${id}>Delete</button></td>
        `
    })
})


