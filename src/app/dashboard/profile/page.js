"use client";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import ProfileUpdateForm from "./components/ProfileUpdateForm";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUid(currentUser.uid);
      } else {
        setUid(null);
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    console.log(uid);

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${uid}`);
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [uid]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found or not authenticated.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <ProfileUpdateForm user={user} />
    </div>
  );
}
