import React from "react";
import Link from "next/link";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  duration: string;
  link: string;
  linkText: string;
}

export default function ServiceCard({ icon, title, description, price, duration, link, linkText }: ServiceCardProps) {
  return (
    <div className="service-card bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
      <span className="text-3xl mb-2">{icon}</span>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="mb-4">{description}</p>
      <div className="service-price mb-2">
        <span className="price font-bold text-cyan-500">{price}</span>
        <span className="duration text-gray-500 ml-1">{duration}</span>
      </div>
      <Link href={link} className="text-cyan-500 font-semibold hover:underline">{linkText}</Link>
    </div>
  );
} 