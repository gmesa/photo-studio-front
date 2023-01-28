import { ThemeStyle } from '../../utils/Enums';
import { AppTheme, ThemeActions, ThemeSettings } from '../../utils/Types'


export const AppContextReducer = (state: any, action: ThemeActions) => {

    switch (action.type) {
        case ThemeSettings.UPDATE_APP_THEME:
            return {
                ...state,
                AppTheme: action.payload as AppTheme
            }
        case ThemeSettings.UPDATE_THEME_STYLE:
            return {
                ...state,
                ThemeStyle: action.payload as ThemeStyle
            }
            case ThemeSettings.IS_RTL:
            return {
                ...state,
                IsRtl: action.payload as boolean
            }
            case ThemeSettings.SET_RTL:
            return {
                ...state,
                Rtl: action.payload as boolean
            }
            default:
                return state;
    }
} 