
let  templateCard = document.getElementById('template-card').content
let fragment = document.createDocumentFragment()
let items = document.getElementById('items')
let apiKey = "888f397d19eb915efedefa8a3bee35b8"
let imgPath = 'https://image.tmdb.org/t/p/w500'
let notscroll = false
//const URL = "https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.asc&api_key=888f397d19eb915efedefa8a3bee35b8&vote_count.gte=1000&language=en-US&page="    
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=888f397d19eb915efedefa8a3bee35b8&page='
const SEARCH_URL = 'http://api.themoviedb.org/3/search/movie?api_key=888f397d19eb915efedefa8a3bee35b8&query=' ;
const VIDEO_URL = 'https://api.themoviedb.org/3/movie/297762/videos?api_key=888f397d19eb915efedefa8a3bee35b8&language=en-US'
const getData = async() =>{

    

    let res = await fetch(API_URL)
    let data = await res.json()
    let {results} = data
    //console.log(results)
    return results
}


let objectInfo = []
let pages = 2
const onScroll = async (e) =>{
    if(notscroll = false){
        return
    }else{
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight){
        let url_new = API_URL + pages;
        console.log(url_new)
        let resp = await fetch(url_new)
        let data = await resp.json();
        let {results} = data
        pages = data.page + 1 

        objectInfo.push(results);
        results.forEach(movie => {
            let {poster_path, vote_average, id } = movie
            
            templateCard.querySelector('img').setAttribute('src', imgPath + poster_path )
            templateCard.querySelector('.vote-average').textContent = vote_average
            templateCard.querySelector("img").dataset.id = id
            

            const clone = templateCard.cloneNode(true)
            fragment.appendChild(clone)
        })
        items.appendChild(fragment);
        e.preventDefault();
    }
    }
}
window.addEventListener('scroll',onScroll)
getData()

const printData = async() => {

    let data = await getData()
    //console.log(data)
    document.querySelector('.head-line').textContent = 'All Movies'
    data.forEach(movie => {
        let {poster_path, vote_average, id } = movie
        
        
        templateCard.querySelector('img').setAttribute('src', imgPath + poster_path )
        templateCard.querySelector('.vote-average').textContent = vote_average
        templateCard.querySelector("img").dataset.id = id
        

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)

    });
    items.appendChild(fragment)

}
//resgistro al objeto document del DOM el evento DOMContentLoaded con la función printData que es invocada al retrollamado
document.addEventListener('DOMContentLoaded', printData)

const getMovie = async(url) =>{
    try{
        const request = await fetch(url)
        const data = await request.json()
        console.log(data.results);
        return data.results
        }catch(error){
            throw error
            //console.log(error)
        }
}
const showMovie = async(url) =>{
    
   

    let data = await getMovie(url)
    console.log(data)
    data.forEach(movie => {
        let {poster_path, vote_average, id } = movie
        
        templateCard.querySelector('img').setAttribute('src', imgPath + poster_path )
        templateCard.querySelector('.vote-average').textContent = vote_average
        templateCard.querySelector("img").dataset.id = id
        

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)

    });
    items.innerHTML = ''
    items.appendChild(fragment)

}


let btnSearch = document.getElementById('btn-search')

btnSearch.addEventListener('click', () => {
    let name = document.getElementById('search').value 
     
    
    if(name !== ''){
        showMovie(SEARCH_URL + name)
        name.value=''
    }else{
        window.location.reload()
    }

    // if(name !== ''){
       
    // let data = await getData()
    // console.log(data)

    // let lookUp = data.filter( film => film.title.toLowerCase() === name.toLowerCase())
    // console.log(lookUp)
    
    // lookUp.forEach(movie => {
    //     let {poster_path, vote_average } = movie
        
    //     templateCard.querySelector('img').setAttribute('src', imgPath + poster_path )
    //     templateCard.querySelector('.vote-average').textContent = vote_average
    //     const clone = templateCard.cloneNode(true)
    //     fragment.appendChild(clone)

    // })
    // items.innerHTML = ''
    // items.appendChild(fragment)
    // }else{
    //     window.location.reload()
    // }

});


// -------------------------------------------------------------------------------------------------------
const best = document.getElementById('best')
const worst = document.getElementById('worst')

best.onclick = async function () {


    let data = await getData()
    console.log(data)

    
    let lookUp = data.filter( film => film.vote_average > 7)
    console.log(lookUp)

    document.querySelector('.head-line').textContent = 'High-Rated Movies'

    lookUp.forEach(movie => {
        let {poster_path, vote_average, id } = movie
        
        
        templateCard.querySelector('img').setAttribute('src', imgPath + poster_path )
        templateCard.querySelector('.vote-average').textContent = vote_average
        templateCard.querySelector("img").dataset.id = id
        
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)

    })
    items.innerHTML = ''
    items.appendChild(fragment)
       
    
}
worst.onclick = async function () {


    let data = await getData()
    console.log(data)

    let lookUp = data.filter( film => film.vote_average <= 7)
    console.log(lookUp)

    document.querySelector('.head-line').textContent = 'Low-Rated Movies'
    
    lookUp.forEach(movie => {
        let {poster_path, vote_average, id } = movie
        
        
        templateCard.querySelector('img').setAttribute('src', imgPath + poster_path )
        templateCard.querySelector('.vote-average').textContent = vote_average
        templateCard.querySelector("img").dataset.id = id
        
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)

    })
    items.innerHTML = ''
    items.appendChild(fragment)
       
    
}
// ------------------------------------------MODALS---------------------------------------------------------------

items.addEventListener("click", async (e) => {
    if (e.target.classList.contains("image-cards")) {
      console.log(e.target.classList.contains("image-cards"));

     let data = await getData()

     let findId = e.target.dataset.id;

     console.log(findId)

      let product = data.find((p) => p.id == findId);
      console.log(product)
      localStorage.setItem("product", JSON.stringify(product));
     
      let h3 = document.querySelector(".voteTg");
      let img = document.querySelector(".imgTg");
      
      let h2 = document.querySelector('.titleTg')
      let p = document.querySelector('.descripTg')

    let detalle = JSON.parse(localStorage.getItem("product"));
    const { poster_path, vote_average, title, overview } = detalle;
    
    
    img.setAttribute("src", imgPath + poster_path );
    h3.textContent = vote_average;

    h2.textContent = title
    p.textContent = overview
    }
  });

  let btnPlay = document.getElementById('btn-play')

  btnPlay.addEventListener("click", async (e) =>{
    let h5 = document.querySelector('h5')
    let iframe = document.querySelector('iframe')
    

    let detalle = JSON.parse(localStorage.getItem("product"));
    const { title, id } = detalle;
    
    let keyVid = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=888f397d19eb915efedefa8a3bee35b8&language=en-US`

    let res = await fetch(keyVid)
    let data = await res.json()

    console.log(data)
    console.log(data.results[0].key)
    h5.textContent = title.toUpperCase() + ' - ' +'Official Trailer (HD)';
    iframe.setAttribute("src", `https://www.youtube.com/embed/${data.results[0].key}` );
    
    
  }) 