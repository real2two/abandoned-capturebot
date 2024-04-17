import { InteractionType } from 'discord-api-types/v10';

import autocompleteEvent from '../events/autocomplete';
import commandEvent from '../events/command';
import componentEvent from '../events/component';
import modalSubmitEvent from '../events/modalSubmit';
import pingEvent from '../events/ping';

export default {
  [InteractionType.ApplicationCommandAutocomplete]: autocompleteEvent,
  [InteractionType.ApplicationCommand]: commandEvent,
  [InteractionType.MessageComponent]: componentEvent,
  [InteractionType.ModalSubmit]: modalSubmitEvent,
  [InteractionType.Ping]: pingEvent,
};
