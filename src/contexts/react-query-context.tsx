import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';

const client = new QueryClient();
const isDev = import.meta.env.DEV;
const ReactQueryProvider = (props: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_devToolsOpen, setDevToolsOpen] = React.useState(false);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (!isMounted.current && isDev) {
      setDevToolsOpen(false);
      isMounted.current = true;
    }
  }, [isMounted.current]);

  return (
    <QueryClientProvider client={client}>
      {props.children}
      {/* <ReactQueryDevtools initialIsOpen={devToolsOpen} /> */}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
