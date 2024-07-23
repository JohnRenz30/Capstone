"use client";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BotMessageSquare, Volume2 } from "lucide-react";
import { Slider } from "../ui/slider";

interface TextToSpeechProps {
  text?: string;
  gender?: "male" | "female";
  language?: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({
  text = "",
  gender = "female",
  language = "GB",
}) => {
  const [inputText, setInputText] = useState<string>(text);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState<number>(0.9); // Default speech rate
  const [pitch, setPitch] = useState<number>(1.1); // Default pitch
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleVoicesChanged = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);

      let defaultVoice = null;
      if (
        language.toLowerCase() === "tl" ||
        language.toLowerCase() === "tagalog"
      ) {
        defaultVoice = availableVoices.find((voice) =>
          voice.lang.startsWith("id")
        );
      } else {
        defaultVoice =
          availableVoices.find((voice) =>
            voice.name.toLowerCase().includes("female")
          ) ||
          availableVoices.find((voice) =>
            voice.name.toLowerCase().includes("uk")
          ) ||
          availableVoices.find((voice) =>
            voice.name.toLowerCase().includes("zira")
          );
      }

      setSelectedVoice(defaultVoice || availableVoices[0] || null);
    };

    if ("speechSynthesis" in window) {
      speechSynthesis.onvoiceschanged = handleVoicesChanged;
      handleVoicesChanged(); // Initial fetch of voices
    } else {
      setError("Text-to-Speech is not supported in this browser.");
    }
  }, [gender, language]);

  const speakText = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(inputText);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.rate = rate; // Set the speech rate
      utterance.pitch = pitch; // Set the pitch
      speechSynthesis.speak(utterance);
    } else {
      setError("Text-to-Speech is not supported in this browser.");
    }
  };

  const filteredVoices = voices.map((voice) => {
    if (
      language.toLowerCase() === "tl" ||
      language.toLowerCase() === "tagalog"
    ) {
      if (voice.lang.startsWith("id")) {
        return {
          ...voice,
          lang: "Tagalog Alternative",
          name: voice.name.replace("Indonesian", "Tagalog"),
        };
      }
    }
    return voice;
  });
  const placeholderText = selectedVoice
    ? `${selectedVoice.name} (${selectedVoice.lang})`
    : "Select a voice";
  return (
    <>
      {error ? (
        <></>
      ) : (
        <>
          {/* <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={5}
              cols={50}
            /> */}
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="outline" onClick={speakText}>
                <Volume2 />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Button
                    className="w-full flex-center gap-1"
                    onClick={speakText}
                  >
                    <Volume2 /> Speak Again
                  </Button>
                  {/* <p className="text-muted-foreground flex-center gap-1">
                    Hear the words from{" "}
                    <span className="text-accent-foreground flex">
                      <BotMessageSquare />
                      PrimaBots
                    </span>
                  </p> */}
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="voice" className="text-xs flex-between">
                    Characters/Voices:{" "}
                    <span className="text-accent-foreground flex">
                      <BotMessageSquare />
                      PrimaBots
                    </span>
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      const voice = voices.find((v) => v.name === value);
                      setSelectedVoice(voice || null);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={placeholderText} />
                    </SelectTrigger>
                    <SelectContent id="voice">
                      {filteredVoices.map((voice) => (
                        <SelectItem key={voice.name} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <div className="flex-between">
                    <Label htmlFor="rate" className="text-xs">
                      Speed:
                    </Label>
                    <p className="text-primary">
                      {rate != 1 && rate}{" "}
                      {rate > 1 ? "faster" : rate < 1 ? "slower" : "original"}
                    </p>
                  </div>

                  <Slider
                    id="rate"
                    min={0.1}
                    max={2}
                    step={0.1}
                    value={[rate]}
                    onValueChange={(value) => setRate(value[0])}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex-between">
                    <Label htmlFor="pitch" className="text-xs">
                      Age of the voice (pitch):
                    </Label>
                    <p className="text-primary">
                      {pitch != 1 && pitch}{" "}
                      {pitch > 1 ? "higher" : pitch < 1 ? "lower" : "original"}
                    </p>
                  </div>
                  <Slider
                    id="pitch"
                    min={0}
                    max={2}
                    step={0.1}
                    value={[pitch]}
                    onValueChange={(value) => setPitch(value[0])}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </>
      )}
    </>
  );
};

export default TextToSpeech;
