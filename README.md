# STOCKULATOR

주식 API 로 가져온 정보를 이용해 간단한 계산기를 만들어보자!

---

![](https://velog.velcdn.com/images/thovy/post/87d6767c-2ed4-45d4-acb7-98d9cfa4bd08/image.gif)
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
- ###   KIS API 에 정보를 많이 요청하면 에러가 난다.
상승률 데이터를 가져오려면 종목 하나하나 KIS API 에 요청해야한다.
그래서 1 종목당 30줄의 정보를 가져와서 가장 최근의 상승률 정보를 사용하려고 했다.
하지만, api 를 작성해 데이터를 요청하면 약 2500개 중에 500개만 가져오고 그 뒤부터는 에러가 난다.
다시 요청하면 400개, 다시하면 300개... 계속 요청하면 할 수록 에러가 더 빨리 발생한다.
대안을 찾았어야 했는데...
결국 만들려고 한 상승률 TOP 10 리스트를 만들 수 없었다.

## 아쉬운 점 2
- ### 조회하면 해당 종목이 차트 위 조회 목록 부분에 쌓이도록 하지 못했다.
몇 시간 끙끙앓으면 할 수 있을 것 같기도 한데, 후순위로 밀려서 아직 못 했다.
목록 선택 시 차트가 바뀌고 데이터가 바뀌도록 어떻게 해야하지?
리스트 데이터를 잘 만들어보면 될 것 같기도?!

## 아쉬운 점 3
- ### 전체적으로 못생겼다.

## 아쉬운 점 4
- ### 코인 데이터를 가져와서 사용하기
주식데이터를 사용한 것 처럼 코인데이터도 사용하려고 했는데, 이것도 후순위로 밀렸다.

## 아쉬운 점 5
- ### 차트가 못생겼다.

<br/>

# 끝

어찌어찌 TypeScript 를 이용해서 페이지를 만들고, 만들지 않으려던 서버도 만들었다.

이리 저리 데이터를 많이 요청하다보니 생각한 건데, 서버에서 데이터를 가져오는 게 정말 엄청 빠르다.
express 로 RDS에서 데이터를 가져오는 것 같은데, 스켈레톤을 본 적이 없을 만큼 빠르다.
이래서 서버사이드 렌더링을 쓰나보다.

그래도 이 페이지를 만들면서 기본을 조금 다진 것 같아서 뿌듯하기도 하고, 열받기도 하고..