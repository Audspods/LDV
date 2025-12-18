import { useState, useEffect } from "react";
import Papa from "papaparse";
import SingleLineChart from "../components/SingleLineChart";

export default function SpotifyPage() {
  const [audienceData, setAudienceData] = useState([]);
  const [singleDataList, setSingleDataList] = useState([]);

  // Load audience timeline
  useEffect(() => {
    fetch("/data/audience-timeline.csv")
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });
        setAudienceData(parsed.data);
      });
  }, []);

  // Load singles
  useEffect(() => {
    const singles = [
      { file: "CloneWars.csv", name: "Clone Wars" },
      { file: "Sweetface.csv", name: "Sweetface" },
      { file: "PunchingBag.csv", name: "Punching Bag" },
    ];

    Promise.all(
      singles.map(({ file, name }) =>
        fetch(`/data/${file}`)
          .then((res) => res.text())
          .then((csvText) => ({
            name,
            data: Papa.parse(csvText, {
              header: true,
              dynamicTyping: true,
              skipEmptyLines: true,
            }).data,
          }))
      )
    ).then(setSingleDataList);
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-brandRed text-4xl font-bold mb-6">
        Spotify / Apple Music
      </h1>

      {/* Audience Timeline */}
      <SingleLineChart
        data={audienceData}
        xKey="date"
        yKey="listeners"
        lineColor="#c1121f"
        title="Audience Timeline – Listeners Over Time"
      />

      {/* Singles */}
      {singleDataList.map((single, idx) => (
        <SingleLineChart
          key={single.name}
          data={single.data}
          xKey="date"
          yKey="streams"
          lineColor={["#c1121f", "#ff5733", "#33ff99"][idx % 3]}
          title={`${single.name} – Streams Over Time`}
        />
      ))}
    </div>
  );
}
