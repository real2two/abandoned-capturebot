import components from '../utils/components';
import Event from '../structures/Event';

export default new Event({
  execute: (data) => {
    const component = components.find((c) =>
      c.customId.test(data.interaction.data.customId),
    );
    if (!component) {
      return console.warn(
        `Cannot find component with ID: ${data.interaction.data.customId} (Is it in src/utils/components.ts?)`,
      );
    }
    return component.execute(data);
  },
});
