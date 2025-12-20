import dayjs from "dayjs";

export default {
  siteData: {
    env: process.env.ELEVENTY_ENV,
    buildTime: dayjs().format("dddd, D MMMM YYYY H:mm"),
  },
  now: {
    location: {
      name: "London",
      url: "https://en.wikipedia.org/wiki/London",
    },
    employment: [
      {
        role: "Software Engineer",
        name: "Beacon CRM",
        type: "full time",
        location: "London, UK",
        url: "https://beaconcrm.org",
        start: '20241001',
        end: null,
        summary: "Working within the engineering team to build a CRM that meets the needs of charities large and small, with a specific focus on building integrations with third party platforms.",
        info: [
          "Managed the existing library of <a href='https://www.beaconcrm.org/integrations' target='_blank'>integrations with third parties</a>, including the development of the integration between <a href='https://www.beaconcrm.org/blog/introducing-beacons-fundraise-up-integration' target='_blank'>Beacon CRM and Fundraise Up</a>",
          "Part of a team effort to migrate a set of microservices from JavaScript to TypeScript.",
          "Supported the implementation of information security practices including <a href='https://www.beaconcrm.org/blog/product-update-september-2025' target='_blank'>ISO 20071:2022</a> and CyberEssentials Plus accreditation."
        ]
      },
      {
        role: "Head of Technology",
        name: "Creation.co",
        type: "full time",
        location: "London, UK / Maidstone, UK",
        url: "https://creation.co",
        start: '20240101',
        end: '20240931',
        summary: "SLT member responsible for establishing and leading an in-house technology team to develop and maintain a custom-built social media listening tool.",
        info: [
          "Led the migration and reimplementation of the v2 Twitter/X API to enable the dataset to remain up-to-date.",
          "Developed a proof of concept to explore how Reddit data might be integrated into the system (using NodeJS, Adonis, Redis, OpenAI APIs, etc).",
          "Led the implementation of the UK's <a href='https://www.ncsc.gov.uk/cyberessentials/overview' target='_blank' rel='noopener'>Nataional Cyber Security Centre's Cyber Essentials Plus</a> certification within CREATION.",
          "Managed relationships and project work delivered by contractors and external development partners.",
        ]
      },
      {
        role: "Head of Technology",
        name: "Vixen Labs (now part of House 337)",
        type: "full time",
        location: "London, UK",
        url: "https://vixenlabs.co",
        start: '20210801',
        end: '20231231',
        summary: "Member of the senior leadership team of an agency focused on developing more human and conversational interactions with technology through voice, natural language, and generative AI.",
        info: [
          "Implemented experimental Alexa Shopping Kit functionality to the <a href='https://vixenlabs.co/learn-how-to-do-anything-with-the-wikihow-alexa-skill' target='_blank' rel='noopener'>wikiHow skill</a> to be demonstrated in the opening session of the <a href='https://developer.amazon.com/en-US/alexa/alexa-live' target='_blank' rel='noopener'>2022 Alexa Live conference</a>.",
          "Led the technical discovery process ahead of design and build process for clients such as TuneIn, Dyson, Nespresso, and HBO.",
          "Developed a number of technical proof-of-concepts including an <a href='https://www.youtube.com/watch?v=8YOAwinB6wo' target='_blank' rel='noopener'>award winning generative AI powered chatbot</a> at the 2023 <a href='https://www.gloo.us/hackathon' target='_blank' rel='noopener'>Gloo hackathon</a>.",
          "Managed relationship with both internal developers and external development partners.",
          "Responsible for the implementation and management of Vixen Labs' <a href='https://vixenlabs.co/vixen-labs-is-iso-27001-certified' target='_blank' rel='noopener'>ISO 27001 accreditation</a>."
        ]
      },
      {
        role: "Designer and Developer",
        name: "OneSheep (now Scout and Redeem)",
        type: "full time",
        location: "Remote",
        url: "https://onesheep.org",
        start: '20191101',
        end: '20210731',
        summary: "Part of a small, remote team of designers and developers helping charities and businesses to implement bespoke digital solutions.",
        info: [
          "Rapid prototype for <a href='https://alpha.org/alpha-online/'>the Alpha Course online</a> during covid-19 pandemic on top of Twilio's WebRTC SDKs.",
          "Design and build on the marketing site for <a href='https://carneliansearch.com/'>Carnelian Search</a> on top of Eleventy and Decap CMS.",
          "Design and build for the CMS behind the reimplementation of the <a href='https://bibleinoneyear.org/'>Bible in One Year</a> app on top of Laravel and Cachefly. Also implemented the multilingual marketing site.",
          "Integration of different Customer Relationship Management systems, such as Donorfy and Raiser's Edge, into the frontend of different client's websites",
          "Design and build on <a href='https://justsow.org'>JustSow</a>, a funding platform for Christian ministry entrepreneurs with Laravel and InertiaJS."
        ]
      },
      {
        role: "Digital Project Manager",
        name: "Sparks Studio",
        type: "freelance",
        location: "London, UK",
        url: "https://www.sparks-studio.com/",
        start: '20181001',
        end: '20190930',
        summary: "Part time role to validate the need for a DPM role, and to support the studio as they implement brand and design work into digital products.",
        info: [
          "Management for the build and deployment of <a href='https://christiansinsport.org.uk/'>Christians in Sport</a> from a legacy platform.",
          "Supported the technical discovery, build, and handover of the digital implementation of the rebrand for the FinTech company <a href='https://www.iress.com/'>Iress</a>.",
          "Helped the studio explore and understand the implications of technical implementations and decisions."
        ]
      },
      {
        role: "Digital Ministry Developer",
        name: "The Globe Church",
        type: "full time",
        location: "London, UK",
        url: "https://globe.church",
        start: '20170701',
        end: '20191030',
        summary: "Exploring how custom digital tools and platforms can be used to support local church ministry.",
        info: [
          "Research, design, build and training for <a href='https://www.globe.church/blog/one21-launch/'>One21</a>, a tool to help church congregations disciple one another.",
          "Rethinking and redeveloping the <a href='https://www.globe.church/'>church website</a>.",
          "Working on data management within a church context, including GDPR compliance and training."
        ]
      },
      {
        role: "Full Stack Developer",
        name: "Victoria and Albert Museum",
        type: "full time",
        location: "London, UK",
        url: "https://vam.ac.uk",
        start: '20140101',
        end: '20170630',
        summary: "Member of the Digital Media Team responsible for the digital expression of brand and user experience across the museum.",
        info: [
          "Part of the team <a href='https://www.vam.ac.uk/blog/digital/new-website'>relaunching the V&A's website</a>, <a href='https://www.vam.ac.uk/blog/digital/the-new-whats-on'>What's On ticketing</a>, and shop over a two year period",
          "Design and build for a <a href='https://www.vam.ac.uk/audioguide/europeaudio/'>web-first audio guide</a> for the reopening of the <a href='https://www.vam.ac.uk/collections/europe'>Europe 1600-1815 galleries</a>.",
          "Redesign and build of the <a href='https://www.vam.ac.uk/blog/digital/designing-a-new-wi-fi-splash-screen'>free Wi-Fi splash screen</a>.",
          "Migration of many different departmental blogging platforms to one single cross-museum blog.",
        ]
      },
      {
        role: "Digital Services Manager",
        name: "International Fellowship of Evangelical Students",
        type: "full time",
        location: "Oxford, UK",
        url: "https://ifesworld.org",
        start: '20110601',
        end: '20131231',
        summary: 'Part of the Global Communications Team, responsible for the development and growth of the online channels.',
        info: [
          "Designed and implemented an online campaign for <a href='https://ifesworld.org/worldstudentday'>World Student Day</a> to display the global location of all participants.",
          "Implemented a multilingual discussion tool to support communication between students connected to the fellowship globally.",
          "Designed and built conference schedule displays across for the <a href='https://ifesworld.org/worldassembly'>World Assembly 2011</a>, pulling in live information from social media."
        ]
      },
    ],
    toolbox: [
      {
        name: "Eleventy",
        url: "https://11ty.dev",
      },
      {
        name: "Laravel",
        url: "https://laravel.com",
      },
      {
        name: "Mix",
        url: "https://laravel-mix.com",
      },
      {
        name: "Rails",
        url: "https://rubyonrails.org",
      },
    ],
  },
  trello: {
    readingList: {
      boardId: "HQyrNteG",
    },
  },
};
