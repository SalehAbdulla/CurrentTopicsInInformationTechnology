/* ============================================================================
 * IT7013 — Current Topics in IT
 * Quiz 1 Trainer · Question bank (Ethical AI 1, 2, 3)
 *
 * Schema for every question:
 *   id      string  unique, e.g. "d1-eu-03"
 *   deck    1 | 2 | 3
 *   topic   string  must exist in TOPICS below
 *   type    "mcq" | "tf" | "multi"
 *   diff    "easy" | "medium" | "hard"
 *   q       string  the question text
 *   options string[]  ("tf" must be exactly ["True","False"])
 *   answer  number[]  indices of the correct option(s)
 *   why     string  explanation shown after answering (or in review)
 *   ref     string  slide reference, e.g. "Deck 1 · slide 18"
 * ========================================================================== */

window.TOPICS = {
  0: ["Cross-deck synthesis", "Trap pairs & look-alikes"],
  1: [
    "Objectives & AI trends",
    "What is ethical AI",
    "CV screening case study",
    "Discrimination & black boxes",
    "Sources of bias",
    "Data collection & culture",
    "EU AI Act risk levels",
    "Mitigation & bias tools"
  ],
  2: [
    "Fairness: the problem",
    "Fairness strategies & metrics",
    "Fairness worked examples",
    "Principles A-H",
    "Transparency",
    "Explainable AI & black boxes",
    "XAI methods & tools"
  ],
  3: [
    "Privacy risks: collection & use",
    "Privacy risks: security & ops",
    "Privacy best practices",
    "AI governance",
    "ISO/IEC 42001: what & why",
    "ISO 42001: structure & requirements",
    "ISO 42001: roles, audits & pitfalls"
  ]
};

window.QUESTION_BANK = [];

function addQuestions(list) {
  for (var i = 0; i < list.length; i++) window.QUESTION_BANK.push(list[i]);
}

/* ======================= DECK 1 · ETHICAL AI -1 ======================= */

