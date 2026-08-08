"use client";

import { useState } from "react";

const assessmentColors = ["#2f6f64", "#8a1538", "#171717", "#b6c7bd", "#70685f", "#d7c7ad"];

function getSlicePosition(items, activeIndex) {
  const active = items[activeIndex] || items[0];
  const activeStart = items.slice(0, activeIndex).reduce((total, slice) => total + slice.weight, 0);
  const activeMiddle = activeStart + active.weight / 2;
  const angle = ((activeMiddle / 100) * 360 - 90 + 360) % 360;

  if (angle >= 0 && angle < 90) return "top-right";
  if (angle >= 90 && angle < 180) return "bottom-right";
  if (angle >= 180 && angle < 270) return "bottom-left";
  return "top-left";
}

export default function CourseAssessmentChart({ items }) {
  const chartItems = items || [];
  const [activeTask, setActiveTask] = useState("");

  if (!chartItems.length) {
    return null;
  }

  const selected = chartItems.find((item) => item.task === activeTask) || null;
  const active = selected || chartItems[0];
  const activeIndex = Math.max(
    chartItems.findIndex((item) => item.task === active.task),
    0
  );
  const activePosition = getSlicePosition(chartItems, activeIndex);

  function resetAssessment() {
    setActiveTask("");
  }

  function handleChartBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      resetAssessment();
    }
  }

  function handleSliceKeyDown(event, task) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveTask(task);
    }
  }

  return (
    <div
      className="course-assessment-chart-card"
      aria-label="Interactive assignment weight pie chart"
      data-comparing={selected ? "true" : "false"}
      onBlur={handleChartBlur}
      onMouseLeave={resetAssessment}
    >
      <div className="course-assessment-pie-wrap">
        <svg
          className="course-assessment-pie"
          viewBox="0 0 42 42"
          role="img"
          aria-labelledby="course-assessment-pie-title"
        >
          <title id="course-assessment-pie-title">
            {chartItems.map((item) => `${item.task} ${item.weightLabel}`).join(", ")}
          </title>
          <circle className="course-assessment-pie-base" cx="21" cy="21" r="15.9155" />
          {chartItems.map((item, index) => {
            const offset = chartItems.slice(0, index).reduce((total, slice) => total + slice.weight, 0);

            return (
              <circle
                className="course-assessment-pie-slice"
                cx="21"
                cy="21"
                data-active={selected?.task === item.task ? "true" : "false"}
                key={item.task}
                onClick={() => setActiveTask(item.task)}
                onFocus={() => setActiveTask(item.task)}
                onKeyDown={(event) => handleSliceKeyDown(event, item.task)}
                onMouseEnter={() => setActiveTask(item.task)}
                r="15.9155"
                role="button"
                strokeDasharray={`${item.weight} ${100 - item.weight}`}
                strokeDashoffset={25 - offset}
                style={{ "--assessment-slice": assessmentColors[index % assessmentColors.length] }}
                tabIndex={0}
              />
            );
          })}
        </svg>
        <div className="course-assessment-pie-center" aria-hidden="true">
          <strong>{active.weightLabel}</strong>
          <span>{active.task}</span>
        </div>
      </div>

      {selected ? (
        <article className={`course-assessment-active-card ${activePosition}`} key={active.task} aria-live="polite">
          <span>{active.weightLabel}</span>
          <h3>{active.task}</h3>
          <p>{active.due || "Due date TBD"}</p>
        </article>
      ) : (
        <article className="course-assessment-active-card course-assessment-prompt">
          <span>Assessment mix</span>
          <h3>Tap a section of the chart</h3>
          <p>Choose a slice to see its weight and due date.</p>
        </article>
      )}
    </div>
  );
}
