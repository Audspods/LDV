import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SingleLineChart({ data, xKey, yKey, lineColor, title, description }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow mb-4">
      <h2 className="text-brandRed font-bold mb-1">{title}</h2>
      {description && <p className="text-gray-300 text-sm mb-2">{description}</p>}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey={xKey} stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f1f1f", borderRadius: "8px", border: "none" }}
            labelStyle={{ color: "white", fontWeight: "bold" }}
            itemStyle={{ fontWeight: "bold", color: lineColor }}
          />
          <Line
            type="monotone"
            dataKey={yKey}
            stroke={lineColor}
            dot={false} // hide dots normally
            activeDot={(props) => {
              const { cx, cy, value } = props;
              return (
                <>
                  <circle cx={cx} cy={cy} r={6} stroke={lineColor} strokeWidth={2} fill="#ffffff" />
                  <text
                    x={cx}
                    y={cy - 10}
                    fill="white"
                    fontSize={12}
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {value}
                  </text>
                </>
              );
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
