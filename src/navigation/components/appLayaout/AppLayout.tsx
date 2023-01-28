import { Grid } from '@mui/material'
import { RouterConfig } from '../../RouterConfig'
import Header from './Header'
import { LeftBar } from './LeftBar'
import '../../../styles/App.scss'

const AppLayout = () => {
  return (
    <div className='App'>
      <Header />
      <Grid container spacing={1} sx={{ height: '90vh', }}>
        <Grid item xs={1} sm={3} md={3} lg={2} sx={{ padding: 0 }}>
          <LeftBar />
        </Grid>
        <Grid item xs={11} sm={9} md={9} lg={10} className='mainContainer'>
          <RouterConfig />
        </Grid>

      </Grid>
    </div>
  )
}

export { AppLayout }