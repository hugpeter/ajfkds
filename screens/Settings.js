import React from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  Switch,
  View,
  Picker,
  Linking
} from 'react-native';
import { withNamespaces } from 'react-i18next';
import { login } from '../actions/login';
import { Button, Input, CheckBox, colors } from 'react-native-elements';
import { connect } from 'react-redux';
import { invalidateCache } from 'redux-cache';
import { Location, TaskManager, Permissions } from 'expo';
import { composeInitialProps } from 'react-i18next/src';

class SettingsScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps }) => ({
    title: screenProps.t('settings:title'),
  });

  state = {
    language: this.props.i18n.language,
    count: 0
  }

  componentDidUpdate(){
    const { count, language } = this.state;

    if(Platform.OS = 'ios'){
      console.log('did update: ' + language);
    } else {
      if(count == 1){
        console.log('did update: ' + language);
      } else if(count > 1){
        this.setState({count: 0});
      }
    }
  }

  getCount = () => {
    return this.state.count;
  }

  render() {
    const { t, i18n, navigation } = this.props;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <Text style={styles.text}>{t('settings:chooseLanguage')}</Text>
        <Picker
            selectedValue={this.state.language}
            style={styles.twoPickers}
            itemStyle={styles.twoPickerItems}
            onValueChange={(itemValue, itemIndex) => {
              var count = this.getCount();

              if(Platform.OS = 'ios'){
                this.setState({language: itemValue});
                i18n.changeLanguage(itemValue);
              } else {
                if(count==0){
                  this.setState({language: itemValue, count: ++count});
                  i18n.changeLanguage(itemValue);
                } else {
                  this.setState({count: ++count});
                }
              }
            }}
          >
            <Picker.Item label={t('settings:languages.english')} value="en" />
            <Picker.Item label={t('settings:languages.spanish')} value="es" />
        </Picker>
        <Button 
          onPress={()=>{
            this.props.logOut();
            navigation.navigate('Auth');
          }}
          title={t('settings:logOut')}
          buttonStyle={styles.button}
        />
        <Button 
          title={t('settings:privacyPolicy')}
          onPress={()=>{
            Linking.openURL('http://biossoft.net/biossoft/PrivacyPolicy/PEWprivacypolicy.html')
          }}
          buttonStyle={styles.button}
        />
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5f2',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  fetchingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  logo: {
    borderRadius: 5,
    marginBottom: 20
  },
  checkbox: {
    marginBottom: 10
  },
  input: {
    marginBottom: 10
  },
  twoPickers: {
    width: '80%',
    height: Platform.OS == 'ios' ? 132 : 45,
    backgroundColor: 'white',
    borderRadius: 10
  },
  twoPickerItems: {
    height: 132,
    borderWidth: 0.5,
    borderColor: '#d3f3ff',
    borderRadius: 10
  },
  button: {
    backgroundColor: 'black',
    width: 300,
    height: 45,
    marginBottom: 10,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5
  }
});

const mapStateToProps = (state) => {
  return {
    token: state.login.token
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logOut: () => {
      dispatch(invalidateCache([
        'login'
      ]))
    }
  }
}

export default withNamespaces(['settings', 'common'], {wait: true})(connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen));