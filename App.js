import { enableScreens } from 'react-native-screens';
enableScreens();

import React from 'react';
import { Text, View, StatusBar, Platform, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Host } from 'react-native-portalize';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from 'react-query';
// Screen
import Dashboard from './screens/Dashboard';
import Details from './screens/Details';
// Context
import { AuthContext } from './context/Context';
// Constants
import { Colors } from './constants';
// Store
import store from './store';

if (Platform.OS !== 'web') {
  LogBox.ignoreAllLogs();
}

if (__DEV__) {
  import('./ReactotronConfig').then(() => {});
}

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1;

const queryClient = new QueryClient();

const Stack = createStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <AuthContext.Provider>
            <Host>
              <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
                <StatusBar
                  backgroundColor={Colors.PRIMARYBLUE}
                  barStyle={'light-content'}
                />
                <NavigationContainer>
                  <Stack.Navigator initialRouteName='Dashboard'>
                    <Stack.Screen name='Dashboard' component={Dashboard} />
                    <Stack.Screen name='Details' component={Details} />
                  </Stack.Navigator>
                </NavigationContainer>
              </View>
            </Host>
          </AuthContext.Provider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
