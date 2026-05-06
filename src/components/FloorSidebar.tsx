'use client';

interface FloorSidebarProps {
  currentFloor: number;
  onFloorSelect: (floor: number) => void;
}

const FLOORS = [
  { id: 1, label: '01 Entrance' },
  { id: 2, label: '02 Works' },
  { id: 3, label: '03 Skill' },
  { id: 4, label: '04 About' },
  { id: 5, label: '05 Blog' },
  { id: 6, label: '06 GitHub' },
];

export default function FloorSidebar({ currentFloor, onFloorSelect }: FloorSidebarProps) {
  return (
    <aside className="hidden md:flex fixed left-6 bottom-10 z-30 flex-col gap-2 font-oswald text-sm text-gray-500">
      {FLOORS.map((floor) => (
        <div
          key={floor.id}
          className={`floor-marker cursor-pointer hover:text-brand-accent transition-colors ${
            currentFloor === floor.id ? 'text-white' : 'text-gray-500'
          }`}
          onClick={() => onFloorSelect(floor.id)}
          data-floor={floor.id}
        >
          {floor.label}
        </div>
      ))}
      <div className="h-16 w-[1px] bg-gray-700 mt-2 ml-1"></div>
      <div className="transform -rotate-90 origin-bottom-left translate-x-3 translate-y-8 text-xs tracking-widest text-brand-accent">
        CURRENT FLOOR
      </div>
    </aside>
  );
}
