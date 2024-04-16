import components from '../utils/components.js';
import Event from '../structures/Event.js';

export default new Event({
  execute: (data) => {
    const component = components.find((c) =>
      c.customId.test(data.interaction.data.customId),
    );

    if (!component) {
      return console.warn(
        `Cannot find modal submit component with ID: ${data.interaction.data.customId} (Is it in src/utils/components.js?)`,
      );
    }

    return component?.execute(data);
  },
});
