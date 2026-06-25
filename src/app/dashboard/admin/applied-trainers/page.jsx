import AppliedTrainersTable from "@/components/dashboard/admin/AppliedTrainersTable";
import { GetPendingTrainers } from "@/lib/api/trainerManagment";
import React from "react";
export const dynamic = "force-dynamic";
const AppliedTrainers = async () => {
  const pendingTrainers = await GetPendingTrainers();
  console.log("pendingTrainers:", pendingTrainers);
  return (
    <div>
      <AppliedTrainersTable pendingTrainers={pendingTrainers} />
    </div>
  );
};

export default AppliedTrainers;
