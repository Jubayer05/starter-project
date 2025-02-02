"use client";
import { auth, db } from "@/lib/firebase";
import { applyActionCode } from "firebase/auth";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function VerifyEmail() {
  const [verifying, setVerifying] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const oobCode = searchParams.get("oobCode");
        const continueUrl = searchParams.get("continueUrl");

        console.log("oobCode:", oobCode); // Debugging
        console.log("continueUrl:", continueUrl); // Debugging

        if (!oobCode || !continueUrl) {
          throw new Error(
            "Invalid verification link. Please check the link and try again."
          );
        }

        // Extract uid from continueUrl
        const continueUrlParams = new URLSearchParams(
          new URL(continueUrl).search
        );
        const uid = continueUrlParams.get("uid");

        console.log("uid:", uid); // Debugging

        if (!uid) {
          throw new Error("User ID not found in the verification link.");
        }

        // 1. Apply the verification code
        await applyActionCode(auth, oobCode);

        // 2. Update user document in Firestore
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
          emailVerified: true,
          updatedAt: serverTimestamp(),
        });

        // 3. Show success message
        await Swal.fire({
          title: "Email Verified!",
          text: "Your email has been verified successfully. You can now log in.",
          icon: "success",
          confirmButtonColor: "#3B82F6",
          confirmButtonText: "Continue to Login",
        });

        router.push("/dashboard");
      } catch (error) {
        console.error("Verification error:", error);

        await Swal.fire({
          title: "Verification Failed",
          text:
            error.message ||
            "The verification link may have expired or is invalid. Please request a new verification email.",
          icon: "error",
          confirmButtonColor: "#EF4444",
          confirmButtonText: "Back to Sign Up",
        });

        router.push("/auth/signup");
      } finally {
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-100 max-w-md w-full mx-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">
            {verifying ? "Verifying your email..." : "Verification complete"}
          </h2>
          <p className="text-gray-600 mt-2">
            {verifying
              ? "Please wait while we verify your email address."
              : "Redirecting you..."}
          </p>
        </div>
      </div>
    </div>
  );
}
