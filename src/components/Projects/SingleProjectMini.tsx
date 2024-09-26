import React from "react";
import Image from "next/image"; // Import for Next.js Image optimization
import { ProjectDonate } from "@/types/project";

const SingleProjectMini = ({ project }: { project: ProjectDonate }) => {
  // Calculate time remaining
  const timeRemaining = (endDate: Date) => {
    const now = new Date();
    const end = new Date(endDate);
    const remainingTime = end.getTime() - now.getTime();

    if (remainingTime <= 0) return "Ended";
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    return `Còn ${days} ngày`;
  };

  // Limit description to 80 characters
  const limitedDescription = project.description.length > 80
    ? project.description.substring(0, 77) + "..."
    : project.description;

  // Calculate donation progress
  const progressPercentage = (project.current_amount / project.goal_amount) * 100;

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white dark:bg-gray-800">
      <div className="flex flex-col justify-between h-full">
        <div>
          <Image
            src="/images/projects/image_project.png"
            alt={project.project_name}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-md"
          />
          <div className="inline-block bg-orange-200 text-white rounded-full px-2 py-1 mt-2">
            <p className="text-orange-600">{timeRemaining(project.end_date)}</p>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{}</p><div className="w-full flex justify-end">
            <h2 className="text-lg text-gray-900 dark:text-white mt-2">{project.project_manager_name}</h2>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2">{project.project_name}</h3>
          <p className="text-gray-700 dark:text-gray-300">{limitedDescription}</p>
        </div>
        {/* --- */}
        <div>
          <div className="w-full flex justify-end">
            <p className="text-green-500">{Math.round(progressPercentage)}%</p>
          </div>
          <div className="mt-2">
            <div className="relative w-full h-2 bg-gray-200 rounded-full">
              <div
                className="absolute h-full bg-green-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Hiện tại: <span className="font-bold">{project.current_amount.toLocaleString('vi-VI')}đ</span> / <span className="font-bold">{project.goal_amount.toLocaleString('vi-VI')}đ</span>
            </p>
          </div>
          <button className="mt-4 w-full py-2 bg-blue2 text-white rounded hover:bg-blue2">
            Quyên góp
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProjectMini;
