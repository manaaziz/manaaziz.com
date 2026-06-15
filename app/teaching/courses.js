export const courses = [
  {
    slug: "fab-333-summer-studies-spain",
    courseNumber: "FAB 333",
    courseName: "Summer Studies in Spain",
    university: "UNLV",
    semester: "Summer 2025",
    label: "FAB 333",
    title: "FAB 333: Summer Studies in Spain",
    shortTitle: "Summer Studies in Spain",
    summary:
      "A culture, cuisine, and study-abroad course focused on Spanish foodways, cultural context, travel learning, and open-minded engagement with another place.",
    description:
      "This course used Spain as the classroom. Students explored Spanish culture and cuisine through discussion, observation, shared experiences, and reflection on how food, place, history, and identity connect.",
    materials: [
      {
        title: "Syllabus",
        description: "Syllabus will be added once the final version is selected."
      },
      {
        title: "Class photos",
        description: "Photos from Spain and course activities can live here."
      },
      {
        title: "Course reflections",
        description: "Future posts can connect student travel, food, culture, and learning."
      }
    ]
  },
  {
    slug: "fab-333-culture-and-cuisine",
    courseNumber: "FAB 333",
    courseName: "Culture and Cuisine",
    university: "UNLV",
    semester: "Spring 2026",
    label: "FAB 333",
    title: "FAB 333: Culture and Cuisine",
    shortTitle: "Culture and Cuisine",
    summary:
      "An interactive course on global food cultures, cuisine, migration, religion, sustainability, etiquette, and the ways food helps people understand one another.",
    description:
      "Students study how geography, history, technology, religion, migration, exploration, and major historical events shape food-related behavior. The class emphasizes discussion, cultural openness, group learning, tasting, and applied observation.",
    materials: [
      {
        title: "HTML syllabus",
        description: "Accessible web version of the Spring 2026 syllabus.",
        href: "/teaching/fab-333-culture-and-cuisine/syllabus"
      },
      {
        title: "Restaurant visit assignment",
        description: "An observation-based assignment connecting dining environments, atmosphere, food, and culture."
      },
      {
        title: "Country group presentations",
        description: "Team presentations where students research, present, and share cultural cuisine with the class."
      }
    ],
    syllabus: {
      instructor: "Mana Azizsoltani, PhD",
      email: "mana.azizsoltani@unlv.edu",
      meeting: "Monday 2:30 PM - 5:15 PM",
      room: "BEH 233",
      credits: "3 credits",
      prerequisites: "ENG 101 or HON 100, and FAB 159 or 3 credits of Social Science core",
      description:
        "This subject equips students with knowledge of the evolution of food production, preservation, preparation techniques, food habits, and beliefs about food. Students examine geographical, historical, technological, and religious factors that influence food-related behaviors across ethnic groups and time.",
      objectives: [
        "Understand the historical importance of exploration, immigration, migration, and major historical events in relation to food.",
        "Assess and discuss gastronomy, taste, sensory perception, dining etiquette, and food consumption habits.",
        "Define culture, acculturation, ethnocentrism, and intercultural relations through food.",
        "Identify how food fusion affects processing and culinary methods in homes and foodservice establishments.",
        "Identify cultural differences in verbal and non-verbal communication styles.",
        "Discuss the economic impact of food production and consumption historically and today.",
        "Discuss beliefs and food practices connected to major religions.",
        "Compare definitions for a globally sustainable food production system.",
        "Describe strategies for successful intercultural communication in foodservice operations."
      ],
      assessments: [
        { task: "Picture and biography posted to Canvas", points: "50", due: "Week 1" },
        { task: "Online quizzes", points: "100", due: "Weeks 1-11" },
        { task: "Mid-semester restaurant visit assignment", points: "100", due: "Week 14" },
        { task: "Team presentation", points: "100", due: "Weeks 9-14" }
      ],
      schedule: [
        { week: "1", topic: "Administration; introduction to culture, cuisine, and gastronomy" },
        { week: "2", topic: "Evolution of food customs; street food; Turkish cuisine and culture" },
        { week: "3", topic: "Migration, immigration, exploration, the Silk Road, and foods that changed the world" },
        { week: "4", topic: "Holiday or university recess week" },
        { week: "5", topic: "Dining etiquette and culture around meals" },
        { week: "6", topic: "Wine tasting and culture" },
        { week: "7", topic: "Healthy eating, cheese and culture, diet within cultures, and plant-based foods" },
        { week: "8", topic: "Spring Break or university recess week" },
        { week: "9", topic: "Group presentations: Peru and Brazil" },
        { week: "10", topic: "Group presentations: Greece and South Korea" },
        { week: "11", topic: "Group presentations: Mexico and Egypt" },
        { week: "12", topic: "Group presentations: Thailand and Japan" },
        { week: "13", topic: "Group presentations: Philippines and Ukraine" },
        { week: "14", topic: "Group presentations: Colombia and Group 15" }
      ]
    }
  },
  {
    slug: "hoa-730-statistical-analysis",
    courseNumber: "HOA 730",
    courseName: "Statistical Analysis for Hospitality",
    university: "UNLV",
    semester: "Semester details coming soon",
    label: "HOA 730",
    title: "HOA 730: Statistical Analysis for Hospitality",
    shortTitle: "Statistical Analysis for Hospitality",
    summary:
      "A graduate hospitality statistics course focused on practical quantitative reasoning, applied analysis, and confidence with data.",
    description:
      "This course introduces hospitality students to statistical thinking and applied analysis. The course page can later include the syllabus, modules, assignments, and examples of course materials.",
    materials: [
      {
        title: "Syllabus",
        description: "Syllabus will be linked here once selected."
      },
      {
        title: "Applied statistics modules",
        description: "Course materials can include hypothesis testing, regression, interpretation, and hospitality examples."
      },
      {
        title: "R and data analysis resources",
        description: "Walkthroughs and support materials can be added here."
      }
    ]
  },
  {
    slug: "hoa-732-advanced-statistical-analysis",
    courseNumber: "HOA 732",
    courseName: "Advanced Statistical Analysis for Hospitality",
    university: "UNLV",
    semester: "Spring 2026",
    label: "HOA 732",
    title: "HOA 732: Advanced Statistical Analysis for Hospitality",
    shortTitle: "Advanced Statistical Analysis",
    summary:
      "An advanced graduate hospitality statistics course focused on applied modeling, interpretation, and supporting students through technical material.",
    description:
      "This course builds on statistical analysis for hospitality students and emphasizes clear explanation, applied examples, model interpretation, and student support.",
    materials: [
      {
        title: "Syllabus",
        description: "Syllabus will be linked here once selected."
      },
      {
        title: "Recorded explanations",
        description: "Students noted the value of detailed recorded explanations and weekly support."
      },
      {
        title: "Applied modeling examples",
        description: "Course resources can include applied hospitality analytics and statistical modeling examples."
      }
    ]
  }
];

export function getCourse(slug) {
  return courses.find((course) => course.slug === slug);
}
