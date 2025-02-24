import { CART_COOKIE_KEY } from "./constants/cart.js";
import { getCartInfo } from "./module/cartToggleButton.js";
import { getProductList } from "./module/productList.js";
import { makeDOMwithProperties } from "./utils/dom.js";
import { setPayInfo } from "./module/payModule.js";

// 부모 -> section tag
// 뒤에 있는 요소 -> id : cart-pay-container
// 장바구니 내부에 있는 물품을 가져다가 -> product-list-con

// 1. 장바구니에 있는 물품정보 가져오기
// 2. 장바구니에 있는 물품정보를 productList와 연결하기
// 3. section 아래의 cart-pay-container 앞에 삽입하기

const sectionDOM = document.getElementsByTagName("section")[0];
const cartPayContainerDOM = document.getElementById("cart-pay-container");

const cartInfo = getCartInfo();

// 장바구니에서 상품을 삭제할때 바로 상품이 없어지지 않고 새로고침 해야하는 이슈 해결
const reloadPage = () => location.reload();

if (cartInfo.length < 1) {
  // 장바구니의 상품이 없다는 언지
  const noticeDOM = makeDOMwithProperties("div", {
    innerHTML: "장바구니에 상품이 없습니다.",
    className: "product-list-con",
  });
  sectionDOM.insertBefore(noticeDOM, cartPayContainerDOM);
} else {
  const productListDOM = getProductList(cartInfo, reloadPage);
  sectionDOM.insertBefore(productListDOM, cartPayContainerDOM);

  // A.insertBefore(B, C)
  // B가 A를 부모로 하며 C의 앞에 삽입되는 메서드
}

// 상품 전체 삭제
const cartAllDeleteButtonDOM = document.getElementById("remove-all-button");
cartAllDeleteButtonDOM.onclick = () => {
  // 전체삭제 버튼을 클릭했을 때 localStorage에 있는 물품 목록 정보 전부 삭제
  localStorage.removeItem(CART_COOKIE_KEY); // cartInfo 라는 키를 가진 키-값 쌍이 삭제
  localStorage.clear(); // localStorage 모든 키-값 쌍이 삭제
  location.reload(); // 새로고침
};

setPayInfo();
