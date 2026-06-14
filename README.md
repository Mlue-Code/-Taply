# Taply

Taply is a product for collecting feedback on designs and review sessions.  
This repository currently focuses on the frontend, which lives inside `taply/frontend`.

## Project Structure

- `taply/frontend` - Next.js frontend
- `taply/backend` - backend project
- `taply/shared` - shared files and types

## Correct Frontend Path

To install dependencies or run the frontend, go to:

```powershell
cd C:\Users\rasooly\Desktop\Taply\taply\frontend
```

Then run:

```powershell
npm i
npm run dev
```

## Available Scripts

Inside `taply/frontend/package.json`, the following scripts are available:

- `npm run dev` - start the development server
- `npm run build` - build the app for production
- `npm run start` - run the production build
- `npm run lint` - run lint checks

## Current UI Status

The first phase focuses on aligning the UI with the Figma design:

- light theme with purple primary color
- `Inter` as the main font
- 4px-based spacing and radius system
- rebuilt landing page to match the Figma style

## Important Note

If you see an `ENOENT` error while running `npm i`, it usually means you are in the wrong folder.  
This project does not run from the root `Taply` folder. It must be run from `taply/frontend`.
