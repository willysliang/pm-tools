/**
 * @ Author: willy
 * @ CreateTime: 2024-06-19 20:59:50
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-06-22 16:03:52
 * @ Description: 页面大框
 */

import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
import { LayoutMenu } from './LayoutMenu';
import { LayoutHeader } from './LayoutHeader';
import { routes } from '@/router/routes';
import transformRoutes from '@/router';
import { useAppInit, useMenuInit } from './hooks/useAppInit';
import './layout.scss';

export const RenderRoute: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route, index) => (
          <Route
            path={route.path}
            element={(route?.element as JSX.Element) ?? ''}
            key={`${index}-${route.key}`}
          >
            {Array.isArray(route.children) &&
              route.children.map((routeChild, idx) => (
                <Route
                  path={routeChild.path}
                  element={(routeChild?.element as JSX.Element) ?? ''}
                  key={`${index}-${idx}-${routeChild.key}`}
                />
              ))}
          </Route>
        ))}
      </Routes>
    </Suspense>
  );
};

export const RenderRoute2: React.FC = () => {
  useMenuInit();

  return <Suspense fallback={<div>Loading...</div>}>{useRoutes(transformRoutes as any)}</Suspense>;
};

function App() {
  useAppInit();

  return (
    <Router>
      <div className='layout'>
        <LayoutMenu />
        <div className='layout-view'>
          <LayoutHeader />
          <div className='layout-main'>
            <div className='layout-main__content'>
              {/* <RenderRoute /> */}

              <RenderRoute2 />
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
