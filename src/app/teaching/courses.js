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
    catalogIntro:
      "A travel-based version of Culture and Cuisine, built around Spanish foodways, regional identity, markets, restaurants, cultural observation, and reflection. The course treats place as the classroom and asks students to connect cuisine with history, geography, hospitality, and everyday life.",
    description:
      "This course used Spain as the classroom. Students explored Spanish culture and cuisine through discussion, observation, shared experiences, and reflection on how food, place, history, and identity connect.",
    catalogHref: "https://catalog.unlv.edu/search_advanced.php?search=FAB%20333",
    outcomes: [
      "Connect Spanish cuisine with regional history, geography, and cultural identity.",
      "Practice cultural observation through restaurants, markets, shared meals, and travel experiences.",
      "Reflect on how food communicates values, belonging, memory, and hospitality."
    ],
    photos: [
      {
        label: "Madrid",
        note: "A class moment from the Madrid portion of the Summer Studies in Spain program.",
        src: "/assets/photos/fab333_madrid/fab_madrid_day5.webp",
        alt: "FAB 333 students during the Madrid portion of Summer Studies in Spain"
      },
      {
        label: "Valencia",
        note: "A class moment from the Valencia portion of the Summer Studies in Spain program.",
        src: "/assets/photos/fab333_madrid/fab_val_day2.webp",
        alt: "FAB 333 students during the Valencia portion of Summer Studies in Spain"
      },
      {
        label: "FAB 333 reunion",
        note: "A group moment connected to the broader FAB 333 travel and cuisine archive.",
        src: "/assets/photos/fab333_reunion_group.webp",
        alt: "FAB 333 reunion group photo"
      }
    ],
    gradingComponents: [
      { task: "Intro & Daily Journal", percent: "50%" },
      { task: "Attendance and Participation", percent: "35%" },
      { task: "Instructor's Evaluation of Student", percent: "15%" }
    ],
    calendarLabel: "Daily course calendar",
    schedule: [
      { week: "May 19", topic: "Depart for Madrid" },
      { week: "May 20", topic: "Arrive in Madrid, receive metro pass, and share a welcome dinner" },
      { week: "May 21", topic: "Orientation, neighborhood walk, Madrid city tour, and group lunch" },
      { week: "May 22", topic: "Free day or university-sourced activity in Madrid" },
      { week: "May 23", topic: "Class meeting followed by vineyard and wine tasting" },
      { week: "May 24", topic: "Guided visit to the Royal Palace of Madrid" },
      { week: "May 25", topic: "Train to Valencia and afternoon class meeting" },
      { week: "May 26", topic: "Class meeting and guided Valencia city tour" },
      { week: "May 27", topic: "Paella cooking class and farm-to-table lunch" },
      { week: "May 28", topic: "Free day or university-sourced activity in Valencia" },
      { week: "May 29", topic: "Coach to Barcelona with cheese and wine tour stop" },
      { week: "May 30", topic: "Class meeting, Gothic Quarter tour, and La Sagrada Familia" },
      { week: "May 31", topic: "Penedes wine region visit" },
      { week: "June 1", topic: "Class meeting and La Boqueria market tour" },
      { week: "June 2", topic: "Final class meeting, reflection time, and farewell dinner" },
      { week: "June 3", topic: "Program ends and airport transfer" }
    ],
    calendar: [
      {
        month: "May",
        year: 2025,
        days: [
          {
            date: "May 19",
            label: "Travel",
            topic: "Program begins",
            description: "Participants depart for Madrid on individually arranged flights."
          },
          {
            date: "May 20",
            label: "Madrid",
            topic: "Arrival and welcome dinner",
            description: "Transfer to accommodations, receive the Madrid Metro Pass, and gather for a welcome dinner."
          },
          {
            date: "May 21",
            label: "Madrid",
            topic: "Orientation and city tour",
            description: "Local orientation, neighborhood walk, guided Habsburg Madrid tour, and group lunch."
          },
          {
            date: "May 22",
            label: "Madrid",
            topic: "Free day or university activity",
            description: "Independent exploration or a university-sourced activity with lunch and dinner on your own."
          },
          {
            date: "May 23",
            label: "Class",
            topic: "Class meeting and vineyard visit",
            description: "Faculty-led class meeting followed by a guided vineyard and wine tasting outside Madrid."
          },
          {
            date: "May 24",
            label: "Madrid",
            topic: "Royal Palace",
            description: "Guided visit to the Royal Palace of Madrid with free time afterward."
          },
          {
            date: "May 25",
            label: "Valencia",
            topic: "Train to Valencia and class",
            description: "Travel by train to Valencia, receive a transit pass, check in, and meet for class."
          },
          {
            date: "May 26",
            label: "Valencia",
            topic: "Class and city tour",
            description: "Faculty-led class meeting followed by a guided walk through Valencia's old quarter and central market area."
          },
          {
            date: "May 27",
            label: "Foodways",
            topic: "Paella cooking class",
            description: "Farm-to-table paella cooking class and group lunch at Barraca de Toni Montoliu."
          },
          {
            date: "May 28",
            label: "Valencia",
            topic: "Free day or university activity",
            description: "Independent exploration or a university-sourced activity in Valencia."
          },
          {
            date: "May 29",
            label: "Barcelona",
            topic: "Travel to Barcelona",
            description: "Coach transfer to Barcelona with a cheese and wine tour stop, then hotel check-in."
          },
          {
            date: "May 30",
            label: "Barcelona",
            topic: "Class, Gothic Quarter, and Sagrada Familia",
            description: "Faculty-led class meeting, Gothic Quarter tour, and guided visit to La Sagrada Familia."
          },
          {
            date: "May 31",
            label: "Wine",
            topic: "Penedes wine region",
            description: "Full-day visit to the Penedes wine region with free evening time in Barcelona."
          }
        ]
      },
      {
        month: "June",
        year: 2025,
        days: [
          {
            date: "June 1",
            label: "Market",
            topic: "Class and La Boqueria",
            description: "Faculty-led class meeting followed by a guided La Boqueria market visit with tastings."
          },
          {
            date: "June 2",
            label: "Final",
            topic: "Class and farewell dinner",
            description: "Final class meeting, reflection time, and group farewell dinner in Barcelona."
          },
          {
            date: "June 3",
            label: "Travel",
            topic: "Program ends",
            description: "Check out and transfer to the airport at the most common departure time."
          }
        ]
      }
    ],
    materials: [
      {
        title: "HTML syllabus",
        kind: "Syllabus",
        description: "Accessible web version of the Summer 2025 Spain study-abroad syllabus.",
        href: "/teaching/fab-333-summer-studies-spain/syllabus"
      },
      {
        title: "PDF syllabus",
        kind: "Syllabus",
        description: "Downloadable PDF copy of the Summer 2025 Spain study-abroad syllabus.",
        href: "/assets/course_materials/fab_333_summer_studies_spain/fab333_summer_2025_syllabus.pdf"
      },
      {
        title: "Field learning",
        kind: "Experiences",
        description: "A future home for visits, tasting notes, cultural observations, and travel-based reflections."
      },
      {
        title: "Course reflections",
        kind: "Writing",
        description: "Future posts can connect student travel, food, culture, and learning."
      },
      {
        title: "Videos and prep materials",
        kind: "Videos",
        description: "Short orientation videos and cultural background materials can be linked here."
      }
    ],
    syllabus: {
      instructor: "Mohsen Azizsoltani and Mana Azizsoltani, PhD",
      email: "mohsen.azizsoltani@unlv.edu; mana.azizsoltani@unlv.edu",
      meeting: "May 20 - June 3, 2025",
      room: "Madrid, Valencia, and Barcelona, Spain",
      credits: "3 credits",
      prerequisites: "FAB 333 Culture and Cuisine or FAB 790 Independent Study designation",
      featuredLinks: [
        { label: "Summer School in Spain", href: "/blog/teaching/spain-recap" },
        { label: "Spain Reunion", href: "/blog/teaching/spain-reunion" }
      ],
      description:
        "This immersive study abroad program offers students a unique opportunity to explore Spanish culture through its diverse culinary traditions. Based in Madrid, Valencia, and Barcelona, students engage with local history, art, architecture, social customs, cooking workshops, market visits, restaurant experiences, and cultural excursions. The course is designed to build a deeper understanding of Spain's regional identities, historical influences on gastronomy, and the social significance of food in everyday life.",
      objectives: [
        "Identify and describe key historical, social, and cultural influences on the cuisine of Madrid, Valencia, and Barcelona.",
        "Recognize and differentiate regional culinary specialties and ingredients within the three featured cities.",
        "Understand and apply basic Spanish culinary techniques through hands-on workshops.",
        "Analyze the role of food in Spanish social customs, celebrations, and daily life.",
        "Develop critical observation and analytical skills through engagement with local markets, restaurants, and cultural sites.",
        "Communicate effectively about Spanish culture and cuisine through written assignments, presentations, and discussions.",
        "Gain intercultural competence and adaptability through immersion in a foreign cultural environment."
      ],
      assessments: [
        { task: "Introduction discussion and daily journal short essays", percent: "50%", due: "Daily during program" },
        { task: "Attendance, participation, and engagement", percent: "35%", due: "Every scheduled activity" },
        { task: "Instructor evaluation of student performance, behavior, and trip-policy compliance", percent: "15%", due: "June 5" }
      ],
      gradingScale: [
        { grade: "A", range: "93% to 100%" },
        { grade: "A-", range: "90% to 92%" },
        { grade: "B+", range: "87% to 89%" },
        { grade: "B", range: "84% to 86%" },
        { grade: "B-", range: "80% to 84%" },
        { grade: "C+", range: "77% to 79%" },
        { grade: "C", range: "73% to 76%" },
        { grade: "C-", range: "70% to 72%" },
        { grade: "D+", range: "67% to 69%" },
        { grade: "D", range: "63% to 66%" },
        { grade: "D-", range: "60% to 62%" },
        { grade: "F", range: "Below 60%" }
      ],
      scheduleHeading: "Daily Spain program schedule",
      scheduleLabel: "Date",
      schedule: [
        { week: "May 19", topic: "Program begins; participants depart for Madrid." },
        { week: "May 20", topic: "Arrival in Madrid, transit pass, check-in, and welcome dinner." },
        { week: "May 21", topic: "Local orientation, neighborhood walk, Habsburg Madrid city tour, and group lunch." },
        { week: "May 22", topic: "Free day or university-sourced activity in Madrid." },
        { week: "May 23", topic: "Class meeting followed by guided vineyard and wine tasting." },
        { week: "May 24", topic: "Guided Royal Palace of Madrid visit and independent exploration." },
        { week: "May 25", topic: "Train to Valencia, hotel check-in, transit pass, and class meeting." },
        { week: "May 26", topic: "Class meeting and guided Valencia city tour." },
        { week: "May 27", topic: "Paella cooking class and farm-to-table lunch." },
        { week: "May 28", topic: "Free day or university-sourced activity in Valencia." },
        { week: "May 29", topic: "Coach to Barcelona with cheese and wine tour stop." },
        { week: "May 30", topic: "Class meeting, Gothic Quarter tour, and La Sagrada Familia guided visit." },
        { week: "May 31", topic: "Penedes wine region visit and free evening in Barcelona." },
        { week: "June 1", topic: "Class meeting and guided La Boqueria market visit with tastings." },
        { week: "June 2", topic: "Final class meeting, reflection time, and farewell dinner." },
        { week: "June 3", topic: "Program ends; check-out and airport transfer." }
      ],
      sections: [
        {
          label: "Program outcomes",
          title: "College of Hospitality outcomes",
          items: [
            "Communicate effectively in written, spoken, visual, and digital modes to different audiences.",
            "Develop knowledge of the global and multicultural hospitality industry.",
            "Understand issues in ethics, diversity, and inclusion.",
            "Apply critical thinking to hospitality management problems.",
            "Evaluate critical hospitality management concepts."
          ]
        },
        {
          label: "Resources",
          title: "Recommended reading and preparation",
          items: [
            "Local Spanish newspapers and magazines available online.",
            "Websites and blogs dedicated to Spanish food and culture.",
            "Documentaries and films related to Spanish history, culture, and gastronomy."
          ]
        },
        {
          label: "Policies",
          title: "Course expectations",
          items: [
            "Active and punctual participation in all scheduled activities is mandatory.",
            "Assignments must be submitted through WebCampus Canvas as text entries unless otherwise instructed.",
            "Make-up opportunities are only allowed for documented emergencies or excused absences under university policy.",
            "Students are expected to engage respectfully with instructors, program staff, classmates, and local communities.",
            "All submitted work must be original and follow UNLV academic integrity expectations."
          ]
        }
      ]
    }
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
    catalogIntro:
      "A study of how food habits, production, preservation, preparation, beliefs, and dining behavior vary across cultures and change over time. Students examine geography, history, technology, religion, migration, exploration, etiquette, and sustainability through the lens of cuisine.",
    description:
      "Students study how geography, history, technology, religion, migration, exploration, and major historical events shape food-related behavior. The class emphasizes discussion, cultural openness, group learning, tasting, and applied observation.",
    catalogHref: "https://catalog.unlv.edu/search_advanced.php?search=FAB%20333",
    outcomes: [
      "Explain how culture, migration, religion, and history shape food behavior.",
      "Compare global cuisines through etiquette, sustainability, sensory experience, and hospitality practice.",
      "Use presentations, discussion, and observation to practice intercultural communication."
    ],
    photos: [
      {
        label: "Culture and Cuisine",
        note: "A Spring 2026 classroom moment from FAB 333.",
        src: "/assets/photos/fab333_2026_2.webp",
        alt: "FAB 333 Culture and Cuisine classroom moment"
      },
      {
        label: "Tea and tasting",
        note: "A tasting-centered class moment from Culture and Cuisine.",
        src: "/assets/photos/fab333_2026_tea.webp",
        alt: "FAB 333 Culture and Cuisine tea tasting moment"
      },
      {
        label: "Paella",
        note: "A cuisine-focused class moment connected to Spanish foodways and shared meals.",
        src: "/assets/photos/fab333_paella.webp",
        alt: "Paella prepared for FAB 333 Culture and Cuisine"
      }
    ],
    materials: [
      {
        title: "HTML syllabus",
        kind: "Syllabus",
        description: "Accessible web version of the Spring 2026 syllabus.",
        href: "/teaching/fab-333-culture-and-cuisine/syllabus"
      },
      {
        title: "PDF syllabus",
        kind: "Syllabus",
        description: "Downloadable PDF copy of the course syllabus.",
        href: "/assets/course_materials/fab_333_culture_and_cuisine/fab333_culture_cuisine_syllabus.pdf"
      },
      {
        title: "Restaurant visit assignment",
        kind: "Assignment",
        description: "An observation-based assignment connecting dining environments, atmosphere, food, and culture."
      },
      {
        title: "Country group presentations",
        kind: "Assignment",
        description: "Team presentations where students research, present, and share cultural cuisine with the class."
      },
      {
        title: "Lecture videos and demos",
        kind: "Videos",
        description: "A place for short videos, tasting demos, and background materials connected to weekly topics."
      },
      {
        title: "How we taste lab",
        kind: "Slides",
        description: "A sensory learning activity about taste and food perception. PDF slides will be linked once exported."
      },
      {
        title: "Culture and cuisine slide collection",
        kind: "Slides",
        description: "Sample topics include street food, Turkish cuisine, the Silk Road, food history, etiquette, wine, and slow food. PDF versions will be linked here after export."
      },
      {
        title: "Wine tasting scorecard",
        kind: "Activity",
        description: "A structured tasting worksheet for in-class discussion and sensory observation.",
        href: "/assets/course_materials/fab_333_culture_and_cuisine/wine_scorecard.docx"
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
        { task: "Online quizzes", percent: "20%", due: "Weeks 1-11" },
        { task: "Discussions, picture, and biography", percent: "25%", due: "Weekly" },
        { task: "Mid-semester restaurant visit assignment", percent: "25%", due: "Week 14" },
        { task: "Final presentation", percent: "30%", due: "Weeks 9-14" }
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
        { week: "9", topic: "Group presentations: Groups 1 and 2" },
        { week: "10", topic: "Group presentations: Groups 3 and 5" },
        { week: "11", topic: "Group presentations: Groups 6 and 7" },
        { week: "12", topic: "Group presentations: Groups 8 and 9" },
        { week: "13", topic: "Group presentations: Groups 10 and 11" },
        { week: "14", topic: "Group presentations: Groups 12 and 15" }
      ],
      calendar: [
        {
          month: "January",
          year: "2026",
          notes: [
            {
              date: "Jan 19",
              title: "MLK Jr. Day recess",
              description: "UNLV campus closed. Classes begin the following day."
            },
            {
              date: "Jan 20",
              title: "Classes begin",
              description: "Spring 2026 instruction begins at UNLV."
            },
            {
              date: "Jan 26",
              title: "Add/drop and payment deadline",
              description: "Last day to add classes online, drop for a 100% refund, and pay without late penalties."
            }
          ],
          weeks: [
            {
              week: "1",
              date: "Jan 26",
              topic: "Administration; introduction to culture, cuisine, and gastronomy",
              due: ["Canvas picture and biography"]
            }
          ]
        },
        {
          month: "February",
          year: "2026",
          notes: [
            {
              date: "Feb 6",
              title: "Department permission deadline",
              description: "Last day to add classes with department permission."
            },
            {
              date: "Feb 16",
              title: "Presidents' Day recess",
              description: "UNLV campus closed. Monday class does not meet."
            },
            {
              date: "Feb 27",
              title: "50% withdrawal refund deadline",
              description: "Last day to completely withdraw from all classes and receive a 50% refund if the account is paid in full."
            }
          ],
          weeks: [
            {
              week: "2",
              date: "Feb 2",
              topic: "Evolution of food customs; street food; Turkish cuisine and culture",
              due: ["Online quiz"]
            },
            {
              week: "3",
              date: "Feb 9",
              topic: "Migration, immigration, exploration, the Silk Road, and foods that changed the world",
              due: ["Online quiz"]
            },
            {
              week: "4",
              date: "Feb 16",
              topic: "University recess week",
              blocked: true
            },
            {
              week: "5",
              date: "Feb 23",
              topic: "Dining etiquette and culture around meals",
              due: ["Online quiz"]
            }
          ]
        },
        {
          month: "March",
          year: "2026",
          notes: [
            {
              date: "Mar 1",
              title: "May degree application deadline",
              description: "Last day for undergraduates to apply for May 2026 degree conferral."
            },
            {
              date: "Mar 2",
              title: "Summer registration begins",
              description: "Summer 2026 registration opens."
            },
            {
              date: "Mar 16-22",
              title: "Spring break recess",
              description: "Classes are not held for spring break and resume Monday, March 23."
            }
          ],
          weeks: [
            {
              week: "6",
              date: "Mar 2",
              topic: "Wine tasting and culture",
              due: ["Online quiz"]
            },
            {
              week: "7",
              date: "Mar 9",
              topic: "Healthy eating, cheese and culture, diet within cultures, and plant-based foods",
              due: ["Online quiz"]
            },
            {
              week: "8",
              date: "Mar 16",
              topic: "Spring break",
              blocked: true
            },
            {
              week: "9",
              date: "Mar 23",
              topic: "Group presentations: Groups 1 and 2",
              due: ["Online quiz", "Team presentations begin"]
            },
            {
              week: "10",
              date: "Mar 30",
              topic: "Group presentations: Groups 3 and 5",
              due: ["Online quiz", "Team presentations"]
            }
          ]
        },
        {
          month: "April",
          year: "2026",
          notes: [
            {
              date: "Apr 3",
              title: "Drop/audit deadline",
              description: "Last day to drop classes without a refund or change from credit to audit."
            },
            {
              date: "Apr 13",
              title: "Fall registration begins",
              description: "Fall 2026 registration opens."
            }
          ],
          weeks: [
            {
              week: "11",
              date: "Apr 6",
              topic: "Group presentations: Groups 6 and 7",
              due: ["Final online quiz", "Team presentations"]
            },
            {
              week: "12",
              date: "Apr 13",
              topic: "Group presentations: Groups 8 and 9",
              due: ["Team presentations"]
            },
            {
              week: "13",
              date: "Apr 20",
              topic: "Group presentations: Groups 10 and 11",
              due: ["Team presentations"]
            },
            {
              week: "14",
              date: "Apr 27",
              topic: "Group presentations: Groups 12 and 15",
              due: ["Restaurant visit assignment", "Team presentations wrap"]
            }
          ]
        },
        {
          month: "May",
          year: "2026",
          notes: [
            {
              date: "May 4",
              title: "Study week begins",
              description: "Classes are scheduled, but major written exams are not given."
            },
            {
              date: "May 9",
              title: "Instruction ends",
              description: "Spring 2026 instruction ends."
            },
            {
              date: "May 11",
              title: "Final examinations begin",
              description: "Final examinations begin and are scheduled to be two hours long."
            },
            {
              date: "May 16",
              title: "Semester ends",
              description: "Spring semester ends, undergraduate commencement takes place, and degrees are conferred."
            }
          ],
          weeks: [
            {
              week: "15",
              date: "May 4",
              topic: "Study week",
              due: ["No major written exams"]
            },
            {
              week: "Finals",
              date: "May 11-16",
              topic: "Final examination period",
              due: ["Check final exam schedule"]
            }
          ]
        }
      ]
    }
  },
  {
    slug: "hoa-730-statistical-analysis",
    courseNumber: "HOA 730",
    courseName: "Statistical Analysis for Hospitality",
    university: "UNLV",
    semester: "Spring 2026",
    label: "HOA 730",
    title: "HOA 730: Statistical Analysis for Hospitality",
    shortTitle: "Statistical Analysis for Hospitality",
    summary:
      "A graduate hospitality statistics course that builds practical confidence with R, statistical inference, regression, and evidence-based decision-making.",
    catalogIntro:
      "A graduate-level applied statistics course for hospitality students, covering data summarization, probability, statistical inference, ANOVA, regression, diagnostics, and chi-square analysis through R.",
    description:
      "This course introduces statistical analysis for hospitality, tourism, and leisure research. Students describe and explore real data in R, conduct statistical inference, examine the assumptions behind each method, and communicate credible conclusions to academic and professional audiences.",
    catalogHref: "https://catalog.unlv.edu/search_advanced.php?search=HOA%20730",
    outcomes: [
      "Summarize and visualize quantitative and categorical data in R before moving to statistical inference.",
      "Formulate confidence intervals and hypothesis tests for means, proportions, and differences between groups.",
      "Select and apply t-tests, chi-square tests, ANOVA, simple regression, and multiple regression to real questions.",
      "Check model assumptions, diagnose multicollinearity, and distinguish statistical association from causation.",
      "Interpret statistical output in plain language for hospitality research and managerial decision-making.",
      "Produce clear written analyses that explain the question, method, evidence, limitations, and conclusion."
    ],
    photos: [
      {
        label: "R for hospitality data",
        note: "Students worked directly in R and RStudio to summarize, visualize, model, and interpret hospitality data."
      },
      {
        label: "Applied inference",
        note: "Assignments moved from confidence intervals and hypothesis tests into ANOVA, regression, and model diagnostics."
      },
      {
        label: "Decision-ready reporting",
        note: "Projects emphasized assumptions and interpretation, not merely producing software output."
      }
    ],
    gradingComponents: [
      { task: "Professionalism and participation", percent: "10%" },
      { task: "Homework and in-class assignments", percent: "30%" },
      { task: "Midterm exam/project", percent: "20%" },
      { task: "Final exam/project (two parts)", percent: "40%" }
    ],
    schedule: [
      { week: "Jan 19", topic: "Martin Luther King Jr. Day Recess", blocked: true },
      { week: "Jan 26", topic: "Course introduction; R and RStudio; importing, summarizing, and visualizing data", due: ["Homework 1 module"] },
      { week: "Feb 2", topic: "Casino games, elementary probability, random variables, and probability distributions" },
      { week: "Feb 9", topic: "Sampling distributions, standard error, and the central limit theorem" },
      { week: "Feb 16", topic: "Presidents’ Day Recess", blocked: true },
      { week: "Feb 23", topic: "Confidence intervals for means, proportions, and differences between groups", due: ["Homework 2 begins"] },
      { week: "Mar 2", topic: "Hypothesis tests, p-values, and practical versus statistical significance", due: ["Homework 2", "Midterm project"] },
      { week: "Mar 9", topic: "Analysis of variance, the F test, assumptions, and follow-up comparisons", due: ["Homework 4 module"] },
      { week: "Mar 16", topic: "Spring Break Recess", blocked: true },
      { week: "Mar 23", topic: "Correlation, simple linear regression, prediction, residuals, and model fit", due: ["Homework 3 module"] },
      { week: "Mar 30", topic: "Multiple linear regression, indicator variables, model comparison, and prediction", due: ["Homework 5 begins"] },
      { week: "Apr 6", topic: "Multicollinearity, variance inflation factors, and correlated predictors" },
      { week: "Apr 13", topic: "Multiple-regression diagnostics and model limitations", due: ["Homework 5"] },
      { week: "Apr 20", topic: "Model selection, chi-square tests, goodness of fit, and independence", due: ["Final project preparation"] },
      { week: "Apr 27", topic: "Study week, project support, interpretation, and reporting workshop", due: ["Final project work"] },
      { week: "May 4", topic: "Course synthesis and communicating results", due: ["Final project", "Final quiz"] }
    ],
    materials: [
      {
        title: "PDF syllabus",
        kind: "Syllabus",
        description: "Downloadable PDF copy of the HOA 730 syllabus.",
        href: "/assets/course_materials/hoa_730_statistical_analysis/hoa730_syllabus.pdf"
      },
      {
        title: "Applied statistics lecture slides",
        kind: "Slides",
        description: "Lecture resources for correlation, ordinary least squares, and analysis of variance.",
        links: [
          { label: "Correlation and OLS", href: "/assets/course_materials/hoa_730_statistical_analysis/correlation_ols_slides.pdf" },
          { label: "ANOVA", href: "/assets/course_materials/hoa_730_statistical_analysis/anova_slides.pdf" }
        ]
      },
      {
        title: "R and data analysis resources",
        kind: "Code",
        description: "Starter R code for working with synthetic hospitality data.",
        links: [
          { label: "Starter script", href: "/assets/course_materials/hoa_730_statistical_analysis/hospitality_synthetic_starter.r" },
          { label: "Data 101 script", href: "/assets/course_materials/hoa_730_statistical_analysis/data_101.r" }
        ]
      },
      {
        title: "Practice assignments",
        kind: "Assignments",
        description: "Five reproducible R assignments covering data visualization, inference, regression, ANOVA, and model diagnostics.",
        links: [
          { label: "HW1 · Data summaries", href: "/assets/course_materials/hoa_730_statistical_analysis/hw1_summarize_data.pdf" },
          { label: "HW2 · Inference", href: "/assets/course_materials/hoa_730_statistical_analysis/hw2_ci_hypothesis_tests.pdf" },
          { label: "HW3 · Correlation + OLS", href: "/assets/course_materials/hoa_730_statistical_analysis/hw3_correlation_ols.pdf" },
          { label: "HW4 · ANOVA", href: "/assets/course_materials/hoa_730_statistical_analysis/hw4_anova.pdf" },
          { label: "HW5 · Multiple regression", href: "/assets/course_materials/hoa_730_statistical_analysis/hw5_multiple_linear_regression.pdf" }
        ]
      },
      {
        title: "Midterm project",
        kind: "Project",
        description: "Applied statistical inference using SFO passenger satisfaction and coffee-shop spending data.",
        href: "/assets/course_materials/hoa_730_statistical_analysis/midterm_project.pdf"
      },
      {
        title: "Final project",
        kind: "Project",
        description: "A multi-part analysis combining regression, prediction, diagnostics, ANOVA, and categorical-data methods.",
        href: "/assets/course_materials/hoa_730_statistical_analysis/final_project.pdf"
      },
      {
        title: "Hospitality datasets",
        kind: "Data",
        description: "Sample hotel datasets used for applied examples and student practice.",
        links: [
          { label: "Hotels", href: "/assets/course_materials/hoa_730_statistical_analysis/hotels.csv" },
          { label: "Hotels ANOVA", href: "/assets/course_materials/hoa_730_statistical_analysis/hotels_anova.csv" },
          { label: "Hotels MLR", href: "/assets/course_materials/hoa_730_statistical_analysis/hotels_mlr.csv" }
        ]
      }
    ],
    syllabus: {
      instructor: "Mana Azizsoltani, PhD",
      email: "mana.azizsoltani@unlv.edu",
      meeting: "Mondays, 2:30 PM - 5:15 PM",
      room: "HOS 234",
      credits: "3 credits",
      prerequisites: "Graduate standing or department approval",
      description:
        "HOA 730 introduces the concepts and techniques of statistical analysis used in hospitality, tourism, and leisure research. Students describe and explore data, conduct and interpret statistical inference, analyze real data reproducibly in R, and communicate findings clearly to academic and professional audiences.",
      objectives: [
        "Explain foundational concepts in probability, sampling, descriptive statistics, and statistical inference, and select useful numerical and graphical summaries for a dataset.",
        "Translate hospitality and leisure research questions into testable statistical questions and select methods that fit the study design and variables involved.",
        "Construct and interpret confidence intervals and conduct hypothesis tests for means and proportions.",
        "Conduct and interpret analysis of variance, chi-square tests, correlation, simple linear regression, and multiple linear regression.",
        "Use R and RStudio to manage, summarize, visualize, and analyze data reproducibly while evaluating assumptions and diagnosing common statistical problems.",
        "Interpret statistical evidence critically and communicate results accurately without overstating causal or practical conclusions."
      ],
      assessments: [
        { task: "Professionalism and participation", percent: "10%", due: "Throughout the semester" },
        { task: "Homework and in-class assignments", percent: "30%", due: "Across five applied modules" },
        { task: "Midterm exam/project", percent: "20%", due: "Midsemester" },
        { task: "Applied take-home final project", percent: "30%", due: "Final week" },
        { task: "Online multiple-choice final quiz", percent: "10%", due: "Final week" }
      ],
      sections: [
        {
          label: "Approach",
          title: "How the course was taught",
          copy: "The course combined explanation, discussion, hands-on R work, written-in-class assignments, and projects using recognizable hospitality and business settings.",
          items: [
            "Begin with the business or research question before selecting a statistical procedure.",
            "Summarize and visualize the data before moving to hypothesis tests or models.",
            "Verify assumptions and explain limitations rather than treating output as automatically correct.",
            "Translate results into a conclusion that a researcher or operator can act on."
          ]
        }
      ]
    }
  },
  {
    slug: "hoa-732-advanced-statistical-analysis",
    courseNumber: "HOA 732",
    courseName: "Advanced Statistics in R for Hospitality and Business",
    university: "UNLV",
    semester: "Fall 2026",
    label: "HOA 732",
    title: "HOA 732: Advanced Statistics in R for Hospitality and Business",
    shortTitle: "Advanced Statistics in R",
    cardTitle: "Advanced Statistics in R",
    summary:
      "An eight-week graduate course using R to connect statistical learning, machine learning, model evaluation, and applied hospitality and business decisions.",
    catalogIntro:
      "An advanced statistics course for hospitality graduate students, emphasizing applied modeling, interpretation, and quantitative methods that support hospitality research. The course builds toward more independent analysis and clearer communication of technical findings.",
    description:
      "Students move from a focused review of inference and multiple regression into logistic regression, decision trees, random forests, support vector machines, boosting, neural networks, principal components, clustering, and linear discriminant analysis. The course emphasizes honest out-of-sample evaluation, interpretation, and reproducible communication rather than prediction accuracy alone.",
    catalogHref: "https://catalog.unlv.edu/search_advanced.php?search=HOA%20732",
    outcomes: [
      "Distinguish statistical learning for inference from machine learning for prediction and translate hospitality and business questions into analytical problems.",
      "Prepare data for modeling and create reproducible workflows in R and RStudio.",
      "Fit and interpret logistic regression and other generalized linear models.",
      "Build and compare decision trees, random forests, support vector machines, boosting models, and neural networks.",
      "Apply dimension reduction, classification, and clustering methods, including principal components analysis and linear discriminant analysis.",
      "Evaluate model performance, explain limitations and uncertainty, and communicate results to technical and nontechnical audiences."
    ],
    photos: [
      {
        label: "Statistical + machine learning",
        note: "The course connected interpretable statistical models with predictive machine-learning workflows."
      },
      {
        label: "Model comparison",
        note: "Students compared methods on held-out data using metrics appropriate to regression and classification."
      },
      {
        label: "Applied R workflows",
        note: "Projects used R to move from data preparation through modeling, validation, interpretation, and reporting."
      }
    ],
    gradingComponents: [
      { task: "Professionalism and participation", percent: "10%" },
      { task: "Homework and in-class assignments", percent: "20%" },
      { task: "Midterm project", percent: "30%" },
      { task: "Final project", percent: "40%" }
    ],
    assessmentChart: [
      { task: "Homework", points: "300" },
      { task: "Midterm", points: "300" },
      { task: "Final", points: "400" }
    ],
    schedule: [
      { week: "Oct 19-25", topic: "Course introduction; R and RStudio setup; review of visualization, inference, multiple regression, and multicollinearity", due: ["Review work and R practice"] },
      { week: "Oct 26-Nov 1", topic: "Classification, binary logistic regression, decision-tree classifiers, confusion matrices, and classification metrics", due: ["Decision-tree classification assignment"] },
      { week: "Nov 2-8", topic: "Random-forest and support-vector classifiers; resampling and out-of-sample evaluation", due: ["Midterm project"] },
      { week: "Nov 9-15", topic: "Regression trees, random-forest regression, and comparing predictive performance", due: ["Random-forest assignment"] },
      { week: "Nov 16-22", topic: "Support-vector regression, neural networks, model tuning, and evaluation", due: ["Model tuning and evaluation practice"] },
      { week: "Nov 23-29", topic: "Boosting for classification and regression; learning rates, tree depth, and tuning", due: ["Boosting practice"] },
      { week: "Nov 30-Dec 6", topic: "Principal components, dimension reduction, and time-series methods as time permits", due: ["Final project preparation"] },
      { week: "Dec 7-12", topic: "Clustering, linear discriminant analysis, course synthesis, and model comparison", due: ["Final project"] }
    ],
    materials: [
      {
        title: "PDF syllabus",
        kind: "Syllabus",
        description: "Downloadable PDF copy of the Fall 2026 HOA 732 syllabus.",
        href: "/assets/course_materials/hoa_732_advanced_statistical_analysis/hoa732_syllabus_fall_2026.pdf"
      }
    ],
    syllabus: {
      instructor: "Mana Azizsoltani, PhD",
      email: "mana.azizsoltani@unlv.edu",
      meeting: "Online asynchronous · October 19-December 12, 2026",
      room: "Web-based",
      credits: "3 credits",
      prerequisites: "HOA 730 or equivalent preparation in applied statistics and R",
      description:
        "HOA 732 builds on HOA 730 by introducing advanced statistical learning and machine-learning methods for hospitality and business problems. Students use R and RStudio for classification, regression, ensemble, dimension-reduction, and unsupervised learning methods while evaluating model performance and communicating findings to research and professional audiences.",
      objectives: [
        "Distinguish between statistical learning for inference and machine learning for prediction, and translate hospitality and business questions into appropriate analytical problems.",
        "Prepare data for modeling and create reproducible analysis workflows in R and RStudio.",
        "Fit and interpret logistic regression and other generalized linear models.",
        "Build and compare decision trees, random forests, support vector machines, boosting models, and neural networks.",
        "Apply dimension-reduction, classification, and clustering methods, including principal components analysis and linear discriminant analysis.",
        "Evaluate model performance, explain limitations and uncertainty, and communicate results clearly to technical and nontechnical audiences."
      ],
      assessments: [
        { task: "Professionalism and participation", percent: "10%", due: "Throughout the course" },
        { task: "Homework and in-class assignments", percent: "20%", due: "Across the eight modules" },
        { task: "Midterm project", percent: "30%", due: "Week 3" },
        { task: "Final project", percent: "40%", due: "Week 8" }
      ],
      gradingScale: [
        { grade: "A", range: "93-100%" },
        { grade: "A-", range: "90-92.9%" },
        { grade: "B+", range: "87-89.9%" },
        { grade: "B", range: "83-86.9%" },
        { grade: "B-", range: "80-82.9%" },
        { grade: "C+", range: "77-79.9%" },
        { grade: "C", range: "73-76.9%" },
        { grade: "C-", range: "70-72.9%" },
        { grade: "D+", range: "67-69.9%" },
        { grade: "D", range: "63-66.9%" },
        { grade: "D-", range: "60-62.9%" },
        { grade: "F", range: "Below 60%" }
      ],
      schedule: [
        { week: "1 · Oct. 19-25", topic: "R setup and review of visualization, inference, multiple regression, and multicollinearity" },
        { week: "2 · Oct. 26-Nov. 1", topic: "Binary logistic regression, decision-tree classifiers, and classification metrics" },
        { week: "3 · Nov. 2-8", topic: "Random forests, support vector machines, resampling, and the midterm project" },
        { week: "4 · Nov. 9-15", topic: "Regression trees, random-forest regression, and predictive performance" },
        { week: "5 · Nov. 16-22", topic: "Support-vector regression, neural networks, model tuning, and evaluation" },
        { week: "6 · Nov. 23-29", topic: "Boosting for classification and regression" },
        { week: "7 · Nov. 30-Dec. 6", topic: "Principal components, dimension reduction, and time series as time permits" },
        { week: "8 · Dec. 7-12", topic: "Clustering, linear discriminant analysis, synthesis, and the final project" }
      ],
      sections: [
        {
          label: "Assessment design",
          title: "What students were asked to do",
          copy: "The Fall 2026 course balances regular practice with two larger applied projects and expects students to explain—not merely produce—model output.",
          items: [
            "Prepare data and build reproducible modeling workflows in R.",
            "Frame and compare classification and regression approaches.",
            "Evaluate out-of-sample performance using appropriate metrics.",
            "Justify model choices, interpret uncertainty, and explain limitations.",
            "Communicate findings clearly to research and professional audiences."
          ]
        }
      ]
    }
  }
];

export function getCourse(slug) {
  return courses.find((course) => course.slug === slug);
}
