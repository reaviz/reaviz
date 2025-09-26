import React, { Fragment, useState } from 'react';
import { categoryData, randomNumber } from 'reaviz-data-utils';

import { Gradient } from '@/common/Gradient';

import { PieArc, PieArcLabel, PieArcSeries } from './PieArcSeries';
import { PieChart } from './PieChart';

export default {
  tags: ['snapshot'],
  title: 'Charts/Pie Chart/Donut',
  component: PieChart,
  subcomponents: {
    PieArc,
    PieArcLabel,
    PieArcSeries,
  },
};

export const Simple = () => (
  <PieChart
    id="simple"
    width={350}
    height={250}
    data={categoryData}
    series={<PieArcSeries doughnut={true} colorScheme="cybertron" />}
  />
);

export const WithGradient = () => (
  <PieChart
    id="with-gradient"
    width={350}
    height={250}
    data={categoryData}
    series={
      <PieArcSeries
        doughnut={true}
        colorScheme="cybertron"
        arc={<PieArc gradient={<Gradient />} />}
      />
    }
  />
);

export const RoundedAndSpaced = () => (
  <PieChart
    id="rounded-and-spaced"
    width={350}
    height={250}
    data={categoryData}
    series={
      <PieArcSeries
        cornerRadius={4}
        padAngle={0.02}
        padRadius={200}
        doughnut={true}
        colorScheme="cybertron"
      />
    }
  />
);

RoundedAndSpaced.story = {
  name: 'Rounded and spaced',
};

export const Labels = () => (
  <PieChart
    id="labels"
    width={350}
    height={250}
    data={categoryData}
    series={<PieArcSeries doughnut={true} />}
  />
);

export const InnerLabel = () => (
  <div
    style={{
      position: 'relative',
      height: '250px',
      width: '350px',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <div style={{ position: 'absolute', top: 0, left: 0 }}>
      <PieChart
        id="inner-label"
        width={350}
        height={250}
        data={categoryData}
        series={
          <PieArcSeries doughnut={true} label={null} colorScheme="cybertron" />
        }
      />
    </div>
    <h2 style={{ margin: '0 5px', padding: 0, color: 'white' }}>
      {categoryData.length} Attacks
    </h2>
  </div>
);

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
        data: randomNumber(10, 100),
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
  showText,
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
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
  );

  const ellipsis: React.CSSProperties = {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
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
        textAlign: textAnchor === 'start' ? 'left' : 'right',
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
