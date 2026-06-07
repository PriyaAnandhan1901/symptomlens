import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function SeverityChart({ symptoms }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!symptoms || symptoms.length === 0) return;

    const data = [...symptoms]
      .slice(0, 10)
      .reverse()
      .map((s) => ({
        name: s.symptom_name,
        severity: s.severity,
      }));

    const width = 500;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 50, left: 40 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", "100%").attr("viewBox", `0 0 ${width} ${height}`);

    const x = d3
      .scaleBand()
      .domain(data.map((_, i) => i))
      .range([margin.left, width - margin.right])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, 10])
      .range([height - margin.bottom, margin.top]);

    const getColor = (val) => {
      if (val <= 3) return "#4CAF50";
      if (val <= 6) return "#FF9800";
      return "#F44336";
    };

    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (_, i) => x(i))
      .attr("y", (d) => y(d.severity))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - margin.bottom - y(d.severity))
      .attr("fill", (d) => getColor(d.severity))
      .attr("rx", 6);

    svg
      .selectAll("text.name")
      .data(data)
      .join("text")
      .attr("class", "name")
      .attr("x", (_, i) => x(i) + x.bandwidth() / 2)
      .attr("y", height - margin.bottom + 18)
      .attr("text-anchor", "middle")
      .attr("font-size", "11px")
      .attr("fill", "#555")
      .text((d) => d.name.slice(0, 8));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5));

  }, [symptoms]);

  return (
    <div style={{ background:"white", padding:"24px", borderRadius:"16px", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", marginBottom:"24px" }}>
      <h3 style={{ margin:"0 0 16px", color:"#333" }}>Severity Chart 📊</h3>
      {!symptoms || symptoms.length === 0 ? (
        <p style={{ color:"#aaa", textAlign:"center" }}>Log symptoms to see your chart</p>
      ) : (
        <svg ref={svgRef}></svg>
      )}
      <div style={{ display:"flex", gap:"16px", marginTop:"12px", justifyContent:"center" }}>
        <span style={{ fontSize:"12px", color:"#4CAF50" }}>● Mild (1-3)</span>
        <span style={{ fontSize:"12px", color:"#FF9800" }}>● Moderate (4-6)</span>
        <span style={{ fontSize:"12px", color:"#F44336" }}>● Severe (7-10)</span>
      </div>
    </div>
  );
}