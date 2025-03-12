import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type Appointment = {
  name: string;
};

const appointments: Appointment[] = [
  { name: "Eye doctor" },
  { name: "Consultation" },
  { name: "Surgery" },
];

interface AppointmentTypeProps {
  selectedType: string;
  setAppointmentType: (type: string) => void;
}

const AppointmentType: React.FC<AppointmentTypeProps> = ({
  selectedType,
  setAppointmentType,
}) => {
  return (
    <div>
      <div className="text-center mb-4 mt-12">Appointment Type</div>
      <div className="flex gap-4">
        <RadioGroup
          value={selectedType}
          onValueChange={setAppointmentType}
        >
          {appointments.map((appointment) => (
            <div key={appointment.name} className="flex items-center space-x-2">
              <RadioGroupItem value={appointment.name} id={appointment.name} />
              <Label htmlFor={appointment.name}>{appointment.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default AppointmentType;
