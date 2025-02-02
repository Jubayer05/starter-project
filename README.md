# Authentication System with Next.js & Firebase

A clean and reusable authentication system built with Next.js, Firebase, and Tailwind CSS. Includes login, signup, password reset, email verification, and Google Sign-In. Designed for easy integration with future dashboard and other features.

## Features

### Auth Features

- Email/password login & signup
- Google Sign-In
- Email verification
- Password reset

### UI/UX

- Responsive design
- Form validation with Zod
- Loading states & error handling

### Extendable

- Ready for dashboard integration
- Modular components for reusability

## Quick Setup

### Clone the repo:

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### Install dependencies:

```bash
npm install
```

### Add Firebase config in `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### Run the app:

```bash
npm run dev
```

## Pages

- **Login:** `/auth/login`  
  Email/password login, Google Sign-In, forgot password link.
- **Signup:** `/auth/signup`  
  User registration with email verification.
- **Forgot Password:** `/auth/forgot-password`  
  Send password reset email.
- **Reset Password:** `/auth/reset-password`  
  Set new password.
- **Verify Email:** `/auth/verify-email`  
  Handle email verification.

## Extending the Project

### Dashboard Integration

- Add protected routes and dashboard components after authentication.

### Reusable Components

- Use existing form components (e.g., input fields, buttons) for new features.

### Additional Auth Providers

- Extend Firebase config to support more providers (e.g., GitHub, Facebook).

### Custom Hooks

- Create hooks for authentication logic reusability.

## Dependencies

- `firebase`: Authentication & Firestore
- `react-hook-form` + `zod`: Form management & validation
- `lucide-react`: Icons
- `tailwindcss`: Styling
- `sweetalert2`: Alerts & notifications

## License

MIT License. See `LICENSE` for details.
# starter-project
