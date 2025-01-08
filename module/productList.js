import { makeDOMwithProperties } from "../utils/dom.js";
import { getProductCard } from "./productCard.js";

// 장바구니에서 상품을 삭제할때 바로 상품이 없어지지 않고 새로고침 해야하는 이슈 해결
export const getProductList = (productInfoList, removeCartCallback) => {
  const productListContainer = makeDOMwithProperties("div", {
    className: "product-list-con",
  });

  productInfoList.forEach((productInfo) => {
    productListContainer.appendChild(
      getProductCard({ ...productInfo }, removeCartCallback)
    );
    // spread 문법을 사용해 새로운 객체를 만들어 넘겨줄 수 있다.
  });

  return productListContainer;
};
