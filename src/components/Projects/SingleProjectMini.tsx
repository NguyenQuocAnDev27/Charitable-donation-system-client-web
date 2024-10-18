import React from "react";
import Image from "next/image"; // Import for Next.js Image optimization
import { Project } from "../../interface"; // Assuming this is your updated interface

const SingleProjectMini = ({
  project,
  onClickInfo,
  onClickDonate,
}: {
  project: Project;
  onClickInfo: () => void;
  onClickDonate: () => void;
}) => {
  // Calculate time remaining
  const timeRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const remainingTime = end.getTime() - now.getTime();

    if (remainingTime <= 0) return "Ended";
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    return `Còn ${days} ngày`;
  };

  // Limit description to 80 characters
  const limitedDescription =
    project.description.length > 80
      ? project.description.substring(0, 77) + "..."
      : project.description;

  // Calculate donation progress
  const progressPercentage =
    (project.currentAmount / project.goalAmount) * 100 > 100
      ? 100
      : (project.currentAmount / project.goalAmount) * 100;

  return (
    <div className="rounded-lg border bg-white p-4 shadow-md dark:bg-gray-800">
      <div className="flex h-full flex-col justify-between">
        <div>
          <Image
            src="/images/projects/image_project.png"
            alt={project.projectName}
            width={300}
            height={200}
            className="h-48 w-full rounded-md object-cover"
          />
          <div className="mt-2 inline-block rounded-full bg-orange-200 px-2 py-1 text-white">
            <p className="text-orange-600">{timeRemaining(project.endDate)}</p>
          </div>
          <p className="text-gray-700 dark:text-gray-300"></p>
          <div className="flex w-full justify-end">
            <h2 className="mt-2 text-lg text-gray-900 dark:text-white">
              {project.projectManager.fullName}{" "}
              {/* Accessing project manager's full name */}
            </h2>
          </div>
          <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
            {project.projectName}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {limitedDescription}
          </p>
        </div>
        {/* --- */}
        <div>
          <div className="flex w-full justify-end">
            <p className="text-green-500">{Math.round(progressPercentage)}%</p>
          </div>
          <div className="mt-2">
            <div className="relative h-2 w-full rounded-full bg-gray-200">
              <div
                className="absolute h-full rounded-full bg-green-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Hiện tại:{" "}
              <span className="font-bold">
                {project.currentAmount.toLocaleString("vi-VI")}đ
              </span>{" "}
              /{" "}
              <span className="font-bold">
                {project.goalAmount.toLocaleString("vi-VI")}đ
              </span>
            </p>
          </div>
          <button
            className="mt-4 w-full rounded bg-green-500 py-2 text-white hover:bg-green-700"
            onClick={onClickInfo}
          >
            Xem thông tin
          </button>

          <button className="mt-4 w-full rounded bg-blue2 py-2 text-white hover:bg-darkblue"
            onClick={onClickDonate}
          >
            Quyên góp
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProjectMini;
