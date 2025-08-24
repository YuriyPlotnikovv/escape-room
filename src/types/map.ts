export type Place = {
  id: string;
  location: {
    coords: [number, number];
    address: string;
  };
};
