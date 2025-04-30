import mitt from 'mitt';

// Define the events your app will emit
type Events = {
  homeTabPress: void;
  poissonsTabPress: void; // Add other events as needed
};

const emitter: mitt.Emitter<Events> = (mitt as any)(); // Cast mitt to ensure it works with the event types

export default emitter;