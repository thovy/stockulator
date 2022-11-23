import { createTheme, Grid, Skeleton, ThemeProvider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'

const TopViews = (props:any) => {

    // theme
    const theme = createTheme({
        palette:{
        primary:{main:"#E94560"}, // 빨강
        secondary:{main:"#006DEE"}, // 파랑
        background:{default:"#16213E"}, // 배경 - 남색
        error:{main:"#006DEE"}, // error - 파랑
        info:{main:"#0F3460", light:"#FFFFFF"}, // 주식 - 배경
        text:{primary:"#FFFFFF" , secondary:"#E94560"}, // 글자색 - primary 기본, secondary 밝은 배경일 때
        },
        typography:{
            fontFamily:"'Nanum Gothic', sans-serif",
            htmlFontSize:30,
            h4:{fontSize:30},
            h5:{fontSize:25}
        }
    })

    const [topViewList, setTopViewList] = React.useState<Array<any>>()
    
    useMemo(() => getViewTopData(), [props])
    
    function getViewTopData(){
        axios.get('/api/getViewTopData')
        .then((response)=>{
        //   console.log("top10",response);
          setTopViewList(response.data)
        })
        .catch((error)=>{
          console.log("error", error);
        })
      }

  return (
    <ThemeProvider theme={theme}>
        <Grid container xs={12} marginLeft={5} >
            <Grid id="main">
                <Box>
                    <Typography
                        variant='h4'
                        fontWeight='bold'
                        margin={1}  
                        color='primary'
                        marginLeft={7}
                        >실시간 검색 TOP</Typography>
                </Box>
                {topViewList ?
                <Box marginTop={2}>
                    {topViewList.map((topData:any, index)=>(
                    <Box display='flex' justifyContent='flex-start' alignItems="center">
                        <Typography variant='h4' color='#FFFFFF' margin={0.5} marginRight={2} minWidth="34px" justifyContent='center' display='flex'>
                            {index+1}
                        </Typography>
                        <Box minWidth={12} display='flex' justifyContent='space-between' alignItems="center">
                        <Typography
                            variant='h5'
                            margin={0.5}
                            color='#FFFFFF'
                        >{topData.NAME}</Typography>
                        {/* <Typography
                            variant='h5'
                            margin={0.5}
                            color='#FFFFFF'
                        >{topData.COUNT}</Typography> */}
                        </Box>
                    </Box>
                    ))}
                </Box>
                :<Skeleton/>
                }
            </Grid>
        </Grid>
    </ThemeProvider>
  )
}

export default TopViews