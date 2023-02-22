import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Menu from "./Menu";

export default {
  title: "Example/Menu",
  component: Menu,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const Default = Template.bind({});
Default.args = {
  pages: [
    {
      page_id: 63823,
      site_id: 222,
      parent_id: 0,
      language_id: 1,
      type_id: 0,
      page_title: "Overnachten",
      page_menuname: "Overnachten",
      page_url: "overnachten",
      page_hidden: "nee",
      page_hidden_menu: "nee",
      page_highlight: null,
      page_order: 2,
      children: [
        {
          page_id: 64153,
          site_id: 222,
          parent_id: 63823,
          language_id: 1,
          type_id: 0,
          page_title: "Accommodaties",
          page_menuname: "Accommodaties",
          page_url: "accommodaties",
          page_hidden: "nee",
          page_hidden_menu: "nee",
          page_highlight: null,
          page_order: 1,
        },
        {
          page_id: 64156,
          site_id: 222,
          parent_id: 63823,
          language_id: 1,
          type_id: 0,
          page_title: "",
          page_menuname: "Kamperen",
          page_url: "kamperen",
          page_hidden: "nee",
          page_hidden_menu: "nee",
          page_highlight: null,
          page_order: 2,
        },
      ],
    },
    {
      page_id: 63826,
      site_id: 222,
      parent_id: 0,
      language_id: 1,
      type_id: 0,
      page_title: "Ontdek het park",
      page_menuname: "Ontdek het park",
      page_url: "ontdek",
      page_hidden: "nee",
      page_hidden_menu: "nee",
      page_highlight: null,
      page_order: 3,
      children: [
        {
          page_id: 64865,
          site_id: 222,
          parent_id: 63826,
          language_id: 1,
          type_id: 0,
          page_title: "Ontdek onze faciliteiten",
          page_menuname: "Onze faciliteiten",
          page_url: "ontdek-onze-faciliteiten",
          page_hidden: "nee",
          page_hidden_menu: "nee",
          page_highlight: null,
          page_order: 1,
        },
        {
          page_id: 64868,
          site_id: 222,
          parent_id: 63826,
          language_id: 1,
          type_id: 0,
          page_title: "Veel activiteiten voor jong en oud",
          page_menuname: "Activiteiten",
          page_url: "veel-activiteiten-voor-jong-en-oud",
          page_hidden: "nee",
          page_hidden_menu: "nee",
          page_highlight: null,
          page_order: 2,
        },
        {
          page_id: 71607,
          site_id: 222,
          parent_id: 63826,
          language_id: 1,
          type_id: 10818,
          page_title: "Plattegrond",
          page_menuname: "Plattegrond",
          page_url: "plattegrond",
          page_hidden: "nee",
          page_hidden_menu: "nee",
          page_highlight: null,
          page_order: 3,
        },
        {
          page_id: 72063,
          site_id: 222,
          parent_id: 63826,
          language_id: 1,
          type_id: 0,
          page_title: "Restaurant",
          page_menuname: "Restaurant",
          page_url: "restaurant",
          page_hidden: "nee",
          page_hidden_menu: "nee",
          page_highlight: "",
          page_order: 4,
        },
      ],
    },
    {
      page_id: 63829,
      site_id: 222,
      parent_id: 0,
      language_id: 1,
      type_id: 0,
      page_title: "Omgeving",
      page_menuname: "Omgeving",
      page_url: "omgeving",
      page_hidden: "nee",
      page_hidden_menu: "nee",
      page_highlight: null,
      page_order: 4,
      children: [
        {
          page_id: 64862,
          site_id: 222,
          parent_id: 63829,
          language_id: 1,
          type_id: 0,
          page_title: "Er op uit",
          page_menuname: "Er op uit",
          page_url: "er-op-uit",
          page_hidden: "nee",
          page_hidden_menu: "nee",
          page_highlight: "",
          page_order: 1,
        },
        {
          page_id: 65665,
          site_id: 222,
          parent_id: 63829,
          language_id: 1,
          type_id: 0,
          page_title: "Fietsen",
          page_menuname: "Fietsen",
          page_url: "fietsen",
          page_hidden: "nee",
          page_hidden_menu: "nee",
          page_highlight: "",
          page_order: 2,
        },
        {
          page_id: 65668,
          site_id: 222,
          parent_id: 63829,
          language_id: 1,
          type_id: 0,
          page_title: "Wandelen",
          page_menuname: "Wandelen",
          page_url: "wandelen",
          page_hidden: "nee",
          page_hidden_menu: "nee",
          page_highlight: null,
          page_order: 3,
        },
        {
          page_id: 65671,
          site_id: 222,
          parent_id: 63829,
          language_id: 1,
          type_id: 0,
          page_title: "Zwemmen",
          page_menuname: "Zwemmen",
          page_url: "zwemmen",
          page_hidden: "nee",
          page_hidden_menu: "nee",
          page_highlight: null,
          page_order: 4,
        },
      ],
    },
    {
      page_id: 63832,
      site_id: 222,
      parent_id: 0,
      language_id: 1,
      type_id: 0,
      page_title: "Laatste nieuws",
      page_menuname: "Laatste nieuws",
      page_url: "laatste-nieuws",
      page_hidden: "nee",
      page_hidden_menu: "nee",
      page_highlight: "",
      page_order: 5,
      children: [],
    },
    {
      page_id: 63835,
      site_id: 222,
      parent_id: 0,
      language_id: 1,
      type_id: 0,
      page_title: "Te koop",
      page_menuname: "Te koop",
      page_url: "te-koop",
      page_hidden: "nee",
      page_hidden_menu: "nee",
      page_highlight: null,
      page_order: 6,
      children: [
        {
          page_id: 70965,
          site_id: 222,
          parent_id: 63835,
          language_id: 1,
          type_id: 0,
          page_title: "Lodge 30",
          page_menuname: "Lodge 30",
          page_url: "lodge-30",
          page_hidden: "nee",
          page_hidden_menu: "nee",
          page_highlight: "lodge.jpg",
          page_order: 1,
        },
      ],
    },
    {
      page_id: 63415,
      site_id: 222,
      parent_id: 0,
      language_id: 1,
      type_id: 0,
      page_title: "Heeft u vragen?",
      page_menuname: "Contact",
      page_url: "contact",
      page_hidden: "nee",
      page_hidden_menu: "nee",
      page_highlight: null,
      page_order: 7,
      children: [],
    },
    {
      page_id: 64793,
      site_id: 222,
      parent_id: 0,
      language_id: 1,
      type_id: 6011,
      page_title: "Registreren",
      page_menuname: "Registreren",
      page_url: "registreren",
      page_hidden: "ja",
      page_hidden_menu: "nee",
      page_highlight: null,
      page_order: 11,
      children: [],
    },
    {
      page_id: 64808,
      site_id: 222,
      parent_id: 0,
      language_id: 1,
      type_id: 6014,
      page_title: "",
      page_menuname: "Wachtwoord vergeten",
      page_url: "wachtwoord-vergeten",
      page_hidden: "ja",
      page_hidden_menu: "nee",
      page_highlight: null,
      page_order: 12,
      children: [],
    },
    {
      page_id: 64814,
      site_id: 222,
      parent_id: 0,
      language_id: 1,
      type_id: 6020,
      page_title: "",
      page_menuname: "Gegevens wijzigen",
      page_url: "gegevens-wijzigen",
      page_hidden: "ja",
      page_hidden_menu: "nee",
      page_highlight: null,
      page_order: 13,
      children: [],
    },
    {
      page_id: 64817,
      site_id: 222,
      parent_id: 0,
      language_id: 1,
      type_id: 8706,
      page_title: "Bevestiging",
      page_menuname: "Betaalstatus",
      page_url: "betaalstatus",
      page_hidden: "ja",
      page_hidden_menu: "nee",
      page_highlight: null,
      page_order: 14,
      children: [],
    },
    {
      page_id: 64958,
      site_id: 222,
      parent_id: 0,
      language_id: 1,
      type_id: 8490,
      page_title: "Reservering Betalen",
      page_menuname: "Reservering Betalen",
      page_url: "reservering-betalen",
      page_hidden: "ja",
      page_hidden_menu: "nee",
      page_highlight: null,
      page_order: 15,
      children: [],
    },
    {
      page_id: 65815,
      site_id: 222,
      parent_id: 0,
      language_id: 1,
      type_id: 5999,
      page_title: "Inloggen",
      page_menuname: "Inloggen",
      page_url: "inloggen",
      page_hidden: "ja",
      page_hidden_menu: "nee",
      page_highlight: null,
      page_order: 16,
      children: [],
    },
    {
      page_id: 72072,
      site_id: 222,
      parent_id: 0,
      language_id: 1,
      type_id: 0,
      page_title: "mijnomgeving",
      page_menuname: "mijnomgeving",
      page_url: "mijnomgeving",
      page_hidden: "ja",
      page_hidden_menu: "nee",
      page_highlight: null,
      page_order: 19,
      children: [],
    },
  ],
};
