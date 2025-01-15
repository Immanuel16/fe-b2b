// TODO: fix generics
// TODO: implement searchFn
// TODO: add absolute & fixed positions
// TODO: add size props

'use client';

import * as React from 'react';
import { Badge, Button, Checkbox, Spinner } from '../utils/flowbite';
import { ChevronIcon, SearchIcon } from '@/features/@shared/components/icon';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useClickaway } from '../utils/use-clickaway';
import { useInputGroup } from './input-group';
import { cn } from '../utils/cn';
import { TextInput } from './text-input';

type ComboboxValue<T = unknown> = {
  label: string;
  value: string;
  disabled?: boolean;
  props?: T;
};

type ComboboxOwnProps = {
  id?: string;
  disabled?: boolean;
  options?: Array<ComboboxValue>;
  placeholder?: string;
  width?: number;
  helperText?: string;
  color?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  isSearchable?: boolean;
  isLoading?: boolean;
  isVirtualized?: boolean;
  onReset?: () => void;
  onBlur?: () => void;
  searchFn?: Promise<ComboboxValue>;
  renderOption?: (value: ComboboxValue) => React.ReactNode;
};

type ComboboxMultipleProps = ComboboxOwnProps & {
  isMultiple: true;
  value?: Array<ComboboxValue>;
  renderTrigger?: (value?: Array<ComboboxValue>) => React.ReactNode;
  onChange?: (value?: Array<ComboboxValue>) => void;
};

type ComboboxSingleProps = ComboboxOwnProps & {
  isMultiple?: false;
  value?: ComboboxValue;
  renderTrigger?: (value: ComboboxValue) => React.ReactNode;
  onChange?: (value: ComboboxValue) => void;
};

type ComboboxContextValue = ComboboxOwnProps & {
  query: string;
  isOpen: boolean;
  isMultiple?: boolean;
  value?: ComboboxValue | Array<ComboboxValue>;
  width?: number;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?:
    | ((value: ComboboxValue) => void)
    | ((value?: Array<ComboboxValue>) => void);
  renderTrigger?:
    | ((value: ComboboxValue) => React.ReactNode)
    | ((value?: Array<ComboboxValue>) => React.ReactNode);
  renderOption?: (value: ComboboxValue) => React.ReactNode;
};

type ComboboxElementProps = {
  triggerRef: React.RefObject<HTMLDivElement>;
};

const ComboboxContext = React.createContext<null | ComboboxContextValue>(null);

function useComboboxContext() {
  const context = React.useContext(ComboboxContext);
  if (context === null) throw new Error('Context value not provided');

  const options =
    context.options?.filter((item) =>
      item.label.toLowerCase().includes(context.query.toLowerCase()),
    ) ?? [];

  function handleSelect(selected: ComboboxValue) {
    if (context?.isMultiple) {
      const value = context.value as Array<ComboboxValue> | undefined;
      context?.onChange?.([...(value ?? []), selected] as ComboboxValue &
        Array<ComboboxValue>);
    } else {
      context?.onChange?.(selected as ComboboxValue & Array<ComboboxValue>);
      handleClose();
    }
  }

  function handleReset() {
    context?.onReset?.();
    handleClose();
  }

  function handleUnselect(selected: ComboboxValue) {
    const value = (context?.value as Array<ComboboxValue> | undefined) ?? [];
    const filteredValue = value.filter((item) => item.value !== selected.value);
    context?.onChange?.(filteredValue as ComboboxValue & Array<ComboboxValue>);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    context?.setQuery(e.target.value);
  }

  function handleClose() {
    context?.setOpen(false);
    context?.onBlur?.();
    context?.setQuery('');
  }

  return {
    ...context,
    options,
    handleSelect,
    handleUnselect,
    handleSearch,
    handleClose,
    handleReset,
  };
}

