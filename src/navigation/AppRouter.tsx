import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChildrenProps } from '../utils/Types'

const AppRouter: React.FC<ChildrenProps> = (props: ChildrenProps) => {
    return (
        <Router>
            {props.children}
        </Router>
    )
}

export { AppRouter }