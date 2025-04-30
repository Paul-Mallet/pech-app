import mitt from 'mitt';

type Events = {
  homeTabPress: void;
  poissonsTabPress: void;
  legislationTabPress: void;
};

const emitter: mitt.Emitter<Events> = (mitt as any)();

export default emitter;