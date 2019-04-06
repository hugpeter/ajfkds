import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
  Dimensions,
  Clipboard
} from 'react-native';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { updateOrderId } from '../actions/login';
import { GetDispatchList } from '../actions/dispatch';

const fakeData = [
  {
    orderId: '123',
    vendorNumber: 1,
    confirmationNumber: 329382,
    date: '15/02/19',
    numPickups: 3,
    items: [
      {
        itemId: '2019.3213.235655.2123',
        qty: 2
      },
      {
        itemId: '2019.34513.212355.2123',
        qty: 3
      },
      {
        itemId: '2019.3213.216655.2123',
        qty: 1
      }
    ],
    vendor: 'Distribuidora ABC, S.A.',
    address: '1234 Huntington Drive Panama, Panama',
    email: 'vendorABC@distribuidora.com',
    phone: '507-6193-9320'
  },
  {
    orderId: '133',
    date: '15/02/19',
    vendorNumber: 2,
    confirmationNumber: 329382,
    numPickups: 1,
    items: [
      {
        itemId: '2024.34513.212355.2123',
      }
    ],
    vendor: 'Dist A',
    address: '448927 Frisbee Ultimate Panama, Panama',
    email: 'vendorasd@distribuidora.com',
    phone: '507-6193-9320'
  },
  {
    orderId: '14',
    date: '16/02/19',
    vendorNumber: 4,
    confirmationNumber: 329382,
    numPickups: 1,
    items: [
      {
        itemId: '2019.3213.2543355.25553',
      }
    ],
    vendor: 'wooden, S.A.',
    address: '1111 asfgasdfewdsa Panama, Panama',
    email: 'vendoraa@distribuidora.com',
    phone: '507-6193-9320'
  },
  {
    orderId: '14442',
    date: '16/02/19',
    vendorNumber: 2,
    confirmationNumber: 329382,
    numPickups: 5,
    items: [
      {
        itemId: '2019.3213.212355.2123',
      },
      {
        itemId: '2019.3213.212355.2123',
      },
      {
        itemId: '2019.3213.2534355.2123',
      },
      {
        itemId: '2019.3213.223355.2133',
      },
      {
        itemId: '2019.34443.2122355.423',
      }
    ],
    vendor: 'stuff, S.A.',
    address: '4499 Juice Carrot Panama, Panama',
    email: 'asdf@distribuidora.com',
    phone: '507-6193-9320'
  },
  {
    orderId: '1543',
    date: '16/02/19',
    vendorNumber: 7,
    confirmationNumber: 329382,
    numPickups: 8,
    items: [
      {
        itemId: '2019.3213.212355.323',
      },
      {
        itemId: '2019.3213.212355.243',
      },
      {
        itemId: '2019.3213.212355.253',
      },
      {
        itemId: '2019.3213.2555.2123',
      },
      {
        itemId: '2019.3213.2164555.21523',
      },
      {
        itemId: '2019.3213.24355.2153',
      },
      {
        itemId: '2019.3213.2156355.6423',
      },
      {
        itemId: '2019.3213.234355.2223',
      }
    ],
    vendor: 'Safari Outfitters, S.A.',
    address: '1343 Toilet Road Panama, Panama',
    email: 'fffffff@distribuidora.com',
    phone: '507-6193-9320'
  },
  {
    orderId: '234224',
    date: '16/02/19',
    vendorNumber: 24,
    confirmationNumber: 329382,
    numPickups: 3,
    items: [
      {
        itemId: '2019.3213.2342355.2123',
      },
      {
        itemId: '2019.3213.212355.2123',
      },
      {
        itemId: '2019.3213.212355.2123',
      }
    ],
    vendor: 'Pizza Planet',
    address: '289534 Pizza Drive Panama, Panama',
    email: 'hahaha@distribuidora.com',
    phone: '507-6193-9320'
  },
  {
    orderId: '7789',
    date: '17/02/19',
    vendorNumber: 12,
    confirmationNumber: 329382,
    numPickups: 4,
    items: [
      {
        itemId: '2019.3213.212355.2123',
      },
      {
        itemId: '2019.3213.212355.2123',
      },
      {
        itemId: '2019.3213.212355.2123',
      },
      {
        itemId: '2019.3213.212355.2123',
      }
    ],
    vendor: 'Super 99',
    address: '37854 Drive Panama, Panama',
    email: 'sdefsad@distribuidora.com',
    phone: '507-6193-9320'
  }
]

var { width } = Dimensions.get('window');

class DispatchScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps }) => ({
    title: screenProps.t('dispatch:title'),
  });

  state = {
    vendor: '',
    address: '',
    email: '',
    phone: '',
    indexSelected: -1
  }

  componentDidMount = () => {
    const { dispatchList, i18n } = this.props;

    const lng = i18n.language;
    
    dispatchList(lng);
  }

  setClipboardContent = (txt) => {
    Clipboard.setString(txt);
  }

  updateOrderId = (id) => {
    const { updateOrder } = this.props;
    updateOrder(id);
  }

  render() {
    const { t, orderID, isFetching, hasError} = this.props;
    const { indexSelected } = this.state;
    
    return (
      <View
        style={styles.container}
      >
        <View style={styles.flatList}>
          <View
            style={styles.pickupsHeader}   
          >
                <Text style={[styles.data, {fontWeight: 'bold',}]}>{t('dispatch:date')}</Text>
                <Text style={[styles.data, {fontWeight: 'bold',}]}>{t('dispatch:vendorNumber')}</Text>
                <Text style={[styles.data, {fontWeight: 'bold',}]}>{t('dispatch:numPickups')}</Text>
          </View>
          <FlatList
            data={fakeData}
            initialNumToRender={10}
            showsHorizontalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item, index) => `${index}`}
            ItemSeparatorComponent={({highlighted}) => (
              <View style={styles.separator}></View>
            )}
            renderItem={({item, index, separators}) => {
              if(index == indexSelected){
                return (
                  <TouchableOpacity
                    style={styles.pickupsSelected}
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}
                    onPress={()=>{
                      this.setState({
                        vendor: item.vendor,
                        address: item.address,
                        email: item.email,
                        phone: item.phone
                      })
                    }}
                  >
                    <Text style={styles.data}>{item.date}</Text>
                    <Text style={styles.data}>{item.vendorNumber}</Text>
                    <Text style={styles.data}>{item.numPickups}</Text>
                  </TouchableOpacity>
                )
              } else {
                return (
                  <TouchableOpacity
                    style={styles.pickups}
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}
                    onPress={()=>{
                      this.updateOrderId(item.orderId);
                      this.setState({
                        vendor: item.vendor,
                        address: item.address,
                        email: item.email,
                        phone: item.phone,
                        indexSelected: index
                      });
                    }}
                  >
                    <Text style={styles.data}>{item.date}</Text>
                    <Text style={styles.data}>{item.vendorNumber}</Text>
                    <Text style={styles.data}>{item.numPickups}</Text>
                  </TouchableOpacity>
                )
              }
            }}
          />
        </View>
        <View style={styles.vendorInfo}>
          <Text selectable style={[styles.vendorData, {fontWeight: 'bold'}]}>{this.state.vendor}</Text>
          <Text selectable style={[styles.vendorData]}>{this.state.address}</Text>
          <Text selectable style={[styles.vendorData]}>{this.state.email}</Text>
          <Text selectable style={[styles.vendorData]}>{this.state.phone}</Text>
          <Text>{orderID}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    
  },
  pickups: {
    flexDirection: 'row',
    width: width,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10
  },
  pickupsSelected:{
    flexDirection: 'row',
    width: width,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#d3f3ff'
  },
  pickupsHeader: {
    flexDirection: 'row',
    width: width,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    marginTop: 5,
    borderBottomWidth: 5,
    borderColor: '#efece8'
  },
  data: {
    width: width/3,
    textAlign: 'center'
  },
  separator: {
    alignSelf: 'center',
    height: 1,
    width: width,
    backgroundColor: '#efece8'
  },
  flatList:{
    flex:1,
    width: width,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 5,
    borderColor: '#efece8'
  },
  vendorInfo:{
    flex:1,
    width: width,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f5f2'
  },
  vendorData:{
    margin: 2.5,
    padding: 5,
  }
});

const mapStateToProps = (state) => {
  console.log(state.dispatch.dispatchList);
  return {
    token: state.login.token,
    orderID: state.login.orderID,
    isFetching: state.dispatch.isFetching,
    hasError: state.dispatch.hasError,
    dispatchList: state.dispatch.dispatchList
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateOrder: (orderID) => {
      dispatch(updateOrderId(orderID));
    },
    dispatchList: (lng) => {
      dispatch(GetDispatchList(lng));
    }
  }
}

export default withNamespaces(['dispatch', 'common'], {wait: true})(connect(
  mapStateToProps,
  mapDispatchToProps
)(DispatchScreen))