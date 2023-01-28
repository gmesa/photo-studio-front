import { makeStyles } from '@mui/styles'
import './../styles/App.scss'
import { Box } from '@mui/system'


const useStyles = makeStyles((theme: any) => ({
    borderRed: {

    }
}));

const Home = () => {

    const classes = useStyles();

    return (
        <Box className={classes.borderRed}></Box>
    )
}
export { Home }