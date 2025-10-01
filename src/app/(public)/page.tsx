import Hero from "@/components/public/home/hero";
import Demo from "@/components/public/home/demo";
import Claim from "@/components/public/home/claim";
import Testimonials from "@/components/public/home/testimonials";
import CTA from "@/components/public/home/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Demo />
      <Claim />
      <Testimonials />
      <CTA />
    </>
  );
}
