import { Flowbite, type CustomFlowbiteTheme } from '../utils/flowbite';

const theme: CustomFlowbiteTheme = {
  navbar: {
    root: {
      base: 'bg-white px-6 py-2.5 h-[64px] border-b border-gray-50',
    },
  },
  badge: {
    root: {
      base: 'inline-flex whitespace-nowrap h-fit items-center gap-1 font-semibold',
    },
  },
  sidebar: {
    root: {
      base: 'h-full w-[250px]',
      inner: 'h-full overflow-y-auto overflow-x-hidden rounded p-3 bg-white',
      collapsed: {
        on: 'w-auto',
      },
    },
    collapse: {
      button: `group flex w-full items-center rounded-lg p-2 pl-4 text-base font-medium
        text-gray-500 transition hover:bg-gray-100`,
      icon: {
        base: `h-4 w-4 text-gray-500 transition duration-75 group-hover:text-gray-900
          dark:text-gray-400 dark:group-hover:text-white`,
      },
    },
    item: {
      content: {
        base: 'px-3 flex-1',
      },
      base: `flex items-center justify-center rounded-lg py-2 px-4 text-base font-medium
        text-gray-500 hover:bg-gray-100`,
      icon: {
        base: 'h-4 w-4 flex-shrink-0 text-gray-700 transition group-hover:text-gray-900',
      },
    },
  },
  table: {
    head: {
      base: 'group/head text-base text-[#636466]',
      cell: {
        base: `bg-[#fff]/80 py-4 pl-4 last:pr-4 group-first/head:first:rounded-tl-2xl
          group-first/head:last:rounded-tr-2xl`,
      },
    },
    root: {
      base: 'w-full text-left text-sm text-gray-500',
      shadow: '',
    },
    body: {
      base: 'bg-[#fff]/80 text-base uppercase text-[#636466]',
      cell: {
        base: `py-4 pl-4 border-t border-[#d0d0d0] last:pr-4
          group-last/body:group-last/row:first:rounded-bl-2xl
          group-last/body:group-last/row:last:rounded-br-2xl`,
      },
    },
    row: {
      base: 'group/row',
      hovered: 'hover:bg-gray-100',
    },
  },
  button: {
    base: 'outline-none text-nowrap font-semibold rounded-m',
    inner: {
      base: 'relative flex items-stretch items-center justify-center transition-all duration-200',
    },
    color: {
      flat: `text-gray-900 bg-white border border-gray-300 enabled:hover:bg-gray-100
        focus:ring-blue-200`,
      'failure-flat': `text-red-700 bg-white border border-red-700 enabled:hover:bg-red-100
        focus:ring-red-200`,
      'blue-flat': `text-blue-700 bg-white border border-blue-700 enabled:hover:bg-blue-100
        focus:ring-blue-200`,
      'primary-orange':
        'text-[#f06726] rounded-m bg-[#f7b392]/25 focus:ring-[#f06726]',
      'secondary-orange':
        'text-[#f06726] rounded-m bg-[#f7b392]/25 focus:ring-[#f06726]',
    },
    size: {
      sm: 'px-3 py-1.5 text-base',
      md: 'px-m py-sm text-base',
      lg: 'p-6 text-xl',
    },
  },
  modal: {
    content: {
      base: 'relative h-full p-4 md:h-auto',
    },
  },
  pagination: {
    pages: {
      base: 'inline-flex items-center -space-x-px',
      previous: {
        base: 'h-9 w-9 ml-0 rounded-l-lg border border-gray-300 bg-white p-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white',
        icon: 'h-5 w-5',
      },
      next: {
        base: 'h-9 w-9 rounded-r-lg border border-gray-300 bg-white p-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white',
        icon: 'h-5 w-5',
      },
      selector: {
        base: 'w-9 h-9 border border-gray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white',
      },
    },
  },
  label: {
    root: {
      base: 'text-sm light:text-gray-600 dark:text-gray-600 font-semibold',
    },
  },
  tabs: {
    tablist: {
      tabitem: {
        base: 'flex items-center justify-center rounded-t-lg pb-4 mx-4 text-sm font-medium first:ml-0 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500',
      },
    },
  },
  datepicker: {
    popup: {
      root: {
        inner: 'inline-block rounded-lg bg-white p-4 dark:bg-gray-700',
      },
      footer: {
        base: 'hidden',
      },
    },
    views: {
      days: {
        items: {
          item: {
            base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 ',
            selected: 'bg-cyan-700 text-white hover:bg-cyan-600',
            disabled: 'text-gray-300',
          },
        },
      },
    },
  },
  spinner: {
    base: 'inline animate-spin text-gray-200',
    color: {
      failure: 'fill-red-600',
      gray: 'fill-gray-600',
      info: 'fill-cyan-600',
      pink: 'fill-pink-600',
      purple: 'fill-purple-600',
      success: 'fill-green-500',
      warning: 'fill-orange-400',
    },
    light: {
      off: {
        base: 'text-white',
        color: {
          failure: '',
          gray: 'dark:fill-white',
          info: '',
          pink: '',
          purple: '',
          success: '',
          warning: '',
        },
      },
      on: {
        base: '',
        color: {
          failure: '',
          gray: '',
          info: '',
          pink: '',
          purple: '',
          success: '',
          warning: '',
        },
      },
    },
    size: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-10 w-10',
    },
  },
  carousel: {
    root: {
      base: 'relative h-full w-full',
      leftControl:
        'absolute left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none',
      rightControl:
        'absolute right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none',
    },
    indicators: {
      active: {
        off: 'bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800',
        on: 'bg-white dark:bg-gray-800',
      },
      base: '',
      wrapper: 'absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3',
    },
    item: {
      base: 'absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2',
      wrapper: {
        off: 'w-full flex-shrink-0 transform cursor-default snap-center',
        on: 'w-full flex-shrink-0 transform cursor-grab snap-center',
      },
    },
    control: {
      base: '',
      icon: 'hidden',
    },
    scrollContainer: {
      base: '',
      snap: 'snap-x',
    },
  },
};

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <Flowbite theme={{ theme }}>{children}</Flowbite>;
}

export { ThemeProvider };
