import { createContext } from "react";
import { AppContextProps, AppTheme } from "./../../utils/Types";
import { ThemeStyle } from "../../utils/Enums";



const appTheme: AppTheme = {
    palette: {
        mode: 'light',
        primary: {
            main: "#455A63"
        },
        secondary:{
            main:'#FFFFFF',
        },
        info: {
            main: '#EDEFF1',
        },
        error:{
            main:'#E2172A',
        }
        
    }    
}

export const DefaultProps : AppContextProps = {
    AppTheme : appTheme,
    ThemeStyle : ThemeStyle.MODERN,
    IsRtl: true,
    Rtl: false,
}

export const AppContext = createContext<AppContextProps>(DefaultProps);