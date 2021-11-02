import getDtFilm from "./getDtFilm.js";
import postFilm from "./postFilm.js";
import { getFilm } from "./getFilm.js";
import { deleteFilm } from "./deleteFilm.js";
import { printFilm } from "./printDtFilm.js";

let url = 'http://localhost:4001/movies'
let btnSend2 = document.getElementById('btnSend2')
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

