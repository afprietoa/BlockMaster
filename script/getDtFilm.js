const getDtFilm = () => {
    let title = document.getElementById('title').value
    let genre = document.getElementById('genre').value
    let image = document.getElementById('poster').value
    let release = document.getElementById('release').value
    let duration = document.getElementById('duration').value
    let synopsis = document.getElementById('synopsis').value

    const movie = {
        title, 
        genre, 
        image, 
        release, 
        duration,
        synopsis,
    }
    console.log(movie)
    return movie;

}
export default getDtFilm