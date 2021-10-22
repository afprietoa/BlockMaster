
let  templateCard = document.getElementById('template-card').content
let fragment = document.createDocumentFragment()
let items = document.getElementById('items')


const getData = async() =>{

    let url ="https://api.themoviedb.org/3/movie/popular?api_key=888f397d19eb915efedefa8a3bee35b8"

    let res = await fetch(url)
    let data = await res.json()
    let {results} = data
    //console.log(results)
    return results
}

getData()

const printData = async() => {

    let data = await getData()
    //console.log(data)
    data.forEach(movie => {
        let {title,poster_path } = movie
        templateCard.querySelector('h5').textContent = title
        templateCard.querySelector('img').setAttribute('src', 'https://image.tmdb.org/t/p/w500' + poster_path )
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)

    });
    items.appendChild(fragment)

}
//resgistro al objeto document del DOM el evento DOMContentLoaded con la función printData que es invocada al retrollamado
document.addEventListener('DOMContentLoaded', printData)

let btnSearch = document.getElementById('btn-search')

btnSearch.addEventListener('click', async() => {
    let name = document.getElementById('search').value 
    
    let data = await getData()
    console.log(data)

    let lookUp = data.filter( film => film.title.toLowerCase() === name)
    console.log(lookUp)
    
    lookUp.forEach(movie => {
        let {title,poster_path } = movie
        templateCard.querySelector('h5').textContent = title
        templateCard.querySelector('img').setAttribute('src', 'https://image.tmdb.org/t/p/w500' + poster_path )
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)

    });
    items.innerHTML = ''
    items.appendChild(fragment)

})

