/**
 * @ Author: willysliang
 * @ CreateTime: 2024-06-20 22:09:11
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-10-14 14:13:11
 * @ Description: 主入口
 */

import ReactDOM from 'react-dom/client';
import App from '@comp/layout/App';
import '@/styles/tailwind.css';
import '@/styles/index.scss';
import 'animate.css/animate.min.css';

ReactDOM.createRoot(document.getElementById('root')! as Element).render(<App />);
