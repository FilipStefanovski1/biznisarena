import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        agenda: resolve(__dirname, "agenda.html"),
        competition: resolve(__dirname, "competition.html"),
        contact: resolve(__dirname, "contact.html"),
        expo: resolve(__dirname, "expo.html"),
        partners: resolve(__dirname, "partners.html"),
        speakers: resolve(__dirname, "speakers.html"),
        tickets: resolve(__dirname, "tickets.html"),
      },
    },
  },
});
