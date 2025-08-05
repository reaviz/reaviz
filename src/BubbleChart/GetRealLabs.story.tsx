import { ChartContainer } from '@/common';
import { Gradient, GradientStop } from '@/common/Gradient';
import { RadialGaugeArc, RadialGaugeSeries, StrokePieArc } from '@/RadialGauge';
import { hierarchy, pack } from 'd3-hierarchy';
import { scaleLinear } from 'd3-scale';
import { motion, useAnimationFrame, useMotionValue } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { Bubble } from './Bubble';
import { BubbleChart } from './BubbleChart';
import { BubbleLabel } from './BubbleLabel';
import { BubbleSeries } from './BubbleSeries';

const simpleData = [
  { key: 'Carrington McDaniel', data: 300 },
  { key: 'Austin McDaniel', data: 100 },
  { key: 'Anton James', data: 45 },
  { key: 'Stephanie Yang', data: 75 },
  { key: 'Evgeniy Kulynych', data: 25 }
];

const MenuItem = ({
  isActive,
  onClick,
  x: endX,
  y: endY,
  title,
  radius = 432,
  centerX = 0,
  centerY = 5
}) => {
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const duration = 0.3;
  const x = useMotionValue(startX.current);
  const y = useMotionValue(startY.current);

  const progressRef = useRef(0);
  const startTimeRef = useRef(null);

  // Calculate angles from positions around center (0, 0)
  const angle1 = Math.atan2(startY.current - centerY, startX.current - centerX); // radians
  const angle2 = Math.atan2(endY - centerY, endX - centerX); // radians

  // Ensure shortest path (optional)
  let deltaAngle = angle2 - angle1;
  if (deltaAngle > Math.PI) deltaAngle -= 2 * Math.PI;
  if (deltaAngle < -Math.PI) deltaAngle += 2 * Math.PI;

  useEffect(() => {
    startTimeRef.current = null;
    startX.current = endX;
    startY.current = endY;
  }, [endX, endY]);

  useAnimationFrame((time) => {
    if (startTimeRef.current === null) startTimeRef.current = time;

    const elapsed = time - startTimeRef.current;
    const progress = Math.min(elapsed / (duration * 1000), 1);
    progressRef.current = progress;

    const currentAngle = angle1 + deltaAngle * progress;

    const newX = centerX + radius * Math.cos(currentAngle);
    const newY = centerY + radius * Math.sin(currentAngle);

    x.set(newX);
    y.set(newY);
  });

  return (
    <motion.div
      onClick={onClick}
      transition={{ type: 'linear' }}
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: 10,
        color: '#1F1F21',
        position: 'absolute',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        justifyContent: 'center',
        alignItems: 'center',
        x,
        y
      }}
    >
      <motion.div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'translateX(-50%)'
        }}
        initial={{
          width: isActive ? 32 : 16,
          height: isActive ? 32 : 16
        }}
        animate={{
          width: isActive ? 32 : 16,
          height: isActive ? 32 : 16
        }}
      >
        <motion.div
          style={{
            border: '1px solid #1f1f2166',
            backgroundColor: isActive ? '#f9f6ff33' : '#FFFFFF',
            borderRadius: '50%',
            position: 'relative',
            backdropFilter: 'blur(6px)'
          }}
          initial={{
            width: 0,
            height: 0,
            borderColor: isActive ? '#1E2D96' : '#1f1f2166',
            borderWidth: isActive ? 4 : 1
          }}
          animate={{
            width: isActive ? 32 : 16,
            height: isActive ? 32 : 16,
            borderColor: isActive ? '#1E2D96' : '#1f1f2166',
            borderWidth: isActive ? 4 : 1
          }}
        />
      </motion.div>
      <motion.span
        initial={{
          marginLeft: isActive ? 0 : 10,
          fontSize: isActive ? 14 : 12,
          fontWeight: isActive ? 500 : 400
        }}
        animate={{
          marginLeft: isActive ? 0 : 10,
          fontSize: isActive ? 14 : 12,
          fontWeight: isActive ? 500 : 400
        }}
      >
        {title}
      </motion.span>
    </motion.div>
  );
};

