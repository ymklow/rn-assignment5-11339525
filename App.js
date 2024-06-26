import React, { useState, useEffect } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { EventRegister } from 'react-native-event-listeners';
import theme from './theme';
import themeContext from './themeContext';
import Screen1 from './Screen1';
import Screen2 from './Screen2';

const Tab = createBottomTabNavigator();

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
      setDarkMode(data);
    });
    return () => {
      EventRegister.removeAllListeners(listener);
    };
  }, [darkMode]);

  return (
    <themeContext.Provider value={darkMode ? theme.dark : theme.light}>
      <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'My Cards') {
                iconName = focused ? 'card' : 'card-outline';
              } else if (route.name === 'Statistics') {
                iconName = focused ? 'pie-chart' : 'pie-chart-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarLabelStyle: { fontSize: 16 },
            tabBarActiveTintColor: darkMode ? 'white' : 'blue',
            tabBarInactiveTintColor: darkMode ? 'gray' : 'gray',
          })}
        >
          <Tab.Screen name="Home" component={Screen1} />
          <Tab.Screen name="My Cards" component={Screen2} />
          <Tab.Screen name="Statistics" component={Screen2} />
          <Tab.Screen name="Settings" component={Screen2} />
        </Tab.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
}
