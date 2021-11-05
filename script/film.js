import getDtFilm from "./getDtFilm.js";
import postFilm from "./postFilm.js";
import putFilm from "./putFilm.js";
import { getFilm } from "./getFilm.js";
import { deleteFilm } from "./deleteFilm.js";
import { printFilm } from "./printDtFilm.js";

let url = 'http://localhost:4001/movies/'
let btnSend2 = document.getElementById('btnSend2')
let btnSearch2 = document.getElementById('btnId2')
let btnDelete2 = document.getElementById('btnDelete2')
let btnEdit2 = document.getElementById('btnEdit2')
let main = document.getElementById('main')

let obj ={}
let array = []

btnSend2.addEventListener('click', (e) =>{
    e.preventDefault()
    obj = getDtFilm()
    postFilm(url, obj)
})

document.addEventListener('DOMContentLoaded', async() =>{
    array = await getFilm(url)
    printFilm(array, main)
})

btnSearch2.addEventListener('click', async(e) => {
    e.preventDefault()


         //¿Qué busco?
         let name = document.getElementById('title').value
         console.log(name)
        //¿Donde busco?
    
        //consumo de peticiones
        //await resuelve la promesas que responde fetch

         const data  = await getFilm(url)
         console.log(data)
    
         //find: recpore listas o para los arreglos
        //comparación dela propiedad correo de cada uno de los objetos
        //find responde con el objeto a la coincidencia encontrada
         const lookUp = data.find(user => user.title.toLowerCase() === name.toLowerCase())
         console.log(lookUp)
    
         
    
        document.getElementById("title").readOnly=true
        
        //desestructuramos
        const { title, genre, image, release, duration, synopsis, id } = lookUp
    
         //
         document.getElementById('title').value = title
         document.getElementById('genre').value = genre
         document.getElementById('poster').value = image
         document.getElementById('release').value = release
         document.getElementById('duration').value = duration
         document.getElementById('synopsis').value = synopsis
         document.getElementById('id').value = id
    
})

btnDelete2.addEventListener('click', (e) => {
    let id =document.getElementById('id').value
    
    if(id !== ''){
        deleteFilm(url,id)
    }
})

let obj2 ={}


btnEdit2.addEventListener('click', (e) => {
    let id =document.getElementById('id').value
    e.preventDefault()
    obj2 = getDtFilm()
    putFilm(url+id, obj2)
})