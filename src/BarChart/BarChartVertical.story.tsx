import React, { Fragment, useState } from 'react';
import { BarChart } from './BarChart';
import {
  categoryData,
  largeCategoryData,
  nonZeroCategoryData
} from 'reaviz-data-utils';
import { BarSeries, Bar, BarLabel, GuideBar } from './BarSeries';
import chroma from 'chroma-js';
import { range } from 'd3-array';
import { Stripes } from '@/common/Mask';
import {
  LINEAR_X_AXIS_TICK_LINE_DEFAULT_PROPS,
  LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS,
  LINEAR_Y_AXIS_TICK_LINE_DEFAULT_PROPS,
  LinearAxisLine,
  LinearXAxis,
  LinearXAxisTickLabel,
  LinearXAxisTickLine,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickLabel,
  LinearYAxisTickLine,
  LinearYAxisTickSeries
} from '@/common';

export default {
  tags: ['snapshot'],
  title: 'Charts/Bar Chart/Vertical/Single Series',
  component: BarChart,
  subcomponents: {
    BarSeries,
    Bar,
    BarLabel,
    GuideBar
  }
};

export const Simple = () => (
  <BarChart
    width={400}
    height={350}
    data={categoryData}
    series={<BarSeries padding={0.1} bar={<Bar />} />}
    xAxis={
      <LinearXAxis type="category">
        <LinearAxisLine />
        <LinearXAxisTickSeries tickSize={20}>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);

export const CustomStyle = () => (
  <BarChart
    width={350}
    height={250}
    data={categoryData}
    series={
      <BarSeries
        bar={
          <Bar
            style={(data) => {
              if (data.key === 'DLP') {
                console.log('Style callback...', data);
                return {
                  fill: 'blue'
                };
              }
            }}
          />
        }
      />
    }
    xAxis={
      <LinearXAxis type="category">
        <LinearAxisLine />
        <LinearXAxisTickSeries tickSize={20}>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);

export const LargeDataset = () => (
  <BarChart
    width={350}
    height={350}
    data={largeCategoryData}
    series={<BarSeries />}
    xAxis={
      <LinearXAxis type="category">
        <LinearAxisLine />
        <LinearXAxisTickSeries tickSize={20}>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);

export const Mask = () => (
  <BarChart
    width={350}
    height={250}
    data={categoryData}
    series={<BarSeries bar={<Bar mask={<Stripes />} />} />}
    xAxis={
      <LinearXAxis type="category">
        <LinearAxisLine />
        <LinearXAxisTickSeries tickSize={20}>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);

export const CustomColors = () => (
  <BarChart
    width={350}
    height={250}
    data={categoryData}
    series={
      <BarSeries
        colorScheme={(_data, index) => (index % 2 ? '#418AD7' : '#ACB7C9')}
      />
    }
    xAxis={
      <LinearXAxis type="category">
        <LinearAxisLine />
        <LinearXAxisTickSeries tickSize={20}>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);

export const Labels = () => (
  <BarChart
    width={350}
    height={250}
    data={categoryData}
    series={<BarSeries bar={<Bar label={<BarLabel position={'top'} />} />} />}
    xAxis={
      <LinearXAxis type="category">
        <LinearAxisLine />
        <LinearXAxisTickSeries tickSize={20}>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);

export const CustomBarWidth = () => (
  <BarChart
    width={350}
    height={250}
    series={<BarSeries bar={<Bar width={5} />} />}
    data={categoryData}
    xAxis={
      <LinearXAxis type="category">
        <LinearAxisLine />
        <LinearXAxisTickSeries tickSize={20}>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
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
    <Fragment>
      <BarChart
        width={350}
        height={350}
        data={data}
        series={
          <BarSeries
            colorScheme={chroma.scale(['ACB7C9', '418AD7']).colors(data.length)}
          />
        }
        xAxis={
          <LinearXAxis type="category">
            <LinearAxisLine />
            <LinearXAxisTickSeries tickSize={20}>
              <LinearXAxisTickLine />
              <LinearXAxisTickLabel />
            </LinearXAxisTickSeries>
          </LinearXAxis>
        }
        yAxis={
          <LinearYAxis type="value">
            <LinearAxisLine />
            <LinearYAxisTickSeries>
              <LinearYAxisTickLine />
              <LinearYAxisTickLabel
                {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS}
              />
            </LinearYAxisTickSeries>
          </LinearYAxis>
        }
      />
      <br />
      <button onClick={updateData}>Update</button>
      <button onClick={sortData}>Sort</button>
    </Fragment>
  );
};

export const Autosize = () => (
  <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
    <BarChart
      data={categoryData}
      xAxis={
        <LinearXAxis type="category">
          <LinearAxisLine />
          <LinearXAxisTickSeries tickSize={20}>
            <LinearXAxisTickLine />
            <LinearXAxisTickLabel />
          </LinearXAxisTickSeries>
        </LinearXAxis>
      }
      yAxis={
        <LinearYAxis type="value">
          <LinearAxisLine />
          <LinearYAxisTickSeries>
            <LinearYAxisTickLine />
            <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
          </LinearYAxisTickSeries>
        </LinearYAxis>
      }
    />
  </div>
);

export const Performance = () =>
  range(15).map((i) => (
    <div
      key={i}
      style={{
        width: '250px',
        height: '250px',
        border: 'solid 1px green',
        margin: '25px',
        display: 'inline-block'
      }}
    >
      <BarChart
        data={categoryData}
        xAxis={
          <LinearXAxis type="category">
            <LinearAxisLine />
            <LinearXAxisTickSeries tickSize={20}>
              <LinearXAxisTickLine />
              <LinearXAxisTickLabel />
            </LinearXAxisTickSeries>
          </LinearXAxis>
        }
        yAxis={
          <LinearYAxis type="value">
            <LinearAxisLine />
            <LinearYAxisTickSeries>
              <LinearYAxisTickLine />
              <LinearYAxisTickLabel
                {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS}
              />
            </LinearYAxisTickSeries>
          </LinearYAxis>
        }
      />
    </div>
  ));

export const NoAnimation = () => (
  <BarChart
    width={350}
    height={250}
    data={categoryData}
    series={<BarSeries animated={false} />}
    xAxis={
      <LinearXAxis type="category">
        <LinearAxisLine />
        <LinearXAxisTickSeries tickSize={20}>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);

export const Waterfall = () => (
  <BarChart
    width={350}
    height={350}
    data={categoryData}
    series={<BarSeries type="waterfall" />}
    xAxis={
      <LinearXAxis type="category">
        <LinearAxisLine />
        <LinearXAxisTickSeries tickSize={20}>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);

export const NonZero = () => (
  <BarChart
    width={350}
    height={250}
    data={nonZeroCategoryData}
    series={<BarSeries />}
    xAxis={
      <LinearXAxis type="category">
        <LinearAxisLine />
        <LinearXAxisTickSeries tickSize={20}>
          <LinearXAxisTickLine />
          <LinearXAxisTickLabel />
        </LinearXAxisTickSeries>
      </LinearXAxis>
    }
    yAxis={
      <LinearYAxis type="value">
        <LinearAxisLine />
        <LinearYAxisTickSeries>
          <LinearYAxisTickLine />
          <LinearYAxisTickLabel {...LINEAR_Y_AXIS_TICK_LABEL_DEFAULT_PROPS} />
        </LinearYAxisTickSeries>
      </LinearYAxis>
    }
  />
);

NonZero.story = {
  name: 'Non-Zero'
};
