import React from 'react'
import { PanResponder, Dimensions, View } from 'react-native'
import { LineChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Svg } from 'expo'
const { Circle, G, Line, Rect, Text } = Svg

// const win = Dimensions.get('window')

const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

class Zoomable extends React.PureComponent {
  state = {
    selectedX: null,
    height: null,
    width: null,
  }

  constructor(props) {
    super(props)
    this._panResponder = PanResponder.create({
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

    const VerticleLine = ({ x, y, selectedX }) => (
      <Line
        key={'zero-axis'}
        x1={x(selectedX)}
        x2={x(selectedX)}
        y1={'0%'}
        y2={'100%'}
        stroke={'grey'}
        // strokeDasharray={[4, 8]}
        strokeWidth={2}
      />
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

export default Zoomable
