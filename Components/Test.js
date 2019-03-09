// Components/Test.js

import React from 'react'
import { StyleSheet, View, Platform, Animated, Easing, Dimensions, PanResponder} from 'react-native'

import HelloWorld from './HelloWorld'

class Test extends React.Component {


  constructor(props) {

   super(props)

   this.state = {

     topPosition: 0,

     leftPosition: 0,

   }



   var {height, width} = Dimensions.get('window');

   this.panResponder = PanResponder.create({

       onStartShouldSetPanResponder: (evt, gestureState) => true,

       onPanResponderMove: (evt, gestureState) => {

           let touches = evt.nativeEvent.touches;

           if (touches.length == 1) {
             console.log("One move")
               this.setState({

                 topPosition: touches[0].pageY - height/2,

                 leftPosition: touches[0].pageX - width/2

               })

           }

       }

   })

 }



   // Components/Test.js


     render() {
    return (
      <View style={styles.main_container}>
      <View  {...this.panResponder.panHandlers} style={[styles.animation_view, { top: this.state.topPosition , left: this.state.leftPosition }]}>

      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subview_container: {
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
        height: 100,
        width: 50
      },
      android: {
        backgroundColor: 'blue',
        height: 50,
        width: 100
      }

    })

},
animation_view: {
  backgroundColor:'red',
  width : 100,
  height: 100
}


})

export default Test
