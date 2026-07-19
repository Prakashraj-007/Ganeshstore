"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; 
import { LockKeyhole, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PortalLogin() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase
        .from("business_users")
        .select("*")
        .eq("user_id", userid)
        .eq("password", password)
        .single();

      if (error || !data) {
        setError("Invalid User ID or Password");
      } else {
        localStorage.setItem("isBusinessAuth", "true");
        localStorage.setItem("businessUser", JSON.stringify(data));
        router.push("/portal");
      }
    } catch (err: any) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary-dark p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

      <Link href="/" className="absolute top-8 left-8 text-white/70 hover:text-white flex items-center gap-2 transition-colors">
        <ArrowLeft size={20} /> Back to Home
      </Link>

      <div className="max-w-md w-full bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10 z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/20">
            <LockKeyhole className="w-8 h-8 text-accent" strokeWidth={1.8} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Business Portal</h1>
          <p className="text-white/60">Sign in to access your business account</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              User ID
            </label>
            <input
              type="text"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-white/30"
              placeholder="Enter your User ID"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-white/30"
              placeholder="Enter your Password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
