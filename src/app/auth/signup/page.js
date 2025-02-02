"use client";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Loader2,
  Lock,
  Mail,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
    // Password strength checker
    const checkPasswordStrength = (password) => {
      let strength = 0;
      if (password.length >= 8) strength += 25;
      if (password.match(/[A-Z]/)) strength += 25;
      if (password.match(/[0-9]/)) strength += 25;
      if (password.match(/[^A-Za-z0-9]/)) strength += 25;
      return strength;
    };

    setPasswordStrength(checkPasswordStrength(formData.password));
  }, [formData.password]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // Create the user document in Firestore first
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        name: formData.name,
        email: formData.email,
        uid: user.uid,
        emailVerified: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Send verification email with custom continue URL
      const actionCodeSettings = {
        url: `${window.location.origin}/auth/verify-email?uid=${user.uid}`,
        handleCodeInApp: true,
      };

      await sendEmailVerification(user, actionCodeSettings);

      // Sign out the user
      await signOut(auth);

      // Show success message before redirect (optional)
      await Swal.fire({
        title: "Verification Email Sent!",
        text: "Please check your email to verify your account.",
        icon: "success",
        confirmButtonColor: "#3B82F6",
        confirmButtonText: "OK",
        customClass: {
          popup: "rounded-2xl",
          confirmButton: "px-6 py-2 rounded-xl",
        },
      });

      router.push("/auth/verification-sent");
    } catch (error) {
      console.error("Signup error:", error);
      let errorMessage = "An error occurred during signup.";

      // Handle specific Firebase errors
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage =
            "This email is already registered. Please try logging in.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/operation-not-allowed":
          errorMessage =
            "Email/password accounts are not enabled. Please contact support.";
          break;
        case "auth/weak-password":
          errorMessage = "Please choose a stronger password.";
          break;
        default:
          errorMessage = error.message;
      }

      setErrors({ submit: errorMessage });

      // Show error message (optional)
      await Swal.fire({
        title: "Signup Failed",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#3B82F6",
        confirmButtonText: "Try Again",
        customClass: {
          popup: "rounded-2xl",
          confirmButton: "px-6 py-2 rounded-xl",
        },
      });
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
              <div className="absolute -right-4 -top-4 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center animate-bounce">
                <Shield className="h-4 w-4 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Join our growing community today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2 group">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <span>Full Name</span>
                {errors.name && (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm group-hover:border-blue-300"
                  placeholder="John Doe"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                {formData.name && !errors.name && (
                  <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
                <div className="absolute inset-0 rounded-xl border border-blue-500/0 group-hover:border-blue-500/50 pointer-events-none transition-all duration-300" />
              </div>
              {errors.name && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

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
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm group-hover:border-blue-300"
                  placeholder="john@example.com"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                {formData.email && !errors.email && (
                  <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
                <div className="absolute inset-0 rounded-xl border border-blue-500/0 group-hover:border-blue-500/50 pointer-events-none transition-all duration-300" />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.email}</span>
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
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm group-hover:border-blue-300"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                {formData.password && !errors.password && (
                  <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
                <div className="absolute inset-0 rounded-xl border border-blue-500/0 group-hover:border-blue-500/50 pointer-events-none transition-all duration-300" />
              </div>
              {/* Password strength indicator */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-300 rounded-full"
                      style={{
                        width: `${passwordStrength}%`,
                        backgroundColor:
                          passwordStrength <= 25
                            ? "#ef4444"
                            : passwordStrength <= 50
                            ? "#f97316"
                            : passwordStrength <= 75
                            ? "#eab308"
                            : "#22c55e",
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">
                    Password strength:{" "}
                    {passwordStrength <= 25
                      ? "Weak"
                      : passwordStrength <= 50
                      ? "Fair"
                      : passwordStrength <= 75
                      ? "Good"
                      : "Strong"}
                  </p>
                </div>
              )}
              {errors.password && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl animate-shake">
                <p className="text-sm text-red-600 flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>{errors.submit}</span>
                </p>
              </div>
            )}

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
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 relative group"
              >
                Sign in
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
              </Link>
            </p>
          </div>

          {/* Terms and Privacy Policy */}
          <div className="mt-6 text-center text-sm text-gray-500">
            By creating an account, you agree to our{" "}
            <Link
              href="/terms"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
