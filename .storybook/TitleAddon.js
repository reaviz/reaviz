// https://github.com/storybookjs/storybook/issues/6339#issuecomment-500647083
import addons from '@storybook/addons';
import { STORY_RENDERED } from '@storybook/core-events';

addons.register('TitleAddon', api => {
  api.on(STORY_RENDERED, story => {
    const storyData = api.getCurrentStoryData();
    document.title = `${storyData.kind}: ${storyData.name} - REAVIZ`;
  });
});
