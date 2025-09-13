import { PageContent } from "@/types/pages";

export const pagesContent: PageContent[] = [
  {
    name: "home",
    sections: {
      hero: {
        tagline: { type: "input", value: "" },
        subTitle: { type: "input", value: "" },
        headline: { type: "input", value: "" },
        subheadline: { type: "input", value: "" },
        callToActionButton: { type: "input", value: "" },
        image: { type: "image", value: "" },
      },
      about: {
        headline: { type: "input", value: "" },
        subheadline: { type: "textarea", value: "" },
      },
      overview: {
        happyClients: { type: "number", value: "" },
        professionalShots: { type: "number", value: "" },
        captivatingVideos: { type: "number", value: "" },
      },
      whyUs: {
        headline: { type: "input", value: "" },
        subheadline: { type: "textarea", value: "" },
      },
      companyOverview: {
        items: {
          type: "items",
          value: [],
          maxValue: 6,
        },
        expectedFields: ["title", "icon", "caption"],
      },
      packages: {
        headline: { type: "input", value: "" },
        subheadline: { type: "textarea", value: "" },
        images: {
          type: "images",
          value: [],
          maxValue: "unlimited",
        },
      },
      coreValues: {
        items: {
          type: "items",
          value: [],
          maxValue: 6,
        },
        expectedFields: ["title", "caption"],
      },
    },
  },
  {
    name: "about",
    sections: {
      hero: {
        headline: { type: "input", value: "" },
        subheadline: { type: "textarea", value: "" },
        image: { type: "image", value: "" },
      },
      overview: {
        ourMission: {
          headline: { type: "input", value: "" },
          subheadline: { type: "textarea", value: "" },
        },
        ourVision: {
          headline: { type: "input", value: "" },
          subheadline: { type: "textarea", value: "" },
        },
        coreValues: {
          headline: { type: "input", value: "" },
          items: {
            type: "items",
            value: [],
            maxValue: 4,
          },
          expectedFields: ["value"],
        },
        images: [],
        maxImages: 6,
      },
      about: {
        headline: { type: "input", value: "" },
        subheadline: { type: "textarea", value: "" },
        items: {
          type: "items",
          value: [],
          maxValue: 4,
        },
        expectedFields: ["title", "caption", "icon"],
        maxItems: 4,
      },
    },
  },
  {
    name: "services",
    sections: {
      hero: {
        headline: { type: "input", value: "" },
        subheadline: { type: "textarea", value: "" },
        image: { type: "image", value: "" },
      },
      services: {
        maxItems: "unlimited",
        items: {
          type: "items",
          value: [],
          maxValue: "unlimited",
        },
        expectedFields: ["title", "caption", "icon"],
      },
      callToAction: {
        title: { type: "input", value: "" },
        caption: { type: "textarea", value: "" },
      },
    },
  },
  {
    name: "portfolio",
    sections: {
      hero: {
        headline: { type: "input", value: "" },
      },
    },
  },
  {
    name: "contact",
    sections: {
      contactInformation: {
        headline: { type: "input", value: "" },
        subheadline: { type: "input", value: "" },
        phoneNumber: "",
        email: "",
        location: "",
      },
    },
  },
];
