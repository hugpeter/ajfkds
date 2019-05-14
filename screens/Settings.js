import React from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  Picker,
  Linking,
  View,
  TouchableOpacity
} from 'react-native';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { invalidateCache } from 'redux-cache';
import colors from '../constants/Colors';

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

    // if(Platform.OS = 'ios'){
      console.log('did update: ' + language);
    // } else {
    //   if(count == 1){
    //     console.log('did update: ' + language);
    //   } else if(count > 1){
    //     this.setState({count: 0});
    //   }
    // }
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
        <View style={{width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontWeight: "bold", color: colors.chechGreen, marginBottom: 10}}>{t('settings:chooseLanguage')}</Text>
          <Picker
              selectedValue={this.state.language}
              style={styles.twoPickers}
              itemStyle={styles.twoPickerItems}
              onValueChange={(itemValue, itemIndex) => {
                // var count = this.getCount();

                // if(Platform.OS = 'ios'){
                  this.setState({language: itemValue});
                  i18n.changeLanguage(itemValue);
                // } else {
                //   if(count==0){
                //     this.setState({language: itemValue, count: ++count});
                //     i18n.changeLanguage(itemValue);
                //   } else {
                //     this.setState({count: ++count});
                //   }
                // }
              }}
            >
              <Picker.Item label={t('settings:languages.english')} value="en" />
              <Picker.Item label={t('settings:languages.spanish')} value="es" />
          </Picker>
        </View>
        
        <TouchableOpacity
            onPress={()=>{
              this.props.logOut();
              navigation.navigate('Auth');
            }}
            style={styles.logout}
        >
          <Text style={{color: colors.chechRed, fontWeight: 'bold'}}>{t('settings:logOut')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>{
              Linking.openURL('http://biossoft.net/biossoft/PrivacyPolicy/PEWprivacypolicy.html')
            }}
            style={styles.privacypolicy}
        >
          <Text style={{color: colors.black, fontWeight: 'bold'}}>{t('settings:privacyPolicy')}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offWhite,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  twoPickers: {
    width: '80%',
    height: Platform.OS == 'ios' ? 132 : 45,
    backgroundColor: 'white',
    borderRadius: 10
  },
  twoPickerItems: {
    height: 132,
    borderWidth: 2,
    borderColor: colors.chechGreen,
    borderRadius: 10
  },
  logout: {
    width: '80%', 
    backgroundColor: 'transparent', 
    borderRadius: 10, 
    borderWidth: 2,
    borderColor: colors.chechRed,
    height: '10%',
    marginBottom: 20,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  privacypolicy: {
    width: '80%', 
    backgroundColor: 'transparent', 
    borderRadius: 10, 
    borderWidth: 2,
    borderColor: colors.black,
    height: '10%',
    marginBottom: 50,

    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
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