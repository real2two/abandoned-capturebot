import type { CamelizedUser, CamelizedGuildMember } from '../types';

export function getUserDisplayName(user: CamelizedUser, member?: CamelizedGuildMember) {
  return (
    member?.nick ||
    user?.globalName ||
    (user?.username
      ? `${user?.username}${user?.discriminator !== '0' ? `#${user?.discriminator}` : ''}`
      : user.id)
  );
}

export function getUserAvatar(user: CamelizedUser) {
  return user?.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`
    : user?.discriminator === '0'
      ? `https://cdn.discordapp.com/embed/avatars/${(BigInt(user.id) >> 22n) % 6n}.png`
      : `https://cdn.discordapp.com/embed/avatars/${parseInt(user?.discriminator) % 5}.png`;
}
