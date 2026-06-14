export const courses = [
  {
    slug: "hospitality-statistics",
    label: "UNLV Hospitality",
    title: "HOA 730 and HOA 732: Statistical Analysis for Hospitality",
    shortTitle: "Hospitality statistics",
    summary:
      "Graduate hospitality statistics taught across online, hybrid, and in-person formats with a strong emphasis on applied R workflows.",
    description:
      "This course sequence helps hospitality students move from statistical concepts to practical analysis. Topics included R, RStudio, time series, regression, central limit theorem, t-tests, chi-square testing, random forest, and XGBoost.",
    materials: [
      "R and RStudio walkthroughs",
      "Applied regression and hypothesis testing examples",
      "Forecasting and machine learning class exercises"
    ]
  },
  {
    slug: "new-venture-creation",
    label: "UNLV Business",
    title: "MGT 709 and MGT 710: New Venture Feasibility and Creation",
    shortTitle: "New venture creation",
    summary:
      "Graduate entrepreneurship courses focused on feasibility, business model development, and moving ideas toward execution.",
    description:
      "I supported course design, Canvas organization, syllabi, schedules, assignments, and student-facing materials for graduate entrepreneurship students.",
    materials: [
      "Feasibility analysis materials",
      "Business model and market validation assignments",
      "Canvas modules, course schedules, and student support resources"
    ]
  },
  {
    slug: "guest-lectures-and-tutoring",
    label: "Applied teaching",
    title: "Guest Lectures, Tutoring, and Multilingual Classroom Work",
    shortTitle: "Applied teaching",
    summary:
      "Guest lectures and student support across hospitality analytics, data science, casino games, beverage management, math, and statistics.",
    description:
      "My applied teaching work includes guest lectures, private tutoring, student mentorship, and substitute teaching in Barcelona in English and Spanish.",
    materials: [
      "Hospitality analytics and data science lectures",
      "Statistics and mathematics tutoring resources",
      "Student success and professional-development sessions"
    ]
  }
];

export function getCourse(slug) {
  return courses.find((course) => course.slug === slug);
}