addQuestions([
  {
    id: "d1-obj-01",
    deck: 1,
    topic: "Objectives & AI trends",
    type: "mcq",
    diff: "easy",
    q: "Which thematic topic do the first three Ethical AI decks belong to, and what course are they part of?",
    options: [
      "Thematic Topic 1: Ethical AI — IT7013 Current Topics in IT",
      "Thematic Topic 2: Cloud Computing — IT7013 Current Topics in IT",
      "Thematic Topic 1: Ethical AI — IT7020 Advanced Databases",
      "Thematic Topic 3: Cybersecurity — IT7013 Current Topics in IT"
    ],
    answer: [0],
    why: "All three decks are titled 'Thematic Topic 1: Ethical AI' under IT7013: Current Topics in IT, Semester A 2025-2026.",
    ref: "Deck 1 · slide 1"
  },
  {
    id: "d1-obj-02",
    deck: 1,
    topic: "Objectives & AI trends",
    type: "tf",
    diff: "easy",
    q: "A stated lesson objective of the Ethical AI decks is to learn about Explainable AI.",
    options: ["True", "False"],
    answer: [0],
    why: "True — the lesson objectives list 'Learn about Explainable AI' and 'Learn how AI governance can be achieved in Organizations'.",
    ref: "Deck 1 · slide 2"
  },
  {
    id: "d1-obj-03",
    deck: 1,
    topic: "Objectives & AI trends",
    type: "tf",
    diff: "easy",
    q: "The stated goal of the course is to teach students one fixed, universally agreed set of ethical rules for AI.",
    options: ["True", "False"],
    answer: [1],
    why: "False — the goal is to help you develop your OWN skills for ethical thinking, not to memorise one fixed rulebook.",
    ref: "Deck 1 · slide 5"
  },
  {
    id: "d1-obj-04",
    deck: 1,
    topic: "Objectives & AI trends",
    type: "mcq",
    diff: "medium",
    q: "According to the 'future trends in AI and data science' timeline, which trend is paired with 2024?",
    options: [
      "Explainable AI becoming essential as organisations demand transparency",
      "AI democratization empowering non-experts",
      "An intensified spotlight on AI ethics, bias and privacy",
      "Innovations in data privacy such as federated learning"
    ],
    answer: [0],
    why: "2024 = Explainable AI; 2025 = AI democratization; 2026 = AI ethics focus; 2027 = data privacy innovations.",
    ref: "Deck 1 · slide 3"
  },
  {
    id: "d1-obj-05",
    deck: 1,
    topic: "Objectives & AI trends",
    type: "mcq",
    diff: "medium",
    q: "The timeline states that by 2025 'AI democratization' will mean:",
    options: [
      "Non-experts can leverage AI tools easily, helped by open-source platforms and user-friendly interfaces",
      "AI models will stop needing training data",
      "All AI development will be controlled by governments",
      "AI will only be available to large enterprises with GPUs"
    ],
    answer: [0],
    why: "AI democratization = empowering non-experts to use AI easily; open-source platforms and friendly interfaces proliferate, broadening access to data science.",
    ref: "Deck 1 · slide 3"
  },
  {
    id: "d1-obj-06",
    deck: 1,
    topic: "Objectives & AI trends",
    type: "multi",
    diff: "medium",
    q: "Which statements match the 2026 'AI ethics focus' and 2027 'data privacy innovations' entries of the trends timeline? (Select all that apply.)",
    options: [
      "By 2026, concerns around bias and privacy take centre stage",
      "Organisations will be held accountable for ethical AI development, leading to robust frameworks",
      "By 2027, federated learning and differential privacy become standard techniques",
      "By 2027, AI will be able to guarantee zero data breaches by design",
      "By 2027, training data will no longer need to be collected from real users at all"
    ],
    answer: [0, 1, 2],
    why: "The timeline mentions bias/privacy concerns driving accountability and frameworks in 2026, and federated learning + differential privacy becoming standard in 2027. 'Zero breaches guaranteed' is not stated anywhere.",
    ref: "Deck 1 · slide 3"
  },
  {
    id: "d1-def-01",
    deck: 1,
    topic: "What is ethical AI",
    type: "mcq",
    diff: "easy",
    q: "Which of the following is the best definition of AI ethics as given in the slides?",
    options: [
      "A set of guidelines that advise on the design and outcomes of artificial intelligence",
      "A law that bans all autonomous decision-making systems",
      "A programming standard for writing clean machine-learning code",
      "A marketing label for AI products that use deep learning"
    ],
    answer: [0],
    why: "AI ethics is defined as a set of guidelines advising on the design and outcomes of AI, plus the definition of moral values AI must comply with and the regulations, guidelines and constraints AI development must follow.",
    ref: "Deck 1 · slide 6"
  },
  {
    id: "d1-def-02",
    deck: 1,
    topic: "What is ethical AI",
    type: "multi",
    diff: "medium",
    q: "According to the slides, AI ethics includes defining moral values for AI AND which of the following? (Select all that apply.)",
    options: [
      "A set of regulations AI development must follow",
      "A set of guidelines AI development must follow",
      "A set of constraints AI development must follow",
      "A set of hardware requirements for AI data centres",
      "A set of licence fees that AI vendors must pay to their national regulator"
    ],
    answer: [0, 1, 2],
    why: "The definition covers moral values plus regulations, guidelines and constraints. Hardware requirements are not part of the ethical definition.",
    ref: "Deck 1 · slide 6"
  },
  {
    id: "d1-def-03",
    deck: 1,
    topic: "What is ethical AI",
    type: "tf",
    diff: "easy",
    q: "The slides treat 'ethical AI' and 'responsible AI' as closely related ideas (the heading is 'What is Ethical (Responsible) AI?').",
    options: ["True", "False"],
    answer: [0],
    why: "True — the slide is titled 'What is Ethical (Responsible) AI?', i.e. the two terms are used interchangeably in this course.",
    ref: "Deck 1 · slide 4"
  },
  {
    id: "d1-def-04",
    deck: 1,
    topic: "What is ethical AI",
    type: "mcq",
    diff: "easy",
    q: "Which everyday examples are used to show that AI is already part of daily life?",
    options: [
      "Posting pictures to social media, searching online and asking questions from chatbots",
      "Only self-driving cars, industrial robots and other autonomous physical machines",
      "Only military drones, satellites and other defence systems that operate outside everyday civilian life",
      "Only hospital equipment, such as MRI scanners and diagnostic imaging software"
    ],
    answer: [0],
    why: "Social-media posting, online search and chatbot Q&A are the everyday AI touchpoints listed, alongside cities using AI for public services.",
    ref: "Deck 1 · slide 5"
  },
  {
    id: "d1-def-05",
    deck: 1,
    topic: "What is ethical AI",
    type: "tf",
    diff: "medium",
    q: "The slides state that public authorities deliberately avoid algorithmically produced knowledge when designing public services.",
    options: ["True", "False"],
    answer: [1],
    why: "False — the slides say the opposite: authorities such as cities rely on AI for public services, and governments seek solutions to global problems by using algorithmically produced knowledge.",
    ref: "Deck 1 · slide 5"
  },
  {
    id: "d1-case-01",
    deck: 1,
    topic: "CV screening case study",
    type: "mcq",
    diff: "easy",
    q: "In the CV-screening case study, what data was used as ground truth to train the system?",
    options: [
      "The CVs of the company's current employees",
      "A public dataset of graduates from all universities",
      "LinkedIn profiles of the industry's top performers",
      "The CVs of all previously rejected applicants"
    ],
    answer: [0],
    why: "The system used current employees' CVs as ground truth, aiming to select candidates similar to the people already in the company.",
    ref: "Deck 1 · slide 8"
  },
  {
    id: "d1-case-02",
    deck: 1,
    topic: "CV screening case study",
    type: "multi",
    diff: "medium",
    q: "Which results made the biased CV-screening system look successful? (Select all that apply.)",
    options: [
      "The selected people were very good candidates",
      "The system performed better than HR at selecting good candidates",
      "All ML metrics showed stunning performance",
      "An external audit had certified the system as unbiased",
      "The system flagged its own hiring decisions as potentially discriminatory"
    ],
    answer: [0, 1, 2],
    why: "Good candidates, better-than-human performance and stunning ML metrics are exactly why the bias is hard to detect. No audit had certified it.",
    ref: "Deck 1 · slides 8-10"
  },
  {
    id: "d1-case-03",
    deck: 1,
    topic: "CV screening case study",
    type: "tf",
    diff: "medium",
    q: "In the case study, poor ML metrics are the main signal that the system is discriminating.",
    options: ["True", "False"],
    answer: [1],
    why: "False — the slides stress that this problem is NOT easily detectable, the selected people really are good candidates, the system beats humans, and all ML metrics look excellent.",
    ref: "Deck 1 · slides 9-10"
  },
  {
    id: "d1-case-04",
    deck: 1,
    topic: "CV screening case study",
    type: "mcq",
    diff: "medium",
    q: "You delete all gender and race information from the training data. What does the slide say happens?",
    options: [
      "It is 'no use' — the system can still infer gender and race",
      "The bias is fully eliminated",
      "The model refuses to train",
      "The model becomes perfectly fair but less accurate"
    ],
    answer: [0],
    why: "Removing the attributes is 'no use' because the AI can infer them from proxies such as colleges, addresses/geography, sports and activities, disorders, and associations.",
    ref: "Deck 1 · slide 11"
  },
  {
    id: "d1-case-05",
    deck: 1,
    topic: "CV screening case study",
    type: "multi",
    diff: "hard",
    q: "Which of these are given as examples of how the AI can infer a sensitive attribute? (Select all that apply.)",
    options: [
      "Prevalent male-female colleges or address/geographic information",
      "Sports or activities more common in one group (e.g. cheerleader)",
      "Disorders that are more common in one race",
      "Associations such as a female chess team",
      "The file size of the candidate's CV PDF",
      "Membership of a professional engineering or accountancy body"
    ],
    answer: [0, 1, 2, 3],
    why: "Colleges/geography, sports and activities, race-linked disorders, and associations are all listed inference routes. File size is never mentioned.",
    ref: "Deck 1 · slide 11"
  },
  {
    id: "d1-case-06",
    deck: 1,
    topic: "CV screening case study",
    type: "mcq",
    diff: "medium",
    q: "What is the core lesson of the CV-screening case study?",
    options: [
      "A model can be biased and still look excellent on every technical metric, so bias must be audited for explicitly",
      "Machine learning should never be used in recruitment because it is inherently biased",
      "Removing the sensitive attributes is always sufficient to make a model perfectly fair",
      "Human HR staff never make biased hiring decisions of their own accord"
    ],
    answer: [0],
    why: "The example shows undetectable-but-harmful bias: real-world outcomes and metrics look good, so fairness has to be assessed directly rather than inferred from accuracy.",
    ref: "Deck 1 · slides 7-11"
  },
  {
    id: "d1-dis-01",
    deck: 1,
    topic: "Discrimination & black boxes",
    type: "multi",
    diff: "medium",
    q: "According to the 'Discrimination in AI' slide, what harms can discriminatory AI systems cause? (Select all that apply.)",
    options: [
      "Individuals unjustly denied meaningful employment",
      "Denial of access to loans and housing",
      "Increased surveillance from law enforcement",
      "Guaranteed increases in company profits",
      "Lower cloud computing and storage costs for the deploying organisation"
    ],
    answer: [0, 1, 2],
    why: "The slide lists unjust denial of employment, denial of loans and housing, and increased law-enforcement surveillance.",
    ref: "Deck 1 · slide 13"
  },
  {
    id: "d1-dis-02",
    deck: 1,
    topic: "Discrimination & black boxes",
    type: "tf",
    diff: "easy",
    q: "Because AI systems are often 'black boxes', it is harder for people to assess whether they have been discriminated against.",
    options: ["True", "False"],
    answer: [0],
    why: "True — the opaqueness of how and why a decision was made makes discrimination harder to detect and challenge.",
    ref: "Deck 1 · slide 13"
  },
  {
    id: "d1-dis-03",
    deck: 1,
    topic: "Discrimination & black boxes",
    type: "mcq",
    diff: "medium",
    q: "Which statement best reflects the slides' position on bias in AI?",
    options: [
      "AI can amplify bias, even when we do not directly know that it exists",
      "AI eliminates human bias automatically because it is mathematical",
      "Bias only matters if the developers intended to discriminate",
      "Bias is only a problem in academic projects, not in industry"
    ],
    answer: [0],
    why: "The slides state AI can amplify bias even when we do not directly know it exists, with large impacts on people and society — intentional or not.",
    ref: "Deck 1 · slide 13"
  },
  {
    id: "d1-bias-01",
    deck: 1,
    topic: "Sources of bias",
    type: "mcq",
    diff: "medium",
    q: "A facial-recognition dataset contains mostly lighter-skinned faces, so accuracy is poor for darker-skinned faces. Which bias source is this?",
    options: ["Sample bias", "Label bias", "Outcome proxy bias", "Confirmation bias"],
    answer: [0],
    why: "Sample bias = the training data over-represents or under-represents a group (here, mostly lighter-skinned faces).",
    ref: "Deck 1 · slide 14"
  },
  {
    id: "d1-bias-02",
    deck: 1,
    topic: "Sources of bias",
    type: "mcq",
    diff: "medium",
    q: "Content moderators label tweets written by minorities as 'toxic' more often than similar tweets by others. Which bias source is this?",
    options: ["Label bias", "Sample bias", "Group attribution bias", "Outcome proxy bias"],
    answer: [0],
    why: "Label bias = bias introduced during annotation/labeling of the data.",
    ref: "Deck 1 · slide 14"
  },
  {
    id: "d1-bias-03",
    deck: 1,
    topic: "Sources of bias",
    type: "tf",
    diff: "medium",
    q: "Using an outdated dataset from a time when men were far more likely to be accepted for a job or loan is an example of historical/label bias.",
    options: ["True", "False"],
    answer: [0],
    why: "True — the slide gives this as the second label-bias example ('Historical'), linking back to the CV case study.",
    ref: "Deck 1 · slide 14"
  },
  {
    id: "d1-bias-04",
    deck: 1,
    topic: "Sources of bias",
    type: "mcq",
    diff: "hard",
    q: "Predicting 'good employee' by using 'stays long at company' — which punishes women who take maternity leave — is an example of:",
    options: ["Outcome proxy bias", "Sample bias", "Label bias", "Confirmation bias"],
    answer: [0],
    why: "Outcome proxy bias = using the wrong metric as a stand-in for success (tenure as a proxy for being a good employee).",
    ref: "Deck 1 · slide 15"
  },
  {
    id: "d1-bias-05",
    deck: 1,
    topic: "Sources of bias",
    type: "mcq",
    diff: "medium",
    q: "Only testing an AI on scenarios where you already expect it to perform well is which kind of bias?",
    options: ["Confirmation bias", "Sample bias", "Outcome proxy bias", "Group attribution bias"],
    answer: [0],
    why: "Confirmation bias = interpreting data (or choosing tests) in a way that confirms existing beliefs.",
    ref: "Deck 1 · slide 15"
  },
  {
    id: "d1-bias-06",
    deck: 1,
    topic: "Sources of bias",
    type: "mcq",
    diff: "medium",
    q: "An AI predicts lower creditworthiness for people from certain postal codes, stereotyping by group. This is:",
    options: ["Group attribution bias", "Label bias", "Confirmation bias", "Sample bias"],
    answer: [0],
    why: "Group attribution bias = assuming qualities of individuals based on group-level data.",
    ref: "Deck 1 · slide 15"
  },
  {
    id: "d1-bias-07",
    deck: 1,
    topic: "Sources of bias",
    type: "multi",
    diff: "hard",
    q: "Which of the following are classified in the slides as 'data & label bias' rather than 'outcome & human bias'? (Select all that apply.)",
    options: [
      "Sample bias",
      "Label bias",
      "Outcome proxy bias",
      "Confirmation bias"
    ],
    answer: [0, 1],
    why: "Data & label bias = sample bias and label bias. Outcome & human bias = outcome proxy bias, confirmation bias and group attribution bias.",
    ref: "Deck 1 · slides 14-15"
  },
  {
    id: "d1-bias-08",
    deck: 1,
    topic: "Sources of bias",
    type: "tf",
    diff: "easy",
    q: "The slides conclude that bias can creep in before the model even starts training.",
    options: ["True", "False"],
    answer: [0],
    why: "True — after describing sample and label bias the slide states: 'Bias can creep in before the model even starts training.'",
    ref: "Deck 1 · slide 14"
  },
  {
    id: "d1-bias-09",
    deck: 1,
    topic: "Sources of bias",
    type: "tf",
    diff: "easy",
    q: "The slides conclude that human choices and shortcuts can bake bias into outcomes.",
    options: ["True", "False"],
    answer: [0],
    why: "True — the closing line of the outcome & human bias slide.",
    ref: "Deck 1 · slide 15"
  },
  {
    id: "d1-data-01",
    deck: 1,
    topic: "Data collection & culture",
    type: "multi",
    diff: "medium",
    q: "Before you collect data, which questions do the slides advise you to ask? (Select all that apply.)",
    options: [
      "For what purpose was the data collected, and how was it collected?",
      "Do you know who labeled the data, and do you trust them?",
      "Have you checked the labels when the dataset was downloaded or extracted?",
      "Is the dataset large enough to reach 99% accuracy?",
      "How much will it cost per gigabyte to store this dataset in the cloud?"
    ],
    answer: [0, 1, 2],
    why: "The slide lists purpose/provenance, trust in collection and labelling, checking labels, and how the data source was assessed. Dataset size vs 99% accuracy is not on the list.",
    ref: "Deck 1 · slide 16"
  },
  {
    id: "d1-data-02",
    deck: 1,
    topic: "Data collection & culture",
    type: "mcq",
    diff: "medium",
    q: "Which of these is NOT one of the recommended pre-collection questions?",
    options: [
      "What is the profit margin of the AI vendor?",
      "What is the goal of using this dataset and this algorithm?",
      "How was the process of data analysis defined before cleaning began?",
      "Do you know how the data is labeled?"
    ],
    answer: [0],
    why: "Vendor profit margin is not in the list; the slide focuses on purpose, goal, source assessment, analysis definition, labels, labelers and trust.",
    ref: "Deck 1 · slide 16"
  },
  {
    id: "d1-data-03",
    deck: 1,
    topic: "Data collection & culture",
    type: "mcq",
    diff: "medium",
    q: "Regarding culture, the slides warn that a face labelled 'angry' by a western person may be labelled what by an Asian person?",
    options: ["Surprised", "Fearful", "Bored", "Neutral"],
    answer: [0],
    why: "The example given is that a face labelled as angry by a western person may be labelled as surprised by an Asian person.",
    ref: "Deck 1 · slide 17"
  },
  {
    id: "d1-data-04",
    deck: 1,
    topic: "Data collection & culture",
    type: "multi",
    diff: "medium",
    q: "Which factors are said to vary between cultures and therefore affect data interpretation? (Select all that apply.)",
    options: [
      "Emotion recognition and expression",
      "Style of writing, gestures and voice tone",
      "Societal values and accepted norms",
      "The IEEE floating-point standard",
      "The bandwidth of the internet connection used to collect the data"
    ],
    answer: [0, 1, 2],
    why: "Emotion recognition/expression, writing style/gestures/voice tone, and societal values/norms all differ culturally.",
    ref: "Deck 1 · slide 17"
  },
  {
    id: "d1-data-05",
    deck: 1,
    topic: "Data collection & culture",
    type: "tf",
    diff: "easy",
    q: "The slides suggest that you should trust the person who collected and labelled your data without question, as long as the dataset is popular.",
    options: ["True", "False"],
    answer: [1],
    why: "False — one of the recommended questions is precisely 'Do you trust who collected and labeled the data you use?'",
    ref: "Deck 1 · slide 16"
  },
  {
    id: "d1-eu-01",
    deck: 1,
    topic: "EU AI Act risk levels",
    type: "mcq",
    diff: "easy",
    q: "Which EU AI Act risk tier is described as 'Prohibited'?",
    options: ["Unacceptable risk", "High risk", "Limited risk", "Minimal risk"],
    answer: [0],
    why: "The Unacceptable risk tier maps to 'Prohibited' — it includes social scoring, mass surveillance, manipulation of behaviour and causing harm.",
    ref: "Deck 1 · slide 18"
  },
  {
    id: "d1-eu-02",
    deck: 1,
    topic: "EU AI Act risk levels",
    type: "multi",
    diff: "medium",
    q: "Which practices belong to the 'Unacceptable risk' (prohibited) tier? (Select all that apply.)",
    options: ["Social scoring", "Mass surveillance", "Manipulation of behaviour", "Causing harm", "Chatbots", "Emotion recognition systems, which carry only a transparency obligation"],
    answer: [0, 1, 2, 3],
    why: "Social scoring, mass surveillance, manipulation of behaviour and causing harm are all listed as unacceptable/prohibited. Chatbots are only a limited-risk transparency case.",
    ref: "Deck 1 · slide 18"
  },
  {
    id: "d1-eu-03",
    deck: 1,
    topic: "EU AI Act risk levels",
    type: "mcq",
    diff: "medium",
    q: "In the EU AI Act's risk framework, high-risk systems are subject to:",
    options: [
      "Conformity assessment",
      "Transparency obligation only",
      "A complete ban",
      "No obligations at all"
    ],
    answer: [0],
    why: "High risk ⇒ conformity assessment. Limited risk ⇒ transparency obligation. Unacceptable risk ⇒ prohibited.",
    ref: "Deck 1 · slide 18"
  },
  {
    id: "d1-eu-04",
    deck: 1,
    topic: "EU AI Act risk levels",
    type: "multi",
    diff: "hard",
    q: "Which areas are named as 'High risk' in the EU AI Act slide? (Select all that apply.)",
    options: [
      "Law enforcement",
      "Access to employment",
      "Education and public services",
      "Emotion recognition",
      "Chatbots and other limited-risk transparency cases"
    ],
    answer: [0, 1, 2],
    why: "High risk = law enforcement, access to employment, and education/public services. Emotion recognition is grouped under limited risk (transparency obligation).",
    ref: "Deck 1 · slide 18"
  },
  {
    id: "d1-eu-05",
    deck: 1,
    topic: "EU AI Act risk levels",
    type: "mcq",
    diff: "medium",
    q: "Chatbots, emotion recognition and biometric categorisation fall into which tier, and what does it require?",
    options: [
      "Limited risk — transparency obligation",
      "High risk — conformity assessment",
      "Unacceptable risk — prohibition",
      "Minimal risk — no requirements"
    ],
    answer: [0],
    why: "The slide pairs 'Limited Risk: Chatbots, Emotion Recognition, Biometric Categorisation' with 'Transparency Obligation'.",
    ref: "Deck 1 · slide 18"
  },
  {
    id: "d1-eu-06",
    deck: 1,
    topic: "EU AI Act risk levels",
    type: "mcq",
    diff: "hard",
    q: "Which pairing in the EU AI Act risk ladder is INCORRECT?",
    options: [
      "Minimal risk — conformity assessment",
      "Unacceptable risk — prohibited",
      "High risk — conformity assessment",
      "Limited risk — transparency obligation"
    ],
    answer: [0],
    why: "Minimal risk has no assessment regime attached in the slide. Conformity assessment belongs to high risk.",
    ref: "Deck 1 · slide 18"
  },
  {
    id: "d1-eu-07",
    deck: 1,
    topic: "EU AI Act risk levels",
    type: "multi",
    diff: "hard",
    q: "Which applications does the slide list as critical (higher-stakes) uses of AI? (Select all that apply.)",
    options: [
      "Diagnosis applications",
      "Control of critical infrastructure",
      "Credit scoring and hiring",
      "Healthcare",
      "Course projects and theses",
      "Social media content-recommendation feeds for consumer apps"
    ],
    answer: [0, 1, 2, 3],
    why: "Diagnosis, control of critical infrastructure, law enforcement, credit scoring, hiring and healthcare are listed as critical. Course projects/theses are explicitly described as where the risk 'may not be a huge problem'.",
    ref: "Deck 1 · slide 18"
  },
  {
    id: "d1-eu-08",
    deck: 1,
    topic: "EU AI Act risk levels",
    type: "tf",
    diff: "medium",
    q: "The slide argues that bias is a minor concern in student projects but becomes much more serious in applications such as credit scoring, hiring and healthcare.",
    options: ["True", "False"],
    answer: [0],
    why: "True — 'It may not be a huge problem if we build course's projects or even a thesis, but, how about more critical applications: ...'",
    ref: "Deck 1 · slide 18"
  },
  {
    id: "d1-sol-01",
    deck: 1,
    topic: "Mitigation & bias tools",
    type: "mcq",
    diff: "medium",
    q: "What does the slide call comparing the data inputted into an AI system with what comes out at the other end, instead of examining the algorithm itself?",
    options: ["Black box testing", "White box testing", "Unit testing", "Adversarial debiasing"],
    answer: [0],
    why: "Bias audits that compare inputs and outputs rather than inspecting the algorithm are 'sometimes referred to as black box testing'.",
    ref: "Deck 1 · slide 19"
  },
  {
    id: "d1-sol-02",
    deck: 1,
    topic: "Mitigation & bias tools",
    type: "tf",
    diff: "medium",
    q: "Bias audits can only be performed before deployment.",
    options: ["True", "False"],
    answer: [1],
    why: "False — audits/assessments should happen throughout the development AND post-deployment lifecycles, and bias audits can assess AI systems already in use.",
    ref: "Deck 1 · slide 19"
  },
  {
    id: "d1-sol-03",
    deck: 1,
    topic: "Mitigation & bias tools",
    type: "mcq",
    diff: "medium",
    q: "The slide says having clear policies and procedures for what is extremely important to guard against discrimination creeping into an AI system?",
    options: [
      "The procurement of high-quality training and testing data",
      "The procurement of the fastest GPUs available",
      "The hiring of more data scientists",
      "The use of the largest possible model"
    ],
    answer: [0],
    why: "Clear policies and procedures for procuring high-quality training and testing data are highlighted as extremely important.",
    ref: "Deck 1 · slide 19"
  },
  {
    id: "d1-sol-04",
    deck: 1,
    topic: "Mitigation & bias tools",
    type: "mcq",
    diff: "medium",
    q: "In re-sampling, what should you do when one demographic group is under-represented?",
    options: [
      "Oversample the minority group or undersample the majority group",
      "Delete the majority group entirely",
      "Collect no further data and accept the imbalance",
      "Increase the model's learning rate"
    ],
    answer: [0],
    why: "Re-sampling means oversampling the minority group or undersampling the majority group so the model does not favour the dominant group. Data augmentation can synthetically increase representation.",
    ref: "Deck 1 · slide 20"
  },
  {
    id: "d1-sol-05",
    deck: 1,
    topic: "Mitigation & bias tools",
    type: "tf",
    diff: "medium",
    q: "The slides' re-sampling example recommends deleting the male applicants from the dataset so that the remaining data is perfectly balanced.",
    options: ["True", "False"],
    answer: [1],
    why: "False — re-sampling means oversampling the minority group OR undersampling the majority group; the recruitment example oversamples female candidates or applies data augmentation. It never suggests deleting a group.",
    ref: "Deck 1 · slide 20"
  },
  {
    id: "d1-sol-06",
    deck: 1,
    topic: "Mitigation & bias tools",
    type: "mcq",
    diff: "hard",
    q: "How does adversarial debiasing work?",
    options: [
      "One model learns the primary task while another tries to predict demographic variables, and the system is optimised so demographics do not influence predictions",
      "The sensitive attribute is simply deleted from the dataset before training, so the model never sees gender, race or other protected attributes",
      "Different decision thresholds are applied to each group after training, so that approval rates are equalised across the groups without changing the underlying model",
      "The model is trained only on perfectly balanced synthetic data generated to remove every historical disparity from the original training set"
    ],
    answer: [0],
    why: "Adversarial debiasing trains a primary-task model alongside an adversary that predicts demographics (e.g. gender), optimising so that demographic information does not influence predictions.",
    ref: "Deck 1 · slide 21"
  },
  {
    id: "d1-sol-07",
    deck: 1,
    topic: "Mitigation & bias tools",
    type: "tf",
    diff: "hard",
    q: "The slides give AI-driven performance evaluation of employees as a possible use case for adversarial debiasing, so that ratings are not influenced by gender even implicitly.",
    options: ["True", "False"],
    answer: [0],
    why: "True — that example is given on the adversarial debiasing slide.",
    ref: "Deck 1 · slide 21"
  },
  {
    id: "d1-sol-08",
    deck: 1,
    topic: "Mitigation & bias tools",
    type: "multi",
    diff: "medium",
    q: "Which bias detection and mitigation tools are named in the slides? (Select all that apply.)",
    options: [
      "IBM AI Fairness 360 (AIF360)",
      "Fairness Indicators by Google",
      "Microsoft Fairlearn",
      "TensorFlow Privacy Auditor",
      "The Google Model Cards toolkit for documenting model limitations"
    ],
    answer: [0, 1, 2],
    why: "AIF360 (IBM), Fairness Indicators (Google) and Fairlearn (Microsoft) are the three tools listed. 'TensorFlow Privacy Auditor' is invented.",
    ref: "Deck 1 · slide 22"
  },
  {
    id: "d1-sol-09",
    deck: 1,
    topic: "Mitigation & bias tools",
    type: "mcq",
    diff: "medium",
    q: "Which company is associated with 'Fairlearn' in the slides?",
    options: ["Microsoft", "IBM", "Google", "Meta"],
    answer: [0],
    why: "Microsoft Fairlearn; IBM has AI Fairness 360 and Google has Fairness Indicators.",
    ref: "Deck 1 · slide 22"
  },
  {
    id: "d1-sol-10",
    deck: 1,
    topic: "Mitigation & bias tools",
    type: "mcq",
    diff: "medium",
    q: "What is the purpose of re-sampling and data augmentation as described in the slides?",
    options: [
      "To balance datasets where one demographic group is under-represented",
      "To compress the dataset so training is faster",
      "To encrypt the dataset for privacy",
      "To increase model accuracy on the majority group"
    ],
    answer: [0],
    why: "Both are data preprocessing techniques used to clean and balance data before training, ensuring the model does not favour the dominant group.",
    ref: "Deck 1 · slide 20"
  },
]);

/* ======================= DECK 2 · ETHICAL AI -2 ======================= */

