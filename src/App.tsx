import { CssBaseline } from '@mui/material';
import { AppLayout } from './navigation/components/appLayaout/AppLayout';
import { AppRouter } from './navigation/AppRouter';
import { AppContextProvider } from './shared/contextProvider/AppContextProvider';
import { CustomThemeProvider } from './shared/themeProvider/ThemeProvider';
import { inputGlobalStyles } from '../src/styles/global'

const App = () => {
  return (
    <AppContextProvider>
      <CustomThemeProvider>
        <CssBaseline>
          <AppRouter>
            {inputGlobalStyles}
            <AppLayout />
          </AppRouter>
        </CssBaseline>
      </CustomThemeProvider>
    </AppContextProvider>
  );
}

export { App };
