import { RadialBarChart } from './RadialBarChart';
import {
  largeCategoryData,
  medDateData,
  multiCategory
} from 'reaviz-data-utils';
import { RadialBarSeries, RadialBar, RadialGuideBar } from './RadialBarSeries';
import {
  RadialAxis,
  RadialAxisArcSeries,
  RadialAxisTickSeries,
  RadialAxisTick,
  RadialAxisTickLine
} from '@/common/Axis/RadialAxis';
import { schemes } from '@/common/color';
import { useState } from 'react';

export default {
  tags: ['snapshot'],
  title: 'Charts/Bar Chart/Radial',
  component: RadialBarChart,
  subcomponents: {
    RadialBarSeries,
    RadialBar,
    RadialGuideBar
  }
};

export const Simple = () => (
  <RadialBarChart
    height={450}
    width={450}
    innerRadius={50}
    data={medDateData}
    series={
      <RadialBarSeries
        animated
        colorScheme={schemes['cybertron'][0]}
        bar={<RadialBar curved={false} gradient={false} guide={null} />}
      />
    }
    axis={
      <RadialAxis
        ticks={
          <RadialAxisTickSeries
            tick={
              <RadialAxisTick line={<RadialAxisTickLine position="inside" />} />
            }
          />
        }
        arcs={<RadialAxisArcSeries count={10} />}
      />
    }
  />
);

export const Gradient = () => (
  <RadialBarChart
    height={450}
    width={450}
    innerRadius={50}
    data={medDateData}
    series={
      <RadialBarSeries
        animated
        colorScheme={schemes['cybertron'][0]}
        bar={
          <RadialBar
            curved={false}
            gradient={RadialBar.defaultProps.gradient}
            guide={<RadialGuideBar />}
          />
        }
      />
    }
    axis={
      <RadialAxis
        ticks={
          <RadialAxisTickSeries
            tick={
              <RadialAxisTick line={<RadialAxisTickLine position="inside" />} />
            }
          />
        }
        arcs={<RadialAxisArcSeries count={10} />}
      />
    }
  />
);

export const Resizable = () => (
  <div style={{ width: '50vw', height: '75vh', border: 'solid 1px red' }}>
    <RadialBarChart data={largeCategoryData} innerRadius={10} />
  </div>
);

export const LiveUpdating = () => {
  const [data, setData] = useState([...largeCategoryData]);

  const updateData = () => {
    const updateCount = Math.floor(Math.random() * 4) + 1;
    const newData = [...data];

    let idx = 0;
    while (idx <= updateCount) {
      const updateIndex = Math.floor(Math.random() * data.length);
      newData[updateIndex].data = Math.floor(Math.random() * 91) + 10;
      idx++;
    }

    setData(newData);
  };

  const sortData = () => {
    setData([...data].reverse());
  };

  return (
    <>
      <RadialBarChart width={450} height={450} innerRadius={50} data={data} />
      <br />
      <button onClick={updateData}>Update</button>
      <button onClick={sortData}>Sort</button>
    </>
  );
};

export const MultiSeries = () => (
  <RadialBarChart
    height={450}
    width={450}
    innerRadius={50}
    data={multiCategory}
    series={
      <RadialBarSeries
        type="grouped"
        animated
        colorScheme="cybertron"
        bar={<RadialBar curved={false} gradient={false} guide={null} />}
      />
    }
    axis={
      <RadialAxis
        type="category"
        ticks={
          <RadialAxisTickSeries
            tick={
              <RadialAxisTick line={<RadialAxisTickLine position="inside" />} />
            }
          />
        }
        arcs={<RadialAxisArcSeries count={10} />}
      />
    }
  />
);
