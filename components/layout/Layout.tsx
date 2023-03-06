import Head from 'next/head';
import type { FC, ReactNode } from 'react';
import ASide from '@components/layout/ASide';
import Footer from '@components/layout/Footer';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <div id="content-wrapper">
        <ASide />
        <main className="main">
          {children}
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Layout;
