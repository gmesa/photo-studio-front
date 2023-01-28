
import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { MenuItemType } from '../../../utils/Types'
import { HasItemsChildren } from '../../../utils/Utils'
import { Menu } from './Menu'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: any) => ({

    lnk: {
        paddingTop: '4px !Important',
        paddingBottom: '4px !Important',
        paddingLeft: '20px !Important',
        '& a': {
            color: theme.palette.secondary.main,
            textDecoration: 'none',
            fontSize: '14px'
        }
    },
    lsItem: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'start !Important',
        '& .MuiListItemText-root': {
            margin: '0',
        },
        "@media screen and (min-width: 1200px) and (max-width: 1300px)": {
            '& .MuiTypography-root': {
                fontSize: '15px !Important',
            }
        },

        "@media screen and (max-width: 870px)": {
            '& .MuiTypography-root': {
                fontSize: '14px !Important',
            },
            '& .MuiListItemIcon-root': {
                '&:first-child': {
                    marginTop: '3px',
                }
            }
        },
    },
    icon: {

    }
}))

interface MenuProps {

}

interface MenuItemProps {
    item: MenuItemType
}

const AppMenu: React.FC<MenuProps> = (props: MenuProps) => {
    return (
        <Box padding='0 5px'>
            {
                Menu.map((item, key) => {
                    return HasItemsChildren(item) ? <MenuItemMulti key={key} item={item} /> : <MenuItemSingle key={key} item={item} />;
                })
            }
        </Box>
    )
}

const MenuItemSingle: React.FC<MenuItemProps> = (props: MenuItemProps) => {

    const { item } = props;
    const classes = useStyles();

    return (
        <ListItem className={classes.lsItem}>
            <ListItemIcon >
                {item.icon}
            </ListItemIcon>
            <ListItemText>
                {item.title}
            </ListItemText>
        </ListItem>
    );

}

const MenuItemMulti: React.FC<MenuItemProps> = (props: MenuItemProps) => {

    const [open, setOpen] = useState(false);
    const { items } = props.item;
    const handleOpen = () => { setOpen(op => !op) }

    const classes = useStyles();

    return (
        <>
            <ListItem onClick={handleOpen} disableGutters className={classes.lsItem}>
                <ListItemIcon sx={{ minWidth: '30px !Important' }}>
                    {props.item.icon}
                </ListItemIcon>
                <ListItemText>
                    {props.item.title}
                </ListItemText>
            </ListItem>

            <Collapse in={open} >
                <List sx={{ padding: 0, }}>
                    {
                        items?.map((item, key) => {

                            return <ListItem key={key} className={classes.lnk}>
                                <Link to={item.to} >{item.title}</Link>
                            </ListItem>
                        })
                    }
                </List>

            </Collapse>
        </>
    );

}

export default AppMenu