import TrainerRegistry from "@/components/dashboard/admin/TrainerRegistry";
import { GetPendingTrainers } from "@/lib/api/trainerManagment";
import React from "react";

const ManageTrainers = async () => {
  const trainers = await GetPendingTrainers();
  console.log(trainers);
  return <TrainerRegistry initialTrainers={trainers} />;
};

export default ManageTrainers;
