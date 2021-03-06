import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Icon } from 'expo';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

class Scanner extends React.Component {
  static navigationOptions = ({navigation, screenProps }) => ({
    title: screenProps.t('pickup:scanItem'),
  });

  state = {
    hasCameraPermission: null,
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }

    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Icon.Ionicons
          name={'ios-qr-scanner'}
          size={400}
          style={{position: 'absolute', alignSelf: 'center', zIndex: 1 }}
          color={'white'}
        />
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    const { navigation } = this.props;
    const { Id } = this.props.navigation.state.params;

    console.log('qr code scanned!');
    var parsedData;
    if(data){
      try {
        parsedData = JSON.parse(data);
      } catch(e){
        parsedData = 'not a json object';
      }
    }
    
    navigation.navigate('PickupConfirm',{
      scanInfo: parsedData,
      Id: Id
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    orderID: state.dispatch.orderID
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    
  }
}

export default withNamespaces(['pickup', 'common'], {wait: true})(connect(
  mapStateToProps,
  mapDispatchToProps
)(Scanner))