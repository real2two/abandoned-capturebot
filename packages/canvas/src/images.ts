import { loadImage } from '@napi-rs/canvas';
import { getDirname } from './utils';

const __dirname = getDirname(import.meta.url);

export default {
  avatars: {
    '0': await loadImage(`${__dirname}/images/avatars/0.png`),
    '1': await loadImage(`${__dirname}/images/avatars/1.png`),
    '2': await loadImage(`${__dirname}/images/avatars/2.png`),
    '3': await loadImage(`${__dirname}/images/avatars/3.png`),
    '4': await loadImage(`${__dirname}/images/avatars/4.png`),
    '5': await loadImage(`${__dirname}/images/avatars/5.png`),
  },
};
