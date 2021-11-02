const getDtFilm = () => {
    let title = document.getElementById('title')
    let genre = document.getElementById('genre')
    let id = document.getElementById('id')
    let poster = document.getElementById('poster')
    let release = document.getElementById('release')
    let duration = document.getElementById('duration')
    let synopsis = document.getElementById('synopsis')

    const movie = {
        title, 
        genre, 
        id, 
        poster, 
        release, 
        duration,
        synopsis,
    }
    return movie;

}
export default getDtFilm