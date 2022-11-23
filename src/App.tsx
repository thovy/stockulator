import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import CalculatorInput from './CalculatorInput';
import { Autocomplete, Box, Button, Container, createTheme, Grid, InputAdornment, Paper, Skeleton, TextField, ThemeProvider, Typography } from '@mui/material';
import StockChart from './StockChart';
import CtrtRank from './CtrtRank';
import TopViews from './TopViews';
import Header from './Header';

function App() {

  // theme
  const theme = createTheme({
    palette:{
      background:{default:"#16213E"}, // 배경 - 남색
      primary:{main:"#E94560"}, // 빨강
      secondary:{main:"#006DEE"}, // 파랑
      error:{main:"#006DEE"}, // error - 파랑
      info:{main:"#0F3460", light:"#FFFFFF"}, // 주식 - 배경
      text:{primary:"#FFFFFF" , secondary:"#E94560"}, // 글자색 - primary 기본, secondary 밝은 배경일 때
    },
    typography:{
      fontFamily:"'Nanum Gothic', sans-serif",
      htmlFontSize:30,
      subtitle1:{fontSize:15},
      subtitle2:{fontSize:15},
      body1:{fontSize:30},
      body2:{fontSize:30}
    }
  })
  
  // kis api 에 사용되는 token
  const [token,setToken] = useState("")

  // kis api 에 접근하기 위한 appkey
  const kisAppKey = process.env.REACT_APP_KIS_API_APPKEY
  const kisAppSecret = process.env.REACT_APP_KIS_API_APPSECRET

  // kis api token 받아오기
  function getToken(){
    axios.post(`/oauth2/tokenP`,{
      "grant_type": "client_credentials",
      "appkey":kisAppKey,
      "appsecret":kisAppSecret
    })
    .then((response)=>{
      // console.log(response);
      // console.log("토큰 발급 성공");
      setToken(response.data.access_token)
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  // 공공데이터포털 api 의 krx 종목 리스트 가져오는 url
  const stockcodeURL = process.env.REACT_APP_DATAGO_API_URL

  // 공공데이터포털 api 에서 가져온 데이터 중에서 종목 코드의 리스트를 저장할 변수
  const [stockCodeList, setStockCodeList] = React.useState()

  // 공공데티어포털 api krx 종목 리스트 가져오기
  function getStockCode(){
    axios.get(`${stockcodeURL}`)
    .then((response)=>{
      // console.log(response.data.response.body.items.item);
      setStockCodeList(response.data.response.body.items.item);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  const [stockData, setStockData] = React.useState<any>()

  // stockCodeList 에서 선택된 걸 parameter 로 받아(stockcode) kis api 에 해당 주식 정보 요청하기
  function stockResponse(stockCode: any){
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
      console.log(response);
      setStockData(response.data.output.reverse())
      setCurrentPrice(response.data.output[0].stck_clpr)
      setWishPrice(response.data.output[0].stck_clpr)
    })
    .catch((error)=>{
      console.log(error.response);
    })
  }

  // input 계산기
  const [buyPrice, setBuyPrice] = useState("")
  const [wishPrice, setWishPrice] = useState("")
  const [returnScore, setReturnScore] = useState("")
  const [currentPrice, setCurrentPrice] = useState("")

  function calWishPrice(buyPrice:string, returnScore:string){
    if (returnScore == undefined || returnScore == '') {
      console.log(returnScore);
    }
    else{
      return setWishPrice((parseInt(buyPrice)*((parseInt(returnScore)*0.01)+1)).toString());
    }
  }
  function calReturnScore(buyPrice:string, wishPrice:string){
    if (wishPrice == undefined || wishPrice == '') {
      console.log(wishPrice);
    }
    else{
      return setReturnScore((((parseInt(wishPrice)/parseInt(buyPrice))-1)*100).toFixed(2).toString());
    }
  }

  function letsCal(buyPrice:string, wishPrice:string, returnScore:string){
    (buyPrice != "" && wishPrice == "" && returnScore == "") ?
    calReturnScore(buyPrice, currentPrice) :
    (buyPrice != "" && wishPrice != "" && returnScore == "") ?
    calReturnScore(buyPrice, wishPrice) :
    calWishPrice(buyPrice, returnScore)
  }

  const makeBuyPrice = (e: React.ChangeEvent<HTMLInputElement>)=>{setBuyPrice(e.target.value)}
  const makeWishPrice = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setWishPrice(e.target.value)
    setReturnScore("")
  }
  const makeRetrunPrice = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setReturnScore(e.target.value)
    setWishPrice("")
  }

  // // 컴포넌트로 만들었는데 input 에 값을 입력하면 focus 를 자꾸 잃음. 컴포넌트가 새로 렌더링되서 그런다함
  // class Testcal extends React.Component{
  //   render(): React.ReactNode {
  //     return(
  //       <>
  //           <input
  //             className='buyPrice'
  //             type="text"
  //             defaultValue={buyPrice}
  //             onInput={makeBuyPrice}
  //           />
  //           <input
  //             className='wishPrice'
  //             defaultValue={wishPrice}
  //             onChange={makeWishPrice}
  //           />
  //           <input
  //             className='returnScore'
  //             defaultValue={returnScore}
  //             onChange={makeRetrunPrice}
  //           />
  //           <button onClick={()=>letsCal(buyPrice,wishPrice,returnScore)}>testcal</button>
  //       </>
  //     )
  //   }
  // }

  // 종목 선택 value
  const [value, setValue] = React.useState<any | null>("");
  const [inputValue, setInputValue] = React.useState<any>();

  // 종목 선택 시 조회수 증가
  const [viewCompany, setViewCompany] = React.useState<string>()
  
  const [viewTotalData, setViewTotalData] = React.useState<any>()

  // 전체 종목 조회수 데이터 가져오기
  function getViewTotalData(){
    axios.get('/api/getViewTotalData')
    .then((response)=>{
      setViewTotalData(response)
    })
    .catch((error)=>{
      console.log("error", error);
    })
  }

  // 종목 조회 시 서버 데이터에 조회수 +1 증가요청
  function updateViewCount(props:string){
    const name = props
    axios.get(`/api/update/viewCount/${name}`)
    .then((response)=>{
      console.log("count", response.data);
    })
    .catch((error)=>{
      console.log("error", error);
    })
  }
  
  // 페이지 생성 시 kis token 과 종목 리스트 가져오기
  useEffect(() => {
    getToken()
    getStockCode()
  }, [])

  return (
    <ThemeProvider theme={theme} >
      <Container maxWidth='xl' >
        <Grid container id='Container' direction='column' justifyContent="flex-start" alignItems="center">
            {/* <button onClick={()=>{getViewTotalData()}}>lookup버튼</button> */}
            {/* <button onClick={()=>{createViewList()}}>create버튼</button> */}
            <Grid item id='Header'md={12} lg={10} xl={8} >
              <Header/>
            </Grid>
            {/* 헤더 Grid 끝 */}
            <Grid item id='chart' md={12} lg={10} xl={8} >
              <Paper style={{backgroundColor:'#0F3460'}} >
                <StockChart propsData={stockData}/>
              </Paper>
            </Grid>
            {/* 차트 Grid 끝 */}
            <Grid container id='select' md={12} lg={8} >
              {stockCodeList ? 
                <Autocomplete
                  fullWidth
                  style={{backgroundColor:"#16213E", marginTop:'20px'}}
                  disablePortal
                  renderInput={(params)=><TextField {...params} label="종목"/>}
                  options={stockCodeList}
                  getOptionLabel={(option:any)=> option.corpNm || "Loading..."}
                  onChange={(event, newValue)=>{
                    setValue(newValue)
                    stockResponse(newValue)
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    updateViewCount(newInputValue);
                    setViewCompany(newInputValue);
                  }}
                  PaperComponent={({ children }) => (
                    <Paper style={{ background: "#16213E" }}>
                      <Typography>{children}</Typography>
                    </Paper>
                  )}
                /> : <Skeleton height={70} width={940} />
              }
            </Grid>
            {/* 종목 선택 Grid 끝 */}
            <Grid container id='calculator' md={12} lg={8} xl={8} justifyContent="space-between" alignItems="center">
              <Grid item xs={12} sm={12} md={12} lg={5.9} xl={2.9}>
                <TextField
                  fullWidth
                  margin='normal'
                  className='buyPrice'
                  label="매수 가격"
                  size='medium'
                  placeholder='매수 가격을 입력해주세요'
                  InputLabelProps={{ shrink: true }}
                  error={!Number(buyPrice) && buyPrice !== ""}
                  helperText={!Number(buyPrice) ? (buyPrice == "" ? "" : <Typography>0 보다 큰 숫자만 입력해주세요</Typography>) : ""}
                  value={buyPrice}
                  onInput={makeBuyPrice}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={5.9} xl={2.9}>
                <TextField
                  fullWidth
                  margin='normal'
                  className='wishPrice'
                  label="매도 가격"
                  size='medium'
                  placeholder='희망 매도가격을 입력해보세요'
                  InputLabelProps={{ shrink: true }}
                  error={!Number(wishPrice) && wishPrice !== ""}
                  helperText={!Number(wishPrice) ? (wishPrice == "" ? "" : <Typography>0 보다 큰 숫자만 입력해주세요</Typography>) : ""}
                  value={wishPrice}
                  onChange={makeWishPrice}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={5.9} xl={2.9}>
                <TextField
                  fullWidth
                  margin='normal'
                  className='returnScore'
                  size='medium'
                  label="수익률"
                  placeholder='희망 수익률을 입력해보세요'
                  InputLabelProps={{ shrink: true }}
                  error={!Number(returnScore) && returnScore !== ""}
                  helperText={!Number(returnScore) ? (returnScore == "" ? "" : <Typography>0 보다 큰 숫자만 입력해주세요</Typography>) : ""}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">%</InputAdornment>,
                    inputMode:'numeric',
                  }}
                  inputProps={{inputMode:'numeric'}}
                  value={returnScore}
                  onChange={makeRetrunPrice}
                  sx={{ color:"secondary"}}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={5.9} xl={2.9}>
                <Button
                  fullWidth
                  onClick={()=>letsCal(buyPrice,wishPrice,returnScore)}
                  sx={{padding:"20px", marginTop:"10px"}}
                  variant="contained"
                >
                  <Typography fontWeight='bold' fontSize='25px' >수익률 계산하기</Typography>
                </Button>
                {/* <Button onClick={getStockCode}>testCode</Button> */}
                {/* <Testcal/> */}
                {/* <CalculatorInput currentPrice={currentPrice} setCurrentPrice={setCurrentPrice(`${currentPrice}`)}/> */}
                
                {/* <Test/> */}
              </Grid>
            </Grid>
            {/* 텍스트 입력 Grid 끝 */}
            <Grid item id='rankContainer' display='flex' marginTop={2}>
              <Grid id='topIncrease'>
                {stockCodeList ?
                  <CtrtRank listData={stockCodeList} propstoken={token}/>
                  : <></>
                }
              </Grid>
              <Grid item id='topView'>
                <TopViews lookupData={inputValue}/>
              </Grid>
            </Grid>
            {/* 랭킹 리스트 Grid 끝 */}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
