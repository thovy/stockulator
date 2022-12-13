# STOCKULATOR

주식 API 로 가져온 정보를 이용해 간단한 계산기를 만들어보자!

---

![기능구현](https://user-images.githubusercontent.com/98632452/203631624-cdb3846e-87bf-4157-b6b2-eaca4e98ae81.gif)
<br/><br/>


# SKILL
`TypeScript`, `React`
<br/>
`Express`, `AWS RDS`
<br/>
`Material-UI` `Recharts`

<br/><br/>


# 목적

- `TypeScript` 연습과 함께 다양한 API 를 이용해보며 차트그려보기
- 제작 중 데이터베이스의 필요성을 느끼고 `AWS RDS` 사용
<br/><br/>


# [Figma](https://www.figma.com/file/eIc2h5leDiC8fLaZifxkVa/STOCKULATOR?node-id=0%3A1&t=R8fKbkqKEhkQKGbX-1)

대략적인 기능과 틀만 그려봤었다.
![](https://velog.velcdn.com/images/thovy/post/115afad2-56af-45fc-84c9-60acc9ec0ff4/image.png)
<br/>
<br/>

# 주요 기능

## 주식종목, 해당 종목 상세 정보 가져오기
<details>
<summary>공공데이터포털 API 로 종목 목록 데이터 요청</summary>
<div markdown="1">

  
  ![](https://velog.velcdn.com/images/thovy/post/52dccea7-033f-4798-88f7-fe340af892aa/image.png)  
![](https://velog.velcdn.com/images/thovy/post/d073e202-8701-4aff-a2ce-b6dba43b047e/image.png)

  </div>
</details>

<details>
<summary>한국투자증권 API 로 종목 상세 데이터 요청</summary>
<div markdown="1">


  ![](https://velog.velcdn.com/images/thovy/post/b973c9c0-cbc2-4c1a-a7c9-f5bfdf017a47/image.png)
</div>
</details>


<details>
<summary>종목 데이터를 불러오기 전에는 `Skeleton` 출력</summary>
<div markdown="1">


  ![](https://velog.velcdn.com/images/thovy/post/180023e3-862c-4fae-b329-9367adb1d2ea/image.png)
</div>
</details>


## 받아온 데이터를 이용한 차트 표현
<details>
<summary>`rechart` 를 이용한 차트그리기</summary>
<div markdown="1">

  
  ![](https://velog.velcdn.com/images/thovy/post/f9ad281c-8d60-4e18-ae66-788582ecc034/image.png)

</div>
</details>

## 수익률 계산기
<details>
<summary>입력형태에 따른 경고 표시</summary>
<div markdown="1">

  
  ![](https://velog.velcdn.com/images/thovy/post/91fa59f4-f883-46e3-a802-732f5aa0fe07/image.png)
  
</div>
</details>

## 조회되는 종목 count
<details>
<summary>실시간 검색 종목 TOP 출력</summary>
<div markdown="1">

  - 정렬
  ![](https://velog.velcdn.com/images/thovy/post/465260a6-522f-49a0-9312-cb0f16470eeb/image.png)
  - 출력  
  ![](https://velog.velcdn.com/images/thovy/post/9896b53d-7b41-4792-b4ea-5134da85b508/image.png)

  
</div>
</details>


<details>
<summary> `Express` 를 이용한 쿼리 날리기</summary>
<div markdown="1">

![](https://velog.velcdn.com/images/thovy/post/da760089-ca61-42d2-9a50-1a13ebbc4b49/image.png)


  
</div>
</details>



<details>
<summary>조회수 데이터 테이블</summary>
<div markdown="1">


![](https://velog.velcdn.com/images/thovy/post/9db837de-51ef-4783-94c1-1f0e46f134ff/image.png)


  
</div>
</details>
<br/>
<br/>


# 참고
- 수익률 계산 input component : [React Docs - State 끌어올리기](https://ko.reactjs.org/docs/lifting-state-up.html)
- 그래프 recharts : [Recharts Docs - Barchart](https://recharts.org/en-US/api/BarChart)
- Express 서버 API : [Express Docs - API](https://expressjs.com/ko/4x/api.html#app.post.method), Express API 작성 도움은 [BezKoder](https://www.bezkoder.com/react-node-express-mysql/)
- AWS RDS : [AWS 개발자안내서](https://docs.aws.amazon.com/ko_kr/elasticbeanstalk/latest/dg/create-deploy-nodejs.rds.html)

<br/>

# 아쉬운 프로젝트였다.

## 아쉬운 점 1

- ### 전체적으로 못생겼다.

## 아쉬운 점 2
- ### 차트가 못생겼다.
