import {
  type TestRunnerConfig,
  waitForPageReady,
} from '@storybook/test-runner';

const config: TestRunnerConfig = {
  tags: {
    include: ['snapshot'],
    exclude: ['no-snapshot'],
    skip: ['skip-snapshot'],
  },
  async postVisit(page, context) {
    await waitForPageReady(page);
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const elementHandler = await page.$('#storybook-root');
    const innerHTML = await elementHandler?.innerHTML();
    expect(innerHTML).toMatchSnapshot();
  },
};

export default config;
