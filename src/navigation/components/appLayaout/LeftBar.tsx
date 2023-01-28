import { makeStyles } from '@mui/styles'
import { Container } from '@mui/system';
import React from 'react'
import AppMenu from './AppMenu';

const useStyles = makeStyles((theme: any) => ({
    cont: {
        backgroundColor: theme.palette.primary.main,
        minHeight: '400px',
        height: '100%',
        color: "white",
        padding: '0 5px 0 5px !Important',
    },
    item: {

    }
}))

interface LeftBarProps {

}

const LeftBar: React.FC<LeftBarProps> = (props: LeftBarProps) => {

    const classes = useStyles();

    return (
        <Container className={classes.cont}>
            <AppMenu />
        </Container>
    )
}

export { LeftBar }