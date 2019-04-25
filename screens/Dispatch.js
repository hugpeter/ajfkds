import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { GetDispatchList, updateOrderId } from '../actions/dispatch';
import timeConverter from '../util/timeConvert';
import colors from '../constants/Colors';

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
    const { GetDispatches, i18n } = this.props;

    const lng = i18n.language;
    
    GetDispatches(lng);
  }

  updateOrderId = (id) => {
    const { updateOrder } = this.props;
    updateOrder(id);
  }

  onRefresh = () => {
    const { GetDispatches, i18n } = this.props;

    const lng = i18n.language;
    
    GetDispatches(lng);
    this.setState({indexSelected: -1});
  }

  render() {
    const { t, orderID, isFetching, i18n, hasError, dispatchList} = this.props;
    const { language } = i18n;
    const { indexSelected } = this.state;

    if(hasError){

    }

    if(dispatchList){
      if(dispatchList.length > 0){
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
                    <Text style={[styles.data, {fontWeight: 'bold',}]}>{t('dispatch:orderId')}</Text>
              </View>
              <FlatList
                data={dispatchList}
                onRefresh={this.onRefresh}
                refreshing={isFetching}
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
                            vendor: item.vendorName,
                            address: item.vendorAddress,
                            email: item.vendorEmail,
                            phone: item.vendorPhone
                          })
                        }}
                      >
                        <Text style={styles.data}>{timeConverter(item.createdDateTime, language)}</Text>
                        <Text style={styles.data}>{item.vendorId}</Text>
                        <Text style={styles.data}>{item.orderId}</Text>
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
                            vendor: item.vendorName,
                            address: item.vendorAddress,
                            email: item.vendorEmail,
                            phone: item.vendorPhone,
                            indexSelected: index
                          });
                        }}
                      >
                        <Text style={styles.data}>{timeConverter(item.createdDateTime, language)}</Text>
                        <Text style={styles.data}>{item.vendorId}</Text>
                        <Text style={styles.data}>{item.orderId}</Text>
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
            </View>
          </View>
        );
      }
    }

    return(
    <View style={styles.loadingContainer}>
      <View style={{alignItems: 'center', justifyContent: 'space-between', height: '20%'}}>
        <Text>{t('dispatch:loading')}</Text>
        <ActivityIndicator size='large' color={colors.chechGreen} />
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
  loadingContainer:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.offWhite
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
    backgroundColor: colors.chechGreen
  },
  pickupsHeader: {
    flexDirection: 'row',
    width: width,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    marginTop: 5,
    borderBottomWidth: 1,
    borderColor: colors.chechGreen
  },
  data: {
    width: width/3,
    textAlign: 'center'
  },
  separator: {
    alignSelf: 'center',
    height: 1,
    width: width,
    backgroundColor: colors.darkGray
  },
  flatList:{
    flex:1,
    width: width,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 5,
    borderColor: colors.darkGray
  },
  vendorInfo:{
    flex:1,
    width: width,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.offWhite
  },
  vendorData:{
    margin: 2.5,
    padding: 5,
  }
});

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    orderID: state.dispatch.orderID,
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
    GetDispatches: (lng) => {
      dispatch(GetDispatchList(lng));
    }
  }
}

export default withNamespaces(['dispatch', 'common'], {wait: true})(connect(
  mapStateToProps,
  mapDispatchToProps
)(DispatchScreen))