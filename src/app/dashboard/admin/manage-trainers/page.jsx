import TrainerRegistry from "@/components/dashboard/admin/TrainerRegistry";
import { GetAprovedTrainers } from "@/lib/api/trainerManagment";
import React from "react";

const ManageTrainers = async () => {
  const trainers = await GetAprovedTrainers();
  console.log(trainers);
  return <TrainerRegistry initialTrainers={trainers} />;
};

export default ManageTrainers;
