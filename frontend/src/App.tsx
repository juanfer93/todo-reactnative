import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { TaskProvider } from './context/TaskContext';  
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import '../i18n';

const Stack = createStackNavigator();

const App = () => {
  const { t } = useTranslation();  

  return (
    <TaskProvider> 
      <NavigationContainer>  
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: t('tasks'),
            }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: t('details') }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
};

export default App;
