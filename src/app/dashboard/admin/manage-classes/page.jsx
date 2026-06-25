import ClassManageContainer from "@/components/dashboard/admin/ClassManageContainer";

async function getClassesData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/admin/classes`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) throw new Error("Failed to fetch classes");
    return res.json();
  } catch (error) {
    console.error("Error loading classes:", error);
    return [];
  }
}

const ManageClasses = async () => {
  const initialClasses = await getClassesData();

  return (
    <div className="flex-1 p-4 md:p-12 bg-[#0e0e0e] text-[#e5e2e1] min-h-screen font-mono">
      <ClassManageContainer initialClasses={initialClasses} />
    </div>
  );
};

export default ManageClasses;
