const CardDetailSkeleton = () => {
  return (
    <div className="flex mx-auto h-[50vh] w-[50vw] bg-white border border-slate-200 rounded-xl shadow-lg animate-pulse">
      <div className="flex-1 flex justify-center items-center">
        <div className="h-2/3 w-2/3 bg-gray-300 rounded"></div>
      </div>
      <div className="flex-1 flex flex-col justify-center px-16 space-y-8">
        <div>
          <h1 className="font-bold bg-gray-300 rounded h-5 w-1/3"></h1>
          <div className="flex items-center space-x-1 my-2">
            <p className="bg-gray-300 rounded h-5 w-1/5"></p>
          </div>
        </div>
        <p className="text-xs tracking-wider bg-gray-300 rounded h-24 w-full"></p>
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
