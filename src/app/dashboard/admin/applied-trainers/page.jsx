import AppliedTrainersTable from "@/components/dashboard/admin/AppliedTrainersTable";
import { GetPendingTrainers } from "@/lib/api/trainerManagment";
import React from "react";

const AppliedTrainers = async () => {
  const pendingTrainers = await GetPendingTrainers();
  console.log("pendingTrainers:", pendingTrainers);
  return (
    <div>
      <AppliedTrainersTable
        pendingTrainers={pendingTrainers}
        // openInductionModal={openInductionModal}
      />
    </div>
  );
};

export default AppliedTrainers;
