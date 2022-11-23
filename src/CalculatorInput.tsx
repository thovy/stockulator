import React, { Dispatch, SetStateAction, useState } from 'react'

const CalculatorInput = (currentPrice:string,setCurrentPrice:Dispatch<SetStateAction<string>>) => {

    const [buyPrice, setBuyPrice] = useState("")
    const [wishPrice, setWishPrice] = useState("")
    const [returnScore, setReturnScore] = useState("")

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
          return setReturnScore((((parseInt(wishPrice)/parseInt(buyPrice))-1)*100).toString());
        }
      }

    function letsCal(buyPrice:string, wishPrice:string, returnScore:string){
        (buyPrice != "" && wishPrice == "" && returnScore == "") ?
        calReturnScore(buyPrice, currentPrice) :
        (buyPrice != "" && wishPrice != "" && returnScore == "") ?
        calReturnScore(buyPrice, wishPrice) :
        calWishPrice(buyPrice, returnScore)
      }

  return (
    <>
          <input
            defaultValue={buyPrice}
            onChange={(e)=>{setBuyPrice(e.target.value)}}
          />
          <input
            defaultValue={wishPrice}
            onChange={(e)=>{
              setWishPrice(e.target.value)
              setReturnScore("")
            }}
          />
          <input
            defaultValue={returnScore}
            onChange={(e)=>{
              setReturnScore(e.target.value)
              setWishPrice("")
            }}
          />
          <button onClick={()=>letsCal(buyPrice,wishPrice,returnScore)}>testcal</button>
        </>
  )
}

export default CalculatorInput