const StartIndicator = ({
  size,
  title,
  value,
  x: centerX,
  y: centerY,
  startAngle,
  radius,
  gradient
}: {
  size: number;
  title: string;
  value: number;
  x: number;
  y: number;
  radius: number;
  startAngle: number;
  gradient: {
    start: string;
    end: string;
  };
}) => {
  const angleInRadians = ((startAngle - 90) * Math.PI) / 180;

  const x = centerX + radius * Math.cos(angleInRadians);
  const y = centerY + radius * Math.sin(angleInRadians);

  return (
    <foreignObject
      transform={`translate(${x}, ${y})`}
      height={size}
      width={size}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: `linear-gradient(52deg, ${gradient.start} 12.27%, ${gradient.end} 88.01%)`
        }}
      >
        <div
          style={{
            position: 'relative',
            borderRadius: '50%',
            width: size - 6,
            height: size - 6,
            top: 3,
            left: 3,
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              borderRadius: '50%',
              width: size - 12,
              height: size - 12,
              top: 3,
              left: 3,
              background: '#FFFFFF',
              filter: 'blur(3.703702926635742px)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              borderRadius: '50%',
              width: size - 12,
              height: size - 12,
              top: 3,
              left: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <span
              style={{
                color: '#1f1f21b3',
                fontSize: 10,
                fontWeight: 600
              }}
            >
              {title}
            </span>
            <span
              style={{
                color: '#1F1F21',
                fontSize: 20,
                fontWeight: 700
              }}
            >
              {value}%
            </span>
          </div>
        </div>
      </div>
    </foreignObject>
  );
};

export default {
  title: 'GRL/DashboardChart',
  component: BubbleChart,
  subcomponents: {
    BubbleSeries,
    BubbleLabel,
    Bubble
  }
};

const MENU_ITEMS = [
  { id: 1, title: 'Last 24 hours' },
  { id: 2, title: 'Last week' },
  { id: 3, title: 'Last month' },
  { id: 4, title: 'Last 6 months' },
  { id: 5, title: 'Custom' }
];

const TITLE_DISTANCE = 75;
const TOTAL_DISTANCE = 85;

