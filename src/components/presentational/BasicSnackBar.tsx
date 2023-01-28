import { Alert, AlertColor, Snackbar, useTheme } from '@mui/material';
import React from 'react'

interface BasicSnackProps {
    severity?: AlertColor,
    autoHideDuration?: number,
    open: boolean,
    handleClose: any,
    message: string,
    sx?: any
}

const BasicSnackBar: React.FC<BasicSnackProps> = (props: BasicSnackProps) => {

    const theme = useTheme();

    const { severity,
        autoHideDuration,
        open,
        handleClose,
        message } = props;
    let { sx } = props;

    sx = {
        width: 'max-content',
        background: theme.palette.error.main,
        color: theme.palette.secondary.main,
        '.MuiAlert-icon': {
            color: 'white',
        }
    }
    return (
        <Snackbar
            autoHideDuration={autoHideDuration ?? 4000}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={open}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={severity ?? 'error'} sx={sx}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default BasicSnackBar