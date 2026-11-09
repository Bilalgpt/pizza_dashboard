"use client";

import { useEffect, useRef } from "react";

/**
 * Reusable WebGL 3D bar chart (echarts + echarts-gl).
 * Renders a matrix (yLabels rows × xLabels cols) as a field of 3D bars whose
 * height = value, tinted by a single-hue sequential ramp. Drag to rotate.
 *
 * echarts-gl touches `window`, so both libs are imported lazily inside the
 * effect (client-only) to stay SSR-safe in the Next app router.
 */
export default function Bar3D({
  xLabels,
  yLabels,
  matrix,
  max = 100,
  valueLabel = "value",
  ramp = ["#13402b", "#13593a", "#0f7a4a", "#17a85f", "#34d27e", "#5ef0a0"],
  height = 420,
}) {
  const ref = useRef(null);

  useEffect(() => {
    let chart;
    let disposed = false;

    (async () => {
      const echarts = await import("echarts");
      await import("echarts-gl");
      if (disposed || !ref.current) return;

      chart = echarts.init(ref.current, null, { renderer: "canvas" });

      // matrix[y][x] -> [xIndex, yIndex, value]
      const data = [];
      matrix.forEach((row, y) =>
        row.forEach((v, x) => data.push([x, y, v]))
      );

      const axisCommon = {
        axisLine: { lineStyle: { color: "#3a4a42" } },
        axisLabel: { color: "#c3c2b7", fontSize: 11 },
        axisTick: { lineStyle: { color: "#3a4a42" } },
        splitLine: { lineStyle: { color: "#223029" } },
        nameTextStyle: { color: "#898781", fontSize: 11 },
      };

      chart.setOption({
        backgroundColor: "transparent",
        tooltip: {
          backgroundColor: "rgba(10,15,13,0.95)",
          borderColor: "rgba(255,255,255,0.1)",
          textStyle: { color: "#fff", fontSize: 12 },
          formatter: (p) => {
            const [x, y, v] = p.value;
            return `<b>${yLabels[y]}</b> · ${xLabels[x]}<br/>${valueLabel}: <b>${v}</b>`;
          },
        },
        visualMap: {
          show: true,
          min: 0,
          max,
          dimension: 2,
          inRange: { color: ramp },
          textStyle: { color: "#898781", fontSize: 10 },
          right: 8,
          top: "center",
          itemWidth: 10,
          itemHeight: 120,
        },
        xAxis3D: { type: "category", data: xLabels, ...axisCommon },
        yAxis3D: { type: "category", data: yLabels, ...axisCommon },
        zAxis3D: { type: "value", max, ...axisCommon },
        grid3D: {
          boxWidth: 100,
          boxDepth: Math.max(50, yLabels.length * 11),
          boxHeight: 60,
          environment: "transparent",
          light: {
            main: { intensity: 1.15, shadow: true, alpha: 40, beta: 30 },
            ambient: { intensity: 0.35 },
          },
          viewControl: {
            projection: "perspective",
            autoRotate: false,
            distance: 210,
            alpha: 22,
            beta: 35,
            rotateSensitivity: 1.2,
            zoomSensitivity: 0.6,
            damping: 0.8,
          },
        },
        series: [
          {
            type: "bar3D",
            data,
            shading: "lambert",
            bevelSize: 0.25,
            bevelSmoothness: 2,
            barSize: 7,
            minHeight: 0.4,
            itemStyle: { opacity: 0.96 },
            emphasis: {
              label: { show: false },
              itemStyle: { color: "#ffffff" },
            },
            // grow the bars up from the floor on load
            animation: true,
            animationDurationUpdate: 1200,
          },
        ],
        // bar grow-in on first render
        animationDuration: 1400,
        animationEasing: "cubicOut",
      });
    })();

    const onResize = () => chart && chart.resize();
    window.addEventListener("resize", onResize);
    return () => {
      disposed = true;
      window.removeEventListener("resize", onResize);
      chart && chart.dispose();
    };
  }, [xLabels, yLabels, matrix, max, valueLabel, ramp, height]);

  return (
    <div className="relative">
      <div ref={ref} style={{ height, width: "100%" }} />
      <div className="pointer-events-none absolute left-3 bottom-2 text-[10px] text-ink-muted">
        drag to rotate · scroll to zoom
      </div>
    </div>
  );
}
