

// import type { Metadata } from "next";
// import { Geist, Schibsted_Grotesk, Martian_Mono } from "next/font/google";
// import "./globals.css";
// import LightRays from "./components/LightRays";
// import { cn } from "@/lib/utils";
// import Navbar from "./components/Navbar";
// const geist = Geist({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

// const schibsted = Schibsted_Grotesk({
//   subsets: ["latin"],
//   variable: "--font-display",
// });

// const martianMono = Martian_Mono({
//   subsets: ["latin"],
//   variable: "--font-mono",
// });

// export const metadata: Metadata = {
//   title: "DevEvent",
//   description: "The hub for every event in the dev community",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className={cn(geist.variable, schibsted.variable)}>
//       <body
//         className={cn(
//           martianMono.variable,
//           "bg-black text-white antialiased relative min-h-screen overflow-x-hidden"
//         )}
//       >
//         <Navbar/>
//         {/* Background Effect */}
//         <div className="absolute inset-0 -z-10">
//           <LightRays
//             raysOrigin="top-center-offset"
//             raysColor="#5dfeca"
//             raysSpeed={0.5}
//             lightSpread={0.9}
//             rayLength={1.4}
//             followMouse={true}
//             mouseInfluence={0.02}
//             noiseAmount={0.0}
//             distortion={0.01}
            
//           />
//         </div>

//         {/* Content */}
//         <main className="relative z-10 max-w-full mx-auto px-6 py-10">
//           {children}
//         </main>
//       </body>
//     </html>
//   );
// }





// app/layout.tsx
import type { Metadata } from "next"
import { Geist, Schibsted_Grotesk, Martian_Mono } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
})

const martianMono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "DevEvent",
  description: "The hub for every event in the dev community",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(geist.variable, schibsted.variable)}>
      <body
        className={cn(
          martianMono.variable,
          "bg-black text-white antialiased relative min-h-screen overflow-x-hidden"
        )}
      >
        {children}
      </body>
    </html>
  )
}