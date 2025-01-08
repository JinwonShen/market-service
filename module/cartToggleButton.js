import { makeDOMwithProperties } from "../utils/dom.js";
import { CART_COOKIE_KEY } from "../constants/cart.js";

export const getCartInfo = () =>
  JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];

const isInCart = ({ id }) => {
  // 현재 해당 상품이 장바구니 안에 있는지 판단해 결과를 반환
  const originalCartInfo = getCartInfo();
  // Array.find
  return !!originalCartInfo.find((cartInfo) => cartInfo.id === id); // 이미 가지고 있는 id값이 있다면 true
};

const addCartInfo = (productInfo) => {
  console.log("addCartInfo");
  const originalCartInfo = getCartInfo();
  // null undefined || []

  if (
    originalCartInfo.findIndex((cartInfo) => cartInfo.id === productInfo.id) !==
    -1
  )
    return;

  localStorage.setItem(
    CART_COOKIE_KEY,
    JSON.stringify([...originalCartInfo, productInfo])
  );
};

const removeCartInfo = ({ id }) => {
  // 장바구니에서 해당 물품의 정보를 삭제
  const originalCartInfo =
    JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];
  const newCartInfo = originalCartInfo.filter((cartInfo) => cartInfo.id !== id);
  // false);
  // Array.filter()
  localStorage.setItem(CART_COOKIE_KEY, JSON.stringify(newCartInfo));
};

export const getCartToggleButton = (productInfo, removeCartCallback) => {
  let inCart = isInCart(productInfo);
  const cartToggleBtn = makeDOMwithProperties("button", {
    className: "cart-toggle-btn",
    type: "button",
    onclick: () => {
      if (inCart) {
        // 이미 장바구니에 들어있다면 -> 장바구니에서 삭제
        if (!confirm(`[${productInfo.name}]을 장바구니에서 삭제할까요 ?`))
          return; // early return 조건에 맞지 않으면 빠르게 리턴해주면 된다.
        // true 삭제 false 삭제x
        removeCartInfo(productInfo);
        cartImage.src = "./public/assets/cart.png";
        removeCartCallback?.();
      } else {
        addCartInfo(productInfo);
        cartImage.src = "./public/assets/cartDisabled.png";

        if (confirm("장바구니에 담았습니다. 장바구니 페이지로 이동할까요 ?")) {
          location.href = "./cart.html";
        }
      }
      inCart = !inCart;
    },
  });

  const cartImage = makeDOMwithProperties("img", {
    className: "cart-image",
    src: inCart
      ? "./public/assets/cartDisabled.png"
      : "./public/assets/cart.png",
  });

  cartToggleBtn.appendChild(cartImage);

  return cartToggleBtn;
};
