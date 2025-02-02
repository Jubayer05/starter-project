"use client";
import { auth, db } from "@/lib/firebase";
import { applyActionCode } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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
        // Get the action code from the URL
        const oobCode = searchParams.get("oobCode");
        const continueUrl = searchParams.get("continueUrl");

        if (!oobCode) {
          throw new Error("No verification code provided");
        }

        // Apply the action code
        await applyActionCode(auth, oobCode);

        // Get user data from sessionStorage
        const tempUserData = JSON.parse(sessionStorage.getItem("tempUserData"));

        if (tempUserData) {
          // Save user data to Firestore
          await setDoc(doc(db, "users", tempUserData.uid), {
            name: tempUserData.name,
            email: tempUserData.email,
            uid: tempUserData.uid,
            emailVerified: true,
            createdAt: new Date().toISOString(),
          });

          // Clear temporary data
          sessionStorage.removeItem("tempUserData");
        }

        await Swal.fire({
          title: "Email Verified!",
          text: "Your email has been verified successfully. You can now log in.",
          icon: "success",
          confirmButtonText: "Continue to Login",
          confirmButtonColor: "#3B82F6",
          customClass: {
            popup: "rounded-2xl",
            confirmButton: "px-6 py-2 rounded-xl",
          },
        });

        // Redirect to login page
        router.push("/auth/login");
      } catch (error) {
        console.error("Verification error:", error);

        await Swal.fire({
          title: "Verification Failed",
          text: "The verification link may have expired or is invalid. Please try signing up again.",
          icon: "error",
          confirmButtonText: "Back to Sign Up",
          confirmButtonColor: "#3B82F6",
          customClass: {
            popup: "rounded-2xl",
            confirmButton: "px-6 py-2 rounded-xl",
          },
        });

        router.push("/auth/signup");
      } finally {
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [router, searchParams]);

  if (verifying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-100 max-w-md w-full mx-4">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900">
              Verifying your email...
            </h2>
            <p className="text-gray-600 mt-2">
              Please wait while we verify your email address.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
