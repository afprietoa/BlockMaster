const postFilm = async(url, obj) =>{
    await axios.post(url, obj)
}

export default postFilm