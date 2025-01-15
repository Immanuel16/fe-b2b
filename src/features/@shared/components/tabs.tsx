'use client';
import { useTabs } from '@/features/@shared/context/tabs';

export const Tabs = ({
  tabList,
  full,
}: {
  tabList: Array<{ name: string; id: number }>;
  full?: boolean;
}) => {
  const { tabs, setTabs } = useTabs();
  return (
    <>
      <ul
        className={`flex rounded-[20px] bg-white p-sm ${full ? '' : 'w-fit'}`}
      >
        {tabList.map((tab) => (
          <button
            type="button"
            className={`cursor-pointer rounded-xl p-3 ${
              tabs === tab.id
                ? 'bg-b2b-tertier text-b2b-primary'
                : 'text-b2b-gray-1'
            }`}
            key={`tab-${tab.id}`}
            onClick={() => setTabs(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </ul>
    </>
  );
};
