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
    addressV: '1234 Huntington Drive Panama, Panama',
    emailV: 'vendorABC@distribuidora.com',
    phoneV: '507-6193-9320',
    customer: 'Bob Truphant',
    addressC: '3023 Up Hill Road Panama, Panama',
    emailC: 'customer@gmail.com',
    phoneC: ''
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
    var order = fakeData.filter(function(d){
      return d.orderId == orderId;
    });
    var array = order[0].items;
    var items = [];
    array.map((item) => items.push({
      date: order[0].date,
      itemId: item.itemId
    }));

    return items;
  }

  render() {
    const { t, i18n, navigation, orderID} = this.props;
    if(orderID == ''){
      return (<View style={styles.container}><Text>No order selected</Text></View>)
    } else {
      return (
        <View
          style={styles.container}
        >
          <View
            style={styles.pickupsHeader}   
          >
                <Text style={styles.data}>{t('pickup:date')}</Text>
                <Text style={styles.data}>{t('pickup:id')}</Text>
          </View>
          <FlatList
            data={this.getItems(orderID)}
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
                <Text style={styles.data}>{item.date}</Text>
                <Text style={styles.data}>{item.itemId}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
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
)(PickupScreen))