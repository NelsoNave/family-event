export type EventType = {
  id: string;
  title: string;
  thumbnailUrl: string;
  startTime: Date;
  endTime: Date;
};

export type MyPageEventType = {
  events: Array<
    EventType & {
      isHost: boolean;
    }
  >;
};
