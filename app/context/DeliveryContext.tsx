import React, { createContext, useContext, useState } from 'react';
import { useAddresses } from './AddressContext';
import type { Address } from './AddressContext';

interface DeliveryContextType {
  selectedAddressId: string | null;
  setSelectedAddressId: (id: string) => void;
  selectedAddress: Address | null;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export function DeliveryProvider({ children }: { children: React.ReactNode }) {
  const { addresses } = useAddresses();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    // Initialize with the default address if one exists
    addresses.find(addr => addr.isDefault)?.id || null
  );

  // Get the currently selected address object
  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId) || 
    addresses.find(addr => addr.isDefault) || null;

  return (
    <DeliveryContext.Provider 
      value={{ 
        selectedAddressId,
        setSelectedAddressId,
        selectedAddress,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
}

export function useDelivery() {
  const context = useContext(DeliveryContext);
  if (context === undefined) {
    throw new Error('useDelivery must be used within a DeliveryProvider');
  }
  return context;
} 