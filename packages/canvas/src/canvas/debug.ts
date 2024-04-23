import { createDebugMineSnapshot } from '@/utils';
import { renderMineRows } from './map';

export async function renderMineDebugScene() {
  return renderMineRows(createDebugMineSnapshot());
}
