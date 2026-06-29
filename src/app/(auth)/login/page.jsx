import LoginForm from "@/components/auth/LoginForm";
import React from "react";

export const metadata = {
  title: "Login | GymVortex",
  description: "Log in to your GymVortex account to book classes, track schedules, and connect with trainers.",
};

const page = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;
