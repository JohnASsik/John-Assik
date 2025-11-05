export type SlotStatus = 'available' | 'booked';

export interface Slot {
  id: number;
  time: string; // e.g., "10:00 - 11:00"
  status: SlotStatus;
}

export interface Game {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  console: 'PS5' | 'PS4';
  slots: Slot[];
  characterImageUrl: string;
  characterQuote: string;
}

export interface Booking {
  id: string;
  gameId: number;
  gameTitle: string;
  slotTime: string;
  bookingDate: string; // ISO string
  amount: string;
}
