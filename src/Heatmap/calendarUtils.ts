import { range, min } from 'd3-array';
import { ChartShallowDataShape } from '../common/data';

export type CalendarView = 'year' | 'month';

const getFirstOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const addWeeksToDate = (date: Date, weeks: number) => {
  const d = new Date(date.getTime());
  d.setDate(d.getDate() + weeks * 7);
  return d;
};

const getStartOfDay = (date: Date) => {
  const d = new Date(date.getTime());
  d.setHours(0, 0, 0, 0);
  return d;
};

const getNewDayFromDay = (date: Date, num: number) => {
  const d = new Date(date.getTime());
  d.setDate(d.getDate() + num);
  return d;
};

export const weekDays: string[] = (() => {
  const base = new Date(Date.UTC(2017, 0, 2));
  return range(7).map(() => {
    const name = base.toLocaleDateString('default', { weekday: 'short' });
    base.setDate(base.getDate() + 1);
    return name;
  });
})();

export const buildDataScales = (
  rawData: ChartShallowDataShape[],
  view: CalendarView
) => {
  // Get the most recent date to get the range from
  // From the end date, lets find the start year/month of that
  // From that start year/month, lets find the end year/month for our bounds
  const startDate = min(rawData, (d) => d.key);
  const start = getFirstOfMonth(startDate);
  const endDomain = view === 'year' ? 53 : 5;
  const end = addWeeksToDate(start, endDomain);

  // Base on the view type, swap out some ranges
  const xDomainRange = view === 'year' ? 53 : 5;

  // Build our x/y domains for days of week + number of weeks in year
  const yDomain = range(7).reverse();
  const xDomain = range(xDomainRange);

  // Filter out dates that are not in the start/end ranges
  // and turn them into something our chart can read
  const dates = rawData
    .filter(
      (d) =>
        (d.key as Date).getTime() > start.getTime() ||
        (d.key as Date).getTime() < end.getTime()
    )
    .map((d) => ({
      key: getStartOfDay(d.key as Date),
      data: d.data
    }));

  // Find the first day of the duration and subtract the delta
  const firstDayOfStart = start.getDay();
  const curDate = getNewDayFromDay(start, -firstDayOfStart);
  const rows: any[] = [];

  // Build out the dataset for the n duration
  for (let week = 0; week < xDomainRange; week++) {
    const row = {
      key: week,
      data: [] as any
    };

    for (let day = 0; day <= 6; day++) {
      const dayValue = dates.find((d) => d.key.getTime() === curDate.getTime());

      row.data.push({
        key: day,
        data: dayValue?.data ?? undefined,
        metadata: {
          date: new Date(curDate.getTime()),
          start: start,
          end: end
        }
      });

      curDate.setDate(curDate.getDate() + 1);
    }

    rows.push(row);
  }

  return {
    data: rows,
    yDomain,
    xDomain,
    start
  };
};
