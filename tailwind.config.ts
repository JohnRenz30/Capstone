import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontWeight: {
      base: "600",
      heading: "800",
      thin: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
    fontSize: {
      xs: ["1.125rem", { lineHeight: "1.5rem" }], // 1.5rem * 0.75 = 1.125rem
      sm: ["1.3125rem", { lineHeight: "1.875rem" }], // 1.75rem * 0.75 = 1.3125rem
      base: ["1.5rem", { lineHeight: "2.25rem" }], // 2rem * 0.75 = 1.5rem
      lg: ["1.6875rem", { lineHeight: "2.625rem" }], // 2.25rem * 0.75 = 1.6875rem
      xl: ["1.875rem", { lineHeight: "2.625rem" }], // 2.5rem * 0.75 = 1.875rem
      "2xl": ["2.25rem", { lineHeight: "3rem" }], // 3rem * 0.75 = 2.25rem
      "3xl": ["2.8125rem", { lineHeight: "3.375rem" }], // 3.75rem * 0.75 = 2.8125rem
      "4xl": ["3.375rem", { lineHeight: "3.75rem" }], // 4.5rem * 0.75 = 3.375rem
      "5xl": ["4.5rem", { lineHeight: "1.5" }], // 6rem * 0.75 = 4.5rem
      "6xl": ["5.625rem", { lineHeight: "1.5" }], // 7.5rem * 0.75 = 5.625rem
      "7xl": ["6.75rem", { lineHeight: "1.5" }], // 9rem * 0.75 = 6.75rem
      "8xl": ["9rem", { lineHeight: "1.5" }], // 12rem * 0.75 = 9rem
      "9xl": ["12rem", { lineHeight: "1.5" }], // 16rem * 0.75 = 12rem
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        shadow: "4px 4px 0px 0px #000",
        background: "4px 4px 0px 0px hsl(var(--background))",
        foreground: "4px 4px 0px 0px hsl(var(--foreground))",
        primary: "4px 4px 0px 0px hsl(var(--primary))",
        secondary: "4px 4px 0px 0px hsl(var(--secondary))",
        destructive: "4px 4px 0px 0px hsl(var(--destructive))",
        muted: "4px 4px 0px 0px hsl(var(--muted))",
        accent: "4px 4px 0px 0px hsl(var(--accent))",
        popover: "4px 4px 0px 0px hsl(var(--popover))",
        card: "4px 4px 0px 0px hsl(var(--card))",
      },
      translate: {
        boxShadowX: "4px",
        boxShadowY: "4px",
        reverseBoxShadowX: "-4px",
        reverseBoxShadowY: "-4px",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      screens: {
        m1500: { raw: "(max-width: 1500px)" },
        m1300: { raw: "(max-width: 1300px)" },
        m1100: { raw: "(max-width: 1100px)" },
        m1000: { raw: "(max-width: 1000px)" },
        m900: { raw: "(max-width: 900px)" },
        m850: { raw: "(max-width: 850px)" },
        m800: { raw: "(max-width: 800px)" },
        m750: { raw: "(max-width: 750px)" },
        m700: { raw: "(max-width: 700px)" },
        m650: { raw: "(max-width: 650px)" },
        m600: { raw: "(max-width: 600px)" },
        m550: { raw: "(max-width: 550px)" },
        m500: { raw: "(max-width: 500px)" },
        m450: { raw: "(max-width: 450px)" },
        m400: { raw: "(max-width: 400px)" },
        m350: { raw: "(max-width: 350px)" },
      },
      borderWidth: {
        DEFAULT: "3px",
        "0": "0",
        "2": "2px",
        "3": "3px",
        "4": "4px",
        "6": "6px",
        "8": "8px",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
