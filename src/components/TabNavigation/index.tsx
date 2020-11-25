import classNames from 'classnames';
import React from 'react';

type Props = {
  items: string[];
  onTabChange: (tabIndex: number) => void;
  tabIndex: number;
  disabled: boolean;
};

const TabNavigation = ({ items, onTabChange, tabIndex, disabled }: Props) => (
  <nav className="flex bg-white">
    {items.map((item, i) => (
      <button
        key={item}
        onClick={() => {
          if (!disabled) onTabChange(i);
        }}
        disabled={disabled}
        type="button"
        className={classNames(
          'text-gray-600 py-2 px-4 block focus:outline-none text-xs sm:text-base sm:px-5',
          {
            'hover:text-blue-500': !disabled,
          },
          {
            'border-blue-500 border-b-2 text-blue-500': tabIndex === i,
          },
        )}
      >
        {item}
      </button>
    ))}
  </nav>
);

export default TabNavigation;
