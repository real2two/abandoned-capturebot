import fs from 'fs';
import path from 'path';
import { getDirname } from '../utils';

const __dirname = getDirname(import.meta.url);

export const pkg = JSON.parse(
  fs.readFileSync(path.join(`${__dirname}/../../../../package.json`)).toString(),
);
export const version: number = pkg.version || 'develop';
