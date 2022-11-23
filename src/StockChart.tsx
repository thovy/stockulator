import { TextField, Typography } from '@mui/material';
import React, {useEffect} from 'react'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const StockChart = (propsData:any) => {
    const stockData = propsData.propsData
  return (
    <>
        {stockData ?
            <div>
                <ResponsiveContainer width={850} aspect={1.5} >
                <BarChart data={stockData} syncId="stTotal" id="stPrice" margin={{ top:10, right:10, left:10, bottom:3 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="stck_bsop_date" minTickGap={1} hide={true}/>
                    <YAxis  orientation="right" tickCount={4} domain={[(dataMin:number)=>(Math.round(dataMin/1.1)), (dataMax:number)=>(Math.round(dataMax*1.1))]} interval="preserveStartEnd" />
                    <Tooltip/>
                    <Bar
                        dataKey={
                        (data)=>{
                        const range = [data.stck_hgpr, data.stck_lwpr]
                        return range}}
                        fill= "#E94560"
                    >
                        {stockData ?
                        stockData.map((data:any)=>(
                        <Cell fill={(data.prdy_vrss_sign > 3) ? "#006DEE" : "#E94560"}/>
                        ))
                        : <p>데이터가 없습니다</p>
                        }
                    </Bar>
                </BarChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="100%" aspect={4} >
                <BarChart data={stockData} syncId="stTotal" id="stVol" margin={{ top:3, right:10, left:10, bottom:10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                    <XAxis dataKey="stck_bsop_date" minTickGap={1} />
                    <YAxis type='number' orientation="right" domain={[0, (dataMax:number)=>(dataMax*3)]} interval={0} allowDataOverflow={false} />
                    <Tooltip />
                    <Bar dataKey="acml_vol" fill= "darkgray"/>
                </BarChart>
                </ResponsiveContainer>
            </div>
            :
            <Typography color='primary' >종목을 선택해주세요</Typography>
        }
    </>
  )
}

export default StockChart