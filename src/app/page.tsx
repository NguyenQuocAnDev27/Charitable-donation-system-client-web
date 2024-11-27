import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import ImageCarousel from "@/components/ImageCarousel";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "SGU charity",
  description: "Đây là trang chủ",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      {/* <Features /> */}
      {/* <Video /> */}
      <Brands />
      <ImageCarousel/>
      {/* <AboutSectionOne /> */}
      {/* <AboutSectionTwo /> */}
      {/* <Testimonials /> */}
      {/* <Pricing /> */}
      {/* <Blog /> */}
      {/* <Contact /> */}
    </>
  );
}
