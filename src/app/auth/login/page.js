"use client";
import { auth, db, googleProvider } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  AlertCircle,
  ArrowRight,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Schema for form validation
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLogin = async (data) => {
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save user data to Firestore if it's a new user
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        createdAt: new Date().toISOString(),
      });

      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute -bottom-8 -left-4 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-indigo-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div
        className={`w-full max-w-md transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Decorative corner elements */}
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-blue-500 rounded-tl-lg" />
          <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-blue-500 rounded-tr-lg" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-blue-500 rounded-bl-lg" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-blue-500 rounded-br-lg" />

          {/* Header Section */}
          <div className="mb-8 text-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-4 transform rotate-12 hover:rotate-0 transition-all duration-300 hover:scale-110">
                <User className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-6 animate-shake">
              <p className="text-sm text-red-600 flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2 group">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <span>Email Address</span>
                {errors.email && (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
              </label>
              <div className="relative">
                <input
                  {...register("email")}
                  type="email"
                  className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm group-hover:border-blue-300"
                  placeholder="john@example.com"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <div className="absolute inset-0 rounded-xl border border-blue-500/0 group-hover:border-blue-500/50 pointer-events-none transition-all duration-300" />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2 group">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <span>Password</span>
                {errors.password && (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  type="password"
                  className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm group-hover:border-blue-300"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <div className="absolute inset-0 rounded-xl border border-blue-500/0 group-hover:border-blue-500/50 pointer-events-none transition-all duration-300" />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.password.message}</span>
                </p>
              )}
            </div>

            <div className="flex items-center justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-gray-500 bg-white/80">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-200 hover:border-gray-300 disabled:opacity-70 group relative overflow-hidden"
            >
              <Image
                width={20}
                height={20}
                alt="Google"
                src="/icons/google.png"
                className="h-5 w-5"
              />
              <span>Sign in with Google</span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 relative group"
              >
                Sign up
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
