import { scaleLinear, scaleBand } from "d3";
import { data } from "./data";

const Bar_padding = 0.4;
/*type BarplotProps= {
    width:number;
    height:number; 
    data: {name:string, count:number}[];
};*/

export const Barplot = ({ width, height, data }) => {
  const groups = data.map((d) => d.name).reverse();
  const yScale = scaleBand()
    .domain(groups)
    .range([0, height])
    .paddingInner(Bar_padding)
    .paddingOuter(0.1);

  const xScale = scaleLinear().domain([0, 55]).range([0, width]);

  const allrects = data.map((d, i) => {
    const y = yScale(d.name);
    if (y === undefined) {
      return null;
    }

    return (
      <g key={i}>
        <rect
          x={0}
          y={yScale(d.name)}
          width={xScale(d.count)}
          height={yScale.bandwidth()}
          opacity={1}
          fill="#076fa2"
          stroke="#076fa2"
        />
        {d.count > 7 ? (
          <text
            x={xScale(0) + 9}
            y={y + yScale.bandwidth() / 2}
            textAnchor="start"
            alignmentBaseline="central"
            fontSize={12}
            fontFamily="sans-serif"
            fill="white"
          >
            {d.name}
          </text>
        ) : (
          <text
            x={xScale(d.count) + 8}
            y={y + yScale.bandwidth() / 2}
            textAnchor="start"
            alignmentBaseline="central"
            fontSize={12}
            fontFamily="sans-serif"
            fill="#076fa2"
          >
            {d.name}
          </text>
        )}
      </g>
    );
  });

  const grid = xScale
    .ticks(10)
    .slice(1)
    .map((split, i) => (
      <g key={i}>
        <line
          x1={xScale(split)}
          x2={xScale(split)}
          y1={height}
          y2={0}
          strokeWidth={0.5}
          stroke="#b4b4b4"
        />
        <text
          x={xScale(split)}
          y={-10}
          fontSize={10}
          fill="#b4b4b4"
          fontFamily="sans-serif"
        >
          {split}
        </text>
      </g>
    ));
  return (
    <div
      style={{
        background: "white",
        padding: "24px 0",
        maxWidth: 680,
      }}
    >
      <div style={{ position: "relative", height: 6, marginBottom: 6 }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "#e63030",
            transform: "translateY(-50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 32,
            height: 6,
            background: "#e63030",
          }}
        />
      </div>
      <div>
        <h1 style={{ fontFamily: "sans-serif", fontSize: 15 }}>
          Escape artists
        </h1>
        <h2
          style={{
            fontFamily: "sans-serif",
            fontWeight: "lighter",
            fontSize: 12,
            marginTop: 3,
            marginBottom: 6,
          }}
        >
          Number of laboratory-acquired infections, 1970-2021
        </h2>
        <div style={{ paddingTop: 30 }}>
          <svg width={width} height={height} style={{ overflow: "visible" }}>
            {grid}
            {allrects}
            <g>
              <line
                x1={xScale(0)}
                x2={xScale(0)}
                y1={height}
                y2={0}
                strokeWidth={0.8}
                stroke="#000000"
              />
              <text
                x={xScale(0)}
                y={-10}
                fontSize={10}
                fill="#b4b4b4"
                fontFamily="sans-serif"
              >
                {0}
              </text>
            </g>
          </svg>
          <div>
            <h2
              style={{
                fontFamily: "sans-serif",
                fontWeight: "lighter",
                fontSize: 10,
                color: "#b4b4b4",
              }}
            >
              Sources: Laboratory-Acquired Infection Database; American
              Biological Safety Association
              <br />
              The Economist
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
