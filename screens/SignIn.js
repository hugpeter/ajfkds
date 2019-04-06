import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    ActivityIndicator,
    AsyncStorage,
    TextInput,
    Image
} from 'react-native';
import { LinearGradient } from 'expo';
import { withNamespaces } from 'react-i18next';
import { login } from '../actions/login';
import { Button, Input, CheckBox } from 'react-native-elements';
import c from '../constants/Colors';
import { connect } from 'react-redux';
import logo from '../assets/images/logo-checheritos.png';

class SignInScreen extends React.Component {
    state = {
        localUsername: '',
        localPassword: '',
        rememberUsername: true
    }

    onChangePassword = (password) => {
        this.setState({localPassword: password});
    }

    onChangeUsername = (username) => {
        if(this.state.rememberUsername){
            AsyncStorage.setItem('username', username);
        }
        this.setState({localUsername: username});
    }

    componentDidMount = () => {
        AsyncStorage.getItem('rememberUsername')
            .then((value) => {
                if(value.toString() == 'true'){
                    AsyncStorage.getItem('username').then((value) => {
                        if(value.toString() != ''){
                            this.setState({
                                localUsername: value,
                                rememberUsername: true
                            });
                        } else {
                            this.setState({
                                localUsername: '',
                                rememberUsername: true
                            });
                        }
                    }).catch((error) => {
                        AsyncStorage.setItem('username', '');
                    });
                } else {
                    AsyncStorage.setItem('username', '');
                    this.setState({rememberUsername: false});
                }
            });
    }

    toggleUsername = () => {
        AsyncStorage.setItem('rememberUsername', (!this.state.rememberUsername).toString());
        this.setState({rememberUsername: !this.state.rememberUsername});
    }

    componentDidUpdate = () => {
        if(this.state.rememberUsername){
            AsyncStorage.setItem('username', this.state.localUsername);
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.token != nextProps.token){
            if(nextProps.token != null){
                this.props.navigation.navigate('App');
            }
        }
    }

    render() {
        const {getSession, hasError} = this.props;
        const {t, i18n, navigation} = this.props;
        const {localUsername, localPassword} = this.state;

        const errorMsg = navigation.getParam('errorMsg', '');
        var errorItem;

        if(hasError || errorMsg != ''){
            if(hasError){
                errorItem = t('login:loginError');
            } else {
                errorItem = errorMsg;
            }
        }

        if(this.props.isFetching){
            return <View style={styles.fetchingContainer}><Text>{t('login:loggingIn')}</Text><ActivityIndicator size='large' /></View>
        }

        return(
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingViewStyle}
                behavior="padding"
            >
                <LinearGradient 
                    colors={[c.chechGreenLight,c.chechGreen]}
                    start={[0.5,1]}
                    end={[0.5,0]}
                    style={styles.container}
                >
                    <Image 
                        source={logo} 
                        resizeMode={'contain'}
                        style={styles.logo}
                    />
                    <Input
                        type='text'
                        inputStyle={{color: c.black, padding: 25}}
                        inputContainerStyle={styles.input}
                        placeholder={t('login:user')}
                        placeholderTextColor={c.greenBlack}
                        leftIcon={{ type: 'font-awesome', name: 'user', color: c.black }}
                        onChangeText={this.onChangeUsername}
                        value={localUsername}
                    />
                    <Input
                        type='text'
                        secureTextEntry={true}
                        inputStyle={{color: c.black, padding: 25}}
                        inputContainerStyle={styles.input}
                        placeholder={t('login:password')}
                        placeholderTextColor={c.greenBlack}
                        leftIcon={{ type: 'font-awesome', name: 'lock', color: c.black }}
                        onChangeText={this.onChangePassword}
                        value={localPassword}
                    />
                    <CheckBox
                        center
                        containerStyle={styles.checkbox}
                        title={t('login:rememberUsername')}
                        textStyle={{color: c.black}}
                        checked={this.state.rememberUsername}
                        uncheckedColor={c.black}
                        checkedColor={c.black}
                        onPress={this.toggleUsername}
                    />
                    <Button 
                        onPress={()=>{
                            if(localUsername != '' && localPassword != ''){
                                getSession(localUsername, localPassword);
                            }
                        }}
                        title={t('login:login')}
                        titleStyle={{color: c.black}}
                        buttonStyle={styles.button}
                    />
                    <Text style={{marginTop: 30, color: c.chechRed}}>{errorItem}</Text>
                </LinearGradient>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    keyboardAvoidingViewStyle: {
        flex: 1
    },  
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    fetchingContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    logo: {
        width: '80%',
        marginBottom: 20
    },
    checkbox: {
        marginBottom: 30,
        backgroundColor: 'transparent',
        borderWidth: 0
    },
    input: {
        marginBottom: 10,
        borderBottomWidth: 0
    },
    button: {
        backgroundColor: 'transparent',
        width: 300,
        height: 45,
        marginBottom: 10,
        borderColor: c.black,
        borderWidth: 1,
        borderRadius: 5
    }
});

const mapStateToProps = (state) => {
    console.log(state.login);
    return {
        isFetching: state.login.isFetching,
        hasError: state.login.hasError,
        token: state.login.Token
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getSession: (username, password) => {
            dispatch(login(username, password));
        }
    }
}

export default withNamespaces(['login', 'common'], {wait: true})(connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInScreen))