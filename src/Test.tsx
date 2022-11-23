import React from 'react'

const Test = () => {

    const fs = require('fs')

    const data = {
        name:"동화약품(주)",
        count:0,
        totalCount:0
    }

    const test1 = "테스트1";

    function testmake(){
        fs.writeFileSync("test.json", JSON.stringify(data))
    }
  return (
    <div><button onClick={testmake}>testJSON</button></div>
  )
}

export default Test