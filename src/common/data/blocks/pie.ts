import React from 'react';

import { ChartShallowDataShape } from '../types';
import * as icons from './icons';

export interface ChartDataItem extends ChartShallowDataShape<number> {
  key: string;
  metadata: {
    description: string;
    Icon?: React.ComponentType;
  };
}

export const pieLabelData: ChartDataItem[] = [
  {
    key: 'Chrome',
    data: 25000,
    metadata: {
      description: 'Chrome description',
      Icon: icons.Chrome
    }
  },
  {
    key: 'Safari',
    data: 2000,
    metadata: {
      description: 'Safari description',
      Icon: icons.Safari
    }
  },
  {
    key: 'FireFox',
    data: 2000,
    metadata: {
      description: 'FireFox description',
      Icon: icons.FireFox
    }
  },
  {
    key: 'Edge',
    data: 2000,
    metadata: {
      description: 'Edge description',
      Icon: icons.Edge
    }
  },
  {
    key: 'Github',
    data: 2000,
    metadata: {
      description: 'Github description',
      Icon: icons.Github
    }
  },
  {
    key: 'ReactJs',
    data: 2000,
    metadata: {
      description: 'React with really really long description',
      Icon: icons.ReactJs
    }
  },
  {
    key: 'Android',
    data: 2000,
    metadata: {
      description: 'Android description',
      Icon: icons.Android
    }
  },
  {
    key: 'Apple',
    data: 2000,
    metadata: {
      description: 'Apple description',
      Icon: icons.Apple
    }
  },
  {
    key: 'Ubuntu',
    data: 2000,
    metadata: {
      description: 'Ubuntu description',
      Icon: icons.Ubuntu
    }
  },
  {
    key: 'Windows',
    data: 2000,
    metadata: {
      description: 'Windows description',
      Icon: icons.Windows
    }
  },
  {
    key: 'Other',
    data: 500,
    metadata: {
      description: 'Other item, that should not have label'
    }
  }
];
