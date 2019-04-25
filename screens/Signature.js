import React from 'react';
import { takeSnapshotAsync, Permissions, Icon, MediaLibrary, } from 'expo';
import vsig from '../util/vendorSignature.html';
import csig from '../util/customerSignature.html';
import {
  Alert,
  PanResponder,
  SafeAreaView,
  ScrollView,
  Slider,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  CameraRoll,
  WebView
} from 'react-native';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import colors from '../constants/Colors';

class SignatureScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps }) => ({
    title: screenProps.t('signature:title'),
  });

  render(){
    const { signatureType } = this.props.navigation.state.params;
    const { orderID, token } = this.props;

    let jsCode = `document.querySelector('#myContent').innerHTML = "${orderID + '_' + token}"`;

    if(signatureType == 'v'){
      return(
          <WebView 
            ref={ref => (this.webview = ref)}
            originWhitelist={['*']}
            source={vsig}
            injectedJavaScript={jsCode}
            style={{flex:1, backgroundColor: 'white'}}
            javaScriptEnabled={true}
          />
      );
    } else {
      return(
          <WebView 
            ref={ref => (this.webview = ref)}
            originWhitelist={['*']}
            source={csig}
            injectedJavaScript={jsCode}
            style={{flex:1, backgroundColor: 'white'}}
            javaScriptEnabled={true} 
          />
      );
    }
  }
}

const styles = StyleSheet.create({
  
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

export default withNamespaces(['signature', 'common'], {wait: true})(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatureScreen))