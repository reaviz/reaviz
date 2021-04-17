import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { BubbleChart } from './BubbleChart';

storiesOf('Charts/Bubble Chart', module)
  .add('Simple', () => (
    <BubbleChart
      data={[]}
      height={300}
      width={300}
    />
  ));
