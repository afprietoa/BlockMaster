const putFilm = async(url, obj) =>{
    await axios.put(url, obj)
}

export default putFilm