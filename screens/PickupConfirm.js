import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { Icon } from 'expo';
import colors from '../constants/Colors';

var { width } = Dimensions.get('window');

class PickupConfirmScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps }) => ({
    title: screenProps.t('pickup:verifyItem'),
    headerLeft: null,
    gesturesEnabled: false
  });

  render() {
    const { t, i18n, navigation, orderID} = this.props;
    const { Id, scanInfo } = this.props.navigation.state.params;

    if(scanInfo && typeof scanInfo === 'object'){
      if(Id == scanInfo.Id){
        return (
          <View
            style={styles.container}
          >
            <View
              style={styles.msg}
            >
              <Icon.Ionicons
                name={'ios-checkmark-circle'}
                size={100}
                color={colors.chechGreen}
              />
              <Text>{t('pickup:success')}</Text>
            </View>
            <TouchableOpacity 
              onPress={()=>{
                navigation.navigate('Pickup')
              }}
            >
              <Text
                style={{color: colors.chechGreen, fontWeight: 'bold'}}
              >
                {t('pickup:backToList')}
              </Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View
            style={styles.container}
          >
            <View
              style={styles.msg}
            >
              <Icon.MaterialIcons
                name={'error'}
                size={100}
                color={'red'}
              />
              <Text>{t('pickup:failure')}</Text>
            </View>
  
            <TouchableOpacity 
              onPress={()=>{
                navigation.navigate('Pickup')
              }}
            >
              <Text
                style={{color: colors.chechGreen, fontWeight: 'bold'}}
              >
                {t('pickup:backToList')}
              </Text>
            </TouchableOpacity>
          </View>
        );
      }
    } else {
      return (
        <View
          style={styles.container}
        >
          <View
            style={styles.msg}
          >
            <Icon.MaterialIcons
              name={'error'}
              size={100}
              color={'red'}
            />
            <Text>{t('pickup:failure')}</Text>
          </View>

          <TouchableOpacity 
            onPress={()=>{
              navigation.navigate('Pickup')
            }}
          >
            <Text
              style={{color: colors.chechGreen, fontWeight: 'bold'}}
            >
              {t('pickup:backToList')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    
  }

  _signaturePadError = (error) => {
    console.log(error);
  }

  _signaturePadChange = ({base64DataUrl}) => {
    console.log("Got new signature: " + base64DataUrl);
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  msg:{
    alignItems: 'center',
    justifyContent: 'space-around'
  },  
  scrollView: {
    padding: 10,
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  pickups: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    width: width,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    marginTop: 5
  },
  pickupsHeader: {
    flexDirection: 'row',
    width: width,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    marginTop: 5
  },
  data: {
    width: width/2,
    textAlign: 'center'
  }
});

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    orderID: state.dispatch.orderID,
    dispatchList: state.dispatch.dispatchList
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    
  }
}

export default withNamespaces(['pickup', 'common'], {wait: true})(connect(
  mapStateToProps,
  mapDispatchToProps
)(PickupConfirmScreen))