export const Prototype = () => {
  const [activeMenuIndex, setActiveMenuIndex] = useState(2);
  const [selected, setSelected] = useState<string | null>(null);
  const [bubbleRef, setBubbleRef] = useState<SVGElement>();
  const getData = useCallback(
    (cw: number, ch: number) => {
      const bubble = pack()
        .size([cw - 200, ch - 200])
        .padding(3);

      const root = hierarchy<any>({ children: simpleData })
        .sum((d) => d.data)
        .sort((a, b) => b.data - a.data);

      return bubble(root).leaves();
    },
    [simpleData]
  );

  const {
    width: bubblesContainerWidth = 0,
    height: bubblesContainerHeight = 0
  } = bubbleRef?.getBoundingClientRect() ?? {};

  const getItemMenuPosition = (index: number, width) => {
    const total = MENU_ITEMS.length;
    const radius = width * 0.8;
    const angleStep = 10;
    const startAngle = -(angleStep * total) / 2;
    const fixedSlot = Math.round(total / 2);
    const shiftedIndex = index - activeMenuIndex + fixedSlot;
    const angleDeg = startAngle + shiftedIndex * angleStep - 5;
    const angleRad = (angleDeg * Math.PI) / 180;

    const x = Math.cos(angleRad) * radius;
    const y = Math.sin(angleRad) * radius;

    return { x, y };
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const circle = e.target.closest('circle');

      if (!circle) {
        setSelected(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <>
      <style>
        {`
          circle, g {
            outline: none;
          }
        `}
      </style>
      <ChartContainer
        id="radar"
        width={580}
        height={580}
        margins={20}
        xAxisVisible={true}
        yAxisVisible={true}
        center={false}
      >
        {({ chartWidth, chartHeight }) => {
          let scale;
          const circles = getData(chartWidth, chartHeight);
          const minValue = 0;
          const maxValue = 100;
          const startAngle = 0;
          const endAngle = Math.PI * 2;

          if (Array.isArray(maxValue)) {
            scale = maxValue.map((max, index) =>
              scaleLinear()
                .domain([minValue?.[index] ?? minValue?.[0] ?? minValue, max])
                .range([startAngle, endAngle])
            );
          } else if (Array.isArray(minValue)) {
            scale = minValue.map((min, index) =>
              scaleLinear()
                .domain([min, maxValue?.[index] ?? maxValue?.[0] ?? maxValue])
                .range([startAngle, endAngle])
            );
          } else {
            scale = scaleLinear()
              .domain([minValue, maxValue])
              .range([startAngle, endAngle]);
          }

          return (
            <Fragment>
              <circle
                r={chartWidth * 1.3}
                fill="#F9F6FF"
                stroke="#1f1f2114"
                transform={`translate(${chartWidth / 2}, ${chartHeight / 2})`}
                opacity={0.6}
              />
              <circle
                r={chartWidth * 0.8}
                fill="#F9F6FF"
                stroke="#1f1f2114"
                transform={`translate(${chartWidth / 2}, ${chartHeight / 2})`}
                opacity={0.6}
              />
              <foreignObject
                width={chartWidth * 2}
                height={chartHeight}
                style={{
                  transform: `translate(-${chartWidth / 2}px, 0)`,
                  overflow: 'visible'
                }}
              >
                <svg
                  style={{
                    transform: 'translate(901px, 40px)',
                    position: 'absolute'
                  }}
                  width="74"
                  height="454"
                  viewBox="0 0 74 454"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.29846 453.887C49.4855 386.914 73.4459 307.88 73.0558 227.089C72.6657 146.298 47.9433 67.4995 2.11161 0.965686L0.324104 2.19701C45.9083 68.3716 70.4973 146.745 70.8853 227.1C71.2732 307.454 47.4422 386.061 2.49914 452.673L4.29846 453.887Z"
                    fill="url(#paint0_linear_1922_20505)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1922_20505"
                      x1="-328.97"
                      y1="-11.2074"
                      x2="-328.97"
                      y2="431.516"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#F9F6FF" stop-opacity="0.04" />
                      <stop
                        offset="0.326923"
                        stop-color="#1E2D96"
                        stop-opacity="0.2"
                      />
                      <stop offset="0.543269" stop-color="#1E2D96" />
                      <stop
                        offset="0.721154"
                        stop-color="#1E2D96"
                        stop-opacity="0.2"
                      />
                      <stop
                        offset="1"
                        stop-color="#F9F6FF"
                        stop-opacity="0.04"
                      />
                    </linearGradient>
                  </defs>
                </svg>
                <div
                  style={{
                    position: 'absolute',
                    transform: `translate(${chartWidth}px, ${chartHeight / 2 - 10}px)`
                  }}
                >
                  {MENU_ITEMS.map((item, index) => (
                    <MenuItem
                      {...getItemMenuPosition(index, chartWidth)}
                      radius={chartWidth * 0.8}
                      key={item.id}
                      title={item.title}
                      isActive={index === activeMenuIndex}
                      onClick={() => setActiveMenuIndex(index)}
                    />
                  ))}
                </div>
              </foreignObject>
              <text
                x={chartWidth / 2}
                dy={-TITLE_DISTANCE}
                fontSize={24}
                fontWeight={700}
                textAnchor="middle"
                dominantBaseline="central"
              >
                Meeting Coverage Overview
              </text>
              <g
                transform={`translate(${chartWidth / 2} ${chartHeight + TOTAL_DISTANCE})`}
              >
                <text
                  fontSize={24}
                  fontWeight={700}
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  135
                </text>
                <text
                  dy={25}
                  fontSize={12}
                  fontWeight={600}
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  Total Meetings
                </text>
              </g>
              <circle
                r={chartWidth / 2 + 50}
                fill="transparent"
                stroke="#1f1f2166"
                transform={`translate(${chartWidth / 2}, ${chartHeight / 2})`}
                opacity={0.6}
              />
              <g
                transform={`translate(${chartWidth / 2}, ${chartHeight + 47})`}
              >
                <circle r={20} stroke="#1f1f2133" fill="#eef0f4" />
                <path
                  d="M4.00001 3C2.80936 3 1.83334 3.97602 1.83334 5.16667V10.8333C1.83334 12.024 2.80936 13 4.00001 13H9.66667C10.8573 13 11.8333 12.024 11.8333 10.8333V10.3835L14.4095 11.929C14.4854 11.9745 14.572 11.9991 14.6605 12.0002C14.749 12.0012 14.8362 11.9788 14.9131 11.9352C14.9901 11.8916 15.0542 11.8283 15.0987 11.7519C15.1432 11.6754 15.1667 11.5885 15.1667 11.5V4.5C15.1667 4.43306 15.1533 4.3668 15.1272 4.30514C15.1012 4.24349 15.063 4.18769 15.015 4.14106C14.9669 4.09443 14.91 4.05792 14.8476 4.03369C14.7852 4.00946 14.7186 3.998 14.6517 4C14.5662 4.00256 14.4828 4.02699 14.4095 4.07096L11.8333 5.61654V5.16667C11.8333 3.97602 10.8573 3 9.66667 3H4.00001ZM4.00001 4H9.66667C10.3167 4 10.8333 4.51665 10.8333 5.16667V6.48437V9.49414V10.8333C10.8333 11.4834 10.3167 12 9.66667 12H4.00001C3.34999 12 2.83334 11.4834 2.83334 10.8333V5.16667C2.83334 4.51665 3.34999 4 4.00001 4ZM14.1667 5.38346V10.6165L11.8333 9.2168V6.7832L14.1667 5.38346Z"
                  fill="#1F1F21"
                  transform="translate(-7, -7)"
                />
              </g>
              <RadialGaugeSeries
                id="inner"
                label={null}
                valueLabel={null}
                outerArc={
                  <RadialGaugeArc
                    color="#1f1f2133"
                    disabled={true}
                    animated={false}
                  />
                }
                innerArc={
                  <RadialGaugeArc
                    cornerRadius={6}
                    gradient={
                      <Gradient
                        direction="vertical"
                        stops={[
                          <GradientStop
                            color="#1E2D96"
                            offset="20%"
                            stopOpacity={0.3}
                            key="start1"
                          />,
                          <GradientStop
                            color="#7B0D7A"
                            offset="90%"
                            stopOpacity={0.3}
                            key="stop1"
                          />
                        ]}
                      />
                    }
                  />
                }
                arcWidth={30}
                scale={scale}
                data={[
                  {
                    key: '',
                    data: 65
                  }
                ]}
                startAngle={startAngle}
                endAngle={endAngle}
                width={chartWidth}
                height={chartHeight}
              />
              <RadialGaugeSeries
                id="outer"
                label={null}
                valueLabel={null}
                outerArc={
                  <StrokePieArc
                    id="dashed"
                    color="#1f1f2133"
                    strokeDasharray="5, 5"
                    strokeWidth={8}
                    disabled={true}
                    animated={true}
                  />
                }
                innerArc={
                  <RadialGaugeArc
                    cornerRadius={6}
                    gradient={
                      <Gradient
                        direction="vertical"
                        stops={[
                          <GradientStop
                            color="#1E2D96"
                            offset="20%"
                            stopOpacity={1}
                            key="start"
                          />,
                          <GradientStop
                            color="#7B0D7A"
                            offset="90%"
                            stopOpacity={1}
                            key="stop"
                          />
                        ]}
                      />
                    }
                  />
                }
                arcWidth={12}
                scale={scale}
                data={[
                  {
                    key: '',
                    data: 65
                  }
                ]}
                startAngle={startAngle}
                endAngle={endAngle}
                width={chartWidth}
                height={chartHeight}
              />
              <text
                transform={`translate(${chartWidth / 2}, ${TITLE_DISTANCE})`}
                dy={40}
                fontSize={16}
                fontWeight={700}
                textAnchor="middle"
                dominantBaseline="central"
              >
                Top Risky Persons
              </text>
              <g
                ref={setBubbleRef}
                transform={`translate(${chartWidth / 2 - bubblesContainerWidth / 2}, ${chartHeight / 2 - bubblesContainerHeight / 2}) scale(0.8)`}
              >
                <BubbleSeries
                  data={circles}
                  colorScheme="white"
                  bubble={
                    <Bubble onClick={(_, item) => setSelected(item.data.key)} />
                  }
                  label={
                    <BubbleLabel
                      format={(data) => {
                        const abbr = data.data.key
                          .split(' ')
                          .map((word) => word[0])
                          .join('');
                        const logos = {
                          'Austin McDaniel':
                            'https://avatars.githubusercontent.com/u/227909?s=96&v=4'
                        };

                        if (logos[data.data.key]) {
                          return (
                            <g
                              style={{
                                pointerEvents: 'none',
                                opacity: !selected
                                  ? 1
                                  : selected === data.data.key
                                    ? 1
                                    : 0.5
                              }}
                            >
                              <foreignObject
                                height={data.r * 2}
                                width={data.r * 2}
                                x={-data.r}
                                y={-data.r}
                              >
                                <img
                                  style={{ borderRadius: '50%' }}
                                  src="https://avatars.githubusercontent.com/u/227909?s=96&v=4"
                                  height={data.r * 2}
                                  width={data.r * 2}
                                />
                              </foreignObject>
                            </g>
                          );
                        }
                        return (
                          <g
                            style={{
                              pointerEvents: 'none',
                              opacity: !selected
                                ? 1
                                : selected === data.data.key
                                  ? 1
                                  : 0.5
                            }}
                          >
                            <circle
                              r={data.r}
                              stroke="rgba(31, 31, 33, 0.20)"
                              fill="transparent"
                              strokeWidth={Math.max(1, data.r * 0.05)}
                            />
                            <text
                              fontWeight={700}
                              fontSize={Math.min(
                                data.r / (abbr.length * 0.6),
                                data.r * 0.6
                              )}
                              fill="black"
                              textAnchor="middle"
                              dominantBaseline="central"
                            >
                              {abbr}
                            </text>
                          </g>
                        );
                      }}
                    />
                  }
                />
              </g>
              <StartIndicator
                radius={chartWidth / 2 - 40}
                x={chartWidth / 2 - 40}
                y={chartWidth / 2 - 40}
                size={80}
                title="Protected"
                value={75}
                startAngle={0}
                gradient={{
                  start: '#7B0D7A',
                  end: '#1E2D96'
                }}
              />
              <StartIndicator
                radius={chartWidth / 2 - 40}
                x={chartWidth / 2 - 40}
                y={chartWidth / 2 - 40}
                size={80}
                title="Unprotected"
                value={25}
                startAngle={235}
                gradient={{
                  start: '#a3a2a9',
                  end: '#a3a2a9'
                }}
              />
            </Fragment>
          );
        }}
      </ChartContainer>
    </>
  );
};
