import React, { FC, ReactElement, useCallback } from 'react';
import {
  ChartContainer,
  ChartContainerChildProps,
  ChartProps
} from '@/common/containers/ChartContainer';
import { ChartNestedDataShape, ChartShallowDataShape } from '@/common/data';
import { hierarchy, partition } from 'd3-hierarchy';
import { CloneElement, useId } from 'reablocks';
import { SunburstSeries, SunburstSeriesProps } from './SunburstSeries';

// Type definitions for our 4-level hierarchical structure
export interface StatusData {
  key: 'new' | 'in_progress' | 'open' | 'closed';
  data: number;
  metadata?: {
    color?: string;
    stage?: string;
  };
  color?: string; // Add color property
}

export interface SeverityData {
  key: 'critical' | 'high' | 'medium' | 'low';
  data: StatusData[];
  metadata?: {
    color?: string;
    priority?: number;
  };
  color?: string; // Add color property
}

export interface ConclusionData {
  key: 'malicious' | 'no_actions' | 'benign';
  data: SeverityData[];
  metadata?: {
    color?: string;
    description?: string;
  };
  color?: string; // Add color property
}

export interface ParentCategoryData {
  key: 'email' | 'endpoint' | 'cloud';
  data: ConclusionData[];
  metadata?: {
    color?: string;
    type?: string;
  };
  color?: string; // Add color property
}

export type HierarchicalSecurityData = ParentCategoryData[];

// Utility functions for working with the hierarchical security data
export const getDataSummary = (data: HierarchicalSecurityData) => {
  const summary = {
    totalThreats: 0,
    byCategory: {} as Record<string, number>,
    byConclusion: {} as Record<string, number>,
    bySeverity: {} as Record<string, number>,
    byStatus: {} as Record<string, number>
  };

  data.forEach((category) => {
    let categoryTotal = 0;

    category.data.forEach((conclusion) => {
      let conclusionTotal = 0;

      conclusion.data.forEach((severity) => {
        let severityTotal = 0;

        severity.data.forEach((status) => {
          const count = status.data;
          severityTotal += count;
          conclusionTotal += count;
          categoryTotal += count;
          summary.totalThreats += count;

          // Aggregate by status
          summary.byStatus[status.key] =
            (summary.byStatus[status.key] || 0) + count;
        });

        // Aggregate by severity
        summary.bySeverity[severity.key] =
          (summary.bySeverity[severity.key] || 0) + severityTotal;
      });

      // Aggregate by conclusion
      summary.byConclusion[conclusion.key] = conclusionTotal;
    });

    // Aggregate by category
    summary.byCategory[category.key] = categoryTotal;
  });

  return summary;
};

// Create a flattened view for easier analysis
export const flattenHierarchicalData = (data: HierarchicalSecurityData) => {
  const flattened: Array<{
    category: string;
    conclusion: string;
    severity: string;
    status: string;
    count: number;
    path: string;
  }> = [];

  data.forEach((category) => {
    category.data.forEach((conclusion) => {
      conclusion.data.forEach((severity) => {
        severity.data.forEach((status) => {
          flattened.push({
            category: category.key,
            conclusion: conclusion.key,
            severity: severity.key,
            status: status.key,
            count: status.data,
            path: `${category.key}/${conclusion.key}/${severity.key}/${status.key}`
          });
        });
      });
    });
  });

  return flattened;
};

export interface SunburstTestProps extends ChartProps {
  /**
   * Hierarchical security data with 4 levels: categories -> status -> severity -> threat level
   */
  data: HierarchicalSecurityData;

  /**
   * Padding angle between arcs in radians. Defaults to 0.005.
   */
  padAngle?: number;

  /**
   * The series component that renders the components.
   */
  series?: ReactElement<SunburstSeriesProps, typeof SunburstSeries>;
}

