import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { CartProvider } from './context/CartContext';
import { AddressProvider } from './context/AddressContext';
import { DeliveryProvider } from './context/DeliveryContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <CartProvider>
        <AddressProvider>
          <DeliveryProvider>
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="(auth)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="screens/ProfileScreen"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="screens/SavedAddressesScreen"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="screens/AddAddressScreen"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="screens/PastOrdersScreen"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
          </DeliveryProvider>
        </AddressProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
