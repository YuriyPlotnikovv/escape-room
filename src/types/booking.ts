export type BookingInfo = {
  date: string;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  id: string;
  location: {
    address: string;
    coords: [number, number];
  };
  quest: {
    id: string;
    title: string;
    previewImg: string;
    previewImgWebp: string;
    level: string;
    type: string;
    peopleMinMax: [number, number];
  };
}

export type Slot = {
  time: string;
  isAvailable: boolean;
};

export type BookingSlot = {
  id: string;
  location: {
    address: string;
    coords: [number, number];
  };
  slots: {
    today: Slot[];
    tomorrow: Slot[];
  };
};

export type BookingRequest = {
  date: string;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  placeId: string;
};

export type BookingFormInputs = {
  date: 'today' | 'tomorrow';
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  agreement: boolean;
};
