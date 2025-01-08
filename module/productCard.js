import { appendChildrenList, makeDOMwithProperties } from "../utils/dom.js";
import { getCartToggleButton } from "./cartToggleButton.js";

export const getProductCard = (productInfo, removeCartCallback) => {
  const { imgSrc, name, discountPercent, price, originalPrice } = productInfo;
  // product card
  const productCard = makeDOMwithProperties("div", {
    className: "product-card",
  });

  // product image cont
  const productImageCon = makeDOMwithProperties("div", {
    className: "product-image-con",
  });

  const productImage = makeDOMwithProperties("img", {
    src: imgSrc,
    alt: name,
  });

  const cartToggleBtn = getCartToggleButton(productInfo, removeCartCallback);

  appendChildrenList(productImageCon, [productImage, cartToggleBtn]);

  // product desc
  const productDescription = makeDOMwithProperties("div", {
    className: "product-description",
  });

  const productName = makeDOMwithProperties("div", {
    className: "product-name",
    innerHTML: `${name}`,
  });

  const productPriceContainer = makeDOMwithProperties("div", {
    className: "product-price-con",
  });

  const productDiscount = makeDOMwithProperties("div", {
    className: "product-discount-percent",
    innerHTML: `${discountPercent}%`,
  });

  const productPrice = makeDOMwithProperties("div", {
    className: "product-price",
    innerHTML: `${price.toLocaleString()}원`,
  });

  const productOriginalPrice = makeDOMwithProperties("div", {
    className: "product-original-price",
    innerHTML: `${originalPrice.toLocaleString()}원`,
  });

  appendChildrenList(productPriceContainer, [productDiscount, productPrice]);

  appendChildrenList(productDescription, [
    productName,
    productPriceContainer,
    productOriginalPrice,
  ]);

  appendChildrenList(productCard, [productImageCon, productDescription]);

  return productCard;
};
