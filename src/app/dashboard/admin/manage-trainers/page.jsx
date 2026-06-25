import TrainerRegistry from "@/components/dashboard/admin/TrainerRegistry";
import React from "react";

async function getTrainers() {
  // এখানে আপনার await prisma.trainer.findMany() থাকবে
  return [
    {
      id: "FF-8821",
      name: "Marcus Thorne",
      email: "m.thorne@gymvortex.io",
      phone: "+1 555-0102",
      specializations: ["Powerlifting", "Hyrox"],
      status: "Active_Duty",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: "FF-4490",
      name: "Sarah Jenkins",
      email: "jenkins.s@gymvortex.io",
      phone: "+1 555-0922",
      specializations: ["Calisthenics", "Mobility"],
      status: "Active_Duty",
      img: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=200",
    },
  ];
}

const ManageTrainers = async () => {
  const trainers = await getTrainers();
  return <TrainerRegistry initialTrainers={trainers} />;
};

export default ManageTrainers;
