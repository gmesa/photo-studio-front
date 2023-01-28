import { Cancel, Mail, Notifications, Search } from '@mui/icons-material'
import { alpha, AppBar, Box, InputBase, Toolbar, Typography, styled, Badge, Avatar, useMediaQuery, useTheme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useState } from 'react';


const useStyles = makeStyles((theme: any) => ({

    headTxtLg: {
        padding: theme.spacing(1),
        display: 'none',
        [theme.breakpoints.up("sm")]: {
            display: 'block'
        }
    },
    headTxtSm: {
        padding: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            display: 'none'
        }
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        width: '70%',
        paddingLeft: theme.spacing(1),
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        borderRadius: theme.shape.borderRadius,


    },
    tool: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    searchSm: {
        display: 'none !Important',
        marginRight: theme.spacing(1),
        [theme.breakpoints.down("sm")]: {
            display: 'flex !Important',
        },
    },
    HeaderContRight: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '50%',
        [theme.breakpoints.down("md")]: {
            width: '60% !Important',
        },
    },
    Icons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        'span, div': {
            margin: '0 10px'
        },
        marginLeft: theme.spacing(3),
    }
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
    marginLeft: theme.spacing(0.5),
    color: theme.palette.secondary.main,
    paddingLeft: theme.spacing(1),
    width: '80%'

}));

const StyleBadge = styled(Badge)(({ theme }) => ({

    ".MuiBadge-badge": { border: theme.palette.error }

}))


const Header = () => {

    const [mailBadget, setMailBadget] = useState<number>(0);
    const [notificationBadge, setnotificationBadge] = useState<number>(0);
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const classes = useStyles({ openSearch });
    const theme = useTheme();

    const isSm = useMediaQuery(theme.breakpoints.down("sm"));


    const AddMailBadget = () => {
        setMailBadget((mailBadget) => mailBadget + 1);
        setnotificationBadge((notificationBadge) => notificationBadge + 1);
    }

    console.log(theme);

    return (
        <AppBar position='static'>
            <Toolbar className={classes.tool}>
                <Typography variant='h6' component="span" className={classes.headTxtLg} onClick={AddMailBadget} color='secondary'>
                    Guillermo
                </Typography>
                <Typography variant='h6' className={classes.headTxtSm} color='secondary'>
                    Guille
                </Typography>
                <Box
                    className={classes.HeaderContRight}
                >
                    {(!isSm || (isSm && openSearch)) &&
                        <Box className={classes.search}>
                            <Search color='secondary' />
                            <StyledInput placeholder='Type search... ' />
                            {isSm && <Cancel onClick={() => setOpenSearch(false)} color='secondary' />}

                        </Box>}
                    {(!isSm || (isSm && !openSearch)) &&
                        <Box className={classes.Icons}>
                            <Search className={classes.searchSm} onClick={() => { setOpenSearch(true); }} color='secondary' />
                            <StyleBadge badgeContent={mailBadget > 0 ? mailBadget : '0'} color="error" >
                                <Mail color="secondary" />
                            </StyleBadge>
                            <StyleBadge color='error' max={10} badgeContent={notificationBadge > 0 ? notificationBadge : '0'} sx={{
                                marginLeft: (theme) => theme.spacing(2),
                                marginRight: (theme) => theme.spacing(2),
                            }}
                            >
                                <Notifications color="secondary" />
                            </StyleBadge>
                            <Avatar src='https://yt3.ggpht.com/yti/AJo0G0nUHDwJhek1mpPcDkko1yh2a4vmHaPObBAgz4i1SQ=s88-c-k-c0x00ffffff-no-rj-mo'></Avatar>
                        </Box>
                    }

                </Box>
            </Toolbar>

        </AppBar>
    )
}

export default Header