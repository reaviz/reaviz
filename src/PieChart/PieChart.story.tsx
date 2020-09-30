import React, { useState, Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { PieChart } from './PieChart';
import { categoryData, randomNumber, browserData } from '../../demo';
import { PieArcSeries } from './PieArcSeries';
import { number, object, text, select } from '@storybook/addon-knobs';
import { schemes } from '../common/color';

storiesOf('Charts/Pie Chart/Pie', module)
  .add(
    'Simple',
    () => {
      const height = number('Height', 250);
      const width = number('Width', 350);
      const color = select('Color Scheme', schemes, 'cybertron');
      const data = object('Data', categoryData);

      return (
        <PieChart
          width={width}
          height={height}
          data={data}
          series={<PieArcSeries colorScheme={color} />}
        />
      );
    },
    { options: { showPanel: true } }
  )
  .add(
    'Explode',
    () => {
      const height = number('Height', 250);
      const width = number('Width', 350);
      const color = select('Color Scheme', schemes, 'cybertron');
      const data = object('Data', categoryData);

      return (
        <PieChart
          width={height}
          height={width}
          data={data}
          series={<PieArcSeries explode={true} colorScheme={color} />}
        />
      );
    },
    { options: { showPanel: true } }
  )
  .add('No Animation', () => (
    <PieChart
      width={350}
      height={250}
      series={<PieArcSeries animated={false} />}
      data={browserData}
    />
  ))
  .add('Label Overlap', () => (
    <PieChart width={350} height={250} data={browserData} />
  ))
  .add('Display All Labels', () => (
    <PieChart
      width={350}
      height={250}
      data={browserData}
      displayAllLabels={true}
    />
  ))
  .add('Live Updating', () => <LiveUpdatingStory />)
  .add('Autosize', () => (
    <div style={{ width: '50vw', height: '50vh', border: 'solid 1px red' }}>
      <PieChart data={categoryData} />
    </div>
  ));

storiesOf('Charts/Pie Chart/Donut', module)
  .add(
    'Simple',
    () => {
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
    },
    { options: { showPanel: true } }
  )
  .add('Labels', () => (
    <PieChart
      width={350}
      height={250}
      data={categoryData}
      series={<PieArcSeries doughnut={true} />}
    />
  ))
  .add(
    'Inner Label',
    () => {
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
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0 }}>
            <PieChart
              width={width}
              height={height}
              data={data}
              series={
                <PieArcSeries
                  doughnut={true}
                  label={null}
                  colorScheme={color}
                />
              }
            />
          </div>
          <h2 style={{ margin: '0 5px', padding: 0, color: 'white' }}>
            {data.length} {words}
          </h2>
        </div>
      );
    },
    { options: { showPanel: true } }
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
