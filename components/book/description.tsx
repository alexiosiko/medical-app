import React from "react";
import { Textarea } from "../ui/textarea";

interface DescriptionProps {
  description: string;
  setDescription: (description: string) => void;
}

const Description: React.FC<DescriptionProps> = ({
  description,
  setDescription,
}) => {
  return (
    <div className="max-w-[70%] w-full mx-auto">
      <Textarea
        className="w-full"
        placeholder="Give the reason for your appointment here ..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
};

export default Description;
