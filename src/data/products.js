const product = [
    {
        id: 1,
    name: 'iPhone 12',
    price: 829,
    description: 'Apple iPhone 12 smartphone. Announced Oct 2020. Features 6.1″ display, Apple A14 Bionic chipset, 2815 mAh battery, 256 GB storage, 4 GB RAM, Scratch-resistant ceramic glass.',
    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12.jpg'
    
    },
    {
        id: 2,
    name: 'iPhone 12 Pro',
    price: 999,
    description: 'Apple iPhone 12 Pro smartphone. Announced Oct 2020. Features 6.1″ display, Apple A14 Bionic chipset, 2815 mAh battery, 512 GB storage, 6 GB RAM, Scratch-resistant ceramic glass.',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-pro-max-1.jpg',
    },
    {
        id: 3,
    name: 'iPhone 12 Pro Max',
    price: 1099,
    description: 'Apple iPhone 12 Pro Max smartphone. Announced Oct 2020. Features 6.7″ display, Apple A14 Bionic chipset, 3687 mAh battery, 512 GB storage, 6 GB RAM, Scratch-resistant ceramic glass.',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-pro-max-1.jpg',
    },
    {
        id: 4,
    name: 'iPhone 12 mini',
    price: 729,
    description: 'Apple iPhone 12 mini smartphone. Announced Oct 2020. Features 5.4″ display, Apple A14 Bionic chipset, 2227 mAh battery, 256 GB storage, 4 GB RAM, Scratch-resistant ceramic glass.',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-11-1.jpg',
    },
    {
        id: 5,
    name: 'iPhone SE (2020)',
    price: 399,
    description: 'Apple iPhone SE (2020) smartphone. Announced Apr 2020. Features 4.7″ display, Apple A13 Bionic chipset, 1821 mAh battery, 256 GB storage, 3 GB RAM, Ion-strengthened glass.',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-se-2020-1.jpg',
    },
    {
        id: 6,
    name: 'iPhone 11 Pro Max',
    price: 1099,
    description: 'Apple iPhone 11 Pro Max smartphone. Announced Sep 2019. Features 6.5″ display, Apple A13 Bionic chipset, 3969 mAh battery, 512 GB storage, 4 GB RAM, Scratch-resistant glass.',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-11-1.jpg',
    },
    {
        id: 7,
    name: 'iPhone 11 Pro',
    price: 999,
    description: 'Apple iPhone 11 Pro smartphone. Announced Sep 2019. Features 5.8″ display, Apple A13 Bionic chipset, 3046 mAh battery, 512 GB storage, 4 GB RAM, Scratch-resistant glass.',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-11-1.jpg',
    },
    {
        id: 8,
    name: 'iPhone 11',
    price: 699,
    description: 'Apple iPhone 11 smartphone. Announced Sep 2019. Features 6.1″ display, Apple A13 Bionic chipset, 3110 mAh battery, 256 GB storage, 4 GB RAM, Scratch-resistant glass.',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-11-1.jpg',
    },
    {
        id: 9,
    name: 'iPhone XS Max',
    price: 1099,
    description: 'Apple iPhone XS Max smartphone. Announced Sep 2018. Features 6.5″ display, Apple A12 Bionic chipset, 3174 mAh battery, 512 GB storage, 4 GB RAM, Scratch-resistant glass.',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-xr-1.jpg',
    },
    {
        id: 10,
    name: 'iPhone XS',
    price: 999,
    description: 'Apple iPhone XS smartphone. Announced Sep 2018. Features 5.8″ display, Apple A12 Bionic chipset, 2658 mAh battery, 512 GB storage, 4 GB RAM, Scratch-resistant glass.',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-xr-1.jpg',
    },
    {
        id: 11,
    name: 'iPhone XR',
    price: 749,
    description: 'Apple iPhone XR smartphone. Announced Sep 2018. Features 6.1″ display, Apple A12 Bionic chipset, 2942 mAh battery, 256 GB storage, 3 GB RAM, Scratch-resistant glass.',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-xr-1.jpg',
    },
    {
        id: 12,
    name: 'iPhone X',
    price: 999,
    description: 'Apple iPhone X smartphone. Announced Sep 2017. Features 5.8″ display, Apple A11 Bionic chipset, 2716 mAh battery, 256 GB storage, 3 GB RAM, Scratch-resistant glass.',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-xr-1.jpg',
    },
    {
        id: 13,
    name: 'iPhone 8 Plus',
    price: 799,
    description: 'Apple iPhone 8 Plus smartphone. Announced Sep 2017. Features 5.5″ display, Apple A11 Bionic chipset, 2691 mAh battery, 256 GB storage, 3 GB RAM, Ion-strengthened glass.',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-8-plus-1.jpg',
    },
    {
        id: 14, 
    name: 'iPhone 8',
    price: 699,
    description: 'Apple iPhone 8 smartphone. Announced Sep 2017. Features 4.7″ display, Apple A11 Bionic chipset, 1821 mAh battery, 256 GB storage, 2 GB RAM, Ion-strengthened glass.',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-7-1.jpg',
    },
    {
        id: 15,
    name: 'iPhone 7 Plus',
    price: 569,
    description: 'Apple iPhone 7 Plus smartphone. Announced Sep 2016. Features 5.5″ display, Apple A10 Fusion chipset, 2900 mAh battery, 256 GB storage, 3 GB RAM, Ion-strengthened glass.',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-7-1.jpg',
    },
    {
        id: 16,
    name: 'iPhone 7',
    price: 449,
    description: 'Apple iPhone 7 smartphone. Announced Sep 2016. Features 4.7″ display, Apple A10 Fusion chipset, 1960 mAh battery, 256 GB storage, 2 GB RAM, Ion-strengthened glass.',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-7-1.jpg',
    },
    {
        id: 17,
    name: 'iPhone 6s Plus',
    price: 449,
    description: 'Apple iPhone 6s Plus smartphone. Announced Sep 2015. Features 5.5″ display, Apple A9 chipset, 2750 mAh battery, 128 GB storage, 2 GB RAM, Ion-strengthened glass.',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-6-1.jpg',
    },
    {
        id: 18,
    name: 'iPhone 6s',
    price: 349,
    description: 'Apple iPhone 6s smartphone. Announced Sep 2015. Features 4.7″ display, Apple A9 chipset, 1715 mAh battery, 128 GB storage, 2 GB RAM, Ion-strengthened glass.',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-6s-1.jpg',
    },
    {
        id: 19,
    name: 'iPhone 6 Plus',
    price: 299,
    description: 'Apple iPhone 6 Plus smartphone. Announced Sep 2014. Features 5.5″ display, Apple A8 chipset, 2915 mAh battery, 128 GB storage, 1 GB RAM, Ion-strengthened glass.',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-6-plus-1.jpg',
    },
    {
        id: 20,
    name: 'iPhone 6',
    price: 199,
    description: 'Apple iPhone 6 smartphone. Announced Sep 2014. Features 4.7″ display, Apple A8 chipset, 1810 mAh battery, 128 GB storage, 1 GB RAM, Ion-strengthened glass.',
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-6-1.jpg',
    }
]

export default product