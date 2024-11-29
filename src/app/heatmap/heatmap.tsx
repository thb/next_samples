"use client"

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  district: string;
  count: number;
}

const Heatmap: React.FC = () => {
  const d3Container = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // Fake data representing the number of textile companies per district
    const data: DataPoint[] = [
      { district: 'Centrum', count: 20 },
      { district: 'Noord', count: 15 },
      { district: 'Zuid', count: 25 },
      // Add more data points as needed
    ];

    // Simplified GeoJSON data for Rotterdam districts
    const rotterdamGeoJSON = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { district: 'Centrum' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [4.470, 51.920],
                [4.480, 51.920],
                [4.480, 51.930],
                [4.470, 51.930],
                [4.470, 51.920],
              ],
            ],
          },
        },
        {
          type: 'Feature',
          properties: { district: 'Noord' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [4.480, 51.920],
                [4.490, 51.920],
                [4.490, 51.930],
                [4.480, 51.930],
                [4.480, 51.920],
              ],
            ],
          },
        },
        {
          type: 'Feature',
          properties: { district: 'Zuid' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [4.470, 51.910],
                [4.480, 51.910],
                [4.480, 51.920],
                [4.470, 51.920],
                [4.470, 51.910],
              ],
            ],
          },
        },
        // Add more features as needed
      ],
    };

    // Dimensions and margins
    const width = 600;
    const height = 600;

    if (d3Container.current) {
      // Remove any existing SVG (to handle hot reloading)
      d3.select(d3Container.current).selectAll('*').remove();

      const svg = d3
        .select(d3Container.current)
        .attr('width', width)
        .attr('height', height);

      // Define a projection
      const projection = d3
        .geoMercator()
        .center([4.480, 51.920]) // Longitude, Latitude of Rotterdam center
        .scale(50000) // Adjust the scale for zoom
        .translate([width / 2, height / 2]);

      const path = d3.geoPath().projection(projection);

      // Merge data and GeoJSON
      const dataMap = new Map(data.map((d) => [d.district, d.count]));

      // Create a color scale
      const maxCount = d3.max(data, (d) => d.count) || 0;
      const colorScale = d3
        .scaleSequential<number, string>(d3.interpolateYlOrRd)
        .domain([0, maxCount]);

      // Draw the map
      svg
        .selectAll('path')
        .data(rotterdamGeoJSON.features)
        .enter()
        .append('path')
        .attr('d', path as any)
        .attr('fill', (d: any) => {
          // Get the count for the district
          const count = dataMap.get(d.properties.district) || 0;
          return colorScale(count);
        })
        .attr('stroke', '#000')
        .attr('stroke-width', 0.5)
        .on('mouseover', function (event, d: any) {
          const count = dataMap.get(d.properties.district) || 0;
          const [x, y] = path.centroid(d);

          // Show tooltip
          d3.select('#tooltip')
            .style('left', `${x}px`)
            .style('top', `${y}px`)
            .style('opacity', 0.9)
            .html(
              `<strong>District:</strong> ${d.properties.district}<br>
               <strong>Count:</strong> ${count}`
            );

          d3.select(this).attr('stroke-width', 2);
        })
        .on('mouseout', function () {
          // Hide tooltip
          d3.select('#tooltip').style('opacity', 0);
          d3.select(this).attr('stroke-width', 0.5);
        });
    }
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <svg ref={d3Container}></svg>
      <div
        id="tooltip"
        style={{
          position: 'absolute',
          textAlign: 'center',
          padding: '6px',
          fontSize: '12px',
          background: '#fff',
          border: '1px solid #ccc',
          pointerEvents: 'none',
          opacity: 0,
        }}
      ></div>
    </div>
  );
};

export default Heatmap;
