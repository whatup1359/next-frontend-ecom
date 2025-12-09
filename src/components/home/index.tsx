"use client"

import React from "react";
import Hero from "@/components/home/hero";
import Categories from "@/components/home/categories";
import NewArrival from "@/components/home/newarrivals";
import PromoBanner from "@/components/home/promobanner";
import BestSeller from "@/components/home/bestseller";
import CountDown from "@/components/home/countdown";
import Testimonials from "@/components/home/testimonials";
import Newsletter from "@/components/common/Newsletter";

function Home() {

  return (
    <main>
      <Hero />
      <Categories />
      <NewArrival />
      <PromoBanner />
      <BestSeller />
      <CountDown />
      <Testimonials />
      <Newsletter />
    </main>
  );
}

export default Home;
