import TextToSpeech from "@/components/app/TextToSpeech";
import { cn } from "@/lib/utils";
import Image from "next/image";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="w-screen bg-cover bg-center h-full"
      style={{ backgroundImage: 'url("/bg-login.jpg")' }}
    >
      <div
        className="w-full min-h-screen flex-center bg-primary/40 dark:bg-background/90 backdrop-blur-sm "
        style={{ minHeight: "100dvh" }}
      >
        <Image
          src="/blue-paperboard-texture.jpg"
          fill
          style={{
            objectFit: "cover",
            opacity: "0.25",
            mixBlendMode: "overlay",
            // zIndex: "10",
            userSelect: "none",
            pointerEvents: "none",
          }}
          draggable="false"
          alt=""
          priority
        />
        <div className="flex-between w-full h-screen">
          <div
            className={cn(
              "bg-primary dark:bg-background flex-1 w-full h-full border-l-2 border flex-center m800:hidden shadow-2xl",
              "bg-background bg-[linear-gradient(to_right,#766c8933_1px,transparent_1px),linear-gradient(to_bottom,#766c8933_1px,transparent_1px)] bg-[size:3rem_3rem]"
            )}
          >
            <div className="w-full p-0 px-10">
              <h2 className="text-balance text-right font-heading text-2xl">
                &quot;Kindness in words creates confidence. Kindness in thinking
                creates profoundness. Kindness in giving creates love. &quot; —
                Lao Tzu
                <div>
                  <TextToSpeech
                    text="Kindness in words creates confidence. Kindness in
                  thinking creates profoundness. Kindness in giving creates
                  love."
                    language=""
                  />
                </div>
              </h2>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
