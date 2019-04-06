import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider, withNamespaces } from 'react-i18next';
import configureStore from './configureStore';
import i18n from './i18n';
import NavigationStateNotifier from './NavigationStateNotifier';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';

//store setup
const store = configureStore();

const WrappedStack = () => {
  return (
    <AppNavigator 
      screenProps={{ t: i18n.getFixedT() }}
      onNavigationStateChange={(prevState, currentState) => 
        NavigationStateNotifier.onNavigationStateChange(prevState, currentState)}
    />
  );
}

const ReloadAppOnLanguageChange = withNamespaces('common', {
  bindI18n: 'languageChanged',
  bindStore: false
})(WrappedStack);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <ReloadAppOnLanguageChange />
          </I18nextProvider>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

