import { Routes, Route } from 'react-router-dom'
import { Materials } from '../components/container/Materials';
import { Sizes } from '../components/container/Sizes';
import { Home } from './../pages/Home'
import { Operations } from './../pages/Operations'
import NotFound from './components/NotFound';

const RouterConfig = () => {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/operations' element={<Operations />} />
            <Route path='/sizes' element={<Sizes />} />
            <Route path='/materials' element={<Materials />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );

}

export { RouterConfig }