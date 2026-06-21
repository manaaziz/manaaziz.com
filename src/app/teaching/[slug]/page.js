import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourse } from "../courses";
import CourseAssessmentChart from "./CourseAssessmentChart";

const materialKindOrder = {
  Syllabus: 0,
  Assignment: 1,
  Assignments: 1,
  Project: 2,
  Activity: 3,
  Writing: 4,
  Experiences: 5,
  Slides: 6,
  Videos: 7,
  Code: 8,
  Data: 9
};

const defaultGradingScale = [
  { grade: "A", range: "93% and above" },
  { grade: "A-", range: "90% to 92.9%" },
  { grade: "B+", range: "87% to 89.9%" },
  { grade: "B", range: "83% to 86.9%" },
  { grade: "B-", range: "80% to 82.9%" },
  { grade: "C+", range: "77% to 79.9%" },
  { grade: "C", range: "73% to 76.9%" },
  { grade: "C-", range: "70% to 72.9%" },
  { grade: "D", range: "60% to 69.9%" },
  { grade: "F", range: "Below 60%" }
];

const calendarWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthIndexes = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11
};

function parseNumericValue(value) {
  if (!value) return null;
  const parsed = Number.parseFloat(String(value).replace("%", ""));
  return Number.isFinite(parsed) ? parsed : null;
}

function roundWeightsToTotal(weights, decimals = 1) {
  const multiplier = 10 ** decimals;
  const rounded = weights.map((weight) => Math.floor(weight * multiplier) / multiplier);
  let remainder = Math.round((100 - rounded.reduce((sum, weight) => sum + weight, 0)) * multiplier);
  const order = weights
    .map((weight, index) => ({ index, fraction: weight * multiplier - Math.floor(weight * multiplier) }))
    .sort((first, second) => second.fraction - first.fraction);

  for (let index = 0; index < Math.abs(remainder); index += 1) {
    const target = order[index % order.length]?.index ?? 0;
    rounded[target] += Math.sign(remainder) / multiplier;
  }

  return rounded;
}

function buildAssessmentItems(components) {
  const pointValues = components.map((item) => parseNumericValue(item.points));
  const canUsePoints = pointValues.length > 0 && pointValues.every((value) => value !== null);
  const rawWeights = canUsePoints
    ? pointValues.map((points) => (points / pointValues.reduce((sum, value) => sum + value, 0)) * 100)
    : components.map((item) => parseNumericValue(item.percent) ?? 0);
  const weights = roundWeightsToTotal(rawWeights);

  return components.map((item, index) => ({
    ...item,
    weight: weights[index],
    weightLabel: `${weights[index].toFixed(1).replace(".0", "")}%`
  }));
}

function sortCourseMaterials(materials) {
  return [...materials].sort((first, second) => {
    const firstOrder = materialKindOrder[first.kind] ?? 99;
    const secondOrder = materialKindOrder[second.kind] ?? 99;

    if (firstOrder !== secondOrder) {
      return firstOrder - secondOrder;
    }

    return first.title.localeCompare(second.title);
  });
}

function isSiteResource(href) {
  return typeof href === "string" && href.startsWith("/");
}

function materialHasSiteResource(material) {
  return isSiteResource(material.href) || material.links?.some((link) => isSiteResource(link.href));
}

function materialWithSiteLinks(material) {
  if (!material.links?.length) {
    return material;
  }

  return {
    ...material,
    links: material.links.filter((link) => isSiteResource(link.href))
  };
}

function parseCalendarDate(dateText, fallbackMonth, fallbackYear) {
  if (!dateText) return null;
  const fallbackMonthIndex = monthIndexes[String(fallbackMonth).toLowerCase()];
  const monthMatch = String(dateText).match(/^([A-Za-z]+)\.?\s+(\d{1,2})/);
  const dayOnlyMatch = String(dateText).match(/^(\d{1,2})/);
  const monthIndex = monthMatch ? monthIndexes[monthMatch[1].toLowerCase()] : fallbackMonthIndex;
  const day = monthMatch ? Number(monthMatch[2]) : dayOnlyMatch ? Number(dayOnlyMatch[1]) : null;
  const year = Number(fallbackYear);

  if (!Number.isInteger(monthIndex) || !day || !year) {
    return null;
  }

  return new Date(year, monthIndex, day);
}

function dateKey(date) {
  return [date.getFullYear(), date.getMonth(), date.getDate()].join("-");
}

