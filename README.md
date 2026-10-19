# Alia Manzoor Portfolio

A complete responsive portfolio built from `content of alia portfoilo.docx`. Black, white, light gray, dark forest green, and electric lime (#A3FF12), with the section order and copy in the brief.

## Run in VS Code

Install Node.js 18 or newer. Extract the ZIP, open the `alia-portfolio` folder in VS Code, then run:

```powershell
npm run dev
```

Open http://localhost:5173. No `npm install` is needed: the project has no external dependencies. `npm start` works too. To verify the package:

```powershell
npm run build
```

The deployable website is already in `dist`. You can also open `dist/index.html` directly for a quick offline view. Use the local server for the intended development workflow.

## Files

- `dist/index.html`: semantic page structure and primary copy
- `dist/assets/styles.css`: responsive design, states, animations, reduced-motion support
- `dist/assets/data.js`: projects, process, work experience, education, skills, social links and contact settings
- `dist/assets/app.js`: menu, project dialogs, folders, process tabs, form handling and rendering
- `dist/assets/*.webp`: project previews extracted from the supplied reference
- `dist/assets/Alia-Manzoor-CV.pdf`: a CV compiled from the provided portfolio content
- `dist/thank-you.html`: successful submission redirect for Netlify Forms
- `scripts/serve.mjs`: dependency-free development server
- `scripts/check.mjs`: source and asset checks
- `netlify.toml`: deployment configuration

## Implemented interactions

The work cards scroll in a continuous loop without stopping on hover. A pause button and reduced-motion mode provide accessibility. Keyboard focus pauses the moving track. Project buttons open native dialogs with focus restoration and Escape-to-close. Folder buttons filter projects by category. Process tabs support arrow keys, Home and End. Education and accomplishments use native expandable details. The navigation collapses on mobile. CV buttons download a real PDF.

## Important content decisions

1. The footer includes LinkedIn, Behance, Portfolio, Upwork and Fiverr. The added freelance links are configured in `footerSocials` in `assets/data.js`; the sidebar and contact social links remain unchanged. Portfolio links point to the top of this website because no separate portfolio URL was supplied.
2. Standalone project images and case studies were not supplied. Five previews are cropped from the screenshot embedded in the Word file. These are low-resolution reference previews, not newly fabricated designs. The Coinnest preview is only partially visible in the source screenshot.
3. Project dialogs honestly explain that full case studies are not added. They link to Alia's supplied Behance profile, not invented case-study URLs. Mobile App and Landing Page folders show a clear empty state. Folder cards have no project numbers or 'Coming Soon' labels.
4. The downloadable CV was newly compiled from the supplied content. It is not represented as an original CV attachment. Experience metrics are reproduced from the brief, not independently verified.
5. Replace the preview files and update `data.js` when original images and project URLs are available.

## Contact form

The default `contact.mode` is `email`. The form validates entries and opens a mailto draft. The visitor must send it from their email app. The website never claims the draft has been sent. No messages are stored or sent by the static site itself.

### Netlify

Deploy the `dist` folder by dragging it into Netlify, or connect the repository with build command `npm run build` and publish directory `dist`.

To enable real contact submissions:

1. Enable form detection in the site's Netlify Forms settings.
2. Set `contact.mode` to `netlify` in `dist/assets/data.js`.
3. Redeploy so Netlify detects the static `portfolio-contact` form in `index.html`.
4. Configure email notifications to `aliamanzoor680@gmail.com` in Netlify.
5. Submit a test on the deployed site and confirm it appears in Netlify Forms and reaches the notification inbox.

Leave mode as `email` on hosts that do not process Netlify Forms. Never use `netlify` mode on Sites or a plain static server: generic HTTP 200 responses do not establish form delivery.

### Your own API

Set `contact.mode` to `endpoint` and set `contact.endpoint` to your HTTPS endpoint. It must accept JSON `{name,email,message}`, perform server-side validation, rate limiting and spam prevention, and return a non-2xx error when delivery fails. Return 2xx only once the request is accepted for delivery. Configure CORS if using another origin. Keep email/API secrets server-side, never in data.js.

## Verification

Source syntax, local links and assets, anchor targets, unique IDs, required data records, downloadable PDF and static form markup were checked. The PDF was rendered and visually inspected. Interactive browser QA was unavailable in the build environment, and live email delivery is not configured. Review the site at mobile and desktop widths after deploying and before making it public.

## Editing

Update copy in `index.html` and structured content in `assets/data.js`. Keep image filenames aligned with each project's `image` value. Replace the CV PDF using the same filename to preserve both download buttons. CSS breakpoints cover small phones, tablets and desktop. The site uses system fonts and local assets, so the page has no third-party font or script dependency.
