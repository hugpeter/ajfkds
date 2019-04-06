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
    date: '15/02/19',
    id: '2019.3213.212355.2123',
    vendorNumber: 1,
    numPickups: 3,
    vendor: 'Distribuidora ABC, S.A.',
    address: '1234 Huntington Drive Panama, Panama',
    email: 'vendorABC@distribuidora.com',
    phone: '507-6193-9320'
  },
  {
    date: '15/02/19',
    id: '2019.3213.212355.2123',
    vendorNumber: 2,
    numPickups: 1,
    vendor: 'Dist A',
    address: '448927 Frisbee Ultimate Panama, Panama',
    email: 'vendorasd@distribuidora.com',
    phone: '507-6193-9320'
  },
  {
    date: '16/02/19',
    id: '2019.3213.212355.2123',
    vendorNumber: 4,
    numPickups: 1,
    vendor: 'wooden, S.A.',
    address: '1111 asfgasdfewdsa Panama, Panama',
    email: 'vendoraa@distribuidora.com',
    phone: '507-6193-9320'
  },
  {
    date: '16/02/19',
    id: '2019.3213.212355.2123',
    vendorNumber: 2,
    numPickups: 5,
    vendor: 'stuff, S.A.',
    address: '4499 Juice Carrot Panama, Panama',
    email: 'asdf@distribuidora.com',
    phone: '507-6193-9320'
  },
  {
    date: '16/02/19',
    id: '2019.3213.212355.2123',
    vendorNumber: 7,
    numPickups: 8,
    vendor: 'Safari Outfitters, S.A.',
    address: '1343 Toilet Road Panama, Panama',
    email: 'fffffff@distribuidora.com',
    phone: '507-6193-9320'
  },
  {
    date: '16/02/19',
    id: '2019.3213.212355.2123',
    vendorNumber: 24,
    numPickups: 15,
    vendor: 'Pizza Planet',
    address: '289534 Pizza Drive Panama, Panama',
    email: 'hahaha@distribuidora.com',
    phone: '507-6193-9320'
  },
  {
    date: '17/02/19',
    id: '2019.3213.212355.2123',
    vendorNumber: 12,
    numPickups: 4,
    vendor: 'Super 99',
    address: '37854 Drive Panama, Panama',
    email: 'sdefsad@distribuidora.com',
    phone: '507-6193-9320'
  }
]

var { height, width } = Dimensions.get('window');

class DeliveryScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps }) => ({
    title: screenProps.t('delivery:title'),
  });

  state = {
    vendor: '',
    address: '',
    email: '',
    phone: ''
  }

  render() {
    const { t, i18n} = this.props;
    return (
      <View
        style={styles.container}
      >
        <View
          style={styles.pickupsHeader}   
        >
              <Text style={styles.data}>{t('delivery:date')}</Text>
              <Text style={styles.data}>{t('delivery:id')}</Text>
        </View>
        <FlatList
          data={fakeData}
          initialNumToRender={10}
          showsHorizontalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index, separators}) => (
            <TouchableOpacity
              style={styles.pickups}
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
              <Text style={styles.data}>{item.id}</Text>
            </TouchableOpacity>
          )}
        />
        <View>
          <Text>{this.state.vendor}</Text>
          <Text>{this.state.address}</Text>
          <Text>{this.state.email}</Text>
          <Text>{this.state.phone}</Text>
        </View>
      </View>
    );
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
    token: state.login.token
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