import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import nic from "@/assets/img/tourn-1.jpg";
import kipaji from "@/assets/img/tourn-2.jpg";

import logo from "@/assets/tournaments/t-logo.png";
import about from "@/assets/tournaments/about.jpeg";
import { TournamentData } from "../types/scores";

export const navigation = [
  {
    id: 1,
    name: "home",
    target: "home",
    offset: -100,
  },
  { id: 2, name: "about", target: "about", offset: -80 },
  { id: 3, name: "FAQs", target: "faqs", offset: -90 },
  { id: 3, name: "Contacts", target: "contacts", offset: 0 },
];

export const tournaments = [
  {
    id: 1,
    title: "Nairobi International Cup",
    edition: 2024,
    dates: "18th - 21st April, 2024",
    img: nic,
  },
  {
    id: 2,
    title: "Tisini Crucial Cup",
    edition: 2023,
    dates: "18th - 21st April, 2024",
    img: kipaji,
  },
];

export const tournaData: TournamentData = {
  "Tisini Crucial Cup": {
    logo: logo,
    hero: {
      title: "Rausha Kipaji Cup",
      subtitle: "Africa's premier youth football tournament",
      buttonText: "18th - 21st April, 2024",
    },
    about: {
      theme: "2024 Focus –Going Green Through Sports!",
      image: about,
      story: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              molestias repellendus facere accusamus voluptatem illum doloremque
              voluptates, incidunt ut porro ex exercitationem qui nesciunt odit
              cumque iusto laboriosam ducimus facilis accusantium eveniet
              pariatur et saepe quo? Accusantium quia quas provident quam
              placeat, obcaecati quis quo quisquam! Saepe perferendis magnam
              earum vitae? Cumque expedita mollitia enim delectus et fugiat
              rerum nostrum adipisci numquam veritatis autem laboriosam,
              aspernatur corporis libero vel dolor quas alias, molestiae
              consequuntur dolorum. Minima perferendis harum, consequuntur ut
              facere magni quas soluta vel nisi rem voluptates ducimus dolorem
              tenetur. Sequi provident vel, reprehenderit ducimus vitae odio
              sunt laboriosam?`,
    },

    questions: [
      {
        id: 1,
        question: "What are the dates of the tournament?",
        answer: "Thursday 18th April – Sunday 21st of April, 2024",
      },
      {
        id: 2,
        question: "Where will tisini crucial take place?",
        answer:
          "Nakuru Boys High School and Nakuru Girls High School, in Nakuru County, Kenya.",
      },
      {
        id: 3,
        question: "What are the age categories?",
        answer: "U7, U9, U11, U13, U15, U17 and U20.",
      },
      {
        id: 4,
        question: "How many people will be involved?",
        answer:
          "7,600 Participants (players, coaches, referees, parents, fans, service providers, and stakeholders)",
      },
      {
        id: 5,
        question: "Will there be media coverage?",
        answer:
          "Yes, local and national newspapers, television stations, and radio stations will be present.",
      },
      {
        id: 6,
        question: "What about international coverage?",
        answer:
          "Through our social media platforms, international audience will be able to follow all the action live.",
      },
    ],

    footer: {
      logo: logo,
      socials: [
        {
          name: "facebook",
          icon: FaFacebook,
          link: "https://web.facebook.com/profile.php?id=100063722136488&mibextid=ZbWKwL&_rdc=1&_rdr",
        },
        {
          name: "twitter",
          icon: FaXTwitter,
          link: "https://twitter.com/RaushaKipajiCup",
        },
        {
          name: "instagram",
          icon: FaInstagram,
          link: "https://www.instagram.com/raushakipajicup/?utm_source=qr&igsh=MXJ2OHVyNzFxZTRyMA%3D%3D",
        },
        {
          name: "linkedin",
          icon: FaLinkedinIn,
          link: "https://www.linkedin.com/in/rausha-kipaji-cup-2657572aa/",
        },
      ],

      contacts: [
        { icon: FaPhoneAlt, contact: "+254 723 803355,  +254 723 158975" },
        { icon: FaWhatsapp, contact: "+254 720 435886,  +47 944 49 948" },
        {
          icon: MdEmail,
          contact: "info@raushakipaji.com",
        },
      ],
    },
  },
  "Nairobi International Cup": {
    logo: logo,
    hero: {
      title: "Nairobi International Cup",
      subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      buttonText: "August, 2024",
    },
    about: {
      theme: "2024 Focus –Going Green Through Sports!",
      image: about,
      story: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              molestias repellendus facere accusamus voluptatem illum doloremque
              voluptates, incidunt ut porro ex exercitationem qui nesciunt odit
              cumque iusto laboriosam ducimus facilis accusantium eveniet
              pariatur et saepe quo? Accusantium quia quas provident quam
              placeat, obcaecati quis quo quisquam! Saepe perferendis magnam
              earum vitae? Cumque expedita mollitia enim delectus et fugiat
              rerum nostrum adipisci numquam veritatis autem laboriosam,
              aspernatur corporis libero vel dolor quas alias, molestiae
              consequuntur dolorum. Minima perferendis harum, consequuntur ut
              facere magni quas soluta vel nisi rem voluptates ducimus dolorem
              tenetur. Sequi provident vel, reprehenderit ducimus vitae odio
              sunt laboriosam?`,
    },
    questions: [
      {
        id: 1,
        question: "What are the dates of the tournament?",
        answer: "Thursday 18th April – Sunday 21st of April, 2024",
      },
      {
        id: 2,
        question: "Where will nic take place?",
        answer:
          "Nakuru Boys High School and Nakuru Girls High School, in Nakuru County, Kenya.",
      },
      {
        id: 3,
        question: "What are the age categories?",
        answer: "U7, U9, U11, U13, U15, U17 and U20.",
      },
      {
        id: 4,
        question: "How many people will be involved?",
        answer:
          "7,600 Participants (players, coaches, referees, parents, fans, service providers, and stakeholders)",
      },
      {
        id: 5,
        question: "Will there be media coverage?",
        answer:
          "Yes, local and national newspapers, television stations, and radio stations will be present.",
      },
      {
        id: 6,
        question: "What about international coverage?",
        answer:
          "Through our social media platforms, international audience will be able to follow all the action live.",
      },
    ],

    footer: {
      logo: logo,
      socials: [
        {
          name: "facebook",
          icon: FaFacebook,
          link: "",
        },
        {
          name: "twitter",
          icon: FaXTwitter,
          link: "",
        },
        {
          name: "instagram",
          icon: FaInstagram,
          link: "",
        },
        {
          name: "linkedin",
          icon: FaLinkedinIn,
          link: "",
        },
      ],

      contacts: [
        { icon: FaPhoneAlt, contact: "+254 723 803355,  +254 723 158975" },
        { icon: FaWhatsapp, contact: "+254 720 435886,  +47 944 49 948" },
        {
          icon: MdEmail,
          contact: "info@nic.com",
        },
      ],
    },
  },
};
