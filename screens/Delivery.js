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
import colors from '../constants/Colors';

var { height, width } = Dimensions.get('window');

class DeliveryScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps }) => ({
    title: screenProps.t('delivery:title'),
  });

  state = {

  }
  
  getOrder = (orderId) => {
    const { dispatchList } = this.props;

    return dispatchList.filter(function(d){
      return d.orderId == orderId;
    })[0];
  }

  render() {
    const { t, i18n, orderID, navigation} = this.props;
    const order = orderID == '' ? '' : this.getOrder(orderID);

    if(orderID == ''){
      return (<View style={styles.container}><Text>{t('common:noOrderSelected')}</Text></View>)
    } else {
      return (
        <View
          style={styles.container}
        >
          <View style={styles.vendorInfo}>
            <Text selectable style={[styles.vendorData, {fontWeight: 'bold'}]}>{order.customerName}</Text>
            <Text selectable style={[styles.vendorData]}>{order.customerPhone}</Text>
            <Text selectable style={[styles.vendorData]}>{order.customerEmail}</Text>
            <Text selectable style={[styles.vendorData]}>{order.shippingLocationId}</Text>
          </View>
          <TouchableOpacity
            onPress={()=>{
              navigation.navigate('Sign', {
                signatureType: 'c'
              });
            }}
            style={styles.signatureButton}
          >
              <Text style={{color: colors.black, fontWeight: 'bold'}}>{t('delivery:signatureButton')}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.offWhite
  },
  vendorInfo:{
    flex:2,
    width: width,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderBottomWidth: 5,
    borderTopWidth: 5,
    borderColor: colors.darkGray
  },
  vendorData:{
    margin: 2.5,
    padding: 5,
  },
  signatureButton: {
    width: '80%', 
    backgroundColor: 'transparent', 
    borderRadius: 10, 
    borderWidth: 2,
    borderColor: colors.black,
    height: '10%',
    marginBottom: 30,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
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

export default withNamespaces(['delivery', 'common'], {wait: true})(connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryScreen))