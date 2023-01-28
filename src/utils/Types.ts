import { AlertColor, PaletteMode } from '@mui/material';
import { ThemeStyle } from './Enums';

export interface ChildrenProps {
    children: React.ReactNode;
  }

export const ThemeSettings = {

    UPDATE_APP_THEME: 'UPDATE_APP_THEME',
    UPDATE_THEME_STYLE: 'UPDATE_THEME_STYLE',
    IS_RTL: 'IS_RTL',
    SET_RTL: 'SET_RTL',

};

declare module '@mui/material/styles' {
    interface Theme {
      MyStyles?: {
        whiteCont:{
          border: string,
          color: string,
        }
      }
    }
  
    interface ThemeOptions {
      MyStyles?: {
        whiteCont:{
          border: string,
          color: string,
        }
      }
    }
  }

export interface AppTheme {
    palette: {
        mode: PaletteMode
        primary: {
            main: string
        },
        secondary: {
          main: string
      },
        info:{
          main:string
        },
        error:{
          main:string
        }
    }}

export interface AppContextProps {
    AppTheme: AppTheme,
    ThemeStyle: ThemeStyle
    IsRtl: boolean,
    Rtl: boolean,
}

export interface UpdateAppThemeAction {
    type: typeof ThemeSettings.UPDATE_APP_THEME,
    payload: AppTheme
}

export interface UpdateThemeStyleAction {
    type: typeof ThemeSettings.UPDATE_THEME_STYLE,
    payload: ThemeStyle
}

export interface setIsRtlAction {
    type: typeof ThemeSettings.IS_RTL,
    payload: boolean
}

export interface setRtlAction {
    type: typeof ThemeSettings.SET_RTL,
    payload: boolean
}

export type ThemeActions = UpdateAppThemeAction | UpdateThemeStyleAction | setIsRtlAction | setRtlAction; 

export interface Item{
  title:string,
  to: string
}

export interface MenuItemType{
  icon: any,
  title: string,
  items?: Item[]
}

export interface InfoData{
  show: boolean;
  msg?: string;
  severity?: AlertColor  
}



