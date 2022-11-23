import { Box, createTheme, Grid, ThemeProvider, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'

const CtrtRank = (props:any) => {

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

    const stockCodeListData = props.listData
    const token = props.propstoken

    // kis api 에 접근하기 위한 appkey
    const kisAppKey = process.env.REACT_APP_KIS_API_APPKEY
    const kisAppSecret = process.env.REACT_APP_KIS_API_APPSECRET

    // useEffect(()=>{
    //     getstockData(stockCodeListData)
    // },[])

    async function getstockData(stockCodeListData:any){
        await stockCodeListData.map((stockCode:any, index:number)=>{
            stockResponse(stockCode);
        })
        // {ctrtList ? await console.log(ctrtList) : await console.log("??");
        // }
        // console.log(ctrtList);  
        await print(ctrtList)
    }

    const print=(props:any)=>{
        console.log(props);
    }

    // type dataList = {
    //     name: string;
    //     ctrt: number;
    // }
    const ctrtList =new Map();

    async function stockResponse(stockCode: any){
        
        axios.get(`/uapi/domestic-stock/v1/quotations/inquire-daily-price`,{
            headers:{
                "Content-Type":"application/json;charset=UTF-8",
                "authorization":`Bearer ${token}`,
                "appkey":kisAppKey,
                "appsecret":kisAppSecret,
                "tr_id":"FHKST01010400",
            },
            params:{
                FID_COND_MRKT_DIV_CODE:"J",
                FID_INPUT_ISCD:`${stockCode.isinCd.substring(3,9)}`,
                FID_PERIOD_DIV_CODE:"D",
                fid_org_adj_prc:"0000000000"
            },
        })
        .then((response)=>{
            // console.log("이름", stockCode.itmsNm);
            ctrtList.set(stockCode.itmsNm, response.data.output[0].prdy_ctrt);
        })
        .catch((error)=>{
            console.log("error", error);
            console.log("name", stockCode.itmsNm);
        })
    }

  return (
    <ThemeProvider theme={theme}>
        <Grid container xs={12} marginRight={5}>
            <Grid id='main'>
                <Box>
                    <Typography
                        variant='h4'
                        fontWeight='bold'
                        margin={1}
                        color='primary'
                    >실시간 상승률 TOP</Typography>
                </Box>
                <Box>
                    <Box>
                        <Typography variant='h4' color='#FFFFFF' margin={0.5}>
                            {/* 순위 숫자 */}
                        </Typography>
                        <Box>
                            <Typography>
                                {/* 회사이름 */}
                            </Typography>
                            <Typography>
                                {/* 상승률 */}
                            </Typography>
                            {/* <button onClick={()=>getstockData(stockCodeListData)}>전일 대비율</button> */}
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
  )
}

export default CtrtRank