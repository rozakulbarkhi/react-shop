const CardDetailSkeleton = () => {
  return (
    <div className="md:flex mx-auto md:h-[50vh] h-[65vh] md:w-[50vw] w-[90vw] bg-white border border-slate-200 rounded-xl shadow-lg md:my-0 mt-4 animate-pulse">
      <div className="flex-1 flex justify-center items-center md:my-0 my-4">
        <div className="md:h-2/3 md:w-2/3 w-1/3 h-[140px] bg-gray-300 rounded"></div>
      </div>
      <div className="flex-1 flex flex-col justify-center md:px-12 px-6 md:space-y-8 space-y-4">
        <div>
          <h1 className="font-bold bg-gray-300 rounded h-5 w-2/3"></h1>
          <div className="flex items-center space-x-1 my-2">
            <p className="bg-gray-300 rounded h-5 w-1/5"></p>
          </div>
        </div>
        <p className="text-xs tracking-wider bg-gray-300 rounded h-12 w-full"></p>
        <div className="flex justify-between items-center">
          <div className="bg-gray-300 rounded h-5 w-1/3"></div>
          <p className="bg-gray-300 rounded h-5 w-1/5"></p>
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-gray-300 rounded h-5 w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailSkeleton;
