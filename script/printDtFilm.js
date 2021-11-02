export const printFilm = (movie, main) => {
    
    main.innerHTML = ''
    movie.forEach(movie => {

        const { title, image, release, synopsis } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
         <img src="${image}" alt="">
         <div class="movie-info">
             <h3>${title}</h3>
             <span class="">${release}</span>
         </div>
         <div class="overview">
             <h3>Overview</h3>
             ${synopsis}
         </div>
    `
        main.appendChild(movieEl)
    });

}