const CardSkeleton = () => {
  return (
    <div className="md:py-12 py-6 md:px-12 px-6">
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        {Array(8)
          .fill()
          .map((_, i) => (
            <div
              className="md:h-[320px] h-[240px] bg-white border border-gray-300 rounded-xl
              shadow-md hover:brightness-50 transition-all duration-300 ease-in-out animate-pulse"
              key={i}
            >
              <div className="h-3/4 w-full bg-gray-300 rounded-t-xl"></div>
              <div className="h-1/4 rounded-b-lg text-white p-4 flex justify-between items-center shadow-md border-t-2 border-slate-200">
                <h3 className="w-2/3 bg-gray-300 h-5 rounded"></h3>
                <h3 className="w-1/4 bg-gray-300 h-5 rounded"></h3>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardSkeleton;
