"use client";
import PricingSection from "@/components/pricingSection/pricingSection";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-7xl font-bold tracking-tighter">Home Page</h1>
      <div className="flex items-center space-x-5">
        <button
          onClick={handleSignOut}
          className="mt-8 bg-red-500 hover:bg-red-700 h-12 text-white font-bold py-2 px-4 rounded"
        >
          Sign out
        </button>
      </div>
      <PricingSection />
    </main>
  );
}
