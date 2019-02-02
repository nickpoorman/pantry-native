import React from 'react'
import { PanResponder, Dimensions, View } from 'react-native'
import PropTypes from 'prop-types'
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import * as shape from 'd3-shape'
import { Svg } from 'expo'
const { Circle, G, Line, Rect, Text } = Svg

// const win = Dimensions.get('window')

// const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, 0, -80]

function scale(number, oldMin, oldMax, newMin, newMax) {
  //   if (number < oldMin) {
  //     console.log(
  //       'ERROR OOB - scale(%d, %d, %d, %d, %d)',
  //       number,
  //       oldMin,
  //       oldMax,
  //       newMin,
  //       newMax
  //     )
  //     throw new Error('number is less than oldMin')
  //   }
  //   if (number > oldMax) {
  //     console.log(
  //       'ERROR OOB - scale(%d, %d, %d, %d, %d)',
  //       number,
  //       oldMin,
  //       oldMax,
  //       newMin,
  //       newMax
  //     )
  //     throw new Error('number is greater than oldMax')
  //   }
  return ((newMax - newMin) * (number - oldMin)) / (oldMax - oldMin) + newMin
}

class Clickable extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
  }

  static defaultProps = {
    data: [],
  }

  state = {
    selectedDataIndex: null,
    height: null,
    width: null,
  }

  constructor(props) {
    super(props)
    this._panResponder = PanResponder.create({
      // Start on click instead of move...?
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderStart: this._handlePanResponderMove,

      // Ask to be the responder:
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderRelease,
    })
  }

  _handlePanResponderMove = (evt, gestureState) => {
    if (!!this.state.width) {
      var { contentInset } = this.props
      const clickLocX = evt.nativeEvent.locationX
      const numBuckets = this.props.data.length

      if (clickLocX !== null && numBuckets) {
        const leftInset = (contentInset || {}).left || 0
        const rightInset = (contentInset || {}).right || 0

        // We want to know what bucket the event falls into.
        // So when they click the event is actually shifted to the right too much, we need to move it back to the left
        const adjustedClick = clickLocX - leftInset
        //   Now we can see where that click falls in the new window
        const newWidth = this.state.width - leftInset - rightInset
        const adjustedPercent = adjustedClick / newWidth
        // Based on percent we can guess what bucket it falls into
        const selectedBucket = Math.round(adjustedPercent * (numBuckets - 1))

        // console.log('\nS*********')
        // console.log(`adjustedClick: ${adjustedClick}`)
        // console.log(`newWidth: ${newWidth}`)
        // console.log(`adjustedPercent: ${adjustedPercent}`)
        // console.log(`numBuckets: ${numBuckets}`)
        // console.log(`selectedBucket: ${selectedBucket}`)
        // console.log('E*********\n')

        if (this.state.selectedDataIndex !== selectedBucket) {
          this.setState({
            selectedDataIndex: selectedBucket,
          })
        }
      }
    }
  }

  _handlePanResponderRelease = (evt, gestureState) => {
    // console.log('_handlePanResponderRelease')
    // The user has released all touches while this view is the
    // responder. This typically means a gesture has succeeded
    this.setState({ selectedDataIndex: null })
  }

  _onLayout(event) {
    const {
      nativeEvent: {
        layout: { height, width },
      },
    } = event
    if (width !== this.state.width) {
      this.setState({ height, width })
    }
  }

  //   componentWillMount() {
  //   }

  render() {
    const { data, contentInset } = this.props
    if (!data || !data.length) return <View />

    // console.log(
    //   `rendering - yValue: ${
    //     data[this.state.selectedDataIndex]
    //   } | selected-index: ${this.state.selectedDataIndex}`
    // )

    /**
     * Both below functions should preferably be their own React Components
     */

    // const HorizontalLine = ({ y }) => (
    //   <Line
    //     key={'zero-axis'}
    //     x1={'0%'}
    //     x2={'100%'}
    //     y1={y(50)}
    //     y2={y(50)}
    //     stroke={'grey'}
    //     strokeDasharray={[4, 8]}
    //     strokeWidth={2}
    //   />
    // )

    // const Gradient = () => (
    //   <Defs key={'gradient'}>
    //     <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
    //       <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} />
    //       <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
    //     </LinearGradient>
    //   </Defs>
    // )

    const VerticleLine = ({ x, y, selectedX }) => {
      //   if (!selectedX || selectedX <= 0) selectedX = 0
      //   var xValue = x(selectedX)
      //   if (!xValue || xValue <= 0) xValue = 0
      //   console.log(
      //     `adjusted xValue: ${xValue} | adjusted selectedX: ${selectedX}`
      //   )
      return (
        <G>
          <Defs key={'gradient'}>
            <LinearGradient
              id={'gradient'}
              x1={x(selectedX)}
              y={'0%'}
              x2={x(selectedX)}
              y2={'100%'}
            >
              <Stop
                offset={'0%'}
                stopColor={'rgb(134, 65, 244)'}
                stopOpacity='0'
              />
              <Stop
                offset={'100%'}
                stopColor={'rgb(134, 65, 244)'}
                stopOpacity='1'
              />
            </LinearGradient>
          </Defs>
          <Line
            key={'zero-axis'}
            x1={x(selectedX)}
            x2={x(selectedX)}
            y1={'3%'}
            y2={'93%'}
            stroke={'grey'}
            stroke={'url(#gradient)'}
            // strokeDasharray={[4, 8]}
            fill='url(#gradient)'
            strokeWidth={7}
          >
            {/* <Gradient /> */}
          </Line>
        </G>
      )
    }

    // const Decorator = ({ x, y, data }) => {
    //   return data.map((value, index) => (
    //     <Circle
    //       key={index}
    //       cx={x(index)}
    //       cy={y(value)}
    //       r={4}
    //       stroke={'rgb(134, 65, 244)'}
    //       fill={'white'}
    //       onPress={() => {
    //         console.log(
    //           `Pressed: x: ${x} | y: ${y} | cx: ${x(index)} | cy: ${y(
    //             value
    //           )} | value: ${value} index: ${index}`
    //         )
    //       }}
    //     />
    //   ))
    // }

    return (
      <View
        style={
          {
            // height: 200
          }
        }
        // style={{ flex: 1, flexDirection: 'column' }}
        {...this._panResponder.panHandlers}
        onLayout={event => this._onLayout(event)}
      >
        <LineChart
          style={{
            height: 200,
            flex: 1,
            marginBottom: -8,
          }}
          data={data}
          svg={{
            stroke: 'rgb(134, 65, 244)',
            strokeWidth: 2,
          }}
          contentInset={contentInset}
          curve={shape.curveLinear}
          onPress={a => {
            console.log(`pressed: ${a}`)
          }}
        >
          {/* <Grid /> */}
          {/* <HorizontalLine /> */}
          {/* <Tooltip /> */}
          {this.state.selectedDataIndex !== null && (
            <VerticleLine selectedX={this.state.selectedDataIndex} />
          )}
          {/* <Decorator /> */}
          <Grid direction={Grid.Direction.HORIZONTAL} belowChart={true} />
        </LineChart>
      </View>
    )
  }
}

export default Clickable
