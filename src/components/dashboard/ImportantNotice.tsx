import MaterialIcon from "@/components/ui/MaterialIcons";

export default function ImportantNotice() {
  return (
    <div className="bg-green-100 dark:bg-green-900/50 rounded-lg p-4 flex items-start">
      <MaterialIcon name="info" className="text-accent-green mt-1" />
      <div className="ml-3">
        <h4 className="font-semibold text-accent-green">Important Notice</h4>
        <p className="text-sm text-green-800 dark:text-green-200">
          Our AI assistant provides general health information and is not a
          substitute for professional medical advice. Always consult a qualified
          doctor.
        </p>
      </div>
    </div>
  );
}