import React from 'react'
import { PanResponder, Dimensions, View } from 'react-native'
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import * as shape from 'd3-shape'
import { Svg } from 'expo'
const { Circle, G, Line, Rect, Text } = Svg

import ClickableLineChart from 'app/components/charts/clickable/ClickableLineChart'

const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, 0, -80]

const verticleInset = 20
const horizontalInset = 15

const contentInset = {
  top: verticleInset,
  bottom: verticleInset,
  left: horizontalInset,
  right: horizontalInset,
}

class ChartWithAxis extends React.PureComponent {
  render() {
    return (
      <View style={{ height: 200 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <YAxis
            //   style={{ flex: 1 }}
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
            <ClickableLineChart contentInset={contentInset} />
            <XAxis
              // style={{ marginHorizontal: -10 }}
              data={data}
              formatLabel={(value, index) => index}
              contentInset={{
                left: contentInset.left,
                right: contentInset.right,
              }}
              svg={{ fontSize: 10, fill: 'black' }}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default ChartWithAxis
