import { useState, useEffect } from "react";
import Papa from "papaparse";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from "recharts";

// Reusable Chart Card
function ChartCard({ title, children }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow h-full flex flex-col">
      <h2 className="text-brandRed font-bold mb-2">{title}</h2>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default function MainDashboard() {
  const [audienceData, setAudienceData] = useState([]);
  const [kpiData, setKpiData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load audience-timeline.csv
  useEffect(() => {
    fetch("/data/audience-timeline.csv")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
      })
      .then(csvText => {
        const parsed = Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true
        });
        console.log("Audience data:", parsed.data);
        setAudienceData(parsed.data);
      })
      .catch(err => console.error("Error loading audience CSV:", err));
  }, []);

  // Load streamingkpi.csv
  useEffect(() => {
    fetch("/data/streamingkpi.csv")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
      })
      .then(csvText => {
        const parsed = Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true
        });
        console.log("KPI data:", parsed.data);
        setKpiData(parsed.data);
      })
      .catch(err => console.error("Error loading KPI CSV:", err));
  }, []);

  // Determine if still loading
  useEffect(() => {
    if (audienceData.length > 0 && kpiData.length > 0) setLoading(false);
  }, [audienceData, kpiData]);

  if (loading) return <div className="p-4 text-white">Loading dashboard...</div>;

  return (
    <div className="p-4">
      <div className="p-8 text-white">
        <h1 className="text-brandRed text-4xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Listeners Over Time */}
          <ChartCard title="Listeners Over Time">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={audienceData}>
                <XAxis dataKey="listeners" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip />
                <Line type="monotone" dataKey="listeners" stroke="#c1121f" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Streams Over Time */}
          <ChartCard title="Streams Over Time">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={audienceData}>
                <XAxis dataKey="date" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip />
                <Line type="monotone" dataKey="streams" stroke="#ff5733" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Followers Over Time */}
          <ChartCard title="Followers Over Time">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={audienceData}>
                <XAxis dataKey="date" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip />
                <Line type="monotone" dataKey="followers" stroke="#33ff99" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Streaming KPI */}
          <ChartCard title="Weekly KPI">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={kpiData}>
                <XAxis dataKey="week" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f1f1f', borderRadius: '8px', border: 'none' }}
                  labelStyle={{ color: 'white', fontWeight: 'bold' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Legend />
                <Bar dataKey="this_week_to_date" fill="#c1121f" />
                <Bar dataKey="last_week_to_date" fill="#ff5733" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
