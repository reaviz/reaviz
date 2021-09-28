import React, { useState, Fragment } from 'react';
import { number, object, text, select } from '@storybook/addon-knobs';
import { PieChart } from './PieChart';
import { categoryData, randomNumber } from '../../demo';
import { PieArc, PieArcLabel, PieArcSeries } from './PieArcSeries';
import { schemes } from '../common/color';

export default {
  title: 'Charts/Pie Chart/Donut',
  component: PieChart,
  subcomponents: {
    PieArc,
    PieArcLabel,
    PieArcSeries
  }
};

export const Simple = () => {
    const height = number('Height', 250);
    const width = number('Width', 350);
    const color = select('Color Scheme', schemes, 'cybertron');
    const data = object('Data', categoryData);

    return (
      <PieChart
        width={width}
        height={height}
        data={data}
        series={<PieArcSeries doughnut={true} colorScheme={color} />}
      />
    );
  };

export const RoundedAndSpaced = () => {
    const height = number('Height', 250);
    const width = number('Width', 350);
    const padAngle = number('Pad Angle', 0.02);
    const padRadius = number('Pad Radius', 200);
    const cornerRadius = number('Corner Radius', 4);
    const color = select('Color Scheme', schemes, 'cybertron');
    const data = object('Data', categoryData);

    return (
      <PieChart
        width={width}
        height={height}
        data={data}
        series={
          <PieArcSeries
            cornerRadius={cornerRadius}
            padAngle={padAngle}
            padRadius={padRadius}
            doughnut={true}
            colorScheme={color}
          />
        }
      />
    );
  };

RoundedAndSpaced.story = {
  name: 'Rounded and spaced',
};

export const Labels = () => (
    <PieChart
      width={350}
      height={250}
      data={categoryData}
      series={<PieArcSeries doughnut={true} />}
    />
  );

export const InnerLabel = () => {
    const height = number('Height', 250);
    const width = number('Width', 350);
    const words = text('Label', 'Attacks');
    const color = select('Color Scheme', schemes, 'cybertron');
    const data = object('Data', categoryData);

    return (
      <div
        style={{
          position: 'relative',
          height: '250px',
          width: '350px',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0 }}>
          <PieChart
            width={width}
            height={height}
            data={data}
            series={
              <PieArcSeries doughnut={true} label={null} colorScheme={color} />
            }
          />
        </div>
        <h2 style={{ margin: '0 5px', padding: 0, color: 'white' }}>
          {data.length} {words}
        </h2>
      </div>
    );
  };

const LiveUpdatingStory = () => {
  const [data, setData] = useState([...categoryData]);

  const updateData = () => {
    const newData = [...data];
    const updateCount = randomNumber(1, 4);

    let idx = 0;
    while (idx <= updateCount) {
      const updateIndex = randomNumber(0, data.length - 1);
      newData[updateIndex] = {
        ...newData[updateIndex],
        data: randomNumber(10, 100)
      };

      idx++;
    }

    setData(newData);
  };

  return (
    <Fragment>
      <PieChart width={350} height={250} data={data} />
      <br />
      <button onClick={updateData}>Update</button>
    </Fragment>
  );
};

const ArcLabel = React.memo(function ArcLabel({
  title,
  description,
  data,
  icon,
  textAnchor,
  showText
}: {
  title: string;
  description: string;
  data: number; // the chart data value we labeling
  icon: React.ReactElement | null;
  textAnchor: 'start' | 'end';
  showText: boolean;
}) {
  const iconContainer = (
    <div
      style={{
        [textAnchor === 'start' ? 'marginRight' : 'marginLeft']: showText
          ? '4px'
          : 0,
        width: '24px',
        height: '24px',
        fill: '#fff',
        flexShrink: 0
      }}
    >
      {icon}
    </div>
  );

  const ellipsis: React.CSSProperties = {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  };

  return (
    <div
      style={{
        margin: '0 4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: `flex-${textAnchor}`,
        lineHeight: 1,
        height: '24px',
        textAlign: textAnchor === 'start' ? 'left' : 'right'
      }}
    >
      {textAnchor === 'start' && iconContainer}
      <div style={{ minWidth: 0 }}>
        <div style={ellipsis}>
          {title} - {data}
        </div>
        <div style={ellipsis}>{description}</div>
      </div>
      {textAnchor === 'end' && iconContainer}
    </div>
  );
});
