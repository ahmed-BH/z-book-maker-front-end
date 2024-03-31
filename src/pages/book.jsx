import { Helmet } from 'react-helmet-async';

import { BooKView } from 'src/sections/book/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Book | Minimal UI </title>
      </Helmet>

      <BooKView />
    </>
  );
}