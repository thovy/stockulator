import { Grid } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import simbolLogo from './img/stockulatorlogosimbol.png'

const Header = () => {

  return (
    <Container>
        <Grid container>
            <Box margin={1} >
                <img height={60} src={simbolLogo} />
            </Box>
        </Grid>
    </Container>
  )
}

export default Header