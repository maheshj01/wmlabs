# Widget Media Labs

The website for [Widget Media Labs](https://play.google.com/store/apps/developer?id=Widget+Media+Labs) apps: a home page, one landing page per app, and each app's privacy policy.

Built with Create React App, TypeScript, Tailwind CSS and React Router.

## Pages

| Path | Page |
| --- | --- |
| `/` | Home, with the list of apps |
| `/epoch` | Epoch landing page |
| `/privacy-policy` | Epoch privacy policy |
| `/autofill/privacy-policy` | Autofill privacy policy |
| `/pastelog/privacy-policy` | Pastelog privacy policy |

## Adding an app page

1. Build the page under `src/routes/<app>/` and add its route in `src/index.tsx`.
2. Put its images in `public/<app>/`. Screenshots work best as WebP about 720 px wide.
3. List it on the home page in `src/apps.ts`.
4. Give it its own tab title and icon with `useDocumentHead` (see `src/useDocumentHead.ts`).

The Epoch page lives in `src/routes/epoch/landing/`. Its colours are the `epoch-*` tokens in `tailwind.config.js`.

> This Tailwind config replaces the default radius and border-width scales, so `rounded-xl`, `rounded-2xl` and similar classes don't exist. Use arbitrary values such as `rounded-[16px]`.

## Scripts

```bash
npm install
npm start       # dev server on http://localhost:3000
npm run build   # production build in build/
```

`.env` (not committed) holds `REACT_APP_CONTACT_EMAIL` and `REACT_APP_PLAYSTORE_URL`.
