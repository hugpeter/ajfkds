import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import timeConverter from '../util/timeConvert';
import colors from '../constants/Colors';

var { width } = Dimensions.get('window');

class PickupScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps }) => ({
    title: screenProps.t('pickup:title'),
  });

  state = {
    vendor: '',
    address: '',
    email: '',
    phone: ''
  }

  getItems = (orderId) => {
    const { dispatchList } = this.props;

    var order = dispatchList.filter(function(d){
      return d.orderId == orderId;
    });

    var array = order[0].lines;
    var items = [];

    array.map((item) => items.push({
      itemId: item.id,
      qty: item.purchQty
    }));

    return items;
  }

  render() {
    const { t, i18n, navigation, orderID} = this.props;
   
    const items = orderID == '' ? '' : this.getItems(orderID);
    
    
    if(orderID == ''){
      return (<View style={styles.container}><Text>{t('common:noOrderSelected')}</Text></View>)
    } else {
      return (
        <View
          style={styles.container}
        >
          <View
            style={styles.pickupsHeader}   
          >
                <Text style={styles.data}>{t('pickup:id')}</Text>
                <Text style={styles.data}>{t('pickup:qty')}</Text>
          </View>
          <FlatList
            data={items}
            initialNumToRender={10}
            showsHorizontalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({item, index, separators}) => (
              <TouchableOpacity
                style={styles.pickups}
                onPress={()=>{
                  navigation.navigate('Scanner', {
                      item: item
                  })
  
                }}
              >
                <Text style={styles.data}>{item.itemId}</Text>
                <Text style={styles.data}>{item.qty}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            onPress={()=>{
              navigation.navigate('Sign', {
                signatureType: 'v'
              });
            }}
            style={styles.signatureButton}
          >
            <Text style={{color: colors.black, fontWeight: 'bold'}}>{t('pickup:signatureButton')}</Text>
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
  pickups: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.lighGray,
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
    borderBottomWidth: 2,
    borderColor: colors.chechGreen,
    padding: 10,
    marginTop: 5
  },
  data: {
    width: width/2,
    textAlign: 'center'
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

export default withNamespaces(['pickup', 'common'], {wait: true})(connect(
  mapStateToProps,
  mapDispatchToProps
)(PickupScreen))