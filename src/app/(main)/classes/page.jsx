import AllClasses from "@/components/classes/AllClasses";

import React from "react";
export const metadata = {
  title: "All Fitness Classes | Train Without Limits",
  description:
    "Browse our premium fitness classes including Yoga, Cardio, HIIT, and Powerlifting. Find expert trainers and book your sessions.",
  openGraph: {
    title: "All Fitness Classes | Train Without Limits",
    description: "Discover the best gym and fitness classes tailored for you.",
    type: "website",
  },
};
const AllClassesPage = () => {
  return (
    <div>
      <AllClasses />
    </div>
  );
};

export default AllClassesPage;
