"use client";
import {
  Grid,
  Lock,
  Mail,
  MailCheck,
  Navigation,
  UserPlus,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-bold">
            Starter Project
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="text-center py-16">
        <div className="max-w-screen-lg mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">
            Welcome to the Starter Project
          </h1>
          <p className="text-lg mb-12">
            This project showcases a range of features like authentication
            (login, signup, password reset), a responsive dashboard, and more!
            Below, you can explore the main features of the project.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Login */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <MailCheck className="mx-auto mb-4 text-4xl text-blue-600" />
              <h2 className="text-xl font-semibold mb-2">Login</h2>
              <p>
                Users can log in securely to access their personal dashboard.
                The login flow includes email and password authentication.
              </p>
            </div>

            {/* Feature 2: Signup */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <UserPlus className="mx-auto mb-4 text-4xl text-green-600" />
              <h2 className="text-xl font-semibold mb-2">Signup</h2>
              <p>
                New users can sign up by creating an account with their email
                and password. The signup form is simple and user-friendly.
              </p>
            </div>

            {/* Feature 3: Password Reset */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <Lock className="mx-auto mb-4 text-4xl text-yellow-600" />
              <h2 className="text-xl font-semibold mb-2">Reset Password</h2>
              <p>
                Users who forget their password can easily reset it via a secure
                email verification process.
              </p>
            </div>

            {/* Feature 4: Email Verification */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <Mail className="mx-auto mb-4 text-4xl text-purple-600" />
              <h2 className="text-xl font-semibold mb-2">Email Verification</h2>
              <p>
                A verification email is sent to users during signup to ensure
                account authenticity and security.
              </p>
            </div>

            {/* Feature 5: Dashboard */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <Grid className="mx-auto mb-4 text-4xl text-teal-600" />
              <h2 className="text-xl font-semibold mb-2">
                Responsive Dashboard
              </h2>
              <p>
                Once logged in, users are presented with a responsive dashboard
                to manage their account settings and profile information.
              </p>
            </div>

            {/* Feature 6: Navigation & Footer */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <Navigation className="mx-auto mb-4 text-4xl text-orange-600" />
              <h2 className="text-xl font-semibold mb-2">
                Navigation & Footer
              </h2>
              <p>
                The project includes a well-structured navigation bar and
                footer, making it easy to navigate between pages.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-4">Try It Yourself!</h3>
            <p className="text-lg mb-6">
              Explore the demo of the Starter Project by signing up and logging
              in. See the functionality in action.
            </p>
            <button
              onClick={() => (window.location.href = "/signup")}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md text-xl"
            >
              Get Started
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-4 mt-8">
        <div className="max-w-screen-xl mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} Starter Project. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
