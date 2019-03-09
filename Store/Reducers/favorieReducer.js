
const initialState = {favoritesFilm : []}

function toggleFavorite(state = initialState,action){
  let nextState
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)

      if (favoriteFilmIndex !== -1){
        console.log("Reducer - toggle")

        //// NOTE:  supprimer le film car il est deja dans le favoritesFilm

        nextState = { ...state,
          favoritesFilm : state.favoritesFilm.filter( (item,index) => index !== favoriteFilmIndex)
        }
        console.log("NextState = "+nextState.favoriteFilm)
      }
      else{
        console.log("Reducer - else")
        /// NOTE: on ajouter le film dans le favorie

        nextState = {...state,favoritesFilm:[...state.favoritesFilm,action.value]
        }

      }


      return nextState || state /// NOTE: si nextState n'est undefined renvoit state

    default:
      return state


  }





}

export default toggleFavorite
