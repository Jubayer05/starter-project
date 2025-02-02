"use client";
import { auth } from "@/lib/firebase";
import { sendEmailVerification } from "firebase/auth";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function VerificationSent() {
  const [resending, setResending] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleResendVerification = async () => {
    setResending(true);

    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        // Show error since we need an authenticated user to send verification
        throw new Error("Please sign in again to resend verification email.");
      }

      // Check if already verified
      if (currentUser.emailVerified) {
        await Swal.fire({
          title: "Already Verified",
          text: "Your email is already verified. No need to resend.",
          icon: "warning",
          confirmButtonText: "OK",
          confirmButtonColor: "#F59E0B",
          customClass: {
            popup: "rounded-2xl",
            confirmButton: "px-6 py-2 rounded-xl",
          },
        });
        return;
      }

      // Configure verification email settings
      const actionCodeSettings = {
        url: `${window.location.origin}/auth/verify-email?uid=${currentUser.uid}`,
        handleCodeInApp: true,
      };

      // Send verification email
      await sendEmailVerification(currentUser, actionCodeSettings);

      // Show success message
      await Swal.fire({
        title: "Verification Email Sent!",
        text: "Please check your inbox and spam folder.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3B82F6",
        customClass: {
          popup: "rounded-2xl",
          confirmButton: "px-6 py-2 rounded-xl",
        },
      });
    } catch (error) {
      console.error("Resend error:", error);

      // Determine appropriate error message
      let errorMessage = "Something went wrong. Please try again later.";

      if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many attempts. Please try again later.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address. Please sign up again.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Show error message
      await Swal.fire({
        title: "Error Resending Email",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#EF4444",
        customClass: {
          popup: "rounded-2xl",
          confirmButton: "px-6 py-2 rounded-xl",
        },
      });

      // If user session expired, redirect to signup
      if (
        error.message.includes("sign up again") ||
        error.message.includes("sign in again")
      ) {
        router.push("/auth/signup");
      }
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
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
                <Mail className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Verification Sent
            </h1>
            <p className="text-gray-600">
              An email has been sent to your mailbox.
            </p>
          </div>

          {/* Resend Email Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleResendVerification}
              disabled={resending}
              className="px-6 py-2 text-white font-semibold rounded-lg shadow-md transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            >
              {resending ? "Resending..." : "Resend Email"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
