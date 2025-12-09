import React from "react";

interface ReasonCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ReasonCard({ icon, title, description }: ReasonCardProps) {
  return (
    <div className="reason-card bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
      <span className="text-3xl mb-2">{icon}</span>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p>{description}</p>
    </div>
  );
} 