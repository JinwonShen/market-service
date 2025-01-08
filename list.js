import { getProductList } from "./module/productList.js";
import { fetchSectionListData } from "./module/fetch.js";
import { setButtonEvent, setFilterEvent } from "./module/productFilter.js";

// 이전 작업 삭제 ---
// 물품 목록 모두 불러오기 페이지에 출력 -> productList.js -> getProductList 함수사용

const sectionInfoList = await fetchSectionListData();

// newArray 에는 prev + curr.productList 두 가지를 합한 배열
const productList = sectionInfoList.reduce(
  (prev, curr) => [...prev, ...curr.productList],
  // ([...], )
  []
);

const section = document.getElementsByTagName("section")[0];
const productListDOM = getProductList(productList);
section.appendChild(productListDOM);

setFilterEvent();
setButtonEvent(productList);
