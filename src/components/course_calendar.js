"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthIndexes = { jan:0,january:0,feb:1,february:1,mar:2,march:2,apr:3,april:3,may:4,jun:5,june:5,jul:6,july:6,aug:7,august:7,sep:8,sept:8,september:8,oct:9,october:9,nov:10,november:10,dec:11,december:11 };

function parseDate(value, month, year) {
  const monthMatch = String(value || "").match(/^([A-Za-z]+)\.?\s+(\d{1,2})/);
  const dayMatch = String(value || "").match(/^(\d{1,2})/);
  const monthIndex = monthMatch ? monthIndexes[monthMatch[1].toLowerCase()] : monthIndexes[String(month).toLowerCase()];
  const day = monthMatch ? Number(monthMatch[2]) : dayMatch ? Number(dayMatch[1]) : null;
  return Number.isInteger(monthIndex) && day && Number(year) ? new Date(Number(year), monthIndex, day) : null;
}

function keyFor(date) { return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`; }

function buildRows(month) {
  const monthIndex = monthIndexes[String(month.month).toLowerCase()];
  const year = Number(month.year);
  if (!Number.isInteger(monthIndex) || !year) return [];
  const first = new Date(year, monthIndex, 1);
  const last = new Date(year, monthIndex + 1, 0);
  const cursor = new Date(first);
  cursor.setDate(first.getDate() - first.getDay());
  const end = new Date(last);
  end.setDate(last.getDate() + 6 - last.getDay());
  const collect = (items, field) => {
    const map = new Map();
    (items || []).forEach((item) => {
      const date = parseDate(item[field], month.month, month.year);
      if (date) map.set(keyFor(date), [...(map.get(keyFor(date)) || []), item]);
    });
    return map;
  };
  const notes = collect(month.notes, "date");
  const events = collect(month.days, "date");
  const weeks = (month.weeks || []).map((week) => ({ ...week, startDate: parseDate(week.date, month.month, month.year) }));
  const rows = [];
  while (cursor <= end) {
    const start = new Date(cursor);
    const days = Array.from({ length: 7 }, () => {
      const date = new Date(cursor);
      cursor.setDate(cursor.getDate() + 1);
      return { date, current: date.getMonth() === monthIndex, notes: notes.get(keyFor(date)) || [], events: events.get(keyFor(date)) || [] };
    });
    const finish = new Date(start); finish.setDate(start.getDate() + 6);
    const courseWeek = weeks.find((week) => week.startDate && week.startDate >= start && week.startDate <= finish);
    rows.push({ days, courseWeek });
  }
  return rows;
}

export default function CourseCalendar({ months, label = "Semester calendar" }) {
  const baseId = useId().replaceAll(":", "");
  const rootRef = useRef(null);
  const [open, setOpen] = useState(null);
  const [more, setMore] = useState(null);
  const monthRows = useMemo(() => months.map((month) => ({ month, rows: buildRows(month) })), [months]);

  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape") { setOpen(null); setMore(null); }
      if (event.type === "pointerdown" && !rootRef.current?.contains(event.target)) { setOpen(null); setMore(null); }
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", close);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", close); };
  }, []);

  return <div className="course-calendar-grid" ref={rootRef} aria-label={label}>
    {monthRows.map(({ month, rows }, monthIndex) => <article className="course-calendar-month" key={`${month.month}-${month.year}`}>
      <div className="course-calendar-month-header"><h3>{month.month}</h3><span>{month.year}</span></div>
      <div className="course-month-calendar" aria-label={`${month.month} ${month.year} calendar`}>
        <div className="course-calendar-weekday-row" aria-hidden="true">{weekdays.map((day) => <span key={day}>{day}</span>)}</div>
        {rows.map((row, rowIndex) => {
          const weekKey = `${monthIndex}-${rowIndex}-week`;
          const isWeekOpen = open === weekKey;
          return <div className={`course-calendar-row${row.courseWeek ? " has-course-week" : ""}${row.courseWeek?.blocked ? " is-blocked" : ""}${isWeekOpen ? " is-open" : ""}`} key={row.days[0].date.toISOString()}>
            {row.days.map((day, dayIndex) => <div className={`course-calendar-day${day.current ? "" : " is-muted"}`} key={day.date.toISOString()}>
              <span>{day.date.getDate()}</span>
              {[...day.notes.map((item) => ({ ...item, type:"note", title:item.title, body:item.description })), ...day.events.map((item) => ({ ...item, type:"event", title:item.label || item.topic, body:item.description }))].map((item, itemIndex) => {
                const itemKey = `${monthIndex}-${rowIndex}-${dayIndex}-${itemIndex}`;
                const panelId = `${baseId}-${itemKey}`;
                return <div className={`course-calendar-note${item.type === "event" ? " course-calendar-event" : ""}${open === itemKey ? " is-open" : ""}`} key={itemKey}>
                  <button className="course-calendar-note-trigger" type="button" aria-expanded={open === itemKey} aria-controls={panelId} onClick={() => setOpen(open === itemKey ? null : itemKey)}>{item.title}</button>
                  <div className="course-calendar-note-popover" id={panelId} role="region" aria-label={`${item.title} details`}>
                    {item.type === "event" ? <strong>{item.topic}</strong> : null}{item.body ? <p>{item.body}</p> : null}
                    {item.due?.length ? <ul>{item.due.map((due) => <li key={due}>{due}</li>)}</ul> : null}
                  </div>
                </div>;
              })}
            </div>)}
            {row.courseWeek ? <>
              <button className="course-calendar-week-hint" type="button" aria-expanded={isWeekOpen} aria-controls={`${baseId}-${weekKey}`} onClick={() => { setOpen(isWeekOpen ? null : weekKey); setMore(null); }}>
                <span>{/^\d+$/.test(String(row.courseWeek.week)) ? `Week ${row.courseWeek.week}` : row.courseWeek.week}</span><strong>Details</strong>
              </button>
              <div className="course-calendar-week-popover" id={`${baseId}-${weekKey}`} role="region" aria-label={`${row.courseWeek.week} details`}>
                <p>{row.courseWeek.topic}</p>
                {row.courseWeek.due?.length ? <><button className="course-calendar-more" type="button" aria-expanded={more === weekKey} onClick={() => setMore(more === weekKey ? null : weekKey)}>More</button>{more === weekKey ? <ul>{row.courseWeek.due.map((item) => <li key={item}>{item}</li>)}</ul> : null}</> : null}
              </div>
            </> : null}
          </div>;
        })}
      </div>
    </article>)}
  </div>;
}
