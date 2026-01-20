export default function GradientBorderCard() {
  return (
    <div
      className={`
        w-[640px] 
        h-[64px] 
        rounded-[24px] 
        opacity-100 
        flex items-center gap-3 
        p-3
        bg-white 
        border-2
        relative
      `}
      style={{
        borderImageSlice: 1,
        borderImageSource: 'linear-gradient(90.51deg, #B8860B 1.44%, #FFF0D1 97.91%)',
        transform: 'rotate(0deg)',
      }}
    >
      {/* Content inside */}
      <div className="flex-1 text-gray-800 font-medium">
        Sample content here
      </div>
      <button className="px-4 py-2 bg-yellow-400 rounded-lg text-white font-semibold">
        Action
      </button>
    </div>
  );
}
