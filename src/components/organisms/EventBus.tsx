import mitt from 'mitt';
import { Events } from '../../models/event.model.tsx'

const emitter: mitt.Emitter<Events> = (mitt as any)();

export default emitter;