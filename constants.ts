import { Game, Slot } from './types';

/**
 * Generates a list of time slots for a single day.
 * Some slots are randomly pre-booked to simulate a real environment.
 */
const generateSlots = (): Slot[] => {
  const slots: Slot[] = [];
  let id = 1;
  // 10 AM (10:00) to 9 PM (21:00)
  for (let i = 10; i < 22; i++) {
    const time = `${i}:00 - ${i + 1}:00`;
    // Randomly book about 40% of the slots
    const status = Math.random() > 0.6 ? 'booked' : 'available';
    slots.push({ id, time, status });
    id++;
  }
  return slots;
};

export const GAMES: Game[] = [
  {
    id: 1,
    title: 'Grand Theft Auto V',
    description: 'Enter the lives of three very different criminals as they risk everything in a series of daring and dangerous heists that could set them up for life in Los Santos.',
    imageUrl: 'https://picsum.photos/seed/gta5/400/550',
    console: 'PS5',
    slots: generateSlots(),
    characterImageUrl: 'https://i.ibb.co/L5gqZ1p/gta-v-franklin.png',
    characterQuote: "Alright, your time's locked in. Let's make some money!",
  },
  {
    id: 2,
    title: 'God of War: Ragnarök',
    description: 'Kratos and Atreus must journey to each of the Nine Realms in search of answers as they prepare for the prophesied battle that will end the world.',
    imageUrl: 'https://picsum.photos/seed/gow/400/550',
    console: 'PS5',
    slots: generateSlots(),
    characterImageUrl: 'https://i.ibb.co/wJ1q54b/kratos-gow.png',
    characterQuote: "Boy. Your session is booked. Do not be late.",
  },
  {
    id: 3,
    title: 'Marvel\'s Spider-Man 2',
    description: 'Spider-Men, Peter Parker and Miles Morales, return for an exciting new adventure in the critically acclaimed Marvel’s Spider-Man franchise for PS5.',
    imageUrl: 'https://picsum.photos/seed/spiderman2/400/550',
    console: 'PS5',
    slots: generateSlots(),
    characterImageUrl: 'https://i.ibb.co/3k5fC9r/spiderman.png',
    characterQuote: "Just swung by to say you're all booked. It's gonna be amazing!",
  },
  {
    id: 4,
    title: 'The Last of Us Part I',
    description: 'Experience the emotional storytelling and unforgettable characters of Joel and Ellie in The Last of Us, winner of over 200 Game of the Year awards.',
    imageUrl: 'https://picsum.photos/seed/tlou1/400/550',
    console: 'PS5',
    slots: generateSlots(),
    characterImageUrl: 'https://i.ibb.co/QcYvB4s/tlou-ellie.png',
    characterQuote: "Okay, I've got you down. Don't make any sudden moves.",
  },
  {
    id: 5,
    title: 'Uncharted: Legacy of Thieves',
    description: 'Seek your fortune and leave your mark on the map in the UNCHARTED: Legacy of Thieves Collection. Uncover the thrilling cinematic storytelling.',
    imageUrl: 'https://picsum.photos/seed/uncharted/400/550',
    console: 'PS5',
    slots: generateSlots(),
    characterImageUrl: 'https://i.ibb.co/1nKxGfc/nathan-drake.png',
    characterQuote: "Great! Another adventure awaits. See you there, pal!",
  },
  {
    id: 6,
    title: 'God of War (2018)',
    description: 'His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters. A new epic begins.',
    imageUrl: 'https://picsum.photos/seed/gow2018/400/550',
    console: 'PS4',
    slots: generateSlots(),
    characterImageUrl: 'https://i.ibb.co/wJ1q54b/kratos-gow.png',
    characterQuote: "Your booking is confirmed. Prepare yourself.",
  },
  {
    id: 7,
    title: 'The Last of Us Part II',
    description: 'Five years after their dangerous journey across the post-pandemic United States, Ellie and Joel have settled down in Jackson, Wyoming.',
    imageUrl: 'https://picsum.photos/seed/tlou2/400/550',
    console: 'PS4',
    slots: generateSlots(),
    characterImageUrl: 'https://i.ibb.co/QcYvB4s/tlou-ellie.png',
    characterQuote: "I'll be seeing you. Your spot is confirmed.",
  },
  {
    id: 8,
    title: 'Marvel\'s Spider-Man',
    description: 'When a new villain threatens New York City, Peter Parker and Spider-Man’s worlds collide. To save the city and those he loves, he must rise up and be greater.',
    imageUrl: 'https://picsum.photos/seed/spiderman1/400/550',
    console: 'PS4',
    slots: generateSlots(),
    characterImageUrl: 'https://i.ibb.co/3k5fC9r/spiderman.png',
    characterQuote: "With great power comes great responsibility... to show up on time!",
  },
   {
    id: 9,
    title: 'Uncharted 4: A Thief\'s End',
    description: 'Several years after his last adventure, retired fortune hunter Nathan Drake is forced back into the world of thieves. An adventure awaits.',
    imageUrl: 'https://picsum.photos/seed/uncharted4/400/550',
    console: 'PS4',
    slots: generateSlots(),
    characterImageUrl: 'https://i.ibb.co/1nKxGfc/nathan-drake.png',
    characterQuote: "Well, look at that! You're on the map. Don't be late.",
  },
  {
    id: 10,
    title: 'Red Dead Redemption 2',
    description: 'America, 1899. The end of the wild west era has begun as lawmen hunt down the last remaining outlaw gangs. Anyone who will not surrender or succumb is killed.',
    imageUrl: 'https://picsum.photos/seed/rdr2/400/550',
    console: 'PS4',
    slots: generateSlots(),
    characterImageUrl: 'https://i.ibb.co/hH4v0d5/arthur-morgan.png',
    characterQuote: "Alright then. I'll see you at the saloon... I mean, gaming zone.",
  },
];

export const PAYEE_NAME = 'John Assik';
export const PAYEE_UPI_ID = 'vinojajohnson15@okicici';
export const PAYMENT_AMOUNT = '100.00';

// Use the specific QR code image provided by the user.
export const PAYMENT_QR_CODE_URL = 'https://i.ibb.co/hZq2p2Z/qr-code.png';