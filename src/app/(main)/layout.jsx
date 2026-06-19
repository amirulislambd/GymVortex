import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <div>
        <Navbar />
        <main className="min-h-screen bg-[#0d0d0d] md:pt-14">{children}</main>
        <Footer />
      </div>
    </>
  );
}
