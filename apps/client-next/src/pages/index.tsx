import { ChevronDown } from "lucide-react";
import { Button, Textarea, Textfield } from "@libs/ui";

export const Home = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col gap-4 p-8">
        <Textarea placeholder="placeholder" className="w-[280px]" />
        <Textarea disabled placeholder="disabled" className="w-[280px]" />
        <Textarea error="error" placeholder="error" className="w-[280px]" />
        <Textarea guide="guide" placeholder="guide" className="w-[280px]" maxLength={10} />
        <Textarea maxLength={10} placeholder="maxLength" className="w-[280px]" />
      </div>
    </div>
  );
};

export default Home;
