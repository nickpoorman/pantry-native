import React from 'react'
import { PanResponder, Dimensions, View } from 'react-native'
import PropTypes from 'prop-types'
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import * as shape from 'd3-shape'
import { Svg } from 'expo'
const { Circle, G, Line, Rect, Text } = Svg

import ClickableLineChart from 'app/components/charts/clickable/ClickableLineChart'

// const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, 0, -80]

const verticleInset = 20
const horizontalInset = 15

const contentInset = {
  top: verticleInset,
  bottom: verticleInset,
  left: horizontalInset,
  right: horizontalInset,
}

export class ChartWithAxis extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    setSelectedText: PropTypes.func.isRequired,
  }

  static defaultProps = {
    data: [],
  }

  render() {
    const { data } = this.props
    return (
      <View
        style={
          {
            // height: 200,
          }
        }
      >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <YAxis
            style={{
              // flex: 1,
              height: 200,
              marginRight: 8,
            }}
            data={data}
            contentInset={{
              top: contentInset.top,
              bottom: contentInset.bottom,
            }}
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            numberOfTicks={10}
            formatLabel={value => `${value}`}
          />
          <View style={{ flex: 1, flexDirection: 'column' }}>
            {/* TODO: Render Line chart or other chart here... */}
            <ClickableLineChart
              contentInset={contentInset}
              data={data}
              setSelectedText={this.props.setSelectedText}
            />
            <XAxis
              style={
                {
                  // paddingBottom: 10
                  // backgroundColor: 'red',
                }
              }
              data={data}
              formatLabel={(value, index) => index}
              contentInset={{
                left: contentInset.left,
                right: contentInset.right,
              }}
              svg={{ fontSize: 10, fill: 'grey' }}
            />
          </View>
        </View>
      </View>
    )
  }
}
