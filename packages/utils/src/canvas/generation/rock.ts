import { rock } from '../utils/tiles';
import { baseArea, oneTile } from '../utils/builders';

export function generateRock() {
  return [baseArea([oneTile(rock())])];
}