function buildMonthCalendar(month) {
  const monthIndex = monthIndexes[String(month.month).toLowerCase()];
  const year = Number(month.year);

  if (!Number.isInteger(monthIndex) || !year) {
    return [];
  }

  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  const cursor = new Date(firstDay);
  cursor.setDate(firstDay.getDate() - firstDay.getDay());
  const end = new Date(lastDay);
  end.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

  const notesByDate = new Map();
  (month.notes || []).forEach((note) => {
    const noteDate = parseCalendarDate(note.date, month.month, month.year);
    if (!noteDate) return;
    const key = dateKey(noteDate);
    notesByDate.set(key, [...(notesByDate.get(key) || []), note]);
  });

  const weeks = (month.weeks || []).map((week) => ({
    ...week,
    startDate: parseCalendarDate(week.date, month.month, month.year)
  }));

  const rows = [];
  while (cursor <= end) {
    const rowStart = new Date(cursor);
    const days = [];

    for (let index = 0; index < 7; index += 1) {
      const current = new Date(cursor);
      days.push({
        date: current,
        isCurrentMonth: current.getMonth() === monthIndex,
        notes: notesByDate.get(dateKey(current)) || []
      });
      cursor.setDate(cursor.getDate() + 1);
    }

    const rowEnd = new Date(rowStart);
    rowEnd.setDate(rowStart.getDate() + 6);
    const courseWeek = weeks.find((week) => week.startDate && week.startDate >= rowStart && week.startDate <= rowEnd);
    rows.push({ days, courseWeek });
  }

  return rows;
}

