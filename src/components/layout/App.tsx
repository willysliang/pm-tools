/**
 * @ Author: willy
 * @ CreateTime: 2024-06-19 20:59:50
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-20 18:52:49
 * @ Description: 页面大框
 */

import { LayoutMenu } from './LayoutMenu';
import { LayoutHeader } from './LayoutHeader';
import './layout.scss';

function App() {
  return (
    <div className='layout'>
      <LayoutMenu />
      <div className='layout-view'>
        <LayoutHeader />
        <div className='layout-main'>
          <div className='layout-main__content'></div>
        </div>
      </div>
    </div>
  );
}

export default App;
