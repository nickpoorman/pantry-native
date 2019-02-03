import React from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import hash from 'object-hash'

import { CardText } from 'app/components/cards/CardText'
import { ChartAndText } from 'app/components/cards/ChartAndText'
import { LargeChartAndText } from 'app/components/cards/LargeChartAndText'
import { IconAndText } from 'app/components/cards/IconAndText'

import { loadTargetData } from 'app/store/actions'

@connect(
  state => ({
    ui: state.ui,
    currentTarget: state.targets.currentTarget,
    currentTargetData: state.targets.currentTargetData,
    currentTargetDataLoading: state.targets.targetsLoading,
    currentTargetDataRefreshing: state.targets.targetsRefreshing,
  }),
  { loadTargetData }
)
export class Cards extends React.Component {
  static propTypes = {
    ui: PropTypes.shape({
      toast: PropTypes.shape({
        alert: PropTypes.string,
        success: PropTypes.string,
      }),
    }).isRequired,
    currentTarget: PropTypes.string,
    currentTargetData: PropTypes.shape({
      cards: PropTypes.arrayOf(PropTypes.object),
    }),
    currentTargetDataLoading: PropTypes.bool,
    currentTargetDataRefreshing: PropTypes.bool,
    loadTargetData: PropTypes.func.isRequired,
  }

  static defaultProps = {
    currentTarget: '',
    currentTargetData: { cards: [] },
  }

  buildComponentFromCard = card => {
    switch (card.cardType) {
      case 'text':
        return <CardText text={card.text} />
      case 'icon-with-text':
        return <IconAndText text={card.text} icon={card.icon} />
      case 'pie-chart-with-text':
        return (
          <ChartAndText chartType='pie' text={card.text} chart={card.chart} />
        )
      case 'area-chart-with-text':
        return (
          <ChartAndText chartType='area' text={card.text} chart={card.chart} />
        )
      case 'line-chart-with-text':
        return (
          <ChartAndText chartType='line' text={card.text} chart={card.chart} />
        )
      case 'progress-chart-with-text':
        return (
          <ChartAndText
            chartType='progress'
            text={card.text}
            chart={card.chart}
          />
        )
      case 'bar-chart-with-text':
        return (
          <ChartAndText chartType='bar' text={card.text} chart={card.chart} />
        )
      case 'large-line-chart':
        return (
          <LargeChartAndText
            chartType='line'
            text={card.text}
            chart={card.chart}
          />
        )
      default:
        console.log(`Unknown card type: ${JSON.stringify(card.cardType)}`)
        return null
    }
  }

  onRefresh = () => {
    if (this.props.currentTarget) {
      this.props
        .loadTargetData(this.props.currentTarget, { refreshing: true })
        .catch(err => {
          // TODO: Do this toast stuff...
          // const message = err.message ? err.message : err
          // this.props.actions.toggleSpinner()
          // this.props.actions.showToast({
          //   alert: message,
          // })
          console.log(`err: ${JSON.stringify(err)}`)
        })
    }
  }

  render() {
    const {
      currentTargetData,
      currentTargetDataLoading,
      currentTargetDataRefreshing,
    } = this.props

    if (currentTargetDataLoading) {
      return <ActivityIndicator style={{ marginTop: 20 }} size='large' />
    }

    if (!currentTargetData) {
      return <Text>TODO: Create empty state for cards</Text>
    }

    const { cards } = currentTargetData
    if (!cards) {
      return <Text>TODO: Create an error state when cards is not there</Text>
    }

    return (
      <FlatList
        data={cards}
        extraData={{ ...this.state, ...this.props }}
        renderItem={({ item, index }) => {
          const isLast = index == cards.length - 1
          const lastStyles = isLast ? { marginBottom: 10 } : {}
          return (
            <View style={{ ...styles.card, ...lastStyles }}>
              {this.buildComponentFromCard(item)}
            </View>
          )
        }}
        keyExtractor={(card, index) => `${hash(card)}-${index}`}
        onRefresh={this.onRefresh}
        refreshing={currentTargetDataRefreshing}
        style={styles.scrollContainer}
      />
    )
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  card: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 8,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 0.1,
    borderColor: '#d6d7da',
    borderRadius: 7,
  },
})
