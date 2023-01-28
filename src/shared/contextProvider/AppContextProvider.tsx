import { useReducer } from "react"
import { AppContext, DefaultProps } from "./AppContext"
import { AppContextReducer } from "./ContextReducer"
import { ThemeSettings } from "../../utils/Types"

type PrviderProps = {
    children: React.ReactNode
}

const defaultAppContext = {
    AppTheme: DefaultProps.AppTheme,
    ThemeStyle: DefaultProps.ThemeStyle,
    IsRtl: DefaultProps.IsRtl,
    Rtl: DefaultProps.Rtl,
}

const AppContextProvider: React.FC<PrviderProps> = (props: PrviderProps) => {

    const [state, distpatcher] = useReducer(AppContextReducer, defaultAppContext);

    const setAppTheme = () => {
        distpatcher({ type: ThemeSettings.UPDATE_APP_THEME, payload: state.AppTheme });
    };
    const setAppThemeStyle = () => {
        distpatcher({ type: ThemeSettings.UPDATE_APP_THEME, payload: state.ThemeStyle });
    };
    const setAppIsRtl = () => {
        distpatcher({ type: ThemeSettings.UPDATE_APP_THEME, payload: state.IsRtl });
    };
    const setAppRtl = () => {
        distpatcher({ type: ThemeSettings.UPDATE_APP_THEME, payload: state.Rtl });
    };

    return (
        <AppContext.Provider value={{
            ...state,
            setAppTheme,
            setAppThemeStyle,
            setAppIsRtl,
            setAppRtl
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContextProvider }