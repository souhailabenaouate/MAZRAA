# MAZRA'A web

    npm install
    npm run dev        # http://localhost:5173

Flow: Landing > Login / Sign up > App.

- `src/` - React: landing (`Welcome`), login + sign up (`AuthFrame` keeps the header while the form swaps), and `AppShell`.
- `public/interior/` - the app interior (home, diagnose, my farm, rotations, report, alerts, problem, priorities,
  calendar, learn, technician dashboard, GHARS chat + audio). `AppShell` shows it full-screen in a frame, so its
  styles never clash with the landing/login.
  - `assets/css/theme.css` - landing/login palette, fonts and dark mode applied to the interior.
  - `assets/js/account.js` - account menu (top right): user, language, light/dark, log out.
- Session, language (`lang`) and theme (`theme`) are shared through localStorage by both parts.
- Auth is mocked in localStorage (`src/lib/auth.tsx`); replace with Supabase Auth in the backend phase.
