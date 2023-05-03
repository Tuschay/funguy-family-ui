import type { ReactNode } from 'react';

import TopNav from '@/components/TopNav';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  title: string;
  description: string;
};

const Main = (props: IMainProps) => {
  return (
    <>
      <TopNav />
      <div className="w-full px-1 text-gray-700 antialiased">
        {props.meta}

        <div className="mx-auto max-w-screen-md">
          <header className="border-b border-gray-300">
            <div className="pb-8 pt-16">
              <h1 className="text-3xl font-bold text-gray-900">
                {props.title}
              </h1>
              <h2 className="text-xl">{props.description}</h2>
            </div>
          </header>

          <main className="content py-5 text-xl">{props.children}</main>

          {/* @TODO: Add footer */}
          {/* <footer className="border-t border-gray-300 py-8 text-center text-sm">
            Footer
          </footer> */}
        </div>
      </div>
    </>
  );
};

export { Main };