addQuestions([
  {
    id: "d2-prob-01",
    deck: 2,
    topic: "Fairness: the problem",
    type: "mcq",
    diff: "easy",
    q: "In the fairness exercise, how many applicants must be chosen out of twelve, and on which two attributes?",
    options: [
      "6 of 12, using gender and credit score",
      "4 of 12, using age and income",
      "6 of 12, using race and postal code",
      "8 of 12, using gender and salary"
    ],
    answer: [0],
    why: "Choose 6 of the 12 applicants based on gender (M/F) and credit score, where higher score is better.",
    ref: "Deck 2 · slide 4"
  },
  {
    id: "d2-prob-02",
    deck: 2,
    topic: "Fairness: the problem",
    type: "mcq",
    diff: "easy",
    q: "In the loan example, which attribute is treated as the 'sensitive attribute'?",
    options: ["Gender", "Credit score", "Loan amount", "Employment status"],
    answer: [0],
    why: "The slide states: 'in this problem, we consider gender as the sensitive attribute'.",
    ref: "Deck 2 · slide 4"
  },
  {
    id: "d2-prob-03",
    deck: 2,
    topic: "Fairness: the problem",
    type: "tf",
    diff: "medium",
    q: "In the loan exercise the credit scores were assigned at random, so gender could not have influenced the ranking.",
    options: ["True", "False"],
    answer: [1],
    why: "False — the scores came from a model trained on historical data in which credit scoring was higher for men than for women, so the ranking already carries that historical bias.",
    ref: "Deck 2 · slide 4"
  },
  {
    id: "d2-prob-04",
    deck: 2,
    topic: "Fairness: the problem",
    type: "mcq",
    diff: "hard",
    q: "What is the key theoretical limitation the slides highlight about fairness criteria?",
    options: [
      "You cannot in general satisfy multiple fairness criteria at once when groups have different base rates (the classic impossibility results)",
      "Fairness can always be achieved by deleting the sensitive attribute, because a model cannot use information it never receives",
      "Only one fairness criterion exists in the literature, and it is the single metric that all regulators currently require organisations to publish",
      "Fairness criteria are all mathematically identical, so the choice between them is purely a matter of presentation and terminology"
    ],
    answer: [0],
    why: "Because base rates differ, the classic impossibility results mean you must pick the metric matching your real-world objective and document the trade-offs.",
    ref: "Deck 2 · slide 4"
  },
  {
    id: "d2-prob-05",
    deck: 2,
    topic: "Fairness: the problem",
    type: "mcq",
    diff: "medium",
    q: "Which framework do the slides say frames fairness as 'context-dependent risk management, not one metric to rule them all'?",
    options: [
      "NIST's AI RMF (and current regulations)",
      "The EU AI Act Annex B",
      "ISO 27001",
      "The IEEE 754 standard"
    ],
    answer: [0],
    why: "The slide states: 'This is exactly how NIST's AI RMF and current regs frame fairness, as context-dependent risk management, not one metric to rule them all.'",
    ref: "Deck 2 · slide 4"
  },
  {
    id: "d2-strat-01",
    deck: 2,
    topic: "Fairness strategies & metrics",
    type: "mcq",
    diff: "medium",
    q: "'Fairness through unawareness' means:",
    options: [
      "Ignoring gender/race in the features and being oblivious to group membership",
      "Applying a different score threshold to each group after training",
      "Matching the true positive rate across the groups being compared",
      "Auditing the model for bias only after it has been deployed"
    ],
    answer: [0],
    why: "Group unaware = the decision is made without paying attention to which group the applicant belongs to (ignoring the sensitive attributes in the features).",
    ref: "Deck 2 · slide 5"
  },
  {
    id: "d2-strat-02",
    deck: 2,
    topic: "Fairness strategies & metrics",
    type: "mcq",
    diff: "medium",
    q: "What is the slides' verdict on 'group unaware' as a fairness strategy?",
    options: [
      "Insufficient, because proxies leak the attribute — use only as a baseline, not a fairness guarantee",
      "It is the strongest available guarantee of fairness in the framework",
      "It is the preferred approach in lending and hiring decisions at scale",
      "It is identical to demographic parity in every practical respect"
    ],
    answer: [0],
    why: "Group unaware is considered insufficient because proxies leak the attribute; use it only as a baseline, not a fairness guarantee.",
    ref: "Deck 2 · slide 5"
  },
  {
    id: "d2-strat-03",
    deck: 2,
    topic: "Fairness strategies & metrics",
    type: "mcq",
    diff: "medium",
    q: "Which strategy uses different score cut-offs per group to meet a target criterion such as equal opportunity or equalized odds?",
    options: [
      "Group-specific thresholds / post-processing — a different cut-off for each group",
      "Demographic parity — equal favourable-prediction rates across the applicant groups",
      "Group unaware — simply ignoring the sensitive attribute in the model's features",
      "Equal accuracy — the same overall percentage correct for each group"
    ],
    answer: [0],
    why: "Group thresholds = group-specific thresholds applied as post-processing to satisfy a chosen criterion, e.g. equal opportunity or equalized odds.",
    ref: "Deck 2 · slide 5"
  },
  {
    id: "d2-strat-04",
    deck: 2,
    topic: "Fairness strategies & metrics",
    type: "multi",
    diff: "medium",
    q: "Demographic parity is also known as which of the following? (Select all that apply.)",
    options: ["Statistical parity", "Selection-rate parity", "Equal opportunity", "Accuracy parity"],
    answer: [0, 1],
    why: "Demographic parity is a.k.a. statistical parity / selection-rate parity. Equal opportunity is a separate criterion and accuracy parity belongs to 'equal accuracy'.",
    ref: "Deck 2 · slide 5"
  },
  {
    id: "d2-strat-05",
    deck: 2,
    topic: "Fairness strategies & metrics",
    type: "mcq",
    diff: "medium",
    q: "What does demographic parity require?",
    options: [
      "Approvals reflect the applicant mix, i.e. the favourable-prediction rate is equal across groups",
      "The true positive rate is equal across groups",
      "The overall accuracy is equal across groups",
      "No sensitive attributes are used as features"
    ],
    answer: [0],
    why: "Demographic (statistical/selection-rate) parity: the proportion of favourable predictions is the same for each group, regardless of who is more qualified.",
    ref: "Deck 2 · slide 5"
  },
  {
    id: "d2-strat-06",
    deck: 2,
    topic: "Fairness strategies & metrics",
    type: "mcq",
    diff: "hard",
    q: "Which caveat do the slides attach to demographic parity?",
    options: [
      "It is widely taught but sometimes misaligned with 'merit' goals — use it when equal selection itself is the objective",
      "It requires a different decision threshold for each group, which means the model must be retrained from scratch",
      "It is mathematically impossible to compute whenever the dataset contains more than one sensitive attribute",
      "It always coincides with equal opportunity, so the two criteria can be used interchangeably in practice"
    ],
    answer: [0],
    why: "The slide notes demographic parity is widely taught but can conflict with merit-based goals; it fits cases where equal selection is the actual objective.",
    ref: "Deck 2 · slide 5"
  },
  {
    id: "d2-strat-07",
    deck: 2,
    topic: "Fairness strategies & metrics",
    type: "mcq",
    diff: "medium",
    q: "Equal opportunity requires:",
    options: [
      "The same true positive rate across groups — qualified people are equally likely to be approved",
      "The same number of approvals granted to each group, regardless of how many applicants each group actually has",
      "The same overall accuracy achieved for each group, measured across all their positive and negative cases",
      "The same false positive rate only, leaving the true positive rate free to differ between the groups"
    ],
    answer: [0],
    why: "Equal opportunity = equal true positive rate (TPR) across groups; qualified applicants get approved at the same rate.",
    ref: "Deck 2 · slide 5"
  },
  {
    id: "d2-strat-08",
    deck: 2,
    topic: "Fairness strategies & metrics",
    type: "mcq",
    diff: "hard",
    q: "Whose work is cited as the canonical definition of equal opportunity in the slides?",
    options: ["Hardt–Price–Srebro", "NIST–ISO–IEEE", "Shapley–Lundberg", "Ribeiro–Singh–Guestrin"],
    answer: [0],
    why: "The slide says 'Canonical definition from Hardt–Price–Srebro' for equal opportunity. (Ribeiro et al. authored LIME; Lundberg & Lee authored SHAP.)",
    ref: "Deck 2 · slide 5"
  },
  {
    id: "d2-strat-09",
    deck: 2,
    topic: "Fairness strategies & metrics",
    type: "mcq",
    diff: "hard",
    q: "Why do the slides caution against 'equal accuracy' (accuracy parity)?",
    options: [
      "It is not a strong safeguard — it can hide disparities when base rates differ, so many prefer equalized odds (matching TPR and FPR)",
      "It is too difficult to measure in practice because most teams lack the tooling needed to compute it",
      "It always over-favours the minority group, so it cannot be used in lending or hiring decisions at all",
      "It is illegal under the EU AI Act, which requires a conformity assessment for every accuracy-parity reporting metric"
    ],
    answer: [0],
    why: "Accuracy parity is a weak safeguard that can hide disparities under differing base rates; equalized odds (matching both TPR and FPR) is often preferred.",
    ref: "Deck 2 · slide 5"
  },
  {
    id: "d2-strat-10",
    deck: 2,
    topic: "Fairness strategies & metrics",
    type: "mcq",
    diff: "hard",
    q: "Equalized odds means matching which two rates across groups?",
    options: [
      "True positive rate and false positive rate",
      "Selection rate and overall accuracy",
      "Prevalence and recall across the dataset",
      "Accuracy and the F1 score"
    ],
    answer: [0],
    why: "The slide parenthetically defines equalized odds as 'match TPR and FPR'.",
    ref: "Deck 2 · slide 5"
  },
  {
    id: "d2-strat-11",
    deck: 2,
    topic: "Fairness strategies & metrics",
    type: "multi",
    diff: "hard",
    q: "According to the 'Picking one' slide, which mapping of objective → criterion is correct? (Select all that apply.)",
    options: [
      "Equal access → demographic parity",
      "Select qualified fairly → equal opportunity (often safest default)",
      "Quick patch without retraining → group thresholds (post-processing)",
      "Baseline only → group unaware (but audit for proxies)",
      "Maximise profit → equal accuracy parity",
      "Avoid measuring anything → group unaware with no proxy audit"
    ],
    answer: [0, 1, 2, 3],
    why: "The first four mappings come straight from the slide. There is no 'maximise profit' objective in the framework — and the slide cautions with equal accuracy unless you've checked the errors.",
    ref: "Deck 2 · slide 10"
  },
  {
    id: "d2-strat-12",
    deck: 2,
    topic: "Fairness strategies & metrics",
    type: "multi",
    diff: "medium",
    q: "Which steps make up the slides' 'practical recipe' for choosing a fairness approach? (Select all that apply.)",
    options: [
      "Define the policy goal — which harm are you preventing?",
      "Measure all metrics on your validation data so you see the trade-offs",
      "Apply pre-processing, in-processing or post-processing to meet the chosen metric",
      "Document the choice plus trade-offs and monitor over time",
      "Pick whichever criterion gives the highest overall accuracy",
      "Skip documentation so the choice can be changed later without a record"
    ],
    answer: [0, 1, 2, 3],
    why: "The first four steps are the recipe. Picking a criterion by accuracy is exactly what the slides warn against — accuracy parity can hide disparities.",
    ref: "Deck 2 · slide 10"
  },
  {
    id: "d2-strat-13",
    deck: 2,
    topic: "Fairness strategies & metrics",
    type: "tf",
    diff: "medium",
    q: "The slides state that fairness is subjective: which solution to use depends on the policy makers, and you cannot optimise all criteria at once.",
    options: ["True", "False"],
    answer: [0],
    why: "True — 'fairness is subjective, i.e., which solution one should go with depends on the policy makers. You can't optimize all at once.'",
    ref: "Deck 2 · slide 10"
  },
  {
    id: "d2-strat-14",
    deck: 2,
    topic: "Fairness strategies & metrics",
    type: "mcq",
    diff: "hard",
    q: "Which fairness strategy involves changing the data (e.g. removing or mitigating proxies) BEFORE model training?",
    options: ["Pre-processing", "In-processing", "Post-processing", "Post-deployment auditing"],
    answer: [0],
    why: "Pre-processing acts on data before training; in-processing adds fairness constraints during training; post-processing adjusts outputs (e.g. group thresholds).",
    ref: "Deck 2 · slide 10"
  },
  {
    id: "d2-ex-01",
    deck: 2,
    topic: "Fairness worked examples",
    type: "mcq",
    diff: "medium",
    q: "In Solution 1 (group unaware), what was the outcome in the loan example?",
    options: [
      "Sorting by credit score alone, all six approved applicants happened to be male",
      "Three men and three women were approved, matching the applicant mix",
      "Five men and one woman were approved, matching the historical pattern",
      "No applicants were approved because none met the credit threshold"
    ],
    answer: [0],
    why: "Sorting purely by credit score and taking the top 6 resulted in all approved applicants being male.",
    ref: "Deck 2 · slide 6"
  },
  {
    id: "d2-ex-02",
    deck: 2,
    topic: "Fairness worked examples",
    type: "tf",
    diff: "medium",
    q: "The slides point out that the group-unaware solution may look fair because it seems to support meritocracy, but it can still be unjust if female applicants have lower scores because women were traditionally underserved.",
    options: ["True", "False"],
    answer: [0],
    why: "True — that is the exact reasoning on the slide; meritocracy built on historically biased scores can reproduce disadvantage.",
    ref: "Deck 2 · slide 6"
  },
  {
    id: "d2-ex-03",
    deck: 2,
    topic: "Fairness worked examples",
    type: "mcq",
    diff: "medium",
    q: "In Solution 2 (group thresholds), what thresholds were used?",
    options: [
      "Credit score 500 for males and 300 for females",
      "Credit score 300 for males and 500 for females",
      "Credit score 400 for both groups",
      "Credit score 600 for males and 600 for females"
    ],
    answer: [0],
    why: "The example fixes the threshold at 500 for males and 300 for females to balance favourable predictions across groups.",
    ref: "Deck 2 · slide 7"
  },
  {
    id: "d2-ex-04",
    deck: 2,
    topic: "Fairness worked examples",
    type: "mcq",
    diff: "medium",
    q: "Under Solution 2 (group thresholds), what share of each group got a loan?",
    options: [
      "62.5% of males (5 of 8) and 25% of females (1 of 4)",
      "50% of males and 50% of females were approved under this rule",
      "75% of males and 50% of females were approved under this rule",
      "62.5% of females and 25% of males were approved under this rule"
    ],
    answer: [0],
    why: "5 of 8 male candidates (62.5%) and 1 of 4 female candidates (25%) were granted loans, which some perceive as not fair enough.",
    ref: "Deck 2 · slide 7"
  },
  {
    id: "d2-ex-05",
    deck: 2,
    topic: "Fairness worked examples",
    type: "mcq",
    diff: "medium",
    q: "How many male and how many female applicants were in the twelve-person loan example?",
    options: ["8 male, 4 female", "6 male, 6 female", "9 male, 3 female", "4 male, 8 female"],
    answer: [0],
    why: "Solution 2 reports 5 of 8 males and 1 of 4 females, and Solution 3 notes women are 50% of applicants when 4 males and 2 females are approved out of 6 — implying 8 male and 4 female applicants.",
    ref: "Deck 2 · slides 7-8"
  },
  {
    id: "d2-ex-06",
    deck: 2,
    topic: "Fairness worked examples",
    type: "mcq",
    diff: "medium",
    q: "In Solution 3 (demographic parity), which applicants were approved?",
    options: [
      "4 males (50% of males) and 2 females (50% of females)",
      "6 males (75%) and 0 females",
      "5 males (62.5%) and 1 female (25%)",
      "3 males and 3 females"
    ],
    answer: [0],
    why: "Demographic parity gives equal favourable rates: 4 of 8 males = 50% and 2 of 4 females = 50%.",
    ref: "Deck 2 · slide 8"
  },
  {
    id: "d2-ex-07",
    deck: 2,
    topic: "Fairness worked examples",
    type: "tf",
    diff: "medium",
    q: "Under demographic parity the aim is to approve exactly the same number of men and women, whatever proportion of the applicant pool each group makes up.",
    options: ["True", "False"],
    answer: [1],
    why: "False — demographic parity matches the favourable-prediction RATE to the applicant mix (women are 50% of applicants → aim for roughly 50% of approvals to be women), not an equal head-count regardless of the mix.",
    ref: "Deck 2 · slide 8"
  },
  {
    id: "d2-ex-08",
    deck: 2,
    topic: "Fairness worked examples",
    type: "mcq",
    diff: "hard",
    q: "How is Solution 4 (equal opportunity / equal true-positive rate) described?",
    options: [
      "Among the people who would repay (the truly qualified), approve the same share in each group — per-group thresholds tuned until hit rates match",
      "Approve the same total number of people from each group, whatever the sizes of those groups happen to be in the applicant pool each cycle",
      "Ignore group membership entirely and rank every applicant by score against one single common decision threshold, as group unaware does",
      "Approve everyone above a single global threshold, then repeatedly adjust that threshold until the mix of approvals looks fair"
    ],
    answer: [0],
    why: "Equal opportunity matches the true positive rate: if 80% of qualified men are approved, roughly 80% of qualified women should be too.",
    ref: "Deck 2 · slide 9"
  },
  {
    id: "d2-ex-09",
    deck: 2,
    topic: "Fairness worked examples",
    type: "mcq",
    diff: "hard",
    q: "Which statement about the four solutions is correct?",
    options: [
      "They apply different fairness criteria to the same data and therefore produce different, defensible outcomes",
      "They all produce exactly the same set of approved applicants",
      "Only demographic parity is mathematically valid",
      "Group unaware is the only solution the slides recommend for lending"
    ],
    answer: [0],
    why: "Each strategy encodes a different definition of fairness, so the approved set changes — which is exactly why fairness is described as subjective and you must match the criterion to the objective.",
    ref: "Deck 2 · slides 6-10"
  },
  {
    id: "d2-prin-01",
    deck: 2,
    topic: "Principles A-H",
    type: "mcq",
    diff: "medium",
    q: "Principle A (Lawful) states that all use of AI will:",
    options: [
      "Comply with applicable laws, standards and regulations",
      "Be reviewed by a government minister",
      "Be limited to non-commercial applications",
      "Be open-sourced"
    ],
    answer: [0],
    why: "Principle A · Lawful — all use of AI will comply with applicable laws, standards and regulations.",
    ref: "Deck 2 · slide 12"
  },
  {
    id: "d2-prin-02",
    deck: 2,
    topic: "Principles A-H",
    type: "mcq",
    diff: "medium",
    q: "Which principle states that all use of AI will be subject to 'Maximum Transparency by Default'?",
    options: ["Principle B · Transparent", "Principle C · Explainable", "Principle D · Responsible", "Principle E · Accountable"],
    answer: [0],
    why: "Principle B · Transparent — 'Maximum Transparency by Default', asking whether we should understand what, and why, AI does whatever it does.",
    ref: "Deck 2 · slide 12"
  },
  {
    id: "d2-prin-03",
    deck: 2,
    topic: "Principles A-H",
    type: "mcq",
    diff: "hard",
    q: "Which principle says the ability of an AI to provide an 'explanation' of its output will be a determining factor in its implementation?",
    options: ["Principle C · Explainable", "Principle B · Transparent", "Principle F · Robust", "Principle G · Fair"],
    answer: [0],
    why: "Principle C · Explainable — the ability to provide an explanation of output is a determining factor in implementation.",
    ref: "Deck 2 · slide 12"
  },
  {
    id: "d2-prin-04",
    deck: 2,
    topic: "Principles A-H",
    type: "mcq",
    diff: "medium",
    q: "Principle D (Responsible) applies to AI that affects the public and requires usage policies plus procedures to ensure:",
    options: [
      "Intensions are defined before deployment so outcomes and impact can be tracked, and users do not accept AI outputs uncritically",
      "Every decision made by the system is reviewed and signed off by a human before it is executed",
      "The AI is retrained every week on the latest data so that its behaviour cannot drift over time",
      "All outputs are published publicly in an open register so that citizens can inspect them afterwards"
    ],
    answer: [0],
    why: "Principle D · Responsible — responsible usage policies (intentions defined before deployment so outcomes/impact can be tracked) and procedures so users do not accept AI outputs uncritically.",
    ref: "Deck 2 · slide 12"
  },
  {
    id: "d2-prin-05",
    deck: 2,
    topic: "Principles A-H",
    type: "mcq",
    diff: "medium",
    q: "Which principle requires a clearly identified individual accountable for an AI's operation and outputs?",
    options: ["Principle E · Accountable", "Principle D · Responsible", "Principle F · Robust", "Principle H · Beneficence"],
    answer: [0],
    why: "Principle E · Accountable — all AI will have a clearly identified individual accountable for its operation and outputs.",
    ref: "Deck 2 · slide 12"
  },
  {
    id: "d2-prin-06",
    deck: 2,
    topic: "Principles A-H",
    type: "mcq",
    diff: "hard",
    q: "Principle F (Robust) requires assessing, tracking and reporting on data quality because:",
    options: [
      "The quality of data dictates the quality of the analysis",
      "Regulators demand monthly reports",
      "Data storage is expensive",
      "Models cannot be trained on unlabelled data"
    ],
    answer: [0],
    why: "Principle F · Robust — data must be robust and reliable enough for its intended purpose, 'recognising that the quality of data dictates the quality of the analysis'.",
    ref: "Deck 2 · slide 12"
  },
  {
    id: "d2-prin-07",
    deck: 2,
    topic: "Principles A-H",
    type: "mcq",
    diff: "easy",
    q: "Which principle is stated simply as 'AI should be fair and non-discriminative'?",
    options: ["Principle G · Fair", "Principle A · Lawful", "Principle C · Explainable", "Principle H · Beneficence"],
    answer: [0],
    why: "Principle G · Fair — AI should be fair and non-discriminative.",
    ref: "Deck 2 · slide 12"
  },
  {
    id: "d2-prin-08",
    deck: 2,
    topic: "Principles A-H",
    type: "mcq",
    diff: "medium",
    q: "What does Principle H (Beneficence / non-maleficence) say?",
    options: [
      "We should use AI for good and not for causing harm",
      "AI should be free for all users",
      "AI must always be faster than humans",
      "AI decisions must be reversible"
    ],
    answer: [0],
    why: "Principle H · Beneficence/non-maleficence — use AI for good, not for causing harm.",
    ref: "Deck 2 · slide 12"
  },
  {
    id: "d2-prin-09",
    deck: 2,
    topic: "Principles A-H",
    type: "multi",
    diff: "hard",
    q: "Which of the following are principles listed on the 'General Principles' slide? (Select all that apply.)",
    options: ["Lawful", "Transparent", "Explainable", "Profitable", "Robust", "Commercially viable"],
    answer: [0, 1, 2, 4],
    why: "The eight principles are Lawful, Transparent, Explainable, Responsible, Accountable, Robust, Fair, Beneficence/non-maleficence. 'Profitable' is not one of them.",
    ref: "Deck 2 · slide 12"
  },
  {
    id: "d2-tr-01",
    deck: 2,
    topic: "Transparency",
    type: "mcq",
    diff: "easy",
    q: "How do the slides define transparency?",
    options: [
      "Access to information about how a system works",
      "The ability to modify a system's source code",
      "Publishing the model's weights publicly",
      "Explaining one single prediction"
    ],
    answer: [0],
    why: "Transparency = access to information about how a system works; it is ethically neutral by itself (an ideal/tool) and the information needed depends on the ethical question at hand.",
    ref: "Deck 2 · slide 13"
  },
  {
    id: "d2-tr-02",
    deck: 2,
    topic: "Transparency",
    type: "tf",
    diff: "medium",
    q: "The slides argue that transparency, by itself, is the whole of AI ethics.",
    options: ["True", "False"],
    answer: [1],
    why: "False — transparency is ethically neutral by itself; the takeaway is that 'transparency isn't the ethics itself; it's a means to answer ethical questions, to justify decisions, uphold rights, and anticipate consequences'.",
    ref: "Deck 2 · slide 13"
  },
  {
    id: "d2-tr-03",
    deck: 2,
    topic: "Transparency",
    type: "multi",
    diff: "medium",
    q: "Which three 'fronts' explain why transparency matters? (Select all that apply.)",
    options: ["Justifying decisions", "Right to know", "Duty of foresight", "Maximising shareholder value", "Protecting the vendor's trade secrets from competitors"],
    answer: [0, 1, 2],
    why: "The three fronts are justifying decisions (reasons plus paths to contest/appeal), the right to know, and the duty of foresight.",
    ref: "Deck 2 · slide 13"
  },
  {
    id: "d2-tr-04",
    deck: 2,
    topic: "Transparency",
    type: "mcq",
    diff: "medium",
    q: "Under 'right to know', what are people entitled to explanations for?",
    options: [
      "To preserve agency, freedom and privacy — e.g. how they are tracked, what inferences are made, and how those inferences were produced",
      "Only when a decision was made by a government agency exercising statutory powers over the individual",
      "Only after the individual has filed a formal complaint or lawsuit challenging the automated decision",
      "Only for people who have paid for a premium tier of the service that offers enhanced data controls"
    ],
    answer: [0],
    why: "The right-to-know front says people are entitled to explanations to preserve agency, freedom and privacy — including how they're tracked, what inferences are made, and how those inferences were produced.",
    ref: "Deck 2 · slide 13"
  },
  {
    id: "d2-tr-05",
    deck: 2,
    topic: "Transparency",
    type: "mcq",
    diff: "medium",
    q: "Which front states that we have a moral obligation to understand and manage the risks of technologies we deploy, and that 'we can't know yet' is not a defence for causing harm?",
    options: ["Duty of foresight", "Right to know", "Justifying decisions", "Maximum transparency by default"],
    answer: [0],
    why: "The duty of foresight front: we must understand and manage the risks of deployed technologies; 'we can't know yet' is not a defence for causing harm.",
    ref: "Deck 2 · slide 13"
  },
  {
    id: "d2-xai-01",
    deck: 2,
    topic: "Explainable AI & black boxes",
    type: "mcq",
    diff: "easy",
    q: "How is Explainable AI (XAI) defined in the slides?",
    options: [
      "AI systems designed to provide human-understandable explanations for their decisions, predictions or behaviours",
      "AI systems that produce always-correct outputs with no possibility of error",
      "AI systems that can be trained without any labelled training data at all",
      "AI systems whose source code and weights are published publicly"
    ],
    answer: [0],
    why: "XAI refers to AI systems designed to provide human-understandable explanations for their decisions, predictions or behaviours.",
    ref: "Deck 2 · slide 14"
  },
  {
    id: "d2-xai-02",
    deck: 2,
    topic: "Explainable AI & black boxes",
    type: "multi",
    diff: "medium",
    q: "Which benefits of XAI are listed in the slides? (Select all that apply.)",
    options: [
      "Enhanced accountability — traceable decisions hold developers and users accountable",
      "Improved model debugging — identifies flawed logic or biased training data",
      "User adoption — clear explanations foster acceptance in real-world applications",
      "Ethical AI governance — supports fairness audits and reduces discrimination risks",
      "Regulatory alignment — meets legal transparency requirements in high-stakes industries",
      "Guaranteed higher accuracy than any black-box model",
      "Removal of the need for any human oversight of the model's decisions"
    ],
    answer: [0, 1, 2, 3, 4],
    why: "The five listed benefits are accountability, model debugging, user adoption, ethical AI governance and regulatory alignment. XAI does not guarantee higher accuracy.",
    ref: "Deck 2 · slide 14"
  },
  {
    id: "d2-xai-03",
    deck: 2,
    topic: "Explainable AI & black boxes",
    type: "mcq",
    diff: "medium",
    q: "Why are some ML models described as 'black boxes'?",
    options: [
      "We know the inputs and outputs but not the internals — especially with neural networks",
      "They are trained on encrypted data, so the weights cannot be inspected without the decryption key",
      "Their licence forbids inspection, which means only the vendor can ever examine the internal logic",
      "They only run on cloud servers, so the internal state is never accessible from the client device"
    ],
    answer: [0],
    why: "Black box: you know the inputs and outputs but not the internals, which is especially the case for neural networks.",
    ref: "Deck 2 · slide 15"
  },
  {
    id: "d2-xai-04",
    deck: 2,
    topic: "Explainable AI & black boxes",
    type: "mcq",
    diff: "hard",
    q: "Which example do the slides use to show that a model can learn the wrong association yet still perform well?",
    options: [
      "Learning to recognise cows",
      "Learning to recognise handwritten digits",
      "Learning to play chess",
      "Learning to translate English to French"
    ],
    answer: [0],
    why: "The slide lists 'e.g., learning to recognize cows' as an example of learning a wrong association that nonetheless results in good performance.",
    ref: "Deck 2 · slide 15"
  },
  {
    id: "d2-xai-05",
    deck: 2,
    topic: "Explainable AI & black boxes",
    type: "multi",
    diff: "medium",
    q: "How do the slides suggest we can create systems that explain their predictions or decisions? (Select all that apply.)",
    options: [
      "Through textual descriptions",
      "Through visualizations",
      "By enabling counterfactual reasoning/explanations",
      "By keeping every model smaller than 1 MB",
      "By publishing the full training dataset alongside the model"
    ],
    answer: [0, 1, 2],
    why: "Textual descriptions, visualizations, and counterfactual reasoning/explanations are the approaches listed on the slide.",
    ref: "Deck 2 · slide 15"
  },
  {
    id: "d2-xm-01",
    deck: 2,
    topic: "XAI methods & tools",
    type: "mcq",
    diff: "easy",
    q: "What does 'Feature Importance' quantify?",
    options: [
      "How much each input feature (e.g. age, income) influences a model's output",
      "How many features the dataset contains in total",
      "How long the model takes to train and retrain",
      "How many hidden layers the model contains in total"
    ],
    answer: [0],
    why: "Feature importance = how much each input feature influences the model's output. It is XAI method #1 in the slides.",
    ref: "Deck 2 · slide 16"
  },
  {
    id: "d2-xm-02",
    deck: 2,
    topic: "XAI methods & tools",
    type: "mcq",
    diff: "medium",
    q: "The slides describe LIME as an 'X-ray of one decision'. This means LIME is:",
    options: [
      "Local — it explains one prediction at a time",
      "Global — it explains the whole model at once",
      "A method for training fair models",
      "A privacy-preserving training technique"
    ],
    answer: [0],
    why: "LIME (Local Interpretable Model-Agnostic Explanations) explains one decision at a time, like a local X-ray image; it tweaks the input slightly and observes how the output changes.",
    ref: "Deck 2 · slide 16"
  },
  {
    id: "d2-xm-03",
    deck: 2,
    topic: "XAI methods & tools",
    type: "mcq",
    diff: "easy",
    q: "What does the acronym LIME stand for?",
    options: [
      "Local Interpretable Model-Agnostic Explanations",
      "Local Inference Model Accuracy Estimator",
      "Linear Interpretable Model Approximation",
      "Layer-wise Importance Measure Engine"
    ],
    answer: [0],
    why: "LIME = Local Interpretable Model-agnostic Explanations (given in the slides as 'Model-Agnostic').",
    ref: "Deck 2 · slide 16"
  },
  {
    id: "d2-xm-04",
    deck: 2,
    topic: "XAI methods & tools",
    type: "mcq",
    diff: "medium",
    q: "Which analogy do the slides use for SHAP?",
    options: [
      "Splitting a restaurant bill fairly",
      "An X-ray of one decision",
      "Sliding one knob while holding others steady",
      "A 'what if' scenario"
    ],
    answer: [0],
    why: "SHAP is likened to splitting a restaurant bill fairly: every feature is like a friend who contributed to dinner, and SHAP distributes 'credit/blame' fairly.",
    ref: "Deck 2 · slide 17"
  },
  {
    id: "d2-xm-05",
    deck: 2,
    topic: "XAI methods & tools",
    type: "mcq",
    diff: "hard",
    q: "Which theory does SHAP come from?",
    options: ["Game theory", "Information theory", "Control theory", "Graph theory"],
    answer: [0],
    why: "SHAP (SHapley Additive exPlanations) comes from game theory — the Shapley value distributes contribution fairly among players (features).",
    ref: "Deck 2 · slide 17"
  },
  {
    id: "d2-xm-06",
    deck: 2,
    topic: "XAI methods & tools",
    type: "mcq",
    diff: "medium",
    q: "The SHAP-style example 'Age = +40% risk, health record = +30%, zip code = +10%' illustrates that SHAP:",
    options: [
      "Calculates how much each feature contributed to the AI's decision",
      "Sorts the dataset by feature importance before the model is trained",
      "Removes the least important features from the model and retrains it on the remainder",
      "Explains only the training process rather than the individual predictions"
    ],
    answer: [0],
    why: "SHAP explains how much each factor contributed to the decision, fairly distributing credit/blame — the insurance example in the slides.",
    ref: "Deck 2 · slide 17"
  },
  {
    id: "d2-xm-07",
    deck: 2,
    topic: "XAI methods & tools",
    type: "mcq",
    diff: "medium",
    q: "Which XAI method is described as 'sliding one knob while holding others steady'?",
    options: [
      "PDP (Partial Dependence Plots) — one feature varying while the others are held fixed",
      "LIME — a local explanation of one individual prediction using small perturbations",
      "SHAP — game-theoretic contributions split fairly among the input features",
      "Feature importance — a global ranking of how much each input matters overall"
    ],
    answer: [0],
    why: "PDP shows how changing one feature affects predictions while keeping all other features constant — like sliding one knob while holding others steady.",
    ref: "Deck 2 · slide 17"
  },
  {
    id: "d2-xm-08",
    deck: 2,
    topic: "XAI methods & tools",
    type: "tf",
    diff: "medium",
    q: "A PDP interpretation such as 'if square footage increases, house price usually goes up (curve is positive)' shows the overall effect of one variable on the outcome.",
    options: ["True", "False"],
    answer: [0],
    why: "True — that is the house-pricing example given for PDP, which reveals the overall effect of a single variable.",
    ref: "Deck 2 · slide 17"
  },
  {
    id: "d2-xm-09",
    deck: 2,
    topic: "XAI methods & tools",
    type: "mcq",
    diff: "medium",
    q: "Counterfactual explanations tell you:",
    options: [
      "What you would need to change to get a different outcome",
      "Which features are most important overall",
      "How the model was trained",
      "What the average prediction is for each group"
    ],
    answer: [0],
    why: "Counterfactuals are 'what if' explanations: e.g. 'If you had 2 more years of experience, you would be accepted.'",
    ref: "Deck 2 · slide 18"
  },
  {
    id: "d2-xm-10",
    deck: 2,
    topic: "XAI methods & tools",
    type: "mcq",
    diff: "hard",
    q: "Which statement correctly distinguishes the XAI methods?",
    options: [
      "LIME explains a single decision, SHAP attributes contributions across features, PDP shows one feature's overall effect, and counterfactuals describe what would change the outcome",
      "LIME is global, SHAP is local, PDP is a training algorithm and counterfactuals measure accuracy",
      "All five methods produce identical explanations",
      "PDP explains individual decisions and LIME explains global trends"
    ],
    answer: [0],
    why: "LIME = local explanation of one prediction; SHAP = contribution of each feature; PDP = overall effect of one feature with others fixed; counterfactual = what changes would flip the decision.",
    ref: "Deck 2 · slides 16-18"
  },
  {
    id: "d2-xm-11",
    deck: 2,
    topic: "XAI methods & tools",
    type: "multi",
    diff: "medium",
    q: "Which statements about xAI tools and transparency are made on the xAI tools slide? (Select all that apply.)",
    options: [
      "xAI tools make AI systems more interpretable so humans can understand how decisions are made",
      "They can help detect whether gender bias plays a role",
      "Transparency helps ensure the model is not operating in a 'black box'",
      "They remove the need for any human oversight",
      "They guarantee that every individual prediction the model makes is correct"
    ],
    answer: [0, 1, 2],
    why: "Interpretability, bias detection (e.g. gender bias) and avoiding black-box operation are all stated. Removing human oversight is not.",
    ref: "Deck 2 · slide 19"
  },
  {
    id: "d2-xm-12",
    deck: 2,
    topic: "XAI methods & tools",
    type: "mcq",
    diff: "medium",
    q: "In the healthcare example, how can XAI tools such as LIME help?",
    options: [
      "They can explain why the system recommended different treatments for a male and a female patient with similar symptoms, helping spot biased patterns",
      "They can guarantee that the recommended treatment is clinically correct for the patient's diagnosed condition and history",
      "They can replace the need for large annotated medical training datasets when building clinical decision models",
      "They can automatically anonymise patient records before those records are stored in the hospital data warehouse"
    ],
    answer: [0],
    why: "The use case: XAI like LIME explains why different treatments were recommended for similar symptoms, which helps spot biased patterns and explain the AI's suggestions.",
    ref: "Deck 2 · slide 19"
  },
  {
    id: "d2-xm-13",
    deck: 2,
    topic: "XAI methods & tools",
    type: "mcq",
    diff: "hard",
    q: "Which LIME library does the slide link to on GitHub?",
    options: ["marcotcr/lime", "slundberg/shap", "IBM/AIF360", "fairlearn/fairlearn"],
    answer: [0],
    why: "The slide links to https://github.com/marcotcr/lime (the LIME repository). SHAP's repo is slundberg/shap.",
    ref: "Deck 2 · slide 19"
  },
  {
    id: "d2-xm-14",
    deck: 2,
    topic: "XAI methods & tools",
    type: "tf",
    diff: "medium",
    q: "LIME only works with neural networks, whereas SHAP is the model-agnostic alternative.",
    options: ["True", "False"],
    answer: [1],
    why: "False — LIME stands for Local Interpretable Model-agnostic Explanations: both LIME and SHAP can be applied across model types, not just to one algorithm.",
    ref: "Deck 2 · slides 16-18"
  },
]);

