import typography from "@tailwindcss/typography";
import { radixThemePreset } from "radix-themes-tw";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  presets: [radixThemePreset],
  plugins: [typography],
};