// Sample data structure for demonstration
export const sampleSecurityData: HierarchicalSecurityData = [
  {
    key: 'email',
    color: '#ff6b6b',
    data: [
      {
        key: 'malicious',
        color: '#f08082',
        data: [
          {
            key: 'critical',
            color: '#f8a240',
            data: [
              { key: 'new', data: 1, color: '#fffae6' },
              { key: 'in_progress', data: 2, color: '#e7eeff' },
              { key: 'open', data: 5, color: '#efe8fe' },
              { key: 'closed', data: 4, color: '#eef8e9' }
            ]
          },
          {
            key: 'high',
            color: '#fbc27f',
            data: [
              { key: 'new', data: 8, color: '#fffae6' },
              { key: 'in_progress', data: 1, color: '#e7eeff' },
              { key: 'open', data: 3, color: '#efe8fe' },
              { key: 'closed', data: 3, color: '#eef8e9' }
            ]
          },
          {
            key: 'medium',
            color: '#fee1bf',
            data: [
              { key: 'new', data: 4, color: '#fffae6' },
              { key: 'in_progress', data: 6, color: '#e7eeff' },
              { key: 'open', data: 2, color: '#efe8fe' },
              { key: 'closed', data: 1, color: '#eef8e9' }
            ]
          },
          {
            key: 'low',
            color: '#fef4e4',
            data: [
              { key: 'new', data: 1, color: '#fffae6' },
              { key: 'in_progress', data: 2, color: '#e7eeff' },
              { key: 'open', data: 1, color: '#efe8fe' },
              { key: 'closed', data: 8, color: '#eef8e9' }
            ]
          }
        ]
      },
      {
        key: 'no_actions',
        color: '#f2f3f7',
        data: [
          {
            key: 'critical',
            color: '#f8a240',
            data: [
              { key: 'new', data: 3, color: '#fffae6' },
              { key: 'in_progress', data: 2, color: '#e7eeff' },
              { key: 'open', data: 1, color: '#efe8fe' },
              { key: 'closed', data: 4, color: '#eef8e9' }
            ]
          },
          {
            key: 'high',
            color: '#fbc27f',
            data: [
              { key: 'new', data: 5, color: '#fffae6' },
              { key: 'in_progress', data: 4, color: '#e7eeff' },
              { key: 'open', data: 2, color: '#efe8fe' },
              { key: 'closed', data: 1, color: '#eef8e9' }
            ]
          },
          {
            key: 'medium',
            color: '#fee1bf',
            data: [
              { key: 'new', data: 8, color: '#fffae6' },
              { key: 'in_progress', data: 7, color: '#e7eeff' },
              { key: 'open', data: 4, color: '#efe8fe' },
              { key: 'closed', data: 2, color: '#eef8e9' }
            ]
          },
          {
            key: 'low',
            color: '#fef4e4',
            data: [
              { key: 'new', data: 2, color: '#fffae6' },
              { key: 'in_progress', data: 1, color: '#e7eeff' },
              { key: 'open', data: 5, color: '#efe8fe' },
              { key: 'closed', data: 4, color: '#eef8e9' }
            ]
          }
        ]
      },
      {
        key: 'benign',
        color: '#ffffff',
        data: [
          {
            key: 'critical',
            color: '#f8a240',
            data: [
              { key: 'new', data: 1, color: '#fffae6' },
              { key: 'in_progress', data: 0, color: '#e7eeff' },
              { key: 'open', data: 0, color: '#efe8fe' },
              { key: 'closed', data: 2, color: '#eef8e9' }
            ]
          },
          {
            key: 'high',
            color: '#fbc27f',
            data: [
              { key: 'new', data: 2, color: '#fffae6' },
              { key: 'in_progress', data: 1, color: '#e7eeff' },
              { key: 'open', data: 1, color: '#efe8fe' },
              { key: 'closed', data: 6, color: '#eef8e9' }
            ]
          },
          {
            key: 'medium',
            color: '#fee1bf',
            data: [
              { key: 'new', data: 6, color: '#fffae6' },
              { key: 'in_progress', data: 5, color: '#e7eeff' },
              { key: 'open', data: 4, color: '#efe8fe' },
              { key: 'closed', data: 1, color: '#eef8e9' }
            ]
          },
          {
            key: 'low',
            color: '#fef4e4',
            data: [
              { key: 'new', data: 1, color: '#fffae6' },
              { key: 'in_progress', data: 2, color: '#e7eeff' },
              { key: 'open', data: 1, color: '#efe8fe' },
              { key: 'closed', data: 7, color: '#eef8e9' }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'endpoint',
    color: '#e7eeff', // Blue for endpoint category
    data: [
      {
        key: 'malicious',
        color: '#f08082',
        data: [
          {
            key: 'critical',
            color: '#f8a240',
            data: [
              { key: 'new', data: 1, color: '#fffae6' },
              { key: 'in_progress', data: 1, color: '#e7eeff' },
              { key: 'open', data: 3, color: '#efe8fe' },
              { key: 'closed', data: 3, color: '#eef8e9' }
            ]
          },
          {
            key: 'high',
            color: '#fbc27f',
            data: [
              { key: 'new', data: 6, color: '#fffae6' },
              { key: 'in_progress', data: 9, color: '#e7eeff' },
              { key: 'open', data: 2, color: '#efe8fe' },
              { key: 'closed', data: 2, color: '#eef8e9' }
            ]
          },
          {
            key: 'medium',
            color: '#fee1bf',
            data: [
              { key: 'new', data: 3, color: '#fffae6' },
              { key: 'in_progress', data: 4, color: '#e7eeff' },
              { key: 'open', data: 1, color: '#efe8fe' },
              { key: 'closed', data: 1, color: '#eef8e9' }
            ]
          },
          {
            key: 'low',
            color: '#fef4e4',
            data: [
              { key: 'new', data: 1, color: '#fffae6' },
              { key: 'in_progress', data: 2, color: '#e7eeff' },
              { key: 'open', data: 1, color: '#efe8fe' },
              { key: 'closed', data: 5, color: '#eef8e9' }
            ]
          }
        ]
      },
      {
        key: 'no_actions',
        color: '#f2f3f7',
        data: [
          {
            key: 'critical',
            color: '#f8a240',
            data: [
              { key: 'new', data: 2, color: '#fffae6' },
              { key: 'in_progress', data: 1, color: '#e7eeff' },
              { key: 'open', data: 0, color: '#efe8fe' },
              { key: 'closed', data: 3, color: '#eef8e9' }
            ]
          },
          {
            key: 'high',
            color: '#fbc27f',
            data: [
              { key: 'new', data: 4, color: '#fffae6' },
              { key: 'in_progress', data: 3, color: '#e7eeff' },
              { key: 'open', data: 2, color: '#efe8fe' },
              { key: 'closed', data: 1, color: '#eef8e9' }
            ]
          },
          {
            key: 'medium',
            color: '#fee1bf',
            data: [
              { key: 'new', data: 6, color: '#fffae6' },
              { key: 'in_progress', data: 5, color: '#e7eeff' },
              { key: 'open', data: 4, color: '#efe8fe' },
              { key: 'closed', data: 2, color: '#eef8e9' }
            ]
          },
          {
            key: 'low',
            color: '#fef4e4',
            data: [
              { key: 'new', data: 2, color: '#fffae6' },
              { key: 'in_progress', data: 1, color: '#e7eeff' },
              { key: 'open', data: 5, color: '#efe8fe' },
              { key: 'closed', data: 4, color: '#eef8e9' }
            ]
          }
        ]
      },
      {
        key: 'benign',
        color: '#ffffff',
        data: [
          {
            key: 'critical',
            color: '#f8a240',
            data: [
              { key: 'new', data: 1, color: '#fffae6' },
              { key: 'in_progress', data: 0, color: '#e7eeff' },
              { key: 'open', data: 0, color: '#efe8fe' },
              { key: 'closed', data: 2, color: '#eef8e9' }
            ]
          },
          {
            key: 'high',
            color: '#fbc27f',
            data: [
              { key: 'new', data: 2, color: '#fffae6' },
              { key: 'in_progress', data: 1, color: '#e7eeff' },
              { key: 'open', data: 1, color: '#efe8fe' },
              { key: 'closed', data: 6, color: '#eef8e9' }
            ]
          },
          {
            key: 'medium',
            color: '#fee1bf',
            data: [
              { key: 'new', data: 3, color: '#fffae6' },
              { key: 'in_progress', data: 4, color: '#e7eeff' },
              { key: 'open', data: 3, color: '#efe8fe' },
              { key: 'closed', data: 3, color: '#eef8e9' }
            ]
          },
          {
            key: 'low',
            color: '#fef4e4',
            data: [
              { key: 'new', data: 1, color: '#fffae6' },
              { key: 'in_progress', data: 2, color: '#e7eeff' },
              { key: 'open', data: 1, color: '#efe8fe' },
              { key: 'closed', data: 7, color: '#eef8e9' }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'cloud',
    color: '#e7eeff', // Blue for cloud category
    data: [
      {
        key: 'malicious',
        color: '#f08082',
        data: [
          {
            key: 'critical',
            color: '#f8a240',
            data: [
              { key: 'new', data: 8, color: '#fffae6' },
              { key: 'in_progress', data: 1, color: '#e7eeff' },
              { key: 'open', data: 2, color: '#efe8fe' },
              { key: 'closed', data: 2, color: '#eef8e9' }
            ]
          },
          {
            key: 'high',
            color: '#fbc27f',
            data: [
              { key: 'new', data: 4, color: '#fffae6' },
              { key: 'in_progress', data: 7, color: '#e7eeff' },
              { key: 'open', data: 1, color: '#efe8fe' },
              { key: 'closed', data: 1, color: '#eef8e9' }
            ]
          },
          {
            key: 'medium',
            color: '#fee1bf',
            data: [
              { key: 'new', data: 2, color: '#fffae6' },
              { key: 'in_progress', data: 3, color: '#e7eeff' },
              { key: 'open', data: 1, color: '#efe8fe' },
              { key: 'closed', data: 8, color: '#eef8e9' }
            ]
          },
          {
            key: 'low',
            color: '#fef4e4',
            data: [
              { key: 'new', data: 1, color: '#fffae6' },
              { key: 'in_progress', data: 2, color: '#e7eeff' },
              { key: 'open', data: 0, color: '#efe8fe' },
              { key: 'closed', data: 3, color: '#eef8e9' }
            ]
          }
        ]
      },
      {
        key: 'no_actions',
        color: '#f2f3f7',
        data: [
          {
            key: 'critical',
            color: '#f8a240',
            data: [
              { key: 'new', data: 1, color: '#fffae6' },
              { key: 'in_progress', data: 1, color: '#e7eeff' },
              { key: 'open', data: 0, color: '#efe8fe' },
              { key: 'closed', data: 2, color: '#eef8e9' }
            ]
          },
          {
            key: 'high',
            color: '#fbc27f',
            data: [
              { key: 'new', data: 2, color: '#fffae6' },
              { key: 'in_progress', data: 2, color: '#e7eeff' },
              { key: 'open', data: 2, color: '#efe8fe' },
              { key: 'closed', data: 6, color: '#eef8e9' }
            ]
          },
          {
            key: 'medium',
            color: '#fee1bf',
            data: [
              { key: 'new', data: 4, color: '#fffae6' },
              { key: 'in_progress', data: 5, color: '#e7eeff' },
              { key: 'open', data: 4, color: '#efe8fe' },
              { key: 'closed', data: 1, color: '#eef8e9' }
            ]
          },
          {
            key: 'low',
            color: '#fef4e4',
            data: [
              { key: 'new', data: 1, color: '#fffae6' },
              { key: 'in_progress', data: 8, color: '#e7eeff' },
              { key: 'open', data: 3, color: '#efe8fe' },
              { key: 'closed', data: 2, color: '#eef8e9' }
            ]
          }
        ]
      },
      {
        key: 'benign',
        color: '#ffffff',
        data: [
          {
            key: 'critical',
            color: '#f8a240',
            data: [
              { key: 'new', data: 0, color: '#fffae6' },
              { key: 'in_progress', data: 0, color: '#e7eeff' },
              { key: 'open', data: 0, color: '#efe8fe' },
              { key: 'closed', data: 1, color: '#eef8e9' }
            ]
          },
          {
            key: 'high',
            color: '#fbc27f',
            data: [
              { key: 'new', data: 1, color: '#fffae6' },
              { key: 'in_progress', data: 1, color: '#e7eeff' },
              { key: 'open', data: 0, color: '#efe8fe' },
              { key: 'closed', data: 3, color: '#eef8e9' }
            ]
          },
          {
            key: 'medium',
            color: '#fee1bf',
            data: [
              { key: 'new', data: 3, color: '#fffae6' },
              { key: 'in_progress', data: 4, color: '#e7eeff' },
              { key: 'open', data: 2, color: '#efe8fe' },
              { key: 'closed', data: 2, color: '#eef8e9' }
            ]
          },
          {
            key: 'low',
            color: '#fef4e4',
            data: [
              { key: 'new', data: 2, color: '#fffae6' },
              { key: 'in_progress', data: 1, color: '#e7eeff' },
              { key: 'open', data: 2, color: '#efe8fe' },
              { key: 'closed', data: 4, color: '#eef8e9' }
            ]
          }
        ]
      }
    ]
  }
];

export const SunburstTest: FC<Partial<SunburstTestProps>> = ({
  data = sampleSecurityData,
  id,
  padAngle,
  series = <SunburstSeries />,
  containerClassName,
  width,
  height,
  className,
  margins = 0
}) => {
  const newId = useId(id);

  const getData = useCallback(
    (radius: number) => {
      // Convert our hierarchical data structure to d3 hierarchy format
      const rootHierarchy = hierarchy<any>({ children: data }, (d) => {
        if (d.children) return d.children;
        if (d.data && Array.isArray(d.data)) return d.data;
        return null;
      })
        .sum((d) => {
          // For leaf nodes (threat level), return the actual count
          if (typeof d.data === 'number') return d.data;
          return 0;
        })
        .sort((a, b) => (b.value || 0) - (a.value || 0));

      const root = partition().size([2 * Math.PI, radius])(rootHierarchy);

      // Space between rings in pixels
      const ringSpacing = 25;
      const adjustNodes = (node) => {
        if (node.children) {
          node.children.forEach(adjustNodes);
        }

        // Calculate ring thickness and add spacing
        const originalThickness = node.y1 - node.y0;
        const adjustedY0 = node.y0 + (node.depth - 1) * ringSpacing;
        const adjustedY1 = adjustedY0 + originalThickness - ringSpacing;

        node.y0 = adjustedY0;
        node.y1 = adjustedY1;
      };

      adjustNodes(root);

      const nodes = [];
      const getAllNodes = (node) => {
        // Skip root node (depth 0) and categories (depth 1) - start from conclusion (depth 2)
        if (node.depth >= 2) {
          nodes.push(node);
        }
        for (let child of node?.children || []) {
          getAllNodes(child);
        }
      };

      getAllNodes(root);
      return nodes;
    },
    [data]
  );

  const renderChart = useCallback(
    ({ chartWidth, chartHeight, ...rest }: ChartContainerChildProps) => {
      const radius = Math.min(chartWidth, chartHeight) / 1.5;
      const root = getData(radius);

      return (
        <g>
          <CloneElement<SunburstSeriesProps>
            element={series}
            id={`${newId}-series`}
            data={root}
            radius={radius}
            padAngle={padAngle}
            label={null}
          />
          {/* Center title */}
          <g transform={'translate(0, 0)'}>
            <text
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={14}
              fontWeight="600"
              fill="white"
              dy={-8}
            >
              Total Malicious
            </text>
            <text
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={14}
              fontWeight="600"
              fill="gray"
              dy={8}
            >
              24 (13%)
            </text>
          </g>
        </g>
      );
    },
    [getData, newId, series, padAngle]
  );

  return (
    <ChartContainer
      id={newId}
      width={width}
      height={height}
      containerClassName={containerClassName}
      margins={margins}
      xAxisVisible={false}
      yAxisVisible={false}
      center={true}
      className={className}
    >
      {renderChart}
    </ChartContainer>
  );
};
