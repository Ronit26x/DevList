import React from "react";

import {
  Column1,
  Column2,
  FooterLink,
  Heading1,
  Heading2
} from "./FooterStyles";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faProductHunt, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCalendar, faEnvelope, faGamepad, faGlobe, faMedal } from "@fortawesome/free-solid-svg-icons";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
});
const Footer = () => {
  let year = new Date().getFullYear();

  return (
    <>
      <p className="footer-copyright" aria-label="Copyright by DevEmpire">Developed By Ronit Bhansali | DevList</p>
    </>
  );
};

export default Footer;
