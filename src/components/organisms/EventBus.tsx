import mitt from 'mitt';

type Events = {
  homeTabPress: void;
};

const emitter = mitt<Events>();
export default emitter;