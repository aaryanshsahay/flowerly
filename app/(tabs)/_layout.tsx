import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#fff', // White icon/text on active tab
        tabBarInactiveTintColor: '#6C63A9', // Dim purple for inactive
        tabBarButton: HapticTab,
        //tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: '#E5DEFF', // Light purple
          borderRadius: 20,
          margin: 16,
          marginBottom:30,
          paddingBottom: 12,
          marginRight: 20,
          marginLeft: 20,
          paddingTop: 8,
          height: 70,
          position: 'absolute',
          borderTopWidth: 0,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 10,
        },
        tabBarItemStyle: {
          borderRadius: 20,
          marginHorizontal: 4,
          overflow: 'hidden',
          marginRight: 10,
          marginLeft: 10,
        },
        tabBarActiveBackgroundColor: '#9C8CF9', // Darker purple for active tab
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bouquet"
        options={{
          title: 'Bouquet',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gift.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="flowers"
        options={{
          title: 'Flowers',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="leaf.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
