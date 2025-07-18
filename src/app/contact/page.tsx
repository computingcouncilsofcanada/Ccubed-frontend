import React from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  Linkedin,
  InstagramIcon,
  TwitterIcon,
  Instagram,
  LinkedinIcon,
  LucideLinkedin,
} from "lucide-react";

function ContactPage() {
  return (
    <div className=" bg-foreground text-background flex flex-col md:flex-row min-h-screen pt-15 pb-6 px-20">
      <div className="left md:w-1/2 font-patrick">
        <h1 className="text-8xl">Contact US</h1>
        <p className="mt-5 text-md">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse rem
          ipsa quos dolorem error tenetur neque architecto tempore adipisci a
          saepe, soluta velit aperiam et totam? Aperiam maiores laudantium quae
          blanditiis exercitationem mollitia ducimus voluptate sunt excepturi
          nam temporibus deleniti possimus enim corrupti illum voluptatibus
          itaque facere, in explicabo placeat.
        </p>
        <ContactForm />
      </div>
      <div className="right  md:w-1/2  font-patrick mt-10 md:mt-0 md:pl-15">
        <div className=" w-full flex flex-col gap-4 ">
          <div className="border-2 border-background w-full h-100 "></div>
          <h1 className="text-4xl">Visit us</h1>
          <div className=" md:flex gap-2">
            <p className="md:w-1/12">Address:</p>
            <p className="md:w-11/12">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              culpa dolorem velit accusamus eos ratione.
            </p>
          </div>
          <div className="icons flex items-center gap-10">
            <LucideLinkedin />
            <Instagram />
            <TwitterIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
