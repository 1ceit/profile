# Custom Profile Page

A standalone, highly customizable profile page built with React, TypeScript, and Vite.

## Why?

I wanted the premium features found on site the "guns.lol" without paying a monthly subscription. So, I built them myself.

This project is completely **free to use, modify, and host**.

## Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/1ceit/profile.git
    cd profile
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run locally**
    ```bash
    npm run dev
    ```

4.  **Configuration**
    - Edit `src/components/Profile.tsx` to change:
      - Username & Bio
      - Background (Video/Image)
      - Discord Avatar & Decoration
    - Edit `src/components/SocialLinks.tsx` to add/remove links.
    - Edit `src/components/Icons.tsx` to add new SVG icons.

5.  **Build for production**
    ```bash
    npm run build
    ```
    The output will be in the `dist` folder, ready to deploy to Vercel, Netlify, or your own VPS.

## Attribution

If you use this code for your own profile, a link back to this repository or a shoutout to [1ceit](https://github.com/1ceit) is appreciated.

## License

MIT License. Free to use, modify, and distribute.
