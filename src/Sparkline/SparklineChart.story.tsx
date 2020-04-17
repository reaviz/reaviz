import { storiesOf } from '@storybook/react';
import React from 'react';

import {
  singleDateData,
  medDateData,
  smallDateData,
  sonarData,
  sonarDataEmpties
} from '../../demo';
import { SparklineChart } from './SparklineChart';
import { AreaSparklineChart } from './AreaSparklineChart';
import { BarSparklineChart } from './BarSparklineChart';
import { SonarChart } from './SonarChart';

storiesOf('Charts|Sparkline', module)
  .add('Line', () => (
    <SparklineChart width={200} height={55} data={medDateData} />
  ))
  .add('Area', () => (
    <AreaSparklineChart width={200} height={85} data={singleDateData} />
  ))
  .add('Bar', () => (
    <BarSparklineChart width={200} height={55} data={smallDateData} />
  ))
  .add('Sonar', () => <SonarChart width={300} height={50} data={sonarData} />)
  .add('Sonar Empties', () => (
    <SonarChart width={300} height={50} data={sonarDataEmpties} />
  ));
