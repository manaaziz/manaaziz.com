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
      "Students learned to formulate hospitality and business questions statistically, select appropriate methods, verify assumptions, interpret R output, and communicate what the results mean. Examples and projects used hotel, restaurant, airport, wine, retail, and other applied datasets rather than abstract exercises alone.",
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
      { task: "Class participation and group work", percent: "10%" },
      { task: "Homework and written-in-class assignments", percent: "20%" },
      { task: "Midterm project", percent: "30%" },
      { task: "Final project", percent: "40%" }
    ],
    schedule: [
      { week: "Jan 20-23", topic: "R and RStudio; data summarization and visualization" },
      { week: "Jan 26-30", topic: "Casino games, elementary probability, and probability distributions" },
      { week: "Feb 2-6", topic: "Probability and probability distributions" },
      { week: "Feb 9-13", topic: "Sampling distributions" },
      { week: "Feb 16-20", topic: "Confidence intervals" },
      { week: "Feb 23-27", topic: "Testing hypotheses" },
      { week: "Mar 2-6", topic: "Hypothesis testing and the midterm project" },
      { week: "Mar 9-13", topic: "Analysis of variance" },
      { week: "Mar 16-20", topic: "Spring Break" },
      { week: "Mar 23-27", topic: "Correlation and simple linear regression" },
      { week: "Mar 30-Apr 3", topic: "Multiple linear regression" },
      { week: "Apr 6-10", topic: "Multicollinearity and variance inflation factors" },
      { week: "Apr 13-17", topic: "Multiple-regression diagnostics" },
      { week: "Apr 20-24", topic: "Multiple-regression examples and chi-square tests" },
      { week: "Apr 27-May 1", topic: "Study week and project support" },
      { week: "May 4-8", topic: "Final project and final assessment" }
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
        description: "Five applied WIC assignments covering data summaries, confidence intervals, hypothesis tests, correlation, OLS, ANOVA, and multiple regression.",
        links: [
          { label: "HW1", href: "/assets/course_materials/hoa_730_statistical_analysis/hw1_summarize_data.pdf" },
          { label: "HW2", href: "/assets/course_materials/hoa_730_statistical_analysis/hw2_ci_hypothesis_tests.pdf" },
          { label: "HW3", href: "/assets/course_materials/hoa_730_statistical_analysis/hw3_correlation_ols.pdf" },
          { label: "HW4", href: "/assets/course_materials/hoa_730_statistical_analysis/hw4_anova.pdf" },
          { label: "HW5", href: "/assets/course_materials/hoa_730_statistical_analysis/hw5_multiple_linear_regression.pdf" }
        ]
      },
      {
        title: "Midterm project",
        kind: "Project",
        description: "An applied analysis of airport satisfaction and coffee-shop spending using confidence intervals and hypothesis tests.",
        href: "/assets/course_materials/hoa_730_statistical_analysis/midterm_project.pdf"
      },
      {
        title: "Final project",
        kind: "Project",
        description: "A multi-part applied project using regression, ANOVA, prediction, diagnostics, and chi-square analysis.",
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
        "HOA 730 introduces statistical thinking and applied analysis for hospitality and leisure-service questions. Students use R and RStudio to summarize and visualize data, conduct statistical inference, fit and diagnose statistical models, and explain results in language useful for research and business decisions.",
      objectives: [
        "Develop working knowledge of foundational statistical terms, concepts, and methods.",
        "Distinguish descriptive statistics from statistical inference and select methods appropriate to the variables and research question.",
        "Use R and RStudio to summarize data, visualize patterns, test hypotheses, and fit statistical models.",
        "Apply confidence intervals, t-tests, chi-square tests, ANOVA, simple regression, and multiple regression.",
        "Verify method and model assumptions, including normality and multicollinearity diagnostics.",
        "Interpret results and write clear, defensible descriptions of statistical analyses."
      ],
      assessments: [
        { task: "Class participation and group work", percent: "10%", due: "Throughout the semester" },
        { task: "Homework and written-in-class assignments", percent: "20%", due: "Across five applied modules" },
        { task: "Midterm project", percent: "30%", due: "Week 7" },
        { task: "Final project", percent: "40%", due: "Final week" }
      ],
      schedule: [
        { week: "Jan 20-23", topic: "R and RStudio; data summarization and visualization" },
        { week: "Jan 26-Feb 6", topic: "Probability and probability distributions" },
        { week: "Feb 9-20", topic: "Sampling distributions and confidence intervals" },
        { week: "Feb 23-Mar 6", topic: "Hypothesis testing and the midterm project" },
        { week: "Mar 9-13", topic: "Analysis of variance" },
        { week: "Mar 23-27", topic: "Correlation and simple linear regression" },
        { week: "Mar 30-Apr 17", topic: "Multiple regression, multicollinearity, and diagnostics" },
        { week: "Apr 20-24", topic: "Regression examples and chi-square tests" },
        { week: "Apr 27-May 8", topic: "Study week, final project, and final assessment" }
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
    courseName: "Advanced Statistical Analysis for Hospitality",
    university: "UNLV",
    semester: "Spring 2026",
    label: "HOA 732",
    title: "HOA 732: Advanced Statistical Analysis for Hospitality",
    shortTitle: "Advanced Statistical Analysis",
    cardTitle: "Adv. Statistical Analysis for Hospitality",
    summary:
      "A graduate course in R covering statistical learning, machine learning, model comparison, and applied reporting for hospitality research and decision-making.",
    catalogIntro:
      "An advanced statistics course for hospitality graduate students, emphasizing applied modeling, interpretation, and quantitative methods that support hospitality research. The course builds toward more independent analysis and clearer communication of technical findings.",
    description:
      "Students moved from a focused review of inference and multiple regression into binary logistic regression, decision trees, random forests, support vector machines, boosting, neural networks, principal components, clustering, and time-series concepts. Assignments required students to compare models instead of treating prediction accuracy as the only goal.",
    catalogHref: "https://catalog.unlv.edu/search_advanced.php?search=HOA%20732",
    outcomes: [
      "Use R and RStudio to prepare data, fit models, evaluate performance, and report reproducible results.",
      "Distinguish statistical learning from machine learning and choose an approach suited to inference or prediction.",
      "Fit and compare logistic regression, decision trees, random forests, support vector machines, and other supervised methods.",
      "Evaluate classification with precision, recall, and F1, and regression with RMSE and R-squared.",
      "Use variable importance, assumptions, diagnostics, and validation results to interpret model behavior.",
      "Formulate real-world hospitality, gaming, finance, and business problems as defensible analytical workflows.",
      "Write concise reports that explain methods, findings, comparisons, and limitations."
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
      { task: "Spring review assignment", points: "75" },
      { task: "Binary logistic regression and decision trees", points: "75" },
      { task: "Decision-tree WIC", points: "75" },
      { task: "Random-forest WIC", points: "75" },
      { task: "Midterm modeling project", points: "300" },
      { task: "Final applied modeling project", points: "400" }
    ],
    schedule: [
      { week: "Jan 20-23", topic: "R review, visualization, statistical inference, multiple regression, and multicollinearity" },
      { week: "Jan 26-30", topic: "Classification with binary logistic regression and decision trees" },
      { week: "Feb 2-6", topic: "Random-forest and support-vector classifiers; midterm project" },
      { week: "Feb 9-13", topic: "Regression with decision trees and random forests" },
      { week: "Feb 17-20", topic: "Support-vector regression and neural networks" },
      { week: "Feb 23-27", topic: "Boosting methods" },
      { week: "Mar 2-6", topic: "Principal components, time-series modeling, and ACF/PACF as time allowed" },
      { week: "Mar 9-13", topic: "Clustering, linear discriminant analysis, and the final project" }
    ],
    materials: [
      {
        title: "Decision tree activity",
        kind: "Assignment",
        description: "A written-in-class activity using decision trees, book club data, and Boston housing data.",
        href: "/assets/course_materials/hoa_732_advanced_statistical_analysis/decision_tree_wic.pdf"
      },
      {
        title: "Random forest activity",
        kind: "Assignments",
        description: "A written-in-class activity using random forests and German credit data.",
        href: "/assets/course_materials/hoa_732_advanced_statistical_analysis/random_forest_wic.pdf"
      },
      {
        title: "Midterm project",
        kind: "Project",
        description: "Compare multiple regression with random forest for sales prediction, then compare logistic regression with random forest for book-purchase classification.",
        href: "/assets/course_materials/hoa_732_advanced_statistical_analysis/midterm_project.txt"
      },
      {
        title: "Final project",
        kind: "Project",
        description: "Compare MLR and SVM for real-estate valuation, then compare logistic regression, random forest, and optional boosting for bank-marketing classification.",
        href: "/assets/course_materials/hoa_732_advanced_statistical_analysis/final_project.pdf"
      }
    ],
    syllabus: {
      instructor: "Mana Azizsoltani, PhD",
      email: "mana.azizsoltani@unlv.edu",
      meeting: "Spring 2026 intensive session",
      room: "HOS 234",
      credits: "3 credits",
      prerequisites: "HOA 730 or equivalent preparation in applied statistics and R",
      description:
        "HOA 732 introduces advanced statistical learning and machine-learning methods in R. The course connects inference and interpretable relationships with predictive modeling, validation, and comparison across regression and classification problems.",
      objectives: [
        "Use RStudio for statistical analysis, predictive modeling, visualization, and interpretation.",
        "Formulate real-world hospitality, gaming, finance, and business questions as regression or classification problems.",
        "Fit and compare logistic regression, decision trees, random forests, support vector machines, boosting, and related methods.",
        "Evaluate regression models with RMSE and R-squared and classification models with precision, recall, and F1.",
        "Use training/test splits, diagnostics, assumptions, and variable importance to evaluate model quality.",
        "Write clear reports that explain the analysis, model comparisons, results, and limitations."
      ],
      assessments: [
        { task: "Spring 2026 review assignment", points: "75", percent: "7.5%", due: "Week 1" },
        { task: "Binary logistic regression and decision trees", points: "75", percent: "7.5%", due: "Week 2" },
        { task: "Decision-tree WIC", points: "75", percent: "7.5%", due: "Week 3" },
        { task: "Random-forest WIC", points: "75", percent: "7.5%", due: "Week 4" },
        { task: "Midterm modeling project", points: "300", percent: "30%", due: "Mid-session" },
        { task: "Final applied modeling project", points: "400", percent: "40%", due: "March 11, 2026" }
      ],
      schedule: [
        { week: "1", topic: "R review, inference, multiple regression, and multicollinearity" },
        { week: "2", topic: "Binary logistic regression and decision-tree classifiers" },
        { week: "3", topic: "Random-forest and support-vector classifiers; midterm project" },
        { week: "4", topic: "Decision-tree and random-forest regression" },
        { week: "5", topic: "Support-vector regression and neural networks" },
        { week: "6", topic: "Boosting methods" },
        { week: "7", topic: "Principal components and time-series concepts as time allowed" },
        { week: "8", topic: "Clustering, linear discriminant analysis, and final project" }
      ],
      sections: [
        {
          label: "Assessment design",
          title: "What students were asked to do",
          copy: "The anonymized grade structure confirms a 1,000-point course built around four 75-point assignments, a 300-point midterm, and a 400-point final project.",
          items: [
            "Compare multiple regression and random forest on a sales-prediction problem.",
            "Compare logistic regression and random forest on book-purchase classification.",
            "Use decision trees for classification and regression and report RMSE where appropriate.",
            "Use random forests for credit classification, variable importance, precision, recall, and F1.",
            "Compare MLR and SVM on a held-out real-estate test set.",
            "Compare classification models for a bank-marketing response while controlling model complexity."
          ]
        }
      ]
    }
  }
];

export function getCourse(slug) {
  return courses.find((course) => course.slug === slug);
}
