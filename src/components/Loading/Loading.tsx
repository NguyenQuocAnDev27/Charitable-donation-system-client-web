'use client';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen space-x-2">
      <div className="circle bg-blue"></div>
      <div className="circle bg-green-500 animation-delay-200"></div>
      <div className="circle bg-red-500 animation-delay-400"></div>
    </div>
  );
};

export default Loading;
