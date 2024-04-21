import { loadImage } from '@napi-rs/canvas';
import { getDirname } from './utils';

const __dirname = getDirname(import.meta.url);

const load = (file: string) => loadImage(`${__dirname}/images/${file}`);

export default {
  avatars: {
    '0': await load('avatars/0.png'),
    '1': await load('avatars/1.png'),
    '2': await load('avatars/2.png'),
    '3': await load('avatars/3.png'),
    '4': await load('avatars/4.png'),
    '5': await load('avatars/5.png'),
  },
  emojis: {
    coloredRock: await load('emojis/coloredRock.png'),
  },
};
