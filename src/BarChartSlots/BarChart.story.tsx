export default {
  title: 'Charts/Bar Chart/Slots'
};

export const Simple = () => (
  <BarChart width={400} height={350} data={categoryData}>
    <GridlineSeries />
    <LinearXAxis
      type="category"
      tickSeries={<LinearXAxisTickSeries tickSize={20} />}
    />
    <LinearYAxis type="value" />
    <BarSeries colorScheme={schemes[0]} padding={0.1}>
      {(data) => <Bar {...data} />}
    </BarSeries>
  </BarChart>
);
