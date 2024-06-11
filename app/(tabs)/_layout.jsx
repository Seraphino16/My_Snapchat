import { Tabs, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomePage from '.';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}>
        <Tabs.Screen
          name="receiveSnap"
          options={{
            title: 'Chat',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'chatbox' : 'chatbox-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
    );
}