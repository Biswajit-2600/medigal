import MaterialIcon from "@/components/ui/MaterialIcons";
import { useState } from "react";

interface ProfileField {
  label: string;
  icon: string;
  value: string;
  type?: string;
}

interface ProfileInformationProps {
  fields: ProfileField[];
  onEdit: () => void;
}

export default function ProfileInformation({ fields, onEdit }: ProfileInformationProps) {
  return (
    <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-sm mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">
          Personal Information
        </h3>
        <button
          onClick={onEdit}
          className="flex items-center space-x-2 text-primary font-semibold"
        >
          <MaterialIcon name="edit" className="text-lg" />
          <span>Edit Profile</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.label} className={field.type === "full" ? "md:col-span-2" : ""}>
            <label className="text-sm font-medium text-subtext-light dark:text-subtext-dark">
              {field.label}
            </label>
            <div className="mt-2 flex items-center bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md p-3">
              <MaterialIcon
                name={field.icon}
                className="text-subtext-light dark:text-subtext-dark mr-3"
              />
              <p className="text-text-light dark:text-text-dark">{field.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}