/* ======================= DECK 3 · ETHICAL AI -3 ======================= */

addQuestions([
  {
    id: "d3-col-01",
    deck: 3,
    topic: "Privacy risks: collection & use",
    type: "mcq",
    diff: "easy",
    q: "The slides say AI privacy concerns can often be traced back to issues regarding:",
    options: [
      "Data collection, cybersecurity, model design and governance",
      "Only data collection",
      "Only model design",
      "Only the cost of GPUs and storage"
    ],
    answer: [0],
    why: "'We can often trace AI privacy concerns to issues regarding data collection, cybersecurity, model design and governance.'",
    ref: "Deck 3 · slide 4"
  },
  {
    id: "d3-col-02",
    deck: 3,
    topic: "Privacy risks: collection & use",
    type: "mcq",
    diff: "medium",
    q: "Why is 'sensitive data over-collection' a privacy risk?",
    options: [
      "Training at terabyte-petabyte scale sweeps in health, finance and biometric data, raising the chance of exposure or misuse",
      "Because larger training sets always improve model accuracy, so every available field should be collected",
      "Because storing health and financial records in the cloud is cheaper per gigabyte than keeping them on-premises",
      "Because regulators require organisations to retain every collected field indefinitely for future audits"
    ],
    answer: [0],
    why: "Large-scale training often sweeps in health, finance and biometric data; the more sensitive data stored/transmitted, the higher the chance of exposure or misuse.",
    ref: "Deck 3 · slide 4"
  },
  {
    id: "d3-col-03",
    deck: 3,
    topic: "Privacy risks: collection & use",
    type: "mcq",
    diff: "medium",
    q: "'Collection without consent/notice' is illustrated by:",
    options: [
      "Defaults/auto-opt-ins and broad scraping that violate expectations of autonomy and transparency",
      "Encrypting data at rest",
      "Asking users to re-confirm consent when the purpose changes",
      "Publishing plain-language privacy summaries"
    ],
    answer: [0],
    why: "Data is procured for AI development without explicit, informed consent or awareness; defaults, auto-opt-ins and broad scraping violate expectations of autonomy and transparency.",
    ref: "Deck 3 · slide 4"
  },
  {
    id: "d3-col-04",
    deck: 3,
    topic: "Privacy risks: collection & use",
    type: "mcq",
    diff: "medium",
    q: "Which term do the slides use for data shared for purpose X being repurposed later for model training/deployment in purpose Y?",
    options: ["Purpose creep", "Data drift", "Model collapse", "Label leakage"],
    answer: [0],
    why: "'Use beyond permission' is labelled 'purpose creep' — even if initial consent existed, undisclosed reuse undermines privacy rights and trust.",
    ref: "Deck 3 · slide 4"
  },
  {
    id: "d3-col-05",
    deck: 3,
    topic: "Privacy risks: collection & use",
    type: "tf",
    diff: "medium",
    q: "According to the slides, if a user gave consent for one purpose, undisclosed reuse for another purpose is acceptable because consent already exists.",
    options: ["True", "False"],
    answer: [1],
    why: "False — 'Even if initial consent existed, undisclosed reuse undermines privacy rights and trust.' The privacy best practices require reacquiring consent if the purpose or use case changes.",
    ref: "Deck 3 · slide 4"
  },
  {
    id: "d3-sec-01",
    deck: 3,
    topic: "Privacy risks: security & ops",
    type: "mcq",
    diff: "medium",
    q: "How can AI extend surveillance reach and permanence?",
    options: [
      "By analysing CCTV, cookies and sensors",
      "By encrypting CCTV footage",
      "By deleting old sensor logs",
      "By limiting data collection to a single day"
    ],
    answer: [0],
    why: "'Unchecked surveillance & bias' — AI analysing CCTV, cookies and sensors can extend surveillance reach and permanence, and biased models can amplify harms such as wrongful flags or arrests.",
    ref: "Deck 3 · slide 5"
  },
  {
    id: "d3-sec-02",
    deck: 3,
    topic: "Privacy risks: security & ops",
    type: "mcq",
    diff: "medium",
    q: "What is 'data exfiltration'?",
    options: [
      "Theft — attackers extracting valuable inputs and artefacts from models or apps",
      "Accidental exposure of data through logs or misconfigurations",
      "Compressing data before storage",
      "Deleting data once its retention period ends"
    ],
    answer: [0],
    why: "Data exfiltration = theft. Models/apps hold valuable inputs and artefacts that attract attackers.",
    ref: "Deck 3 · slide 5"
  },
  {
    id: "d3-sec-03",
    deck: 3,
    topic: "Privacy risks: security & ops",
    type: "multi",
    diff: "hard",
    q: "Which tactics are listed for data exfiltration? (Select all that apply.)",
    options: ["Prompt injection", "Tool/plugin abuse", "API compromise to extract secrets", "Deleting the training data", "Encrypting the model weights with a frequently rotated key"],
    answer: [0, 1, 2],
    why: "Prompt injection, tool/plugin abuse and API compromise are the listed tactics used to extract secrets.",
    ref: "Deck 3 · slide 5"
  },
  {
    id: "d3-sec-04",
    deck: 3,
    topic: "Privacy risks: security & ops",
    type: "mcq",
    diff: "hard",
    q: "What distinguishes 'data leakage' from 'data exfiltration' in the slides?",
    options: [
      "Leakage is accidental exposure (bugs, logs, misconfigurations) whereas exfiltration is theft by attackers",
      "Leakage is theft by attackers whereas exfiltration is accidental",
      "They are exactly the same thing",
      "Leakage only happens in cloud systems"
    ],
    answer: [0],
    why: "Data leakage (accidental exposure): bugs, logs or misconfigurations reveal other users' data across sessions or tenants. Data exfiltration (theft): deliberate extraction by attackers.",
    ref: "Deck 3 · slide 5"
  },
  {
    id: "d3-sec-05",
    deck: 3,
    topic: "Privacy risks: security & ops",
    type: "tf",
    diff: "medium",
    q: "Data leakage is confined to third-party cloud services; in-house AI applications cannot expose one user's information to another.",
    options: ["True", "False"],
    answer: [1],
    why: "False — the slide states that even in-house AI apps can leak proprietary or personal information when certain prompts trigger spills, including across sessions or tenants.",
    ref: "Deck 3 · slide 5"
  },
  {
    id: "d3-sec-06",
    deck: 3,
    topic: "Privacy risks: security & ops",
    type: "mcq",
    diff: "medium",
    q: "Which of the following is NOT listed as a security & operations privacy risk?",
    options: [
      "Over-collecting sensitive data",
      "Unchecked surveillance and bias",
      "Data exfiltration",
      "Data leakage"
    ],
    answer: [0],
    why: "Over-collection is a 'collection & use' risk; the security & operations risks are unchecked surveillance & bias, data exfiltration, and data leakage.",
    ref: "Deck 3 · slides 4-5"
  },
  {
    id: "d3-bp-01",
    deck: 3,
    topic: "Privacy best practices",
    type: "mcq",
    diff: "medium",
    q: "For 'conduct risk assessments', what scope do the slides recommend?",
    options: [
      "Evaluate privacy risks throughout design → deployment, including harms to non-users via inference/linkage",
      "Assess risks only after the system is in production",
      "Assess only the risks to the company's reputation",
      "Assess only data stored on-premises"
    ],
    answer: [0],
    why: "Risk assessments should span design to deployment and explicitly include harms to non-users arising from inference and linkage.",
    ref: "Deck 3 · slide 6"
  },
  {
    id: "d3-bp-02",
    deck: 3,
    topic: "Privacy best practices",
    type: "mcq",
    diff: "medium",
    q: "What does 'limit data collection' require?",
    options: [
      "Collect only what is lawful and necessary and aligned with people's reasonable expectations; set retention limits and delete ASAP",
      "Collect as much data as possible so that the models are as accurate as they can possibly be made",
      "Keep every dataset indefinitely in case it is needed for a future project or audit",
      "Collect only the data that has already been exposed in a previous public breach"
    ],
    answer: [0],
    why: "Limit collection to lawful and necessary data that matches reasonable expectations, with retention limits and prompt deletion.",
    ref: "Deck 3 · slide 6"
  },
  {
    id: "d3-bp-03",
    deck: 3,
    topic: "Privacy best practices",
    type: "tf",
    diff: "medium",
    q: "Under 'seek & confirm consent', organisations must reacquire consent if the purpose or use case changes.",
    options: ["True", "False"],
    answer: [0],
    why: "True — provide clear consent, access and control mechanisms, and reacquire consent if the purpose or use case changes.",
    ref: "Deck 3 · slide 6"
  },
  {
    id: "d3-bp-04",
    deck: 3,
    topic: "Privacy best practices",
    type: "multi",
    diff: "hard",
    q: "Which categories do the slides say should be treated as sensitive domains? (Select all that apply.)",
    options: [
      "Health",
      "Employment",
      "Education",
      "Criminal justice",
      "Finance",
      "Children's data",
      "Publicly posted social-media photos",
      "Publicly available weather and traffic data"
    ],
    answer: [0, 1, 2, 3, 4, 5],
    why: "The slide lists health, employment, education, criminal justice, finance and children's data as sensitive domains. Public social-media content is not one of the named sensitive domains.",
    ref: "Deck 3 · slide 6"
  },
  {
    id: "d3-bp-05",
    deck: 3,
    topic: "Privacy best practices",
    type: "mcq",
    diff: "medium",
    q: "Which control is NOT mentioned under 'follow security best practices'?",
    options: [
      "Making all training data public so that anyone can audit it",
      "Enforcing role-based access controls on all stored personal data throughout its lifecycle",
      "Encrypting personal data both at rest and in transit across every system",
      "Applying anonymization or pseudonymization to direct personal identifiers"
    ],
    answer: [0],
    why: "Access controls, encryption and anonymization/pseudonymization are listed, plus hardening against prompt injection and data leakage. Publishing training data is not.",
    ref: "Deck 3 · slide 7"
  },
  {
    id: "d3-bp-06",
    deck: 3,
    topic: "Privacy best practices",
    type: "mcq",
    diff: "medium",
    q: "What does 'report on data use & storage' involve?",
    options: [
      "Honouring individual data requests about what is used and how, publishing plain-language summaries, and disclosing breaches for sensitive data",
      "Publishing the model's source code and weights so any user can independently verify how it works",
      "Sharing the raw training data with all employees so that everyone can check for bias themselves",
      "Reporting usage statistics to shareholders and regulators once a year in the annual report"
    ],
    answer: [0],
    why: "Honour individual data requests, publish plain-language summaries, and disclose breaches involving sensitive data.",
    ref: "Deck 3 · slide 7"
  },
  {
    id: "d3-bp-07",
    deck: 3,
    topic: "Privacy best practices",
    type: "mcq",
    diff: "medium",
    q: "Under 'use data-governance tools & programs', what should organisations maintain?",
    options: [
      "Data inventories/catalogs and dashboards of privacy assessments, managing issues via workflows across privacy and data owners",
      "A single spreadsheet of AI projects, maintained by the CTO and reviewed once a year",
      "Only paper records for audit purposes, filed centrally so that reviewers can retrieve them during an annual inspection visit",
      "A list of employees with internet access, so the security team knows who can reach AI tools"
    ],
    answer: [0],
    why: "Keep data inventories/catalogs and dashboards of privacy assessments, and manage issues with workflows across privacy and data owners.",
    ref: "Deck 3 · slide 7"
  },
  {
    id: "d3-bp-08",
    deck: 3,
    topic: "Privacy best practices",
    type: "multi",
    diff: "medium",
    q: "What does 'automate privacy-by-design & compliance' include? (Select all that apply.)",
    options: [
      "Minimize and anonymize training data",
      "Encrypt at rest and in transit",
      "Track evolving laws and convert them into enforceable policies for audits",
      "Postpone all compliance work until after product launch",
      "Collect extra fields now in case a future model needs them"
    ],
    answer: [0, 1, 2],
    why: "Minimisation/anonymisation, encryption at rest and in transit, and translating evolving laws into enforceable audit-ready policies. Postponing compliance contradicts privacy-by-design.",
    ref: "Deck 3 · slide 7"
  },
  {
    id: "d3-bp-09",
    deck: 3,
    topic: "Privacy best practices",
    type: "mcq",
    diff: "hard",
    q: "Which two regulations are named alongside privacy-by-design automation in the slides?",
    options: [
      "GDPR and Bahrain PDPL (Personal Data Protection Law – Law No. 30 of 2018)",
      "HIPAA and SOX, the US health-data and financial-reporting statutes",
      "ISO 9001 and ISO 14001, the quality-management and environmental standards",
      "CCPA and PCI-DSS, the California privacy act and card-industry data standard"
    ],
    answer: [0],
    why: "The slide names the GDPR and the Bahrain PDPL: Personal Data Protection Law – Law No. 30 of 2018.",
    ref: "Deck 3 · slide 7"
  },
  {
    id: "d3-bp-10",
    deck: 3,
    topic: "Privacy best practices",
    type: "mcq",
    diff: "hard",
    q: "The Bahrain personal data law referenced in the slides is:",
    options: ["Law No. 30 of 2018", "Law No. 13 of 2016", "Law No. 30 of 2020", "Law No. 12 of 2019"],
    answer: [0],
    why: "Bahrain PDPL = Personal Data Protection Law – Law No. 30 of 2018.",
    ref: "Deck 3 · slide 7"
  },
  {
    id: "d3-gov-01",
    deck: 3,
    topic: "AI governance",
    type: "mcq",
    diff: "medium",
    q: "According to the slides, AI governance is linked to and overlaps with:",
    options: [
      "IT governance and Data governance",
      "Marketing and Sales governance",
      "Only cybersecurity governance",
      "Only financial auditing"
    ],
    answer: [0],
    why: "AI Governance is linked to and overlaps with IT and Data Governance; the Enterprise AI and Governance Strategy should establish structures, processes and procedures within these realms.",
    ref: "Deck 3 · slide 9"
  },
  {
    id: "d3-gov-02",
    deck: 3,
    topic: "AI governance",
    type: "multi",
    diff: "medium",
    q: "What should an Enterprise AI and Governance Strategy establish? (Select all that apply.)",
    options: ["Structures", "Processes", "Procedures", "Profits", "Advertising campaigns for the organisation's AI products"],
    answer: [0, 1, 2],
    why: "The slide says the strategy should establish structures, processes and procedures within the IT and Data Governance realms.",
    ref: "Deck 3 · slide 9"
  },
  {
    id: "d3-gov-03",
    deck: 3,
    topic: "AI governance",
    type: "mcq",
    diff: "medium",
    q: "Which NIST resource is linked on the 'Online resources' slide?",
    options: [
      "The AI Risk Management Framework (AI RMF) playbook — airc.nist.gov/airmf-resources/playbook/",
      "The NIST Cybersecurity Framework 2.0, covering security controls for critical infrastructure",
      "The NIST Privacy Engineering Guidelines for de-identifying datasets before they are released",
      "The NIST Post-Quantum Cryptography Standard for migrating to quantum-safe algorithms"
    ],
    answer: [0],
    why: "The slide links the risk management playbook at https://airc.nist.gov/airmf-resources/playbook/.",
    ref: "Deck 3 · slide 10"
  },
  {
    id: "d3-gov-04",
    deck: 3,
    topic: "AI governance",
    type: "mcq",
    diff: "medium",
    q: "Which organisation's site (oecd.ai) is given as a source of hundreds of principles and policies?",
    options: ["OECD", "IEEE", "ACM", "UNESCO"],
    answer: [0],
    why: "The slide lists https://oecd.ai/en/ — 'Hundreds of principles, policies, available'.",
    ref: "Deck 3 · slide 10"
  },
  {
    id: "d3-iso1-01",
    deck: 3,
    topic: "ISO/IEC 42001: what & why",
    type: "mcq",
    diff: "easy",
    q: "What does AIMS stand for in the context of ISO/IEC 42001?",
    options: [
      "Artificial Intelligence Management System",
      "Automated Information Management Standard",
      "AI Incident Mitigation System",
      "Advanced Intelligence Monitoring Suite"
    ],
    answer: [0],
    why: "ISO/IEC 42001 specifies requirements for establishing, implementing, maintaining and continually improving an Artificial Intelligence Management System (AIMS).",
    ref: "Deck 3 · slide 11"
  },
  {
    id: "d3-iso1-02",
    deck: 3,
    topic: "ISO/IEC 42001: what & why",
    type: "mcq",
    diff: "medium",
    q: "Which four actions does ISO/IEC 42001 require for an AIMS?",
    options: [
      "Establishing, implementing, maintaining and continually improving",
      "Buying, selling, licensing and retiring",
      "Designing, coding, testing and shipping",
      "Funding, staffing, marketing and auditing"
    ],
    answer: [0],
    why: "The standard specifies requirements for establishing, implementing, maintaining and continually improving an AIMS within organizations.",
    ref: "Deck 3 · slide 11"
  },
  {
    id: "d3-iso1-03",
    deck: 3,
    topic: "ISO/IEC 42001: what & why",
    type: "mcq",
    diff: "medium",
    q: "Who is ISO/IEC 42001 designed for?",
    options: [
      "Entities providing or utilizing AI-based products or services, to ensure responsible development and use of AI systems",
      "Only national regulators and standards bodies that certify AI products for the public sector",
      "Only academic and industrial research laboratories that design and train foundation models from scratch",
      "Only hardware manufacturers that embed AI features into consumer devices, network equipment and vehicles"
    ],
    answer: [0],
    why: "It is designed for entities providing or utilizing AI-based products or services, ensuring responsible development and use of AI systems.",
    ref: "Deck 3 · slide 11"
  },
  {
    id: "d3-iso1-04",
    deck: 3,
    topic: "ISO/IEC 42001: what & why",
    type: "multi",
    diff: "medium",
    q: "Why is ISO/IEC 42001 said to be important? (Select all that apply.)",
    options: [
      "It is the world's first AI management system standard",
      "It addresses challenges AI poses such as ethical considerations, transparency and continuous learning",
      "It sets out a structured way to manage risks and opportunities associated with AI, balancing innovation with governance",
      "It guarantees that AI systems will be 100% accurate",
      "It replaces the need for any national AI regulation"
    ],
    answer: [0, 1, 2],
    why: "First AI management system standard, addressing ethical considerations/transparency/continuous learning, and providing a structured way to manage AI risks and opportunities while balancing innovation with governance.",
    ref: "Deck 3 · slide 11"
  },
  {
    id: "d3-iso1-05",
    deck: 3,
    topic: "ISO/IEC 42001: what & why",
    type: "mcq",
    diff: "medium",
    q: "In which year was ISO/IEC 42001 published, according to the slides?",
    options: ["2023", "2021", "2024", "2025"],
    answer: [0],
    why: "The slide states ISO/IEC 42001 is the 'First international standard for AI management systems (published 2023)'.",
    ref: "Deck 3 · slide 12"
  },
  {
    id: "d3-iso1-06",
    deck: 3,
    topic: "ISO/IEC 42001: what & why",
    type: "mcq",
    diff: "medium",
    q: "Which analogy do the slides use to explain ISO/IEC 42001's significance?",
    options: [
      "ISO/IEC 42001 is to AI what ISO 27001 is to security",
      "ISO/IEC 42001 is to AI what TCP/IP is to networking",
      "ISO/IEC 42001 is to AI what GDPR is to marketing",
      "ISO/IEC 42001 is to AI what HTML is to the web"
    ],
    answer: [0],
    why: "'ISO/IEC 42001 is to AI what ISO 27001 is to security. It sets the rules companies must follow, and it will shape the jobs you work in.'",
    ref: "Deck 3 · slide 12"
  },
  {
    id: "d3-iso1-07",
    deck: 3,
    topic: "ISO/IEC 42001: what & why",
    type: "multi",
    diff: "medium",
    q: "Why do the slides say ISO/IEC 42001 matters to students? (Select all that apply.)",
    options: [
      "Companies adopting AI will need to follow governance standards",
      "As future engineers you may help design, audit or comply with these systems",
      "It builds trust — customers, regulators and employers prefer AI that meets standards",
      "It replaces the need to study machine learning algorithms",
      "It exempts certified organisations from privacy law"
    ],
    answer: [0, 1, 2],
    why: "Companies must follow governance standards; future engineers may design, audit or comply; and standards build trust with customers, regulators and employers.",
    ref: "Deck 3 · slide 12"
  },
  {
    id: "d3-iso1-08",
    deck: 3,
    topic: "ISO/IEC 42001: what & why",
    type: "tf",
    diff: "medium",
    q: "ISO/IEC 42001 specifies which AI model architecture and vendor an organisation must adopt.",
    options: ["True", "False"],
    answer: [1],
    why: "False — the standard provides a framework for responsible, transparent and accountable AI and is explicitly not product-specific: it is how you run AI, not which model you pick.",
    ref: "Deck 3 · slide 12"
  },
  {
    id: "d3-iso2-01",
    deck: 3,
    topic: "ISO 42001: structure & requirements",
    type: "mcq",
    diff: "medium",
    q: "Which sequence describes the AI lifecycle covered by ISO/IEC 42001?",
    options: [
      "Idea → data → development → deployment → operation → retirement",
      "Design → marketing → sales → support",
      "Data → model → profit → exit",
      "Idea → funding → hiring → launch"
    ],
    answer: [0],
    why: "The standard is a management framework for the entire AI lifecycle: idea → data → development → deployment → operation → retirement.",
    ref: "Deck 3 · slide 13"
  },
  {
    id: "d3-iso2-02",
    deck: 3,
    topic: "ISO 42001: structure & requirements",
    type: "multi",
    diff: "medium",
    q: "What does ISO/IEC 42001 require organisations to do? (Select all that apply.)",
    options: [
      "Identify risks",
      "Set controls",
      "Assign roles",
      "Keep records",
      "Improve over time",
      "Guarantee zero AI incidents",
      "Publish the weights of every model it deploys"
    ],
    answer: [0, 1, 2, 3, 4],
    why: "The slide lists identify risks, set controls, assign roles, keep records and improve over time. Zero incidents can never be guaranteed — the framework is about managing risk and improving continuously.",
    ref: "Deck 3 · slide 13"
  },
  {
    id: "d3-iso2-03",
    deck: 3,
    topic: "ISO 42001: structure & requirements",
    type: "tf",
    diff: "medium",
    q: "ISO/IEC 42001 is product-specific: it tells you which AI model or vendor to pick.",
    options: ["True", "False"],
    answer: [1],
    why: "False — 'Not product-specific: it's how you run AI, not which model you pick.'",
    ref: "Deck 3 · slide 13"
  },
  {
    id: "d3-iso2-04",
    deck: 3,
    topic: "ISO 42001: structure & requirements",
    type: "mcq",
    diff: "hard",
    q: "What does Annex A of ISO/IEC 42001 contain?",
    options: [
      "A controls list with concrete control topics such as data governance, model risk, testing/validation, monitoring and incident management",
      "Practical implementation guidance for the controls, covering process owners, inputs/outputs and checkpoints, with worked examples",
      "Typical AI objectives such as safety, fairness and privacy, together with the risk sources an organisation should consider when scoping its AIMS",
      "References to sector standards in health, finance and education, so that requirements can be aligned with domain rules"
    ],
    answer: [0],
    why: "Annex A = controls list (concrete control topics). Annex B = how-to implementation guidance; Annex C = objectives & risks; Annex D = sector links.",
    ref: "Deck 3 · slide 14"
  },
  {
    id: "d3-iso2-05",
    deck: 3,
    topic: "ISO 42001: structure & requirements",
    type: "mcq",
    diff: "hard",
    q: "Which annex provides practical implementation guidance for the controls, covering process owners, inputs/outputs and checkpoints?",
    options: ["Annex B", "Annex A", "Annex C", "Annex D"],
    answer: [0],
    why: "Annex B is the 'How-to': practical implementation guidance for Annex A (process owners, inputs/outputs, checkpoints).",
    ref: "Deck 3 · slide 14"
  },
  {
    id: "d3-iso2-06",
    deck: 3,
    topic: "ISO 42001: structure & requirements",
    type: "multi",
    diff: "hard",
    q: "Which items belong to Annex C (objectives & risks)? (Select all that apply.)",
    options: [
      "Typical AI objectives such as safety, fairness and privacy",
      "Risk sources to consider",
      "Concrete control topics such as incident management",
      "References to health, finance and education standards"
    ],
    answer: [0, 1],
    why: "Annex C covers typical AI objectives (safety, fairness, privacy) and risk sources. Control topics belong to Annex A; sector references belong to Annex D.",
    ref: "Deck 3 · slide 14"
  },
  {
    id: "d3-iso2-07",
    deck: 3,
    topic: "ISO 42001: structure & requirements",
    type: "mcq",
    diff: "hard",
    q: "Annex D ('Sector links') is described as:",
    options: [
      "References to domain standards (health, finance, education, etc.) to align requirements",
      "The list of concrete AI controls",
      "Implementation guidance for process owners",
      "The list of AI objectives and risk sources"
    ],
    answer: [0],
    why: "Annex D links to sector/domain standards (health, finance, education, etc.) so requirements can be aligned.",
    ref: "Deck 3 · slide 14"
  },
  {
    id: "d3-iso2-08",
    deck: 3,
    topic: "ISO 42001: structure & requirements",
    type: "multi",
    diff: "medium",
    q: "Which of the following are key requirement areas of ISO/IEC 42001? (Select all that apply.)",
    options: [
      "Leadership",
      "Planning",
      "Support",
      "Operation",
      "Performance evaluation",
      "Continual improvement",
      "Quarterly profit reporting",
      "Shareholder value maximisation"
    ],
    answer: [0, 1, 2, 3, 4, 5],
    why: "The six key requirement areas are Leadership, Planning, Support, Operation, Performance Evaluation and Continual Improvement. Profit reporting is not part of ISO/IEC 42001.",
    ref: "Deck 3 · slide 15"
  },
  {
    id: "d3-iso2-09",
    deck: 3,
    topic: "ISO 42001: structure & requirements",
    type: "mcq",
    diff: "hard",
    q: "Under the 'Leadership' requirement, what must top management do?",
    options: [
      "Back the AIMS and set policy and objectives aligned to strategy",
      "Personally label all training data",
      "Write all the code for AI systems",
      "Approve every individual AI prediction"
    ],
    answer: [0],
    why: "Leadership: top management backs the AIMS; sets policy and objectives aligned to strategy.",
    ref: "Deck 3 · slide 15"
  },
  {
    id: "d3-iso2-10",
    deck: 3,
    topic: "ISO 42001: structure & requirements",
    type: "mcq",
    diff: "hard",
    q: "Which requirement covers providing resources, training, awareness and communication so people can actually implement the AIMS?",
    options: ["Support", "Leadership", "Planning", "Operation"],
    answer: [0],
    why: "Support: provide resources, training, awareness and communication so people can do this for real.",
    ref: "Deck 3 · slide 15"
  },
  {
    id: "d3-iso3-01",
    deck: 3,
    topic: "ISO 42001: roles, audits & pitfalls",
    type: "mcq",
    diff: "medium",
    q: "In ISO/IEC 42001 terms, what is an 'AI Provider'?",
    options: [
      "An organisation offering AI-enabled products/services (e.g. a platform or SaaS vendor), which must govern delivery and support",
      "An organisation that designs, develops, tests and deploys AI models for customers",
      "An organisation that only uses AI to make decisions about people or to serve them",
      "An independent external certification body that audits AI management systems"
    ],
    answer: [0],
    why: "AI Provider = offers AI-enabled products/services (platform or SaaS vendor) and must govern delivery & support.",
    ref: "Deck 3 · slide 16"
  },
  {
    id: "d3-iso3-02",
    deck: 3,
    topic: "ISO 42001: roles, audits & pitfalls",
    type: "mcq",
    diff: "medium",
    q: "Which role owns MLOps, validation and release?",
    options: ["AI Producer", "AI Provider", "AI User", "AI Auditor"],
    answer: [0],
    why: "AI Producer designs/develops/tests/deploys AI (model designers, evaluators) and owns MLOps, validation and release.",
    ref: "Deck 3 · slide 16"
  },
  {
    id: "d3-iso3-03",
    deck: 3,
    topic: "ISO 42001: roles, audits & pitfalls",
    type: "mcq",
    diff: "medium",
    q: "What must an 'AI User' ensure?",
    options: [
      "Fit-for-purpose use, monitoring and human oversight",
      "That the model's code is open source",
      "That training data is collected from scratch",
      "That the AI vendor is ISO-certified"
    ],
    answer: [0],
    why: "The AI User uses AI to make decisions or serve customers and must ensure fit-for-purpose use, monitoring and human oversight.",
    ref: "Deck 3 · slide 16"
  },
  {
    id: "d3-iso3-04",
    deck: 3,
    topic: "ISO 42001: roles, audits & pitfalls",
    type: "mcq",
    diff: "hard",
    q: "What is the difference between an AI Provider and an AI Producer?",
    options: [
      "The Provider offers AI-enabled products/services and governs delivery and support, while the Producer designs/develops/tests/deploys the AI and owns MLOps, validation and release",
      "The Provider trains the models and sells licences, while the Producer writes the policy documents that govern how they are used",
      "The Provider designs, develops and tests the AI and owns MLOps, while the Producer offers the finished product to customers and governs delivery and support",
      "The roles describe the same responsibilities at different stages, so the terms can be used interchangeably in most large organisations"
    ],
    answer: [0],
    why: "Provider = offers AI products/services (governs delivery & support). Producer = designs/develops/tests/deploys (owns MLOps, validation, release). User = applies AI with oversight.",
    ref: "Deck 3 · slide 16"
  },
  {
    id: "d3-iso3-05",
    deck: 3,
    topic: "ISO 42001: roles, audits & pitfalls",
    type: "multi",
    diff: "medium",
    q: "Which steps are part of 'Getting started' with ISO/IEC 42001? (Select all that apply.)",
    options: [
      "Inventory & scope — list AI systems, data sources and third parties, and decide what is in scope for the AIMS",
      "Gap assessment — compare current practice to Annex A, rate risks, pick quick wins vs longer projects",
      "Implement & evidence — roll out priority controls and keep proof such as policies, training records, model cards, test reports and sign-offs",
      "Operate & review — schedule monitoring, audits and management reviews, feeding findings into continuous improvement",
      "Skip documentation so the first release ships faster",
      "Certify the AIMS before any controls have been implemented"
    ],
    answer: [0, 1, 2, 3],
    why: "The four steps are inventory & scope, gap assessment, implement & evidence, and operate & review. Skipping documentation contradicts the evidence requirement.",
    ref: "Deck 3 · slide 17"
  },
  {
    id: "d3-iso3-06",
    deck: 3,
    topic: "ISO 42001: roles, audits & pitfalls",
    type: "multi",
    diff: "hard",
    q: "What evidence does 'implement & evidence' suggest keeping? (Select all that apply.)",
    options: ["Policies", "Training records", "Model cards", "Test reports", "Sign-offs", "Verbal assurances from the team", "The vendor's marketing brochure for the AI product"],
    answer: [0, 1, 2, 3, 4],
    why: "The slide lists policies, training records, model cards, test reports and sign-offs as the proof to retain. Verbal assurances are not auditable evidence.",
    ref: "Deck 3 · slide 17"
  },
  {
    id: "d3-iso3-07",
    deck: 3,
    topic: "ISO 42001: roles, audits & pitfalls",
    type: "multi",
    diff: "medium",
    q: "Under 'policies & roles', what will auditors look for? (Select all that apply.)",
    options: [
      "An approved AI policy",
      "RACI for the data/model lifecycle",
      "Escalation paths",
      "The company's revenue growth",
      "The number of AI models currently in production"
    ],
    answer: [0, 1, 2],
    why: "Auditors look for an approved AI policy, RACI for the data/model lifecycle, and escalation paths.",
    ref: "Deck 3 · slide 18"
  },
  {
    id: "d3-iso3-08",
    deck: 3,
    topic: "ISO 42001: roles, audits & pitfalls",
    type: "multi",
    diff: "hard",
    q: "Which items appear under 'lifecycle records' that auditors examine? (Select all that apply.)",
    options: [
      "Data provenance and consent/rights basis",
      "Labeling SOPs",
      "Model documentation (version, metrics, limitations)",
      "Marketing brochures",
      "The curriculum vitae of the model's lead engineer"
    ],
    answer: [0, 1, 2],
    why: "Lifecycle records = data provenance, consent/rights basis, labeling SOPs and model documentation (version, metrics, limitations).",
    ref: "Deck 3 · slide 18"
  },
  {
    id: "d3-iso3-09",
    deck: 3,
    topic: "ISO 42001: roles, audits & pitfalls",
    type: "multi",
    diff: "medium",
    q: "Which operational artefacts do auditors review? (Select all that apply.)",
    options: [
      "Monitoring dashboards",
      "Incident tickets",
      "Retraining logs",
      "Post-incident reviews",
      "Marketing campaign performance",
      "The organisation's annual sustainability report"
    ],
    answer: [0, 1, 2, 3],
    why: "Operations evidence = monitoring dashboards, incident tickets, retraining logs and post-incident reviews. Marketing metrics are unrelated to AIMS auditing.",
    ref: "Deck 3 · slide 18"
  },
  {
    id: "d3-iso3-10",
    deck: 3,
    topic: "ISO 42001: roles, audits & pitfalls",
    type: "multi",
    diff: "medium",
    q: "Under 'testing & release', what will auditors check? (Select all that apply.)",
    options: [
      "Pre-deployment risk assessments",
      "Bias and safety tests",
      "Approvals and rollback plans",
      "Employee holiday schedules",
      "The office floor plan showing where the AI team sits"
    ],
    answer: [0, 1, 2],
    why: "Testing & release evidence = pre-deployment risk assessments, bias/safety tests, approvals and rollback plans.",
    ref: "Deck 3 · slide 18"
  },
  {
    id: "d3-iso3-11",
    deck: 3,
    topic: "ISO 42001: roles, audits & pitfalls",
    type: "mcq",
    diff: "medium",
    q: "Which pitfall is described as 'We'll fix it later'?",
    options: [
      "Not baking governance into design — governance must be part of design, not only added after launch",
      "Assigning named owners for each control and AI system rather than leaving responsibility vague",
      "Sampling evidence from live projects instead of relying on documents written for the auditor",
      "Planning ongoing monitoring for drift, bias and safety, with thresholds and response playbooks"
    ],
    answer: [0],
    why: "'We'll fix it later': Bake governance into design, not only after launch.",
    ref: "Deck 3 · slide 19"
  },
  {
    id: "d3-iso3-12",
    deck: 3,
    topic: "ISO 42001: roles, audits & pitfalls",
    type: "mcq",
    diff: "medium",
    q: "The 'no ownership' pitfall warns that organisations should:",
    options: [
      "Assign named owners for each control and AI system, avoiding 'everyone/no one' gaps",
      "Let each team decide informally who handles AI risks",
      "Outsource all AI governance to a vendor",
      "Rely on the CISO alone"
    ],
    answer: [0],
    why: "'No ownership': Assign named owners for each control and AI system; avoid 'everyone/no one' gaps.",
    ref: "Deck 3 · slide 19"
  },
  {
    id: "d3-iso3-13",
    deck: 3,
    topic: "ISO 42001: roles, audits & pitfalls",
    type: "mcq",
    diff: "medium",
    q: "What does the 'paper-only compliance' pitfall mean?",
    options: [
      "Documents should align with real workflows, and evidence must be sampled from live projects",
      "Policies must be printed and signed in ink by a named owner",
      "Only paper records are acceptable as evidence during an official audit",
      "Compliance work must be done by external consultants each year"
    ],
    answer: [0],
    why: "'Paper-only compliance': Align documents with real workflows; sample evidence from live projects.",
    ref: "Deck 3 · slide 19"
  },
  {
    id: "d3-iso3-14",
    deck: 3,
    topic: "ISO 42001: roles, audits & pitfalls",
    type: "mcq",
    diff: "hard",
    q: "The 'one-off checks' pitfall recommends instead:",
    options: [
      "Ongoing monitoring (drift, bias, safety) with thresholds and response playbooks",
      "A single annual penetration test",
      "Checking compliance only when a regulator asks",
      "Monitoring only after an incident occurs"
    ],
    answer: [0],
    why: "'One-off checks': Plan ongoing monitoring (drift, bias, safety) with thresholds and response playbooks.",
    ref: "Deck 3 · slide 19"
  },
]);

