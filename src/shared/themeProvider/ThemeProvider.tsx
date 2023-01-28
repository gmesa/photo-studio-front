import React, { useContext } from 'react'
import { AppContext } from '../contextProvider/AppContext'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ChildrenProps } from '../../utils/Types';
import type { } from '@mui/x-data-grid/themeAugmentation';


const CustomThemeProvider: React.FC<ChildrenProps> = (props: ChildrenProps) => {

  const { AppTheme } = useContext(AppContext);



  const theme = createTheme({
    palette: {
      mode: AppTheme.palette.mode,
      primary: {
        main: AppTheme.palette.primary.main,
      },
      secondary: {
        main: AppTheme.palette.secondary.main
      },
      info: {
        main: AppTheme.palette.info.main
      },
      error: {
        main: AppTheme.palette.error.main
      }

    },
    MyStyles: {
      whiteCont: {
        border: '1px solid white',
        color: 'white',
      }
    },
    components: {
      // Use `MuiDataGrid` on DataGrid, DataGridPro and DataGridPremium
      MuiDataGrid: {
        styleOverrides: {
          root: {
            backgroundColor: 'white',
          },
          columnHeaders: {
            backgroundColor: AppTheme.palette.primary.main,
            color: AppTheme.palette.secondary.main
          },
          row: {
            borderTop: '1px solid ' + AppTheme.palette.primary.main,
            '&:last-child': {
              borderBottom: '1px solid ' + AppTheme.palette.primary.main,
            },
            '&:first-of-type': {
              borderTop: 'none',
            }
          },
          cell: {
            border: 'none',
          },
          footerContainer: {
            borderTop: 'none',
          }
        },
      }
    },
  })

  return (
    <ThemeProvider theme={theme}>
      {props?.children}
    </ThemeProvider>
  )
}

export { CustomThemeProvider }

