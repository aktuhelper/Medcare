import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_componenets/Header";
import Footer from "./_componenets/Footer";
import { Toaster } from "sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Medcare",
  description: "Doctor Appointment Booking Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <Header />
        {children}
        <Toaster />
        <Footer/>
      </body>
    </html>
  );
}
