import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';
import { DefaultTheme, DarkTheme, NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginLayout = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const router = useRouter();

  const [token, setToken] = useState(null);

//   useEffect(() => {
//     const getToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem('@token');
//         setToken(token);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     getToken();
//   }, [token]);

//   useEffect(() => {
//     if(token) {
//       router.replace('(tabs)');
//     }
//   }, [token]);

  return (
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: 'Home', headerShown: false }}
        />
        <Stack.Screen
          name="signup"
          options={{ title: 'Inscription', headerShown: false }}
        />
        <Stack.Screen
          name="login"
          options={{ title: 'Mot de Passe Oublié', headerShown: false }}
        />
      </Stack>
  );
};

export default LoginLayout;
