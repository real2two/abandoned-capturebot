import { rock } from '../utils/tiles';
import { oneTile } from '../utils/builders';

export function generateRock() {
  return [oneTile(rock())];
}
