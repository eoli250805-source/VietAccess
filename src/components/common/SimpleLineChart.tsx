import React, { useState } from 'react';
import { PerformancePoint } from '../../types';

interface SimpleLineChartProps {
  data: PerformancePoint[];
  height?: number;
  showComparison?: boolean;
  color?: string;
  unitLabel?: string;
}

export const SimpleLineChart: React.FC<SimpleLineChartProps> = ({
  data,
  height = 180,
  showComparison = false,
  color = '#10B981', // emerald-500
  unitLabel = '$'
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<PerformancePoint | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const getPrice = (d: PerformancePoint) => d.price ?? d.priceVND ?? 0;
  const getUnderlying = (d: PerformancePoint) => d.underlyingPrice ?? d.navVND ?? d.priceVND ?? 0;

  const prices = data.map(getPrice);
  const minPrice = Math.min(...prices) * 0.98;
  const maxPrice = Math.max(...prices) * 1.02;
  const priceRange = maxPrice - minPrice || 1;

  const width = 600;
  const paddingX = 25;
  const paddingY = 20;

  const getCoordinates = (index: number, val: number) => {
    const x = paddingX + (index / Math.max(1, data.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((val - minPrice) / priceRange) * (height - paddingY * 2);
    return { x, y };
  };

  const points = data.map((d, i) => getCoordinates(i, getPrice(d)));
  const pathD = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  // Comparison path for underlying asset if requested
  let comparisonPathD = '';
  if (showComparison) {
    const compPoints = data.map((d, i) => getCoordinates(i, getUnderlying(d)));
    comparisonPathD = compPoints.reduce((acc, curr, idx) => {
      return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
    }, '');
  }

  const formatPriceDisplay = (val: number) => {
    if (val >= 1000) {
      return `₫${val.toLocaleString()}`;
    }
    return `${unitLabel}${val.toFixed(2)}`;
  };

  const latestPoint = data[data.length - 1];

  return (
    <div className="relative w-full select-none">
      {/* Top Header / Legend / Active Value */}
      <div className="flex items-center justify-between text-xs mb-1.5 px-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-emerald-400 rounded-full"></span>
            <span className="text-slate-300 font-medium text-[11px]">Exposure Unit Price</span>
          </div>
          {showComparison && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-slate-400 border-b border-dashed border-slate-300"></span>
              <span className="text-slate-400 text-[11px]">Underlying Reference</span>
            </div>
          )}
        </div>
        <div className="text-[11px] font-mono">
          {hoveredPoint ? (
            <span className="text-emerald-300 font-semibold">
              {hoveredPoint.date}: {formatPriceDisplay(getPrice(hoveredPoint))}
              {showComparison && ` (Ref: ${formatPriceDisplay(getUnderlying(hoveredPoint))})`}
            </span>
          ) : (
            <span className="text-slate-400">
              Latest: {formatPriceDisplay(getPrice(latestPoint))}
            </span>
          )}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="w-full overflow-hidden rounded-lg bg-slate-950/40 border border-slate-800/80 p-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible cursor-crosshair"
          onMouseLeave={() => {
            setHoveredPoint(null);
            setHoverIndex(null);
          }}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.28" />
              <stop offset="100%" stopColor={color} stopOpacity="0.00" />
            </linearGradient>
            <linearGradient id="gridLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#334155" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#334155" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#334155" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((fraction, i) => {
            const y = paddingY + fraction * (height - paddingY * 2);
            return (
              <line
                key={i}
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="#1E293B"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            );
          })}

          {/* Shaded Area */}
          <path d={areaD} fill="url(#areaGradient)" />

          {/* Underlying Reference line (if comparison) */}
          {showComparison && (
            <path
              d={comparisonPathD}
              fill="none"
              stroke="#64748B"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              strokeOpacity="0.7"
            />
          )}

          {/* Main Unit Line */}
          <path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Hover Crosshair & Data points */}
          {hoverIndex !== null && points[hoverIndex] && (
            <>
              <line
                x1={points[hoverIndex].x}
                y1={paddingY}
                x2={points[hoverIndex].x}
                y2={height - paddingY}
                stroke="#94A3B8"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle
                cx={points[hoverIndex].x}
                cy={points[hoverIndex].y}
                r="4.5"
                fill="#10B981"
                stroke="#0F172A"
                strokeWidth="2"
              />
            </>
          )}

          {/* Interactive touch/hover zones */}
          {points.map((pt, i) => (
            <rect
              key={i}
              x={pt.x - width / (data.length * 2)}
              y={0}
              width={width / data.length}
              height={height}
              fill="transparent"
              onMouseEnter={() => {
                setHoveredPoint(data[i]);
                setHoverIndex(i);
              }}
            />
          ))}
        </svg>

        {/* Date Labels bottom */}
        <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono mt-1 px-1">
          <span>{data[0].date}</span>
          <span>{data[Math.floor(data.length / 2)].date}</span>
          <span>{data[data.length - 1].date}</span>
        </div>
      </div>
    </div>
  );
};
