const API_TOKEN = "b34bfc1ecf7c322ae6f98d897df8c13b";


export function getFilmFromApiWithSearchedText(text,page){

const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN +
            '&language=fr&query=' + text + '&page=' + page


return fetch(url)
    .then((response) => response.json())
    .catch((response) => console.error(error))

}


export function getUrlImageFromApi(name){

const url = 'https://image.tmdb.org/t/p/w300'+name
return url
// return fetch(url)
//        .then((response) => console.log(response))
//        .catch((response) => console.error(response))

}


export function getFIlmDetailFromApi(id){

return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
       .then((response) => response.json())
       .catch((error) => console.error(error))

}

export function getBestFilmsFromApi (page) {
    return fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + API_TOKEN + '&vote_count.gte=1000&sort_by=release_date.desc&language=fr&page=' + page)
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }
