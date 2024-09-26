import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Image from "next/image";
import SectionTitle from "@/components/Common/SectionTitle";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SGU charity | Về chúng tôi",
  description: "SGU charity | Về chúng tôi",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <AboutSectionOne />
    </>
  );
};

const infoDonate = () => {
  const AboutSectionOne = () => {
    const List = ({ text }) => (
      <p className="mb-5 flex items-center text-lg font-medium text-body-color">
        <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
          
        </span>
        {text}
      </p>
    );
  
    return (
      <section id="about" className="pt-16 md:pt-20 lg:pt-28">
        <div className="container">
          <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
            <div className="-mx-4 flex flex-wrap items-center">
              <div className="w-full px-4 lg:w-1/2">
                <SectionTitle
                  title="Crafted for Startup, SaaS and Business Sites."
                  paragraph="The main ‘thrust’ is to focus on educating attendees on how to best protect highly vulnerable business applications with interactive panel discussions and roundtables."
                  mb="44px"
                />
  
                <div
                  className="mb-12 max-w-[570px] lg:mb-0"
                  data-wow-delay=".15s"
                >
                  <div className="mx-[-12px] flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                      <List text="Premium quality" />
                      <List text="Tailwind CSS" />
                      <List text="Use for lifetime" />
                    </div>
  
                    <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                      <List text="Next.js" />
                      <List text="Rich documentation" />
                      <List text="Developer friendly" />
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="w-full px-4 lg:w-1/2">
                <div className="relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0">
                  <Image
                    src="/images/about/about-image.svg"
                    alt="about-image"
                    fill
                    className="mx-auto max-w-full drop-shadow-three dark:hidden dark:drop-shadow-none lg:mr-0"
                  />
                  <Image
                    src="/images/about/about-image-dark.svg"
                    alt="about-image"
                    fill
                    className="mx-auto hidden max-w-full drop-shadow-three dark:block dark:drop-shadow-none lg:mr-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
}

export default AboutPage;
