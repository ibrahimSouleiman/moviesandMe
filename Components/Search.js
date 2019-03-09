import React from "react"

import { StyleSheet, Button, TextInput, View, FlatList, Text, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import films from "../Helpers/filmsData"
import FilmItem from "../Components/FilmItem"
import { connect } from 'react-redux'
import FilmList from "../Components/FilmList"

import { getFilmFromApiWithSearchedText } from "../API/TMDBApi"

class Search extends React.Component{


    constructor(props){
      super(props)
      this.searchText = ""
      this.page = 0
      this.totalpage = 0
      this.state = {films:[],
                    isLoading : false
                    }
      this._loadFilms = this._loadFilms.bind(this)

    }

    // {/* _ pour indique que la funciton est prive , mais cela ne rend pas  pour autant privée */}
    _loadFilms()
    {

      if(this.searchText.length > 0){
        this.setState({isLoading : true})

      getFilmFromApiWithSearchedText(this.searchText,this.page+1).then(data =>
        {

          this.page = data.page
          console.log("Page="+data.page)
          this.totalpage = data.total_pages

          this.setState ({ films: this.state.films.concat(data.results),
                          isLoading : false
                          })
        })
      }
      }

      _displayLoading(){
        if(this.state.isLoading){
          return (
            <View style={styles.loading_container}>
                  <ActivityIndicator size="large" color="#0000ff" />
            </View>

          )
        }


      }



      _searchInputChanged(text){

        this.searchText = text
      }

      _searchFilms(){

          this.page = 0
          this.totalpage = 0
          this.setState({films:[]},()=> {
            console.log("Page : " + this.page + " / TotalPages : " + this.totalpage + " / Nombre de films : " + this.state.films.length)
            this._loadFilms()

          })
          // J'utilise la paramètre length sur mon tableau de films pour vérifier qu'il y a bien 0 film


      }

      //
      _displayDetailForFilm = (idFilm) => {

          console.log("Display film with id " + idFilm)
          this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
        }


      _getAllKey(films){
        allKeys = []
        sameKey = []

        for (let i=0; i<films.length; i++) {
          allKeys.push(films[i].id);

        for (let j=i+1; j<films.length; j++) {
          if(films[i].id == films[j].id){

          sameKey.push(films[i].id)

        }
        }

      }
        return ([sameKey])

      }

      _isFilmFavorite (idFilm) {
        result = false
        if(this.props.favoritesFilm.findIndex(item => item.id === idFilm) !== -1)
        {

          result = true
        }

        return result

      }



      render(){

        console.log("-----Page : " + this.page + " / TotalPages : " + this.totalpage + " / Nombre de films : " + this.state.films.length+" Keys="+this._getAllKey(this.state.films))
          // console.log(this.props)
        return(

<SafeAreaView style={styles.main_container}>

<TextInput style={styles.textinput}
            placeholder='Titre du film'
            onSubmitEditing = {() => this._searchFilms()}
            onChangeText = {(text) => this._searchInputChanged(text)}
            />
    <Button title='Rechercher' onPress={() => this._searchFilms()}/>
    {/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList */}


    <FilmList
       films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
       navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
       loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
       page={this.page}
       isfavoriteList={false}
       totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
    />


    {this._displayLoading()}

</SafeAreaView>






        )
      }
}


const styles = StyleSheet.create({
  main_container:{
    // marginTop: 20,
    flex:1,
    // flexDirection:'row',
    // justifyContent:'center'
  },

  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,

  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 50,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'

  }
})

export default Search
// const mapStateToProps = (state) => {
//
//   return {
//     favoritesFilm : state.favoritesFilm
//   }
// }
//
// export default connect(mapStateToProps)(Search)
