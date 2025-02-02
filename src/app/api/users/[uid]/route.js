"use server";
import { db, storage } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { userId } = params;

    // Ensure the request has the correct Content-Type
    const contentType = request.headers.get("content-type");
    if (
      !contentType ||
      (!contentType.includes("multipart/form-data") &&
        !contentType.includes("application/x-www-form-urlencoded"))
    ) {
      return NextResponse.json(
        { error: "Invalid Content-Type" },
        { status: 400 }
      );
    }

    // Parse form data
    const formData = await request.formData();

    // Extract data from formData
    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      title: formData.get("title"),
      location: formData.get("location"),
      bio: formData.get("bio"),
      website: formData.get("website"),
      linkedin: formData.get("linkedin"),
      twitter: formData.get("twitter"),
      updatedAt: new Date().toISOString(),
    };

    // Handle profile picture upload if provided
    const profilePicture = formData.get("profilePicture");
    if (profilePicture) {
      const storageRef = ref(storage, `profilePictures/${userId}`);
      await uploadBytes(storageRef, profilePicture);
      const downloadURL = await getDownloadURL(storageRef);
      userData.profilePictureUrl = downloadURL;
    }

    // Update user document in Firestore
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, userData);

    return NextResponse.json({
      message: "Profile updated successfully",
      user: userData,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  const { uid } = params;

  try {
    // Fetch the user document from Firestore
    const userDocRef = doc(db, "users", uid); // Reference to the user document
    const userDoc = await getDoc(userDocRef); // Fetch the document

    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the user data
    const userData = userDoc.data();
    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
