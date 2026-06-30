/**
 * Next.js Route-Level Loading UI
 *
 * এই ফাইলটা Next.js automatically ব্যবহার করে যেকোনো
 * server component data fetch করার সময়।
 * Props নেওয়া যাবে না — Next.js কোনো props পাঠায় না।
 */
import VortexSpinnerServer from "@/components/shared/VortexSpinnerServer";

export default function Loading() {
  return <VortexSpinnerServer />;
}
