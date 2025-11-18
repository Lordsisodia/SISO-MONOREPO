import Component from "@/components/ui/etheral-shadow";

export const metadata = {
  title: "Etheral Shadows Demo",
};

export default function EtheralShadowsDemoPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-siso-bg-primary text-siso-text-primary p-6">
      <div className="w-full max-w-5xl h-[70vh]">
        <Component
          color="rgba(128, 128, 128, 1)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing="fill"
        />
      </div>
    </div>
  );
}
