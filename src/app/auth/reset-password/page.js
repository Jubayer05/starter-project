"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2, Lock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onSubmit = async (data) => {
    console.log(data); // Handle password reset logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
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
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-blue-500 rounded-tl-lg" />
          <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-blue-500 rounded-tr-lg" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-blue-500 rounded-bl-lg" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-blue-500 rounded-br-lg" />

          <div className="mb-8 text-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-4 transform rotate-12 hover:rotate-0 transition-all duration-300 hover:scale-110">
                <Lock className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Reset Password
            </h1>
            <p className="text-gray-600">Enter your new password below.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2 group">
              <label className="text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  {...register("password")}
                  className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm group-hover:border-blue-300"
                  placeholder="Enter new password"
                  required
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>{errors.password.message}</span>
                </p>
              )}
            </div>

            <div className="space-y-2 group">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  {...register("confirmPassword")}
                  className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm group-hover:border-blue-300"
                  placeholder="Confirm new password"
                  required
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>{errors.confirmPassword.message}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
