// Animations/FadeIn.js

import React from 'react'
import { Animated, Dimensions, StyleSheet, View} from 'react-native'

class EnlargeShrink extends React.Component {

  constructor(props) {
    super(props)

    console.log("EnlargeShrink | isFilmFavorite="+this.props.isFilmFavorite)
    console.log("EnlargeShrink |style ="+this.props.style)

    // this.state = {
    //   viewSize: new Animated.Value(this._getSize())
    // }
    // this._updateWidthHeigth()
  }


  _getSize()
  {

    if(this.props.isLarge){
      return 80
    }

    return 40

  }

  // componentDidUpdate() {
  //   Animated.spring(
  //     this.state.viewSize,
  //     {
  //       toValue: this._getSize()
  //     }
  //   ).start()
  //
  //
  //
  // }

  render() {
    console.log("EnlargeShrink | childer ="+this.props.children)
    return (
      <Animated.View style={{width:20,height:20}}>

        {this.props.children}

      </Animated.View>
    )
  }
}

export default EnlargeShrink
