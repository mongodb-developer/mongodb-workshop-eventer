export interface Event {
    _id: string;
    name: string;
    description: string;
    date: string;
    location: {
      name: string;
      address: {
        type: string;
        coordinates: [number, number];
      };
    };
    startTime?: string;
    endTime?: string;
    useAttendeeList?: boolean;
    attendees?: string[];
    maxAttendees?: number;
    paymentRequired?: boolean;
    paymentAmount?: number;
    paymentDueDate?: string;
  }