import React from 'react'
import { PanResponder, Dimensions, View } from 'react-native'
import { LineChart, Grid } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import * as shape from 'd3-shape'
import { Svg } from 'expo'
const { Circle, G, Line, Rect, Text } = Svg

// const win = Dimensions.get('window')

const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

class Clickable extends React.PureComponent {
  state = {
    selectedX: null,
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
      this.setState({
        selectedX: Math.round(
          (evt.nativeEvent.locationX / this.state.width) * data.length
        ),
      })
    }
  }

  _handlePanResponderRelease = (evt, gestureState) => {
    // The user has released all touches while this view is the
    // responder. This typically means a gesture has succeeded
    this.setState({ selectedX: null })
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
    console.log(
      `touched: ${data[this.state.selectedX]} | index: ${this.state.selectedX}`
    )

    /**
     * Both below functions should preferably be their own React Components
     */

    const HorizontalLine = ({ y }) => (
      <Line
        key={'zero-axis'}
        x1={'0%'}
        x2={'100%'}
        y1={y(50)}
        y2={y(50)}
        stroke={'grey'}
        strokeDasharray={[4, 8]}
        strokeWidth={2}
      />
    )

    const Gradient = () => (
      <Defs key={'gradient'}>
        <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
          <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} />
          <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
        </LinearGradient>
      </Defs>
    )

    const VerticleLine = ({ x, y, selectedX }) => (
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
          y1={'0%'}
          y2={'100%'}
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

    const Decorator = ({ x, y, data }) => {
      return data.map((value, index) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={4}
          stroke={'rgb(134, 65, 244)'}
          fill={'white'}
          onPress={() => {
            console.log(
              `Pressed: x: ${x} | y: ${y} | cx: ${x(index)} | cy: ${y(
                value
              )} | value: ${value} index: ${index}`
            )
          }}
        />
      ))
    }

    return (
      <View
        {...this._panResponder.panHandlers}
        onLayout={event => this._onLayout(event)}
      >
        <LineChart
          style={{ height: 200 }}
          data={data}
          svg={{
            stroke: 'rgb(134, 65, 244)',
            strokeWidth: 2,
          }}
          contentInset={{ top: 20, bottom: 20 }}
          curve={shape.curveLinear}
          onPress={a => {
            console.log(`pressed: ${a}`)
          }}
        >
          {/* <Grid /> */}
          {/* <HorizontalLine /> */}
          {/* <Tooltip /> */}
          {this.state.selectedX && (
            <VerticleLine selectedX={this.state.selectedX} />
          )}
          {/* <Decorator /> */}
        </LineChart>
      </View>
    )
  }
}

export default Clickable
