import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Platform,
} from 'react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { purple, lightestPurple } from 'app/styles'
import Layout from 'app/constants/Layout'
import { createTarget, showToast } from 'app/store/actions'

@connect(
  state => ({
    auth: state.auth,
    ui: state.ui,
  }),
  { createTarget, showToast }
)
export default class NewTargetScreen extends React.Component {
  static navigationOptions = {
    title: 'New Target',
  }

  static propTypes = {
    auth: PropTypes.shape({}).isRequired,
    createTarget: PropTypes.func.isRequired,
    showToast: PropTypes.func.isRequired,
    ui: PropTypes.shape({
      toast: PropTypes.shape({
        enabled: PropTypes.bool.isRequired,
      }).isRequired,
    }).isRequired,
  }

  state = {
    name: '',
    url: '',
  }

  onCreateItemPress = item => {
    const { name, url } = this.state
    // Dispatch a create target from the text
    this.props
      .createTarget({ name, url })
      .then(() => this.props.navigation.goBack())
      .then(() => this.props.showToast({ success: `Created target!` }))
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <MaterialCommunityIcons
            name='json'
            size={90}
            color={purple}
            style={styles.icon}
          />

          <Text style={styles.formDescription}>
            Creating a new target will add another endpoint to fetch metrics
            from.
          </Text>

          <View style={styles.fieldsContainer}>
            <TextInput
              style={styles.formField}
              placeholder='Enter a name for the target'
              onChangeText={name => this.setState({ name })}
            />
          </View>

          <View style={styles.fieldsContainer}>
            <TextInput
              style={styles.formField}
              placeholder='Enter the URL for the target'
              onChangeText={url => this.setState({ url })}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType={Platform.OS === 'ios' ? 'url' : 'default'}
              returnKeyType='done'
              textContentType='URL'
            />
          </View>

          <Button
            onPress={this.onCreateItemPress}
            title='Create Target!'
            color={purple}
          />
        </View>
      </ScrollView>
    )
  }
}

// We don't want the form to be covered by the keyboard.
const maxHeight = Layout.window.height / 2 - (Layout.window.height / 2) * 0.1

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 30,
    paddingRight: 30,
  },
  formContainer: {
    height: maxHeight,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  formDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  fieldsContainer: {
    flexDirection: 'row',
  },
  formField: {
    flexGrow: 1,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: lightestPurple,
  },
})
