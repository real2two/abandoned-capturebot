import { InteractionType } from 'discord-interactions';

import autocompleteEvent from '../events/autocomplete';
import commandEvent from '../events/command';
import componentEvent from '../events/component';
import modalSubmitEvent from '../events/modalSubmit';
import pingEvent from '../events/ping';

export default {
  [InteractionType.APPLICATION_COMMAND_AUTOCOMPLETE]: autocompleteEvent,
  [InteractionType.APPLICATION_COMMAND]: commandEvent,
  [InteractionType.MESSAGE_COMPONENT]: componentEvent,
  [InteractionType.MODAL_SUBMIT]: modalSubmitEvent,
  [InteractionType.PING]: pingEvent,
};