/* ============ DECK 0 · CROSS-DECK SYNTHESIS (mixes topics 1-3) ============ */

addQuestions([
  {
    id: "d0-syn-01",
    deck: 0,
    topic: "Cross-deck synthesis",
    type: "mcq",
    diff: "hard",
    q: "A model looks excellent on accuracy, but one group is approved at a much lower rate than another. Which combination of ideas from the three decks best addresses this?",
    options: [
      "Measure fairness metrics, audit for proxies and bias, use XAI to explain decisions, and govern the system with a framework such as ISO/IEC 42001",
      "Retrain with more data until accuracy improves further, since higher overall accuracy eliminates disparate outcomes entirely",
      "Delete the sensitive attribute from the training data and redeploy, because the model cannot use information it never receives",
      "Publish the model's source code and training data so that external researchers can identify any remaining bias"
    ],
    answer: [0],
    why: "Deck 1 shows accuracy metrics hide bias; Deck 2 provides fairness metrics and XAI to expose and explain it; Deck 3 provides governance (ISO/IEC 42001) to make the controls durable.",
    ref: "Decks 1-3"
  },
  {
    id: "d0-syn-02",
    deck: 0,
    topic: "Cross-deck synthesis",
    type: "mcq",
    diff: "hard",
    q: "Which statement about bias, fairness and privacy across the three decks is CORRECT?",
    options: [
      "Bias can originate in data collection, fairness requires choosing a criterion and documenting trade-offs, and privacy risks span collection, security, model design and governance",
      "All three problems are solved automatically once a single fairness metric is applied consistently across all groups",
      "Bias is purely a data-collection problem and privacy is purely a legal compliance problem for the regulators involved",
      "Privacy and fairness are entirely unrelated to how the model itself is designed or deployed in practice"
    ],
    answer: [0],
    why: "Deck 1 locates bias in data/labels and human choices; Deck 2 shows fairness is context-dependent with trade-offs you must document; Deck 3 traces privacy concerns to collection, cybersecurity, model design and governance.",
    ref: "Decks 1-3"
  },
  {
    id: "d0-syn-03",
    deck: 0,
    topic: "Cross-deck synthesis",
    type: "multi",
    diff: "hard",
    q: "Which of these appear across the decks as practical countermeasures? (Select all that apply.)",
    options: [
      "Bias audits and black-box testing of inputs vs outputs",
      "Data preprocessing: re-sampling, augmentation and adversarial debiasing",
      "Explainability methods such as LIME, SHAP, PDP and counterfactuals",
      "Governance controls, monitoring and documented evidence (ISO/IEC 42001)",
      "Removing the sensitive attribute from the dataset",
      "Rewriting the model's documentation to describe it as fair"
    ],
    answer: [0, 1, 2, 3],
    why: "All four are concrete countermeasures presented in the decks. Removing the sensitive attribute is explicitly dismissed ('no use. The AI system can infer them!').",
    ref: "Decks 1-3"
  },
  {
    id: "d0-syn-04",
    deck: 0,
    topic: "Cross-deck synthesis",
    type: "mcq",
    diff: "hard",
    q: "Which sequence best reflects the reasoning the decks ask you to apply to a high-stakes AI system?",
    options: [
      "Identify the harm and its risk tier → check data and label provenance → choose and document a fairness criterion → explain decisions → govern, monitor and keep evidence",
      "Improve accuracy until it exceeds the human baseline → ship the model → add a disclaimer to the user interface → wait for complaints to arrive through support channels",
      "Collect as much data as possible → train the largest available model → deploy it to production as quickly as possible → monitor only the aggregate throughput of user requests each day",
      "Buy a certified third-party model → assume that certification makes it fair → publish a privacy policy → revisit the decision only if a regulator opens a formal inquiry"
    ],
    answer: [0],
    why: "This mirrors the course arc: bias sources and risk levels (Deck 1), fairness criteria and XAI (Deck 2), privacy and governance with evidence (Deck 3).",
    ref: "Decks 1-3"
  },
  {
    id: "d0-syn-05",
    deck: 0,
    topic: "Cross-deck synthesis",
    type: "tf",
    diff: "medium",
    q: "Across the three decks, no single metric or technique is presented as solving fairness, bias and privacy at once.",
    options: ["True", "False"],
    answer: [0],
    why: "True — Deck 2's impossibility results ('you can't optimize all at once'), Deck 1's point that good metrics hide bias, and Deck 3's layered governance all reject a single silver bullet.",
    ref: "Decks 1-3"
  },
  {
    id: "d0-syn-06",
    deck: 0,
    topic: "Cross-deck synthesis",
    type: "mcq",
    diff: "hard",
    q: "Which named resource or standard from the decks is correctly matched?",
    options: [
      "NIST AI RMF — risk-management framing of fairness; ISO/IEC 42001 — AI management system; EU AI Act — risk tiers; GDPR and Bahrain PDPL — privacy law",
      "ISO/IEC 42001 — privacy regulation; GDPR — AI fairness metric; EU AI Act — explainability library; NIST AI RMF — a test suite",
      "EU AI Act — an explainability library; LIME — an ISO management standard; SHAP — a privacy regulation; ISO 27001 — a fairness metric",
      "NIST AI RMF — a Python bias toolkit; Fairlearn — the EU risk-tier framework; GDPR — an ISO management system for AI"
    ],
    answer: [0],
    why: "NIST AI RMF frames fairness as risk management (Deck 2), ISO/IEC 42001 is the AI management system standard (Deck 3), the EU AI Act defines risk levels (Deck 1), and GDPR/Bahrain PDPL are privacy laws (Deck 3).",
    ref: "Decks 1-3"
  },
  {
    id: "d0-trap-01",
    deck: 0,
    topic: "Trap pairs & look-alikes",
    type: "mcq",
    diff: "hard",
    q: "An engineer says: 'I tweaked this one applicant's input slightly and watched how the prediction changed.' Which XAI method is being described?",
    options: ["LIME", "SHAP", "PDP", "Counterfactual explanation"],
    answer: [0],
    why: "LIME perturbs the input for a single prediction and observes how the output changes — a local explanation. PDP varies one feature across the whole dataset; SHAP assigns game-theoretic contributions; counterfactuals state what changes would flip the outcome.",
    ref: "Deck 2 · slides 16-18"
  },
  {
    id: "d0-trap-02",
    deck: 0,
    topic: "Trap pairs & look-alikes",
    type: "mcq",
    diff: "hard",
    q: "Which pairing of privacy risk and definition is CORRECT?",
    options: [
      "Data exfiltration = theft by attackers; data leakage = accidental exposure via bugs, logs or misconfigurations",
      "Data exfiltration = accidental exposure; data leakage = theft by attackers",
      "Both terms describe accidental exposure",
      "Both terms describe deliberate theft"
    ],
    answer: [0],
    why: "Exfiltration is deliberate theft (prompt injection, tool/plugin abuse, API compromise); leakage is accidental exposure across sessions or tenants.",
    ref: "Deck 3 · slide 5"
  },
  {
    id: "d0-trap-03",
    deck: 0,
    topic: "Trap pairs & look-alikes",
    type: "mcq",
    diff: "hard",
    q: "A dataset under-represents a group; separately, annotators systematically mark one group's content as 'toxic'. These are, respectively:",
    options: ["Sample bias and label bias", "Label bias and sample bias", "Outcome proxy bias and confirmation bias", "Group attribution bias and outcome proxy bias"],
    answer: [0],
    why: "Under-representation in the data = sample bias. Bias introduced during annotation/labeling = label bias.",
    ref: "Deck 1 · slide 14"
  },
  {
    id: "d0-trap-04",
    deck: 0,
    topic: "Trap pairs & look-alikes",
    type: "mcq",
    diff: "hard",
    q: "Criterion X gives 4 of 8 males and 2 of 4 females approval; criterion Y matches the hit rate only among the truly qualified. X and Y are:",
    options: [
      "X = demographic parity, Y = equal opportunity",
      "X = equal opportunity, Y = demographic parity",
      "X = equal accuracy, Y = group unaware",
      "X = group thresholds, Y = equal accuracy"
    ],
    answer: [0],
    why: "Equal selection rates per group = demographic parity (50% each here). Matching the true positive rate among the qualified = equal opportunity.",
    ref: "Deck 2 · slides 5-9"
  },
  {
    id: "d0-trap-05",
    deck: 0,
    topic: "Trap pairs & look-alikes",
    type: "mcq",
    diff: "medium",
    q: "Which pairing of standards is correct?",
    options: [
      "ISO/IEC 42001 = AI management systems; ISO 27001 = information security",
      "ISO/IEC 42001 = information security; ISO 27001 = AI management systems",
      "ISO/IEC 42001 = privacy law; ISO 27001 = AI ethics code",
      "Both are privacy laws"
    ],
    answer: [0],
    why: "The slides state: 'ISO/IEC 42001 is to AI what ISO 27001 is to security.'",
    ref: "Deck 3 · slide 12"
  },
  {
    id: "d0-trap-06",
    deck: 0,
    topic: "Trap pairs & look-alikes",
    type: "mcq",
    diff: "hard",
    q: "Which statement correctly separates transparency from explainability?",
    options: [
      "Transparency is access to information about how a system works (an ethically neutral means), while explainability is the ability to provide an explanation of a specific output",
      "Explainability is access to information about how a system works, while transparency is the ability to provide an explanation of a specific output for a decision",
      "The two terms are defined identically in the slides, so either one can be substituted for the other when auditing a system or writing its model documentation",
      "Transparency applies only to the datasets used in training, while explainability applies only to the internal architecture of the model"
    ],
    answer: [0],
    why: "Transparency = access to information about how a system works (Principle B / Deck 2 slide 13). Explainable = the ability to provide an explanation of output (Principle C).",
    ref: "Deck 2 · slides 12-13"
  },
  {
    id: "d0-trap-07",
    deck: 0,
    topic: "Trap pairs & look-alikes",
    type: "mcq",
    diff: "hard",
    q: "Data collected for fraud detection is quietly reused to train a marketing model. Which risk is this?",
    options: [
      "Purpose creep — data collected for one purpose is quietly reused for another",
      "Data leakage — bugs, logs or misconfigurations expose other users' data accidentally and across tenants",
      "Label bias — annotators systematically mislabel one group's content during annotation",
      "Sample bias — a group is over-represented or under-represented in the training set"
    ],
    answer: [0],
    why: "Reusing data for an undisclosed purpose is 'purpose creep'; the slides note it undermines privacy rights and trust even where original consent existed.",
    ref: "Deck 3 · slide 4"
  },
  {
    id: "d0-trap-08",
    deck: 0,
    topic: "Trap pairs & look-alikes",
    type: "mcq",
    diff: "hard",
    q: "A hiring tool ranks candidates; auditors compare inputs against outputs without inspecting the algorithm. This is:",
    options: ["Black box testing", "Adversarial debiasing", "Counterfactual explanation", "Re-sampling"],
    answer: [0],
    why: "Bias audits that compare inputs to outputs instead of examining the algorithm are called black box testing (Deck 1). Adversarial debiasing and re-sampling are training-time techniques.",
    ref: "Deck 1 · slide 19"
  },
  {
    id: "d0-trap-09",
    deck: 0,
    topic: "Trap pairs & look-alikes",
    type: "mcq",
    diff: "hard",
    q: "Which pairing of EU AI Act tier and requirement is CORRECT?",
    options: [
      "Unacceptable → prohibited; high → conformity assessment; limited → transparency obligation",
      "Unacceptable → transparency obligation; high → prohibited; limited → conformity assessment",
      "Unacceptable → conformity assessment; high → transparency obligation; limited → prohibited",
      "All tiers require conformity assessment"
    ],
    answer: [0],
    why: "Prohibited = unacceptable risk; conformity assessment = high risk; transparency obligation = limited risk.",
    ref: "Deck 1 · slide 18"
  },
  {
    id: "d0-trap-10",
    deck: 0,
    topic: "Trap pairs & look-alikes",
    type: "mcq",
    diff: "hard",
    q: "Which pairing of ISO/IEC 42001 role and responsibility is CORRECT?",
    options: [
      "Producer → designs/develops/tests/deploys and owns MLOps, validation and release; Provider → offers AI products/services and governs delivery and support; User → ensures fit-for-purpose use, monitoring and human oversight",
      "Producer → sells licences and handles billing; Provider → trains the models and owns the training pipeline; User → certifies the finished system against the published standard",
      "Producer → only monitors incidents after release; Provider → only writes the AI policy documents; User → only conducts internal audits, with no responsibility for how the system is used in practice",
      "All three roles have identical responsibilities under the standard, so a single team can hold any combination of them without changing its documented obligations"
    ],
    answer: [0],
    why: "These are exactly the three role definitions given on the ISO/IEC 42001 organisations slide.",
    ref: "Deck 3 · slide 16"
  }
]);

