import React from "react";
import Image from "next/image";

interface TestimonialCardProps {
  content: string;
  authorName: string;
  authorRole: string;
  authorImage: string;
}

export default function TestimonialCard({ content, authorName, authorRole, authorImage }: TestimonialCardProps) {
  return (
    <div className="testimonial-card bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
      <div className="testimonial-content mb-4">
        <p className="italic">&quot;{content}&quot;</p>
      </div>
      <div className="testimonial-author flex flex-col items-center">
        <div className="author-avatar mb-2">
          <Image src={authorImage} alt={authorName} width={64} height={64} className="rounded-full object-cover" />
        </div>
        <div className="author-info">
          <h4 className="font-semibold">{authorName}</h4>
          <p className="text-sm text-gray-500">{authorRole}</p>
        </div>
      </div>
    </div>
  );
} 