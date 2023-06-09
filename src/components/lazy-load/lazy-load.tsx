import { lazy, Suspense, useRef, useState } from 'react';

import { Loader } from '@/components/loader';

export const lazyLoad =
  (
    componentUrl: () => Promise<{ default: React.ComponentType<any> }>,
    FallbackComponent: React.ComponentType<any> = Loader
  ) =>
  (props: {} = {}) => {
    const componentRef = useRef<React.ComponentType<any>>();
    const [init] = useState(() => {
      componentRef.current = lazy(componentUrl);

      return true;
    });

    const { current: Component } = init && componentRef;

    return (
      <Suspense fallback={<FallbackComponent />}>
        <Component {...props} />
      </Suspense>
    );
  };
