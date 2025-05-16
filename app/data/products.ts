interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  tag: string;
  image: any;
  isFeatured: boolean;
  extraImages?: any[];
  contents?: {
    main: Array<{ name: string; quantity: number; type: string }>;
    background: Array<{ name: string; type: string }>;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Blushing Bloom',
    description: 'A beautiful bouquet of vibrant tulips.',
    price: '$25',
    tag: 'Romantic',
    image: require('../../assets/images/bouquet1.jpg'),
    isFeatured: true,
    extraImages: [
      require('../../assets/images/bouquet10.jpg'),
      require('../../assets/images/bouquet11.jpg'),
      require('../../assets/images/bouquet12.jpg'),
    ],
    contents: {
      main: [
        { name: 'Rose', quantity: 2, type: 'flower' },
        { name: 'Seven Seas', quantity: 3, type: 'flower' },
        { name: 'Lily', quantity: 4, type: 'flower' },
      ],
      background: [
        { name: "Baby's Breath", type: 'background' },
        { name: 'Leaves', type: 'background' },
      ],
    },
  },
  {
    id: 2,
    name: 'Enchanted Petals',
    description: 'Elegant roses in a stunning arrangement.',
    price: '$30',
    tag: 'Seasonal',
    image: require('../../assets/images/bouquet2.jpg'),
    isFeatured: true,
    extraImages: [
      require('../../assets/images/bouquet10.jpg'),
      require('../../assets/images/bouquet11.jpg'),
      require('../../assets/images/bouquet12.jpg'),
    ],
    contents: {
      main: [
        { name: 'Rose', quantity: 5, type: 'flower' },
        { name: 'Orchid', quantity: 2, type: 'flower' },
      ],
      background: [
        { name: 'Eucalyptus', type: 'background' },
        { name: "Baby's Breath", type: 'background' },
      ],
    },
  },
  {
    id: 3,
    name: 'Sunset Embrace',
    description: 'Fresh daisies for any occasion.',
    price: '$20',
    tag: 'Classic',
    image: require('../../assets/images/bouquet3.jpg'),
    isFeatured: true,
    extraImages: [
      require('../../assets/images/bouquet10.jpg'),
      require('../../assets/images/bouquet11.jpg'),
      require('../../assets/images/bouquet12.jpg'),
    ],
    contents: {
      main: [
        { name: 'Daisy', quantity: 6, type: 'flower' },
        { name: 'Carnation', quantity: 2, type: 'flower' },
      ],
      background: [{ name: 'Leaves', type: 'background' }],
    },
  },
  {
    id: 4,
    name: 'Petal Parade',
    description: 'Gorgeous lilies arranged perfectly.',
    price: '$28',
    tag: 'Colorful',
    image: require('../../assets/images/bouquet4.jpg'),
    isFeatured: true,
    extraImages: [
      require('../../assets/images/bouquet10.jpg'),
      require('../../assets/images/bouquet11.jpg'),
      require('../../assets/images/bouquet12.jpg'),
    ],
    contents: {
      main: [
        { name: 'Lily', quantity: 5, type: 'flower' },
        { name: 'Tulip', quantity: 3, type: 'flower' },
      ],
      background: [
        { name: 'Fern', type: 'background' },
        { name: "Baby's Breath", type: 'background' },
      ],
    },
  },
  {
    id: 5,
    name: 'Violet Charm',
    description: 'A charming arrangement of violet blooms.',
    price: '$35',
    tag: 'Popular',
    image: require('../../assets/images/bouquet5.jpg'),
    isFeatured: false,
    extraImages: [
      require('../../assets/images/bouquet10.jpg'),
      require('../../assets/images/bouquet11.jpg'),
      require('../../assets/images/bouquet12.jpg'),
    ],
    contents: {
      main: [
        { name: 'Violet', quantity: 4, type: 'flower' },
        { name: 'Iris', quantity: 3, type: 'flower' },
      ],
      background: [{ name: 'Fern', type: 'background' }],
    },
  },
  // Add more products with similar structure...
];

export type { Product }; 