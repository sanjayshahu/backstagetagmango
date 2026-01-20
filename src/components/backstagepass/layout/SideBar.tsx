export default function Sidebar({ darkMode = false }) {
  const days = [
    'Day-1', 'Day-2', 'Day-3', 'Day-4',
    'Day-5', 'Day-6', 'Day-7', 'Day-8', 'Day-9'
  ];

  return (
    <div
      className={`p-4 space-y-4 w-[250px] h-[867px] rounded-[16px] gap-3
        ${darkMode ? 'bg-[#30004040]' : 'bg-[#30004010]'}
      `}
    >
      <div
        className={`text-sm font-semibold
          ${darkMode ? 'text-gray-300' : 'text-muted-foreground'}
        `}
      >
        Days
      </div>

      {days.map(day => {
        const isActive = day === 'Day-1';

        return (
          <button
            key={day}
            className={`
              w-full text-left transition
              ${
                isActive
                  ? darkMode
                    ? 'flex h-[48px] rounded-[16px] gap-[24px] px-[16px] py-[12px] bg-[#1f1f1f] text-white'
                    : 'flex h-[48px] rounded-[16px] gap-[24px] px-[16px] py-[12px] bg-[#f0f0f0] text-black'
                  : darkMode
                    ? 'rounded-lg px-3 py-2 hover:bg-[#2a2a2a] text-gray-300'
                    : 'rounded-lg px-3 py-2 hover:bg-accent'
              }
            `}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
}