function useComboboxPosition(
  triggerRef: React.RefObject<HTMLDivElement>,
  optionsRef: React.RefObject<HTMLDivElement>,
  width?: number,
) {
  const widthProps = width;
  const [style, setStyle] = React.useState<{
    top?: number;
    bottom?: number;
    width?: number;
    transform?: string;
  }>({});

  const scrollInit = React.useRef(0);
  const delta = React.useRef(0);

  React.useLayoutEffect(() => {
    const triggerEl = triggerRef.current;
    const optionsEl = optionsRef.current;
    if (!triggerEl || !optionsEl) return;

    const triggerRect = triggerEl.getBoundingClientRect();
    const optionsRect = optionsEl.getBoundingClientRect();

    const width = widthProps ?? triggerRect.width;
    let top: typeof style.top;
    let bottom: typeof style.bottom;

    if (optionsRect.height + triggerRect.bottom > window.innerHeight) {
      bottom = window.innerHeight - triggerRect.top;
    }
    if (!bottom) top = triggerRect.bottom;

    setStyle({ width, top, bottom });
  }, [triggerRef, optionsRef, widthProps]);

  const handleScroll = React.useCallback(
    (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      delta.current = delta.current + (scrollInit.current - target.scrollTop);
      setStyle({
        ...style,
        transform: `translateY(${delta.current}px)`,
      });
    },
    [style],
  );

  React.useEffect(() => {
    const scrollBody =
      document.getElementById('main') || document.getElementById('root');

    if (!scrollBody) return;
    scrollInit.current = scrollBody.scrollTop;
    scrollBody.addEventListener('scroll', handleScroll);

    return () => {
      scrollBody.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { style };
}

function ComboboxSearch() {
  const { query, id, isSearchable, handleSearch } = useComboboxContext();
  const searchRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    searchRef.current?.focus();
  }, []);

  return (
    isSearchable && (
      <div className="px-3 pt-3">
        <TextInput
          id={`search-${id}`}
          ref={searchRef}
          placeholder="Cari"
          addon={<SearchIcon className="h-[12px] w-[12px] fill-gray-500" />}
          value={query}
          onChange={handleSearch}
        />
      </div>
    )
  );
}

function ComboboxOptionsMultiple({ triggerRef }: ComboboxElementProps) {
  const {
    value,
    options,
    id,
    width,
    isLoading,
    header,
    footer,
    handleSelect,
    handleClose,
    handleUnselect,
    renderOption,
    handleReset,
    onReset,
  } = useComboboxContext();

  const checkedOptions = options.map((option) => ({
    ...option,
    checked: (value as Array<ComboboxValue> | undefined)?.some(
      (item) => item.value === option.value,
    ),
  }));

  const optionsRef = React.useRef(null);
  useClickaway(optionsRef, handleClose);

  const parentRef = React.useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  const { style } = useComboboxPosition(triggerRef, optionsRef, width);

  return (
    <div
      ref={optionsRef}
      className="fixed z-20 max-h-[335px] flex-col overflow-hidden rounded-m border border-gray-200 bg-white shadow"
      style={style}
    >
      {header}

      <ComboboxSearch />

      <div className="h-[225px] overflow-y-auto py-2" ref={parentRef}>
        {isLoading ? (
          <div className="flex justify-center py-3">
            <Spinner />
          </div>
        ) : checkedOptions.length === 0 ? (
          <div className="p-3 text-center text-sm italic">Tidak ada data.</div>
        ) : (
          <ul
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const option = checkedOptions[virtualRow.index];
              return (
                <li key={`option-${id}-${option.value}`}>
                  <label
                    htmlFor={option.value}
                    className={cn(
                      'flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-50',
                      option.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                    )}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <Checkbox
                      id={option.value}
                      checked={option.checked ?? false}
                      disabled={option.disabled}
                      onChange={(e) => {
                        if (e.target.checked) handleSelect(option);
                        else handleUnselect(option);
                      }}
                      className={cn({
                        'cursor-not-allowed opacity-40': option.disabled,
                      })}
                    />
                    {renderOption ? renderOption(option) : option.label}
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {!!onReset && !!value && (
        <div className="relative px-2 pb-2">
          <div className="pointer-events-none absolute bottom-full left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent" />
          <Button
            color="flat"
            size="xs"
            fullSized
            onClick={() => handleReset()}
          >
            &times; Reset Filter
          </Button>
        </div>
      )}

      {footer}
    </div>
  );
}

function ComboboxOptionsSingle({ triggerRef }: ComboboxElementProps) {
  const {
    options,
    id,
    isLoading,
    width,
    footer,
    value: _value,
    handleSelect,
    handleClose,
    renderOption,
    onReset,
    handleReset,
  } = useComboboxContext();
  const value = _value as ComboboxValue;
  const optionsRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  useClickaway(optionsRef, handleClose);

  React.useEffect(() => {
    const element = Array.from(listRef.current?.children ?? []).find(
      (item) => item.ariaSelected === 'true',
    ) as HTMLLIElement;

    if (element) {
      const offset =
        (listRef.current?.scrollHeight ?? 600) - element.offsetTop > 150
          ? 65
          : 0;
      listRef.current?.scrollTo(0, element.offsetTop - offset);
    }
  }, []);

  const { style } = useComboboxPosition(triggerRef, optionsRef, width);

  return (
    <div
      className="fixed z-20 max-h-[335px] flex-col overflow-hidden rounded-m border border-gray-200 bg-white shadow"
      ref={optionsRef}
      style={style}
    >
      <ComboboxSearch />

      <ul ref={listRef} className="max-h-[225px] overflow-y-auto py-2">
        {isLoading && (
          <li className="flex justify-center py-3">
            <Spinner />
          </li>
        )}

        {options.length === 0 && !isLoading && (
          <li className="p-3 text-center text-sm italic">Tidak ada data.</li>
        )}

        {options.map((option) => (
          <li
            key={`option-${id}-${option.value}`}
            aria-selected={option.value === value?.value}
          >
            <button
              type="button"
              className={cn(
                'w-full px-4 py-2 text-left text-sm hover:bg-gray-100',
                { 'bg-gray-100 font-bold': option.value === value?.value },
              )}
              onClick={() => handleSelect(option)}
            >
              {renderOption ? renderOption(option) : option.label}
            </button>
          </li>
        ))}
      </ul>

      {!!onReset && !!value && (
        <div className="relative px-2 pb-2">
          <div className="absolute bottom-full left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent" />
          <Button
            color="flat"
            size="xs"
            fullSized
            onClick={() => handleReset()}
          >
            &times; Reset Filter
          </Button>
        </div>
      )}

      {footer}
    </div>
  );
}

const ComboboxTriggerMultiple = React.forwardRef<
  HTMLButtonElement,
  ComboboxElementProps
>(function ComboboxTriggerMultiple({ triggerRef }, ref) {
  const {
    value: _value,
    disabled,
    isOpen,
    placeholder,
    color,
    helperText,
    id,
    renderTrigger,
    setOpen,
    handleUnselect,
  } = useComboboxContext();
  const value = (_value as Array<ComboboxValue> | undefined) ?? [];

  return (
    <>
      <div
        ref={triggerRef}
        className={cn(
          `relative flex min-h-[56px] w-full flex-wrap items-center gap-2 rounded-m border border-gray-200 bg-white py-2 pl-3 pr-8`,
          {
            'pointer-events-none': isOpen,
            'cursor-not-allowed opacity-50': disabled,
            'border-red-500 bg-red-50': color === 'failure',
          },
        )}
      >
        <button
          className={cn('absolute inset-0', {
            'cursor-not-allowed': disabled,
          })}
          id={id}
          type="button"
          ref={ref}
          onClick={() => {
            if (!disabled) setOpen(true);
          }}
        />

        {value.length === 0 && !renderTrigger && (
          <p className="text-sm text-gray-500">
            {placeholder ?? 'Select value'}
          </p>
        )}

        {renderTrigger?.(value as ComboboxValue & Array<ComboboxValue>) ??
          value.map((item) => (
            <Badge
              key={item.value}
              className={cn({ 'pr-0': !item.disabled, 'z-10': !disabled })}
              color={color}
            >
              <span>{item.label}</span>
              {!item.disabled && (
                <button
                  type="button"
                  className={cn('w-5')}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnselect(item);
                  }}
                >
                  &times;
                </button>
              )}
            </Badge>
          ))}
        <ChevronIcon
          className={cn('top-3/5 absolute right-4 transition', {
            'rotate-180': isOpen,
          })}
        />
      </div>

      {helperText && !disabled && (
        <p
          className={cn('text-sm', {
            'text-red-600': color === 'failure',
          })}
        >
          {helperText}
        </p>
      )}
    </>
  );
});

const ComboboxTriggerSingle = React.forwardRef<
  HTMLButtonElement,
  ComboboxElementProps
>(function ComboboxTriggerSingle({ triggerRef }, ref) {
  const {
    value: _value,
    disabled,
    isOpen,
    color,
    id,
    placeholder,
    helperText,
    setOpen,
  } = useComboboxContext();
  const value = _value as ComboboxValue;

  return (
    <button
      type="button"
      className={cn('relative h-[56px] w-full rounded-lg text-left', {
        'pointer-events-none': isOpen,
        'cursor-not-allowed': disabled,
        'mb-6': helperText,
      })}
      ref={ref}
      onClick={() => {
        if (!disabled) setOpen(true);
      }}
    >
      <div ref={triggerRef} className="h-[56px]">
        <TextInput
          id={id}
          className="pointer-events-none"
          placeholder={placeholder ?? 'Select Value'}
          value={value?.label ?? ''}
          disabled={disabled}
          color={color}
          helperText={disabled ? '' : helperText}
          readOnly
        />
      </div>

      <ChevronIcon
        className={cn('absolute right-4 top-[45%] transition', {
          'rotate-180': isOpen,
        })}
      />
    </button>
  );
});

const Combobox = React.forwardRef<
  HTMLButtonElement,
  ComboboxMultipleProps | ComboboxSingleProps
>(function Combobox(props, ref) {
  const [isOpen, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const inputGroupContext = useInputGroup();
  const triggerRef = React.useRef<HTMLDivElement>(null);

  const contextValue = {
    isMultiple: !!props.isMultiple,
    options: props.options,
    value: props.value,
    isSearchable: props.isSearchable,
    isVirtualized: props.isVirtualized,
    helperText: props.helperText,
    color: props.color,
    header: props.header,
    width: props.width,
    footer: props.footer,
    placeholder: props.placeholder,
    id: props.id ?? inputGroupContext?.id,
    isLoading: props.isLoading,
    disabled: props.disabled ?? inputGroupContext?.disabled,
    query,
    isOpen,
    setQuery,
    setOpen,
    onBlur: props.onBlur,
    onChange: props.onChange,
    onReset: props.onReset,
    renderTrigger: props.renderTrigger,
    renderOption: props.renderOption,
  };

  return (
    <ComboboxContext.Provider value={contextValue}>
      {props.isMultiple ? (
        <>
          <ComboboxTriggerMultiple ref={ref} triggerRef={triggerRef} />
          {isOpen && <ComboboxOptionsMultiple triggerRef={triggerRef} />}
        </>
      ) : (
        <>
          <ComboboxTriggerSingle ref={ref} triggerRef={triggerRef} />
          {isOpen && <ComboboxOptionsSingle triggerRef={triggerRef} />}
        </>
      )}
    </ComboboxContext.Provider>
  );
});

export { Combobox, type ComboboxValue };
