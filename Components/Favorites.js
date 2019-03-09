import React from "react"

import { StyleSheet, Button, TextInput, View, FlatList, Text, Image, ActivityIndicator } from 'react-native';
import films from "../Helpers/filmsData"
import FilmItem from "../Components/FilmItem"
import { connect } from 'react-redux'
import FilmList from "../Components/FilmList"
import Avatar from './Avatar'
import { getFilmFromApiWithSearchedText } from "../API/TMDBApi"

class Favorites extends React.Component{








      render(){

        // console.log("-----Page : " + this.page + " / TotalPages : " + this.totalpage + " / Nombre de films : " + this.state.films.length)
          // console.log(this.props)
        return(


    // <FilmList
    //    films={this.props.favoritesFilm} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
    //    navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
    //    isfavoriteList={true}
    // />



 <View style={styles.main_container}>
        <View style={styles.avatar_container}>
          <Avatar/>
        </View>
        <FilmList
          films={this.props.favoritesFilm}
          navigation={this.props.navigation}
          isfavoriteList={true}
        />
      </View>






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
  avatar_container: {
    alignItems: 'center'
  }
})


const mapStateToProps = state => {
  return {
    favoritesFilm : state.toggleFavorite.favoritesFilm
  }
}

export default connect(mapStateToProps)(Favorites)
