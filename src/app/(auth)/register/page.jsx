export const metadata = {
  title: "Join GymVortex — Create Your Athlete Profile",
  description:
    "Register at GymVortex to book elite fitness classes, connect with world-class trainers, and track your performance journey.",
  keywords: [
    "gym registration",
    "fitness platform signup",
    "GymVortex register",
    "elite training",
    "fitness classes booking",
  ],
  openGraph: {
    title: "Join GymVortex — Create Your Athlete Profile",
    description:
      "Register at GymVortex to book elite fitness classes and train with world-class coaches.",
    url: "https://gymvortex.vercel.app/register",
    siteName: "GymVortex",
    images: [
      {
        url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "GymVortex — Industrial Athletics Platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Join GymVortex",
    description:
      "Book elite fitness classes and train with world-class coaches.",
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://gymvortex.vercel.app/register",
  },
};

import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return <RegisterForm />;
}