/* ---------------------------------------------------------------------------
 * Bank complete. Distribution (see tools/validate.js for machine verification):
 *   Deck 1 (Ethical AI -1) ............ 52 questions
 *   Deck 2 (Ethical AI -2) ............ 61 questions
 *   Deck 3 (Ethical AI -3) ............ 57 questions
 *   Deck 0 (cross-deck synthesis) ..... 16 questions
 *   TOTAL ............................. 186 questions
 * ------------------------------------------------------------------------- */




/* ============================================================================
 * CHEAT SHEET — curated high-yield facts, one block per deck/topic.
 * Rendered by app.js in the "Cheat sheet" tab (and printable).
 * ========================================================================== */

window.CHEAT_SHEET = [
  {
    deck: 1,
    title: "Deck 1 — Ethical AI 1: bias, risk tiers and remedies",
    topics: [
      {
        name: "Definitions & objectives",
        points: [
          "AI ethics = guidelines advising on the DESIGN and OUTCOMES of AI, plus the moral values AI must comply with and the regulations, guidelines and constraints AI development must follow.",
          "The course goal is to develop YOUR OWN skills for ethical thinking — there is no single fixed rulebook.",
          "Trends timeline: 2024 Explainable AI → 2025 AI democratization → 2026 AI ethics focus (bias & privacy) → 2027 privacy innovations (federated learning, differential privacy)."
        ]
      },
      {
        name: "The CV-screening case study",
        points: [
          "Trained on current employees' CVs as 'ground truth' → selects people similar to those already in the company.",
          "It looks perfect: real good candidates, better than HR, stunning ML metrics. The bias is NOT visible in the metrics.",
          "Deleting gender/race is useless — the model infers them from colleges, geography, sports/activities, race-linked disorders and associations."
        ]
      },
      {
        name: "Sources of bias",
        points: [
          "Data & label bias → Sample bias (a group over/under-represented) and Label bias (introduced during annotation; also historical data where men were preferred).",
          "Outcome & human bias → Outcome proxy bias (wrong metric as a stand-in for success, e.g. tenure vs maternity leave), Confirmation bias (testing only where you expect success), Group attribution bias (judging individuals by group data, e.g. postal code)."
        ]
      },
      {
        name: "EU AI Act risk levels",
        points: [
          "Unacceptable = PROHIBITED: social scoring, mass surveillance, manipulation of behaviour, causing harm.",
          "High = CONFORMITY ASSESSMENT: law enforcement, access to employment, education & public services.",
          "Limited = TRANSPARENCY OBLIGATION: chatbots, emotion recognition, biometric categorisation.",
          "Minimal = no special regime. Critical uses named: diagnosis, critical infrastructure, law enforcement, credit scoring, hiring, healthcare."
        ],
        trap: "Trap: do not swap the requirements — prohibited/unacceptable · conformity assessment/high · transparency/limited."
      },
      {
        name: "Remedies & tools",
        points: [
          "Audit/assess throughout development AND post-deployment; procure high-quality training/testing data under clear policies.",
          "Black box testing = compare inputs with outputs instead of inspecting the algorithm.",
          "Pre-processing: re-sampling (oversample minority / undersample majority) + data augmentation.",
          "In-processing: adversarial debiasing — one model performs the task, an adversary predicts demographics, and the system is optimised so demographics do not influence predictions.",
          "Tools: IBM AI Fairness 360 (AIF360), Google Fairness Indicators, Microsoft Fairlearn."
        ]
      }
    ]
  },
  {
    deck: 2,
    title: "Deck 2 — Ethical AI 2: fairness, transparency and explainability",
    topics: [
      {
        name: "Fairness criteria (the five strategies)",
        points: [
          "1 · Group unaware = ignore the attribute. ONLY a baseline; proxies leak it, so it is not a guarantee.",
          "2 · Group thresholds = per-group cut-offs (post-processing) used to hit a target criterion such as equal opportunity or equalized odds.",
          "3 · Demographic (statistical / selection-rate) parity = equal favourable-prediction rate per group; can clash with 'merit' goals.",
          "4 · Equal opportunity = equal true positive rate (qualified people equally likely to be approved); canonical definition Hardt–Price–Srebro; often preferred in lending/hiring.",
          "5 · Equal accuracy = accuracy parity / error-rate balance. CAUTION: weak safeguard, can hide disparities; many prefer equalized odds (match TPR AND FPR).",
          "Impossibility: with different base rates you cannot satisfy all criteria at once — pick the metric that matches the real-world objective and document the trade-offs (how NIST's AI RMF frames fairness)."
        ]
      },
      {
        name: "Worked numbers from the loan example",
        points: [
          "12 applicants (8 male, 4 female), choose 6; sensitive attribute = gender; scores came from a model trained on historically male-favouring data.",
          "S1 group unaware → all 6 approved are male.",
          "S2 group thresholds (500 male / 300 female) → 5 of 8 males (62.5%) vs 1 of 4 females (25%).",
          "S3 demographic parity → 4 males (50%) + 2 females (50%).",
          "S4 equal opportunity → match the approval rate among the truly qualified."
        ],
        trap: "Trap: 62.5%/25% belongs to GROUP THRESHOLDS; 50%/50% belongs to DEMOGRAPHIC PARITY."
      },
      {
        name: "Principles A–H",
        points: [
          "A Lawful · B Transparent ('Maximum Transparency by Default') · C Explainable (an explanation of output is a determining factor in implementation) · D Responsible (intentions defined before deployment; users must not accept outputs uncritically) · E Accountable (a clearly identified individual) · F Robust (data quality dictates analysis quality) · G Fair (fair and non-discriminative) · H Beneficence / non-maleficence (use AI for good, not harm)."
        ]
      },
      {
        name: "Transparency",
        points: [
          "Transparency = access to information about how a system works; ethically neutral by itself — a MEANS, not the ethics.",
          "Three fronts: justifying decisions (+ paths to contest/appeal), right to know, duty of foresight ('we can't know yet' is no defence for causing harm)."
        ]
      },
      {
        name: "XAI methods (know these cold)",
        points: [
          "Feature importance = how much each input feature influences the model's output.",
          "LIME = local 'X-ray of one decision' — tweak the input, watch the output change (model-agnostic).",
          "SHAP = from game theory, 'splitting the restaurant bill fairly' — each feature's contribution to the decision.",
          "PDP = 'sliding one knob while holding others steady' — the overall effect of one feature.",
          "Counterfactual = the 'what if': what would need to change for a different outcome.",
          "XAI benefits: accountability, model debugging, user adoption, ethical AI governance, regulatory alignment. Models can learn the wrong association yet still perform well (the cow example)."
        ],
        trap: "Trap: LIME = one local decision; SHAP = contribution split; PDP = one feature globally; counterfactual = what would flip it."
      }
    ]
  },
  {
    deck: 3,
    title: "Deck 3 — Ethical AI 3: privacy and governance",
    topics: [
      {
        name: "Privacy risks (two families)",
        points: [
          "Collection & use: sensitive-data over-collection (terabyte–petabyte training sweeps in health, finance and biometric data), collection without consent/notice (defaults, auto-opt-ins, broad scraping), purpose creep (reuse for a different purpose).",
          "Security & operations: unchecked surveillance & bias (CCTV, cookies, sensors), data EXFILTRATION = theft (prompt injection, tool/plugin abuse, API compromise), data LEAKAGE = accidental exposure (bugs, logs, misconfigurations across sessions or tenants)."
        ],
        trap: "Trap: exfiltration = deliberate theft; leakage = accidental exposure. Over-collection belongs to COLLECTION & USE."
      },
      {
        name: "Privacy best practices",
        points: [
          "Risk assessments across design → deployment, including harms to non-users via inference/linkage.",
          "Limit collection to what is lawful, necessary and aligned with reasonable expectations; set retention limits and delete ASAP.",
          "Seek & confirm consent; reacquire consent if the purpose or use case changes.",
          "Sensitive domains: health, employment, education, criminal justice, finance, children's data.",
          "Security: access controls, encryption, anonymization/pseudonymization, hardening against prompt injection and data leakage.",
          "Report on data use & storage; honour individual requests; publish plain-language summaries; disclose breaches.",
          "Governance tools: data inventories/catalogs, dashboards of privacy assessments, workflows across privacy & data owners.",
          "Automate privacy-by-design: minimise/anonymise training data, encrypt at rest and in transit, convert evolving laws into enforceable policy (GDPR; Bahrain PDPL — Personal Data Protection Law, Law No. 30 of 2018)."
        ]
      },
      {
        name: "AI governance",
        points: [
          "AI governance overlaps IT governance and Data governance; the Enterprise AI & Governance Strategy sets structures, processes and procedures.",
          "Resources: NIST AI RMF playbook (airc.nist.gov/airmf-resources/playbook/) and OECD (oecd.ai)."
        ]
      },
      {
        name: "ISO/IEC 42001 essentials",
        points: [
          "International standard for an AI Management System (AIMS): establish, implement, maintain, continually improve. First AI management system standard, published 2023.",
          "To AI what ISO 27001 is to security. Not product-specific — it is how you run AI, not which model you pick.",
          "Lifecycle: idea → data → development → deployment → operation → retirement. Identify risks, set controls, assign roles, keep records, improve over time.",
          "Annex A controls list · Annex B how-to · Annex C objectives & risks · Annex D sector links.",
          "Key requirements: Leadership, Planning, Support, Operation, Performance Evaluation, Continual Improvement.",
          "Roles: Provider (offers AI products/services; governs delivery & support) · Producer (designs/develops/tests/deploys; owns MLOps, validation, release) · User (fit-for-purpose use, monitoring, human oversight).",
          "Getting started: inventory & scope → gap assessment (vs Annex A) → implement & evidence (policies, training records, model cards, test reports, sign-offs) → operate & review.",
          "Auditors want: approved AI policy + RACI + escalation paths; data provenance, consent/rights basis, labeling SOPs, model docs (version/metrics/limitations); pre-deployment risk assessments, bias/safety tests, approvals, rollback plans; monitoring dashboards, incident tickets, retraining logs, post-incident reviews.",
          "Pitfalls: 'we'll fix it later', no ownership, paper-only compliance, one-off checks — instead monitor drift, bias and safety with thresholds and response playbooks."
        ],
        trap: "Trap: Provider offers/sells; Producer builds and owns MLOps; User applies it with oversight."
      }
    ]
  },
  {
    deck: 0,
    title: "Cross-deck trap list (read this last before the quiz)",
    topics: [
      {
        name: "Statements that are FALSE in these slides",
        points: [
          "'Removing gender/race fixes bias.' → No; the model infers them.",
          "'Great ML metrics prove the model is fair.' → No; the CV case study shows otherwise.",
          "'One metric can satisfy all fairness criteria.' → No; the impossibility results.",
          "'Group unaware is sufficient.' → Only a baseline; proxies leak.",
          "'ISO/IEC 42001 is product-specific.' → No; it is how you run AI.",
          "'ISO/IEC 42001 was published in 2024.' → It was 2023.",
          "'Transparency IS the ethics.' → No; it is a means.",
          "'Consent for purpose X covers purpose Y.' → No; that is purpose creep.",
          "'Data leakage and data exfiltration are the same.' → Theft vs accident.",
          "'Deploy first, add governance later.' → A named pitfall."
        ]
      },
      {
        name: "Name → concept",
        points: [
          "Hardt–Price–Srebro → equal opportunity · NIST AI RMF → risk-based fairness · EU AI Act → risk tiers · ISO/IEC 42001 → AIMS · ISO 27001 → information security · GDPR & Bahrain PDPL (Law No. 30 of 2018) → privacy law.",
          "LIME → local, one decision · SHAP → Shapley / game theory · PDP → one feature, others fixed · Counterfactual → what-if.",
          "AIF360 (IBM) · Fairness Indicators (Google) · Fairlearn (Microsoft).",
          "Federated learning & differential privacy → the 2027 privacy trends."
        ]
      }
    ]
  }
];



