import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import ChartCard from "../components/ChartCard";
import tiktokData from "../data/tiktok.csv";

export default function TikTokChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(tiktokData)
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, { header: true, dynamicTyping: true });
        setData(parsed.data);
      });
  }, []);

  return (
    <ChartCard title="TikTok Performance">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="views" stroke="#c1121f" />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
