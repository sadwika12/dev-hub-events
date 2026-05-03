// app/(main)/layout.tsx
import Navbar from "@/app/components/Navbar"
import LightRays from "@/app/components/LightRays"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />

      
      <div className="absolute inset-0 -z-10">
        <LightRays
          raysOrigin="top-center-offset"
          raysColor="#5dfeca"
          raysSpeed={0.5}
          lightSpread={0.9}
          rayLength={1.4}
          followMouse={true}
          mouseInfluence={0.02}
          noiseAmount={0.0}
          distortion={0.01}
        />
      </div>

      
      <main className="relative z-10 max-w-full mx-auto px-6 py-10">
        {children}
      </main>
    </>
  )
}