function MaterialCard({ material }) {
  return (
    <article>
      {material.kind ? <span>{material.kind}</span> : null}
      <h3>{material.title}</h3>
      <p>{material.description}</p>
      {material.href ? (
        <Link className="button button-small" href={material.href}>
          Open resource
        </Link>
      ) : null}
      {material.links?.length ? (
        <div className="course-resource-links">
          {material.links.map((link) => (
            <Link className="button button-small" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    return {
      title: "Teaching"
    };
  }

  return {
    title: course.shortTitle
  };
}

export default async function CoursePage({ params }) {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    notFound();
  }

  const objectives = course.syllabus?.objectives || course.outcomes || [];
  const gradingComponents = course.syllabus?.assessments || course.gradingComponents || [];
  const assessmentItems = buildAssessmentItems(gradingComponents);
  const weeklySchedule = course.syllabus?.schedule || course.schedule || [];
  const semesterCalendar = course.syllabus?.calendar || course.calendar || [];
  const orderedMaterials = sortCourseMaterials((course.materials || []).filter(materialHasSiteResource)).map(materialWithSiteLinks);
  const photoSlots = course.photos?.length
    ? course.photos
    : [
        { label: "Class photo", note: "Add a classroom or group image" },
        { label: "Activity", note: "Add a tasting, lab, or field moment" },
        { label: "Student work", note: "Add presentations, travel, or project photos" }
      ];

  return (
    <main className="page-shell course-page">
      <Link className="button course-back-button" href="/teaching">
        Back to teaching
      </Link>

      <section className="course-home-hero">
        <p className="eyebrow">{course.university} course home</p>
        <h1>{course.title}</h1>
        <p className="lede">{course.summary}</p>
      </section>

      <section className="course-photo-highlight" aria-labelledby="course-photo-highlight-title">
        <div className="section-intro">
          <p className="eyebrow">Class moments</p>
          <h2 id="course-photo-highlight-title">Photos and highlights</h2>
        </div>
        <div className="course-photo-grid">
          {photoSlots.map((photo) => (
            <figure className="course-photo-slot" key={photo.label}>
              {photo.src ? <img src={photo.src} alt={photo.alt || ""} loading="lazy" decoding="async" /> : null}
              <figcaption>
                <span>{photo.label}</span>
                <p>{photo.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="course-description-section" aria-labelledby="course-description-title">
        <div className="section-intro">
          <p className="eyebrow">Description</p>
          <h2 id="course-description-title">Course description</h2>
        </div>
        <div className="course-description-card">
          {course.catalogIntro ? <p>{course.catalogIntro}</p> : null}
          <p>{course.description}</p>
          <div className="course-hero-actions">
            {course.catalogHref ? (
              <a className="button" href={course.catalogHref} rel="noreferrer" target="_blank">
                UNLV course catalog
              </a>
            ) : null}
            {course.syllabus ? (
              <Link className="button" href={`/teaching/${course.slug}/syllabus`}>
                Read web syllabus
              </Link>
            ) : null}
            {course.materials.find((material) => material.kind === "Syllabus" && material.href) ? (
              <Link
                className="button"
                href={course.materials.find((material) => material.kind === "Syllabus" && material.href).href}
              >
                Download syllabus
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {objectives.length ? (
        <section className="course-outcomes" aria-labelledby="course-outcomes-title">
          <div className="section-intro">
            <p className="eyebrow">Objectives</p>
            <h2 id="course-outcomes-title">Learning objectives</h2>
          </div>

          <div className="course-outcome-grid">
            {objectives.slice(0, 8).map((outcome, index) => (
              <article key={outcome}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{outcome}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="course-grading-section" aria-labelledby="course-grading-title">
        <div className="section-intro">
          <p className="eyebrow">Assessment</p>
          <h2 id="course-grading-title">Assignments, grading, and scale</h2>
        </div>
        <div className="course-grading-grid">
          <div className="course-assessment-panel" aria-label="Assignments and grading weights">
            <CourseAssessmentChart items={assessmentItems} />
          </div>

          <div className="course-scale-panel" aria-label="Grading scale">
            {defaultGradingScale.map((item, index) => (
              <div className="course-scale-pill" key={item.grade} style={{ "--ladder-step": index }}>
                <strong>{item.grade}</strong>
                <span>{item.range}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {weeklySchedule.length ? (
        <section className="course-schedule-section" aria-labelledby="course-schedule-title">
          <div className="section-intro">
            <p className="eyebrow">Schedule</p>
            <h2 id="course-schedule-title">{semesterCalendar.length ? "Semester calendar" : "Weekly schedule"}</h2>
          </div>
          {semesterCalendar.length ? (
            <div className="course-calendar-grid" aria-label="Semester calendar with weekly topics and university dates">
              {semesterCalendar.map((month) => (
                <article className="course-calendar-month" key={`${month.month}-${month.year}`}>
                  <div className="course-calendar-month-header">
                    <h3>{month.month}</h3>
                    <span>{month.year}</span>
                  </div>
                  <div className="course-month-calendar" aria-label={`${month.month} ${month.year} calendar`}>
                    <div className="course-calendar-weekday-row" aria-hidden="true">
                      {calendarWeekdays.map((day) => (
                        <span key={day}>{day}</span>
                      ))}
                    </div>
                    {buildMonthCalendar(month).map((row) => (
                      <div
                        aria-label={
                          row.courseWeek
                            ? `${/^\d+$/.test(String(row.courseWeek.week)) ? `Week ${row.courseWeek.week}` : row.courseWeek.week}: ${row.courseWeek.topic}`
                            : undefined
                        }
                        className={`course-calendar-row${row.courseWeek ? " has-course-week" : ""}${row.courseWeek?.blocked ? " is-blocked" : ""}`}
                        key={`${month.month}-${row.days[0].date.toISOString()}`}
                        tabIndex={row.courseWeek ? 0 : undefined}
                      >
                        {row.days.map((day) => (
                          <div
                            className={`course-calendar-day${day.isCurrentMonth ? "" : " is-muted"}`}
                            key={day.date.toISOString()}
                          >
                            <span>{day.date.getDate()}</span>
                            {day.notes.map((note) => (
                              <details className="course-calendar-note" key={`${note.date}-${note.title}`}>
                                <summary>{note.title}</summary>
                                <p>{note.description}</p>
                              </details>
                            ))}
                          </div>
                        ))}
                        {row.courseWeek ? (
                          <div className="course-calendar-week-popover" aria-hidden="true">
                            <div>
                              <span>{row.courseWeek.date}</span>
                              <strong>
                                {/^\d+$/.test(String(row.courseWeek.week)) ? `Week ${row.courseWeek.week}` : row.courseWeek.week}
                              </strong>
                            </div>
                            <p>{row.courseWeek.topic}</p>
                            {row.courseWeek.due?.length ? (
                              <ul>
                                {row.courseWeek.due.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="syllabus-table weekly" role="table" aria-label="Weekly course schedule">
              <div role="row">
                <strong role="columnheader">Week</strong>
                <strong role="columnheader">Topic</strong>
              </div>
              {weeklySchedule.map((week) => (
                <div role="row" key={`${week.week}-${week.topic}`}>
                  <span role="cell">{week.week}</span>
                  <span role="cell">{week.topic}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : null}

      <section className="course-materials course-home-materials" aria-labelledby="course-materials-title">
        <div className="section-intro">
          <p className="eyebrow">Materials</p>
          <h2 id="course-materials-title">Course materials, assignments, and links</h2>
        </div>

        <div className="course-material-list">
          {orderedMaterials.map((material) => (
            <MaterialCard key={material.title} material={material} />
          ))}
        </div>
      </section>
    </main>
  );
}
