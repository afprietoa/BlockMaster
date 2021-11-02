export const getFilm = async(url) =>{
    let list = await axios.get(url)
    let {data} = list
    return data
}