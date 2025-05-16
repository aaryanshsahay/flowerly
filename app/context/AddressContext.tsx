import React, { createContext, useContext, useState } from 'react';

export interface Address {
  id: string;
  nickname: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

interface AddressContextType {
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id' | 'isDefault'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

// Initial dummy data
const INITIAL_ADDRESSES: Address[] = [
  {
    id: '1',
    nickname: 'Home',
    address: '123 Flower Street',
    apartment: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    isDefault: true,
  },
  {
    id: '2',
    nickname: 'Office',
    address: '456 Bloom Avenue',
    apartment: 'Suite 200',
    city: 'New York',
    state: 'NY',
    zipCode: '10002',
    isDefault: false,
  },
];

export function AddressProvider({ children }: { children: React.ReactNode }) {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);

  const addAddress = (newAddress: Omit<Address, 'id' | 'isDefault'>) => {
    setAddresses(currentAddresses => {
      // Generate a new ID (in a real app, this would come from the backend)
      const newId = (Math.max(...currentAddresses.map(a => parseInt(a.id))) + 1).toString();
      
      // If this is the first address, make it default
      const isDefault = currentAddresses.length === 0;
      
      return [...currentAddresses, { ...newAddress, id: newId, isDefault }];
    });
  };

  const removeAddress = (id: string) => {
    setAddresses(currentAddresses => {
      const addressToRemove = currentAddresses.find(a => a.id === id);
      const filteredAddresses = currentAddresses.filter(a => a.id !== id);
      
      // If we're removing the default address and there are other addresses,
      // make the first remaining address the default
      if (addressToRemove?.isDefault && filteredAddresses.length > 0) {
        return filteredAddresses.map((addr, index) => 
          index === 0 ? { ...addr, isDefault: true } : addr
        );
      }
      
      return filteredAddresses;
    });
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(currentAddresses =>
      currentAddresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  return (
    <AddressContext.Provider value={{ addresses, addAddress, removeAddress, setDefaultAddress }}>
      {children}
    </AddressContext.Provider>
  );
}

export function useAddresses() {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error('useAddresses must be used within an AddressProvider');
  }
  return context;
} 