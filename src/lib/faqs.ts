// Answers here are promises customers will hold VD3D to. Only state what's true today.
// Grow this list from real customer questions.

export type Faq = { question: string; answer: string[] };

export const faqs: Faq[] = [
  {
    question: "I don’t have a 3D file. Can you still help?",
    answer: [
      "Yes. Most of our jobs start without a file. Send us a sketch, photos with measurements, or the broken part you need to replace, and tell us what it needs to do.",
      "We design it in CAD, print a prototype for you to check, and adjust it until it works. Design time is included in your quote, so you know the full cost before we start.",
    ],
  },
  {
    question: "How much does 3D printing cost?",
    answer: [
      "It depends on the part’s size, the material, how long it takes to print, how many you need, and whether we need to design it first. A small bracket costs far less than a large enclosure, and the price per part usually drops as the quantity goes up.",
      "Every job gets a fixed quote before any work starts, with no surprises. Send us what you have through the quote form and we’ll price it.",
    ],
  },
  {
    question: "How long will my order take?",
    answer: [
      "If you send a print-ready file, most jobs are printed within 1–2 business days. If we’re designing the part, first prints typically take 3–5 days.",
      "Larger production runs depend on the quantity and print time. We’ll give you a realistic date in your quote, and we’ll tell you upfront if we can’t meet your deadline.",
    ],
  },
  {
    question: "What materials do you print with?",
    answer: [
      "Our standard material is PLA+. It’s strong, accurate and comes in a wide range of colours, which makes it right for most prototypes, models, signs and indoor parts.",
      "We also print in PETG for tougher parts with more heat resistance, ABS for durable functional parts, ASA for anything that lives outdoors in the sun, and flexible TPU for grips, bumpers and keyrings.",
      "Not sure which you need? Tell us where the part will be used and what it has to handle, and we’ll recommend the right one.",
    ],
  },
  {
    question: "How strong are 3D printed parts?",
    answer: [
      "Strong enough for brackets, mounts, clips, enclosures, jigs and plenty of everyday functional parts. Strength depends on the material, how solid we print it, and which way the part sits on the printer, because parts are strongest along their layers.",
      "When we know what load a part has to take, we design and orient it for that. For anything safety-critical, where a failure could hurt someone, a 3D print isn’t the right choice and we’ll tell you so.",
    ],
  },
  {
    question: "How big can you print?",
    answer: [
      "A single part can be up to about 25 × 25 × 25 cm. Bigger objects can be printed in sections and joined, with the joins designed in so they line up and hold.",
    ],
  },
  {
    question: "Can you print in more than one colour?",
    answer: [
      "Yes. We can print up to four colours in a single part, so logos, text and details are printed in rather than painted on. That makes it ideal for branded products, signs and gifts.",
    ],
  },
  {
    question: "What file types can I send?",
    answer: [
      "For 3D printing: STL, 3MF, STEP or OBJ. STEP files are best if you want us to modify the design. For laser engraving: SVG, DXF, PDF or a high-resolution PNG.",
      "Not sure what you have? Attach it to the quote form anyway, or send photos and a description and we’ll work out the rest.",
    ],
  },
  {
    question: "Are 3D printed parts food safe?",
    answer: [
      "We don’t recommend 3D printed parts for anything that touches food or drink repeatedly, like cups, plates or utensils. The tiny gaps between printed layers can trap bacteria and are hard to clean properly, even when the plastic itself is food-grade.",
      "Items that only hold wrapped food or sit near it, like display stands and packaging inserts, are a different matter. If food is involved in your job, tell us and we’ll talk through the options.",
    ],
  },
  {
    question: "Do you deliver, or can I pick up?",
    answer: [
      "Both. We ship Australia-wide and internationally with Australia Post, and you’ll get tracking once your order is on its way. Postage depends on the size, weight and destination, and we’ll confirm the cost before you pay.",
      "If you’re local, you’re welcome to collect from our workshop in Bullsbrook, north-east of Perth. We’ll arrange a pickup time with you when your order is ready.",
      "International orders may attract import duties or taxes in the destination country, which are paid by the recipient.",
    ],
  },
  {
    question: "Is my design kept confidential?",
    answer: [
      "Yes. Your files and ideas are only used to make your job. We don’t share them, sell them, or post photos of your parts without your permission.",
    ],
  },
];
