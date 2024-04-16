import { InteractionType } from 'discord-interactions';

import autocompleteEvent from '../events/autocomplete.js';
import commandEvent from '../events/command.js';
import componentEvent from '../events/component.js';
import modalSubmitEvent from '../events/modalSubmit.js';
import pingEvent from '../events/ping.js';

export default {
  [InteractionType.APPLICATION_COMMAND_AUTOCOMPLETE]: autocompleteEvent,
  [InteractionType.APPLICATION_COMMAND]: commandEvent,
  [InteractionType.MESSAGE_COMPONENT]: componentEvent,
  [InteractionType.MODAL_SUBMIT]: modalSubmitEvent,
  [InteractionType.PING]: pingEvent,
};
