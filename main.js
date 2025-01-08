import { getProductSection } from "./module/productSection.js";
import { fetchSectionListData } from "./module/fetch.js";

// 네트워크 요청
// fetch의 첫 번쨰 인자는 url ( 자원의 주소, 옵션(생략) )
// async await 구문 사용
// fetch에서 에러가 날 수 있으므로 try catch 를 통해 에러 핸들링
try {
  const sectionInfoList = await fetchSectionListData();

  sectionInfoList.forEach((sectionInfo) => {
    console.log(sectionInfo);
    const { sectionTitle, productList } = sectionInfo;
    const productSectionDOM = getProductSection(sectionTitle, productList);
    document.body.appendChild(productSectionDOM);
  });
} catch (error) {
  console.log(error);
}

// document.body.appendChild(productSection);
