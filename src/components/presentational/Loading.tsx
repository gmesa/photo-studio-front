import React from 'react'
import loadingImg from '../../assets/img/loading.svg'

const Loading = () => {
    return (
        <div className='loadMain'>
            <img
                src={loadingImg}
                style={{ height: 80, width: 80 }}
                alt="loading"
            />
        </div>
    )
}

export { Loading }