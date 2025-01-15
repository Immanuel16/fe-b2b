'use client';

import * as React from 'react';
import ImageRoot, { type ImageProps } from 'next/image';
import { toUrl } from '@/features/@shared/utils/formatter';

function Image({ src, ...props }: ImageProps) {
  const [localSrc, setLocalSrc] = React.useState<string>(toUrl(String(src)));

  React.useEffect(() => {
    setLocalSrc(toUrl(String(src)));
  }, [src]);

  return (
    <ImageRoot
      src={localSrc}
      {...props}
      onError={() => setLocalSrc('/icon-broken.svg')}
    />
  );
}

export { Image };
