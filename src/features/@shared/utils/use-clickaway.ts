import * as React from 'react';

function useClickaway(ref: React.RefObject<HTMLElement>, callback: () => void) {
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!ref.current?.contains(event.target as HTMLElement)) {
        callbackRef.current();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);
}

export { useClickaway };
