import { format } from "date-fns";
import { Consultation } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface ConsultationHistoryProps {
  consultations: Consultation[];
}

export default function ConsultationHistory({
  consultations,
}: ConsultationHistoryProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Doctor
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Duration
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {consultations.map((consultation) => (
            <tr key={consultation.id}>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm font-medium text-gray-900">
                  {consultation.doctorName}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-gray-900">
                  {format(new Date(consultation.date), "MMM d, yyyy 'at' h:mm a")}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-gray-900">
                  {consultation.duration} minutes
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span
                  className={cn(
                    "inline-flex rounded-full px-2 text-xs font-semibold leading-5",
                    consultation.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : consultation.status === "scheduled"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  )}
                >
                  {consultation.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}