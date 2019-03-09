import React from 'react'

import {StyleSheet, Share, View, Text, ActivityIndicator, ScrollView, Image, Button, TouchableOpacity, Platform} from 'react-native'
import {getFIlmDetailFromApi, getUrlImageFromApi} from '../API/TMDBApi'

import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import EnlargeShrink from "../Animation/EnlargeShrink"



class FilmDetail extends React.Component{

constructor(props){

console.log("constructor")
super(props)

this.state = {
  film:undefined,
  isLoading: true,
}
this._shareFilm = this._shareFilm.bind(this)

}


_displayLoading(){
    if( this.state.isLoading){
        return (
          <View style={styles.loading_container} >
          <ActivityIndicator size = 'large' />
          </View>
    )
  }
}
_toggleFavorite(){
  console.log("Cliked")

  const action ={ type: "TOGGLE_FAVORITE",value: this.state.film}

  this.props.dispatch(action)


}



_displayFavoriteImage(){

var sourceImage = require("../Images/ic_favorite_border.png")
isLarge = false
if(this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1)
{
    sourceImage = require("../Images/ic_favorite.png")
    isLarge = true

}
return (
   <EnlargeShrink isLarge={isLarge} >

      <Image
      style={styles.favorite_image}
      source={sourceImage}
      />


    </EnlargeShrink>

    )


}

_displayFilm()
  {
    const { film } = this.state

    if( film != undefined)
    {
      return (
        <ScrollView style = {styles.scrollview_container} >

        <Image
          style={styles.image}
          source={{uri:getUrlImageFromApi( film.backdrop_path)}}
        />


        <Text style = {styles.title}> {film.title}  </Text>

        <TouchableOpacity
        style={styles.favorite_container}
        onPress={() => this._toggleFavorite()}>

        {this._displayFavoriteImage()}


        </TouchableOpacity>

        <Text style= {styles.description}> {film.overview}  </Text>

        <Text style = {styles.more_detail}> Sorti le {moment(new Date(film.release_date)).format("DD/MM/YYYY")}  </Text>
        <Text style = {styles.more_detail}> Note : {film.vote_average}  </Text>
        <Text style = {styles.more_detail}> Nombre de votes : {film.vote_count}  </Text>
        <Text style = {styles.more_detail}> Budget :  {numeral(film.budget).format('0,0[.]00 $')}</Text>
        <Text style = {styles.more_detail}>  Genre(s) : {film.genres.map(function(genre){return genre.name; }).join(" / ") }  </Text>
        <Text style = {styles.more_detail}>  Companie : {film.production_companies.map(function(company){ return company.name; }).join(" / ") }  </Text>


        </ScrollView>
      )


    }


  }


  static navigationOptions = ({ navigation }) => {
const { params } = navigation.state

    if( params.film!= undefined && Platform.OS === 'ios')
    {

    return {
      headerRight:
      <TouchableOpacity style={styles.share_touchable_headerrightbutton} onPress = {() => params.shareFilm()}>

      <Image style = { styles.share_image} source={require('../Images/ic_share.png')} />
      </TouchableOpacity>,
    };
  };

  };

  _updateNavigationParams() {

    this.props.navigation.setParams({

      shareFilm: this._shareFilm,

      film: this.state.film

    })

  }


  componentDidMount() {

      const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)

      if (favoriteFilmIndex !== -1) {

        this.setState({

          film: this.props.favoritesFilm[favoriteFilmIndex]

        }, () => { this._updateNavigationParams() })

        return

      }



      this.setState({ isLoading: true })

      getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {

        this.setState({

          film: data,

          isLoading: false

        }, () => { this._updateNavigationParams() })

      })

    }




_shareFilm()
{

const {film} = this.state
Share.share({title:film.title,message:film.overview})

}

_displayFloatingActionButton()
{

const { film } = this.state


if( film!= undefined && Platform.OS === 'android')
{

return(
  <TouchableOpacity
  style={styles.share_touchable_floatingactionbutton}
  onPress = {() => this._shareFilm()}>

  <Image
  style = { styles.share_image}
  source={require('../Images/ic_share.png')} />

  </TouchableOpacity>


)
}

}

render(){
console.log("Render")
console.log(this.props)

return(

<View style={styles.main_container}>

  {this._displayLoading()}
  {this._displayFilm()}
  {this._displayFloatingActionButton()}

</View>


)
}

componentDidUpdate() {
   console.log("componentDidUpdate : ")
   console.log(this.props.favoritesFilm )
 }


componentDidMount() {
    console.log("ComponentDidMount")

    getFIlmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {

      this.setState({

        film: data,

        isLoading: false

      })

    })

  }





}



const styles = StyleSheet.create({
  main_container: {
    flex:1,
  },
  image: {
    height: 168,
    margin: 5,
  },
  title: {
  fontSize:30,
  fontWeight:"bold",
  textAlign:"center",
  marginBottom:10

  },
  description : {

    marginBottom:15

  },
  more_detail : {
    fontSize:10,
    color:"black",
    marginBottom:3

  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'

  },scrollview_container: {
    flex: 1
  },
  favorite_container: {

    alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici

},

favorite_image: {
    flex:1,
    width: null,
    height: null
},
share_touchable_floatingactionbutton: {
   position: 'absolute',
   width: 60,
   height: 60,
   right: 30,
   bottom: 30,
   borderRadius: 30,
   backgroundColor: '#e91e63',
   justifyContent: 'center',
   alignItems: 'center'

  },
  share_touchable_headerrightbutton: {

    marginRight: 8

  },

  share_image: {
    width: 30,
    height: 30
}

  })

const mapStateToProps = (state) => {

  return {
    favoritesFilm : state.toggleFavorite.favoritesFilm
  }
}

export default connect(mapStateToProps)(FilmDetail)
