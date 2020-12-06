import * as React from 'react';

declare module "react" {
  type FCX<P = {}> = React.FunctionComponent<P & { className?: string }>;
}
