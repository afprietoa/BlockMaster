export const deleteFilm = async(url,id) =>{
    await axios.delete(url+id)
}