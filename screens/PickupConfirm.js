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
import SignaturePad from 'react-native-signature-pad';

const fakeData = [
  {
    orderId: '123',
    date: '15/02/19',
    vendorNumber: 1,
    numPickups: 3,
    items: [
      {
        itemId: '2019.3213.235655.2123',
      },
      {
        itemId: '2019.34513.212355.2123',
      },
      {
        itemId: '2019.3213.216655.2123',
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

class PickupConfirmScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps }) => ({
    title: screenProps.t('pickup:verifyItem'),
  });

  getOrderInfo = (orderId) => {
    return fakeData.filter(function(d){ return d.orderId == orderId;})[0];
  }

  render() {
    const { t, i18n, navigation, orderID} = this.props;
    const { item, scanInfo } = this.props.navigation.state.params;
    const orderInfo = this.getOrderInfo(orderID);

    return (
      <View
        style={styles.container}
      >
        <View>
          <Text>Target Item</Text>
          <Text>{orderInfo.vendor}</Text>
          <Text>{orderInfo.address}</Text>
        </View>
        <View>
          <Text>Scanned Item</Text>
          <Text>{scanInfo.vendor}</Text>
          <Text>{scanInfo.address}</Text>
        </View>
        <SignaturePad 
          onError={this._signaturePadError}
          onChange={this._signaturePadChange}
          style={{flex: 1, backgroundColor: 'blue'}}
        />
      </View>
    );
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
    orderID: state.login.orderID
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