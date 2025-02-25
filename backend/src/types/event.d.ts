interface Event {
  id: number;
  hostId: number;
  title: String;
  thumbnailUrl: String;
  startTime: Date;
  endTime: Date;
  country: String;
  postalCode: String;
  province: String;
  city: String;
  address1: String;
  address2: String;
  isAskRestrictions: Boolean;
  theme: String;
  noteForThingsToBuy: String;
  noteForNecessities: String;
  budget: number;
}

export default Event;
