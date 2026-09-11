import "server-only";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
// Rectangles are measured on a 393px-wide reference, including its system chrome.
// Only product photography, brand marks and decorative imagery are extracted.
// Interface text, cards, navigation and controls are rendered by React, never screenshots.
const media: Record<
  string,
  {
    file: string;
    rect: readonly [number, number, number, number];
  }
> = {
  "beauty-pill-skin": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/002.webp",
    rect: [20, 124, 32, 32],
  },
  "beauty-pill-hair": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/002.webp",
    rect: [142, 124, 32, 32],
  },
  "beauty-pill-makeup": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/002.webp",
    rect: [260, 124, 32, 32],
  },
  "beauty-pill-scent": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/002.webp",
    rect: [378, 124, 14, 32],
  },

  "connection-shop": {
    file: "flows/3d1f4110-721a-44e8-b35d-be4c015a9e03/003.webp",
    rect: [219, 230, 56, 56],
  },
  "connection-outlook": {
    file: "flows/3d1f4110-721a-44e8-b35d-be4c015a9e03/002.webp",
    rect: [58, 658, 25, 26],
  },
  "connection-amazon": {
    file: "flows/3d1f4110-721a-44e8-b35d-be4c015a9e03/002.webp",
    rect: [58, 735, 26, 26],
  },
  "order-empty-art": {
    file: "flows/8f406a69-ad1c-4de8-a699-12aa504efb74/002.webp",
    rect: [129, 155, 135, 234],
  },
  "order-deal-0": {
    file: "flows/8f406a69-ad1c-4de8-a699-12aa504efb74/004.webp",
    rect: [20, 330, 70, 50],
  },
  "order-deal-1": {
    file: "flows/8f406a69-ad1c-4de8-a699-12aa504efb74/004.webp",
    rect: [149, 324, 57, 66],
  },
  "order-deal-2": {
    file: "flows/8f406a69-ad1c-4de8-a699-12aa504efb74/004.webp",
    rect: [304, 329, 56, 42],
  },
  "order-deal-3": {
    file: "flows/8f406a69-ad1c-4de8-a699-12aa504efb74/004.webp",
    rect: [20, 447, 74, 41],
  },
  "order-deal-4": {
    file: "flows/8f406a69-ad1c-4de8-a699-12aa504efb74/004.webp",
    rect: [140, 450, 66, 55],
  },
  "order-deal-5": {
    file: "flows/8f406a69-ad1c-4de8-a699-12aa504efb74/004.webp",
    rect: [267, 452, 65, 48],
  },

  "checkout-rosemary-oil": {
    file: "flows/968f374e-69af-4adb-b913-0bb5c0e5e8b1/008.webp",
    rect: [14, 412, 64, 64],
  },
  "checkout-white-rock-item": {
    file: "flows/968f374e-69af-4adb-b913-0bb5c0e5e8b1/007.webp",
    rect: [16, 651, 36, 36],
  },
  "connection-google": {
    file: "flows/3d1f4110-721a-44e8-b35d-be4c015a9e03/003.webp",
    rect: [130, 242, 32, 32],
  },
  "tracking-map-fragment": {
    file: "flows/d3bf7c94-4d9e-4298-a255-eaf177f9efd1/009.webp",
    rect: [0, 59, 140, 210],
  },
  "deals-rinse-logo": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/002.webp",
    rect: [24, 184, 26, 26],
  },
  "deals-rinse-tres": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/002.webp",
    rect: [30, 248, 118, 118],
  },
  "deals-rinse-rainbow": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/002.webp",
    rect: [210, 268, 120, 113],
  },
  "deals-syman-logo": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/002.webp",
    rect: [24, 516, 26, 26],
  },
  "deals-syman-fir": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/002.webp",
    rect: [30, 584, 118, 118],
  },
  "deals-syman-lilac": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/002.webp",
    rect: [210, 581, 118, 118],
  },
  "deals-francesco-logo": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/003.webp",
    rect: [24, 127, 26, 26],
  },
  "deals-francesco-goat": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/003.webp",
    rect: [34, 185, 112, 122],
  },
  "deals-francesco-lavender": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/003.webp",
    rect: [210, 184, 118, 122],
  },
  "deals-solid-logo": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/003.webp",
    rect: [24, 454, 26, 26],
  },
  "deals-solid-raquels": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/003.webp",
    rect: [60, 523, 75, 155],
  },
  "deals-solid-mask": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/003.webp",
    rect: [220, 519, 105, 130],
  },
  "home-princess-top": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/001.webp",
    rect: [33, 314, 89, 98],
  },
  "home-princess-dress": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/001.webp",
    rect: [176, 310, 94, 102],
  },
  "home-tea-blue": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/005.webp",
    rect: [33, 225, 89, 95],
  },
  "home-tea-orange": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/005.webp",
    rect: [176, 225, 92, 95],
  },
  "home-mountain-pink": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/004.webp",
    rect: [33, 712, 90, 49],
  },
  "home-mountain-black": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/004.webp",
    rect: [177, 719, 93, 41],
  },
  "home-accessory-cap": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/005.webp",
    rect: [45, 543, 110, 49],
  },
  "home-accessory-glasses": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/005.webp",
    rect: [177, 548, 125, 38],
  },
  "home-loaded-logo": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/005.webp",
    rect: [29, 133, 49, 49],
  },
  "home-mountain-logo": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/004.webp",
    rect: [32, 612, 44, 44],
  },
  "home-kitsch-photo": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/006.webp",
    rect: [17, 174, 359, 334],
  },
  "home-pura-photo": {
    file: "flows/5f25f0ee-f19a-49a8-8f9d-ca2f3259c3c6/002.webp",
    rect: [17, 174, 359, 332],
  },
  "suggestion-jeans-warehouse": {
    file: "flows/4d0f0532-ce38-49b5-a94b-32e8ace4716c/002.webp",
    rect: [16, 113, 44, 44],
  },
  "suggestion-city-jeans": {
    file: "flows/4d0f0532-ce38-49b5-a94b-32e8ace4716c/002.webp",
    rect: [13, 166, 50, 50],
  },

  "assistant-wide-one": {
    file: "flows/8b512345-0d92-4125-b037-4c6f05288cee/002.webp",
    rect: [17, 669, 150, 88],
  },
  "assistant-wide-two": {
    file: "flows/8b512345-0d92-4125-b037-4c6f05288cee/002.webp",
    rect: [179, 669, 148, 88],
  },
  "assistant-blue-partial": {
    file: "flows/8b512345-0d92-4125-b037-4c6f05288cee/002.webp",
    rect: [341, 385, 51, 149],
  },
  "assistant-city-denim": {
    file: "flows/8b512345-0d92-4125-b037-4c6f05288cee/003.webp",
    rect: [78, 203, 66, 116],
  },

  "idea-rice-wash": {
    file: "flows/972c6dae-9ab4-4aaf-9f21-999808493dc6/002.webp",
    rect: [23, 157, 112, 106],
  },
  "idea-rosemary-bar": {
    file: "flows/972c6dae-9ab4-4aaf-9f21-999808493dc6/002.webp",
    rect: [208, 157, 112, 105],
  },
  "idea-rosemary-bundle": {
    file: "flows/972c6dae-9ab4-4aaf-9f21-999808493dc6/002.webp",
    rect: [24, 388, 121, 139],
  },
  "idea-purple-bundle": {
    file: "flows/972c6dae-9ab4-4aaf-9f21-999808493dc6/002.webp",
    rect: [209, 388, 119, 139],
  },
  "idea-rosemary-liquid": {
    file: "flows/972c6dae-9ab4-4aaf-9f21-999808493dc6/002.webp",
    rect: [34, 631, 109, 124],
  },
  "idea-jojoba": {
    file: "flows/972c6dae-9ab4-4aaf-9f21-999808493dc6/002.webp",
    rect: [209, 646, 113, 102],
  },

  "beauty-athena-deal": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/006.webp",
    rect: [17, 269, 171, 110],
  },
  "beauty-necessaire-deal": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/006.webp",
    rect: [197, 269, 171, 109],
  },
  "explore-womenswear-partial": {
    file: "flows/5c39eb04-f5fe-43a0-92da-b79b275051e0/004.webp",
    rect: [239, 820, 124, 30],
  },

  "beauty-starter-upper": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/003.webp",
    rect: [17, 394, 360, 140],
  },
  "beauty-starface-product": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/005.webp",
    rect: [45, 571, 119, 112],
  },
  "beauty-necessaire-product": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/005.webp",
    rect: [255, 570, 70, 120],
  },
  "beauty-perfume": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/004.webp",
    rect: [124, 165, 61, 33],
  },
  "beauty-bath": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/004.webp",
    rect: [214, 124, 32, 64],
  },
  "beauty-hair": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/004.webp",
    rect: [74, 265, 42, 24],
  },
  "beauty-nail": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/004.webp",
    rect: [320, 218, 30, 64],
  },
  "beauty-fenty-partial": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/006.webp",
    rect: [82, 38, 45, 60],
  },
  "beauty-juvia-partial": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/006.webp",
    rect: [244, 37, 70, 50],
  },

  "skin-loretta": {
    file: "flows/01972be8-07ed-4dfa-9ec9-d1e6824c35bc/007.webp",
    rect: [77, 433, 65, 159],
  },
  "skin-harry": {
    file: "flows/01972be8-07ed-4dfa-9ec9-d1e6824c35bc/007.webp",
    rect: [260, 439, 69, 147],
  },
  "skin-laundry-partial": {
    file: "flows/01972be8-07ed-4dfa-9ec9-d1e6824c35bc/007.webp",
    rect: [77, 697, 55, 153],
  },
  "skin-gopure-partial": {
    file: "flows/01972be8-07ed-4dfa-9ec9-d1e6824c35bc/007.webp",
    rect: [253, 704, 60, 144],
  },
  "look-skirt-one-partial": {
    file: "flows/d0dd4fc3-7ffe-4f1e-81d8-d2a17e904e24/008.webp",
    rect: [30, 802, 129, 48],
  },
  "look-skirt-two-partial": {
    file: "flows/d0dd4fc3-7ffe-4f1e-81d8-d2a17e904e24/008.webp",
    rect: [198, 802, 128, 48],
  },
  "beauty-nails-upper": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/006.webp",
    rect: [17, 497, 350, 136],
  },
  "beauty-athena-product": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/004.webp",
    rect: [65, 510, 76, 123],
  },
  "beauty-crown-product": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/004.webp",
    rect: [263, 499, 51, 124],
  },

  "pdp-kitsch-art": {
    file: "flows/a99e7161-595d-466c-b0b1-bc1183f1d4d7/008.webp",
    rect: [16, 74, 361, 135],
  },
  "saved-socks": {
    file: "flows/75b26fee-826f-4403-9288-be499890cd72/002.webp",
    rect: [162, 259, 70, 125],
  },
  "shea-gallery-hero": { file: "screens/066.webp", rect: [0, 230, 393, 393] },
  "shea-gallery-testimonial": {
    file: "screens/067.webp",
    rect: [0, 230, 393, 393],
  },
  "shea-gallery-benefits": {
    file: "screens/060.webp",
    rect: [16, 119, 361, 361],
  },
  "following-quilt": { file: "screens/024.webp", rect: [18, 438, 357, 286] },
  "following-bow": { file: "screens/026.webp", rect: [29, 290, 339, 134] },
  "qbp-logo": { file: "screens/024.webp", rect: [19, 348, 40, 40] },
  "pura-amber": { file: "screens/025.webp", rect: [32, 314, 113, 126] },
  "pura-mandarin": { file: "screens/025.webp", rect: [220, 314, 110, 127] },
  "pura-cashmere": { file: "screens/025.webp", rect: [32, 549, 112, 129] },
  "pura-charcoal": { file: "screens/025.webp", rect: [218, 549, 113, 129] },

  "category-combo-partial": {
    file: "screens/124.webp",
    rect: [23, 733, 158, 118],
  },
  "category-hair-partial": {
    file: "screens/124.webp",
    rect: [211, 733, 158, 118],
  },
  "detox-shampoo": {
    file: "flows/1df75dd0-05f6-445c-9709-0e0bda2df3af/003.webp",
    rect: [17, 236, 41, 41],
  },
  "rice-liquid": {
    file: "flows/1df75dd0-05f6-445c-9709-0e0bda2df3af/004.webp",
    rect: [73, 448, 70, 160],
  },
  "rosemary-liquid": {
    file: "flows/1df75dd0-05f6-445c-9709-0e0bda2df3af/004.webp",
    rect: [256, 210, 72, 149],
  },
  "rosemary-bar": {
    file: "flows/1df75dd0-05f6-445c-9709-0e0bda2df3af/003.webp",
    rect: [17, 292, 41, 41],
  },

  "store-shop-all": { file: "screens/125.webp", rect: [22, 130, 349, 175] },
  "collection-new-hero": { file: "screens/050.webp", rect: [0, 103, 393, 186] },
  "collection-yellow-partial": {
    file: "screens/050.webp",
    rect: [20, 680, 165, 81],
  },
  "collection-coffee-partial": {
    file: "screens/050.webp",
    rect: [208, 680, 165, 81],
  },
  "sol-welcome-left": {
    file: "flows/2f492f6c-2db7-440b-8515-aa56a2d029e5/003.webp",
    rect: [0, 103, 121, 174],
  },
  "sol-welcome-art": {
    // Decorative photos, gradient and Sol brand mark; ends before the DOM heading.
    file: "flows/2f492f6c-2db7-440b-8515-aa56a2d029e5/003.webp",
    rect: [0, 103, 393, 300],
  },
  "sol-welcome-right": {
    file: "flows/2f492f6c-2db7-440b-8515-aa56a2d029e5/003.webp",
    rect: [262, 177, 131, 207],
  },
  "sol-welcome-lower-left": {
    file: "flows/2f492f6c-2db7-440b-8515-aa56a2d029e5/003.webp",
    rect: [0, 486, 66, 134],
  },
  "sol-welcome-lower-right": {
    file: "flows/2f492f6c-2db7-440b-8515-aa56a2d029e5/003.webp",
    rect: [323, 577, 70, 102],
  },

  "store-review-1": { file: "screens/128.webp", rect: [33, 252, 63, 63] },
  "store-review-2": { file: "screens/128.webp", rect: [33, 489, 63, 63] },
  "store-review-3": { file: "screens/128.webp", rect: [33, 726, 63, 63] },

  "collection-new": { file: "screens/124.webp", rect: [23, 502, 158, 161] },
  "collection-best": { file: "screens/047.webp", rect: [179, 479, 126, 124] },
  "category-cleanse": { file: "screens/124.webp", rect: [23, 290, 158, 161] },
  "category-heatless": { file: "screens/124.webp", rect: [211, 290, 158, 161] },
  "category-caps": { file: "screens/124.webp", rect: [211, 502, 158, 161] },
  "sol-flower": { file: "screens/184.webp", rect: [175, 138, 44, 43] },
  "chemical-poster": { file: "screens/052.webp", rect: [0, 163, 393, 494] },
  "chemical-card1": { file: "screens/048.webp", rect: [42, 297, 111, 63] },
  "chemical-card2": { file: "screens/048.webp", rect: [188, 297, 102, 61] },
  "chemical-rail1": { file: "screens/048.webp", rect: [18, 478, 105, 128] },
  "chemical-rail2": { file: "screens/048.webp", rect: [134, 478, 105, 128] },
  "chemical-rail3": { file: "screens/048.webp", rect: [252, 478, 105, 128] },
  "summer-tight": { file: "screens/050.webp", rect: [42, 458, 113, 128] },
  "assistant-white": {
    file: "flows/2e218159-702e-4708-b9aa-270dbca77f0b/001.webp",
    rect: [67, 371, 78, 145],
  },
  "assistant-black": {
    file: "flows/2e218159-702e-4708-b9aa-270dbca77f0b/002.webp",
    rect: [223, 481, 45, 138],
  },
  "mini-sol-hero": { file: "screens/174.webp", rect: [26, 129, 334, 175] },
  "mini-skin-hero": { file: "screens/176.webp", rect: [25, 129, 336, 175] },
  "mini-look-hero": { file: "screens/177.webp", rect: [25, 129, 336, 175] },
  "mini-gift-hero": { file: "screens/178.webp", rect: [33, 129, 335, 175] },
  "mini-sol-icon": { file: "screens/176.webp", rect: [16, 444, 72, 72] },
  "mini-skin-icon": { file: "screens/177.webp", rect: [16, 444, 72, 72] },
  "mini-look-icon": { file: "screens/178.webp", rect: [16, 444, 72, 72] },
  "mini-gift-icon": { file: "screens/178.webp", rect: [41, 316, 44, 44] },
  "mini-room-icon": { file: "screens/174.webp", rect: [16, 502, 44, 44] },
  "mini-color-icon": { file: "screens/174.webp", rect: [16, 558, 44, 44] },
  "mini-decor-icon": { file: "screens/174.webp", rect: [16, 674, 44, 44] },
  "explore-summer-upper": {
    file: "screens/166.webp",
    rect: [32, 128, 322, 126],
  },
  "explore-curls-upper": {
    file: "screens/169.webp",
    rect: [32, 204, 329, 132],
  },
  "explore-deals-art": { file: "screens/166.webp", rect: [17, 422, 174, 80] },
  "explore-beauty-lip": { file: "screens/166.webp", rect: [209, 425, 76, 76] },
  "explore-beauty-wash": { file: "screens/166.webp", rect: [293, 425, 76, 76] },
  "explore-women-shirt": { file: "screens/166.webp", rect: [25, 556, 76, 76] },
  "explore-women-jeans": { file: "screens/166.webp", rect: [109, 556, 76, 76] },
  "explore-men-shirt": { file: "screens/166.webp", rect: [209, 556, 76, 76] },
  "explore-men-jeans": { file: "screens/166.webp", rect: [293, 556, 76, 76] },
  "explore-home-lamp": { file: "screens/166.webp", rect: [25, 687, 76, 76] },
  "explore-home-pan": { file: "screens/166.webp", rect: [109, 687, 76, 76] },
  "explore-fitness-tone": {
    file: "screens/166.webp",
    rect: [209, 687, 76, 76],
  },
  "explore-fitness-shorts": {
    file: "screens/166.webp",
    rect: [293, 687, 76, 76],
  },
  "look-outfit-inner": { file: "screens/201.webp", rect: [104, 375, 188, 288] },
  "whip-mousse": { file: "screens/169.webp", rect: [86, 477, 32, 157] },
  "hanacure-cleanser": { file: "screens/169.webp", rect: [228, 505, 99, 111] },
  "bubble-sunrise": { file: "screens/168.webp", rect: [69, 506, 70, 90] },
  "bare-liquid": { file: "screens/168.webp", rect: [225, 462, 100, 116] },
  "carbon-crew": { file: "screens/168.webp", rect: [57, 141, 90, 139] },
  "jordan-legend": { file: "screens/168.webp", rect: [200, 170, 124, 88] },
  "buffy-breeze": { file: "screens/167.webp", rect: [18, 378, 120, 146] },
  "citizenry-linen": { file: "screens/167.webp", rect: [205, 403, 116, 94] },
  "sol-tan-cap": { file: "screens/190.webp", rect: [75, 444, 109, 99] },
  "sol-boston-cap": { file: "screens/190.webp", rect: [204, 429, 120, 92] },
  "skin-anua": { file: "screens/196.webp", rect: [75, 550, 56, 135] },
  "skin-mimi": { file: "screens/196.webp", rect: [267, 553, 48, 125] },
  "gift-logic": { file: "screens/214.webp", rect: [40, 293, 64, 65] },
  "gift-buds": { file: "screens/214.webp", rect: [49, 393, 47, 63] },
  "gift-nirvana": { file: "screens/214.webp", rect: [50, 497, 47, 57] },
  "look-sculpt": { file: "screens/204.webp", rect: [52, 183, 64, 130] },
  "look-aven": { file: "screens/204.webp", rect: [238, 185, 44, 126] },
  "look-black-crew": { file: "screens/204.webp", rect: [55, 493, 63, 129] },
  "look-white-crew": { file: "screens/204.webp", rect: [225, 493, 56, 130] },
  shea: { file: "screens/059.webp", rect: [16, 119, 361, 361] },
  "shea-detail": { file: "screens/060.webp", rect: [24, 119, 361, 361] },
  "shea-photo": { file: "screens/066.webp", rect: [0, 230, 393, 393] },
  "kitsch-logo": { file: "screens/059.webp", rect: [16, 68, 44, 44] },
  "vehla-logo": { file: "screens/017.webp", rect: [32, 612, 44, 44] },
  "pura-logo": { file: "screens/027.webp", rect: [16, 187, 44, 44] },
  avatar: { file: "screens/017.webp", rect: [16, 59, 40, 40] },
  parcel: { file: "screens/017.webp", rect: [33, 211, 32, 25] },
  "deal-tag": { file: "screens/059.webp", rect: [31, 611, 31, 33] },
  cleo: { file: "screens/017.webp", rect: [42, 390, 115, 61] },
  "round-sunglasses": { file: "screens/017.webp", rect: [185, 390, 115, 61] },
  "shampoo-bag": { file: "screens/072.webp", rect: [30, 416, 85, 87] },
  terracotta: { file: "screens/045.webp", rect: [322, 548, 69, 120] },
  "rice-shampoo": { file: "screens/130.webp", rect: [16, 179, 44, 44] },
  "rice-conditioner": { file: "screens/049.webp", rect: [217, 192, 103, 120] },
  rosemary: { file: "screens/131.webp", rect: [254, 205, 74, 157] },
  "fashion-logo": {
    file: "flows/4d0f0532-ce38-49b5-a94b-32e8ace4716c/004.webp",
    rect: [174, 480, 22, 22],
  },
  "origin-logo": {
    file: "flows/4d0f0532-ce38-49b5-a94b-32e8ace4716c/004.webp",
    rect: [173, 640, 26, 26],
  },
  fitjeans: {
    file: "flows/4d0f0532-ce38-49b5-a94b-32e8ace4716c/004.webp",
    rect: [20, 164, 164, 115],
  },
  "preference-bottle": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/009.webp",
    rect: [0, 107, 51, 111],
  },
  "preference-vest": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/009.webp",
    rect: [60, 83, 85, 110],
  },
  "preference-woman": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/009.webp",
    rect: [155, 18, 85, 111],
  },
  "preference-game": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/009.webp",
    rect: [249, 69, 84, 110],
  },
  "preference-lotion": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/009.webp",
    rect: [343, 116, 50, 110],
  },
  "preference-robe": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/009.webp",
    rect: [0, 227, 51, 110],
  },
  "preference-camera": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/009.webp",
    rect: [60, 204, 85, 110],
  },
  "preference-man": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/009.webp",
    rect: [155, 139, 85, 110],
  },
  "preference-coat": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/009.webp",
    rect: [249, 190, 84, 110],
  },
  "preference-shoe": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/009.webp",
    rect: [155, 259, 85, 110],
  },
  "preference-bear": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/009.webp",
    rect: [343, 242, 50, 97],
  },
  "shop-wordmark": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/002.webp",
    rect: [137, 389, 123, 51],
  },
  "auth-loop": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/004.webp",
    rect: [181, 140, 32, 34],
  },
  "sol-glasses-model": {
    file: "flows/ae7711ef-6c54-4aa1-bb56-bee25cf3bef7/003.webp",
    rect: [65, 433, 115, 118],
  },
  "sol-glasses-dark": {
    file: "flows/ae7711ef-6c54-4aa1-bb56-bee25cf3bef7/003.webp",
    rect: [205, 444, 121, 62],
  },
  "skin-symbol": {
    file: "flows/01972be8-07ed-4dfa-9ec9-d1e6824c35bc/002.webp",
    rect: [177, 267, 40, 41],
  },
  "look-wordmark": {
    file: "flows/d0dd4fc3-7ffe-4f1e-81d8-d2a17e904e24/003.webp",
    rect: [59, 198, 277, 225],
  },
  "assistant-cap": {
    file: "flows/d6910bbb-655d-44ad-842e-11da062a1e66/007.webp",
    rect: [49, 330, 96, 112],
  },
  "assistant-armor-cap": {
    file: "flows/d6910bbb-655d-44ad-842e-11da062a1e66/007.webp",
    rect: [39, 522, 106, 99],
  },
  "discover-hat": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/003.webp",
    rect: [46, 233, 105, 122],
  },
  "discover-basket": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/003.webp",
    rect: [177, 188, 78, 64],
  },
  "discover-calculator": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/003.webp",
    rect: [320, 208, 47, 51],
  },
  "discover-watering": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/003.webp",
    rect: [328, 306, 65, 113],
  },
  "discover-ball": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/003.webp",
    rect: [102, 511, 92, 91],
  },
  "discover-chair": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/003.webp",
    rect: [6, 505, 51, 79],
  },
  "discover-candle": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/003.webp",
    rect: [234, 568, 53, 66],
  },
  "discover-lipstick": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/003.webp",
    rect: [314, 468, 51, 92],
  },
  "discover-clock": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/003.webp",
    rect: [0, 335, 63, 90],
  },
  "onboarding-delivered-parcel": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/015.webp",
    rect: [300, 419, 62, 49],
  },
  "auth-email-phone": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/006.webp",
    rect: [179, 165, 36, 72],
  },
  "auth-passkey": {
    file: "flows/b5716e20-b094-463c-b74b-a5e983dd1651/006.webp",
    rect: [179, 165, 36, 72],
  },
  "auth-phone": {
    file: "flows/b5716e20-b094-463c-b74b-a5e983dd1651/003.webp",
    rect: [179, 165, 36, 72],
  },
  "intro-chair": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/002.webp",
    rect: [180, 143, 51, 82],
  },
  "intro-clock": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/002.webp",
    rect: [278, 214, 80, 81],
  },
  "intro-ball": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/002.webp",
    rect: [58, 247, 93, 92],
  },
  "intro-candle": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/002.webp",
    rect: [0, 334, 38, 64],
  },
  "intro-hat": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/002.webp",
    rect: [330, 357, 63, 102],
  },
  "intro-lipstick": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/002.webp",
    rect: [0, 465, 81, 69],
  },
  "intro-watering": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/002.webp",
    rect: [84, 532, 127, 115],
  },
  "intro-basket": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/002.webp",
    rect: [308, 509, 76, 68],
  },
  "intro-calculator": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/002.webp",
    rect: [246, 606, 49, 52],
  },
  "onboarding-package": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/011.webp",
    rect: [159, 374, 70, 60],
  },
  "onboarding-shoe": {
    file: "flows/b778fdce-2c65-4153-aaee-6703098f27d4/011.webp",
    rect: [53, 365, 80, 80],
  },
  "brush-detail": { file: "screens/045.webp", rect: [0, 184, 393, 161] },
};
// Verified clean originals are an explicit local allowlist, never remote requests.
const originals: Record<string, string> = {
  "idea-rice-wash": "idea-rice-wash-original.jpg",
  "rice-shampoo": "rice-shampoo-original.jpg",
  "detox-shampoo": "detox-shampoo-original.jpg",
  "rosemary-liquid": "rosemary-liquid-original.jpg",
  "idea-rosemary-liquid": "idea-rosemary-liquid-original.jpg",
  "idea-jojoba": "idea-jojoba-original.jpg",
  "idea-rosemary-bar": "idea-rosemary-bar-original.jpg",
  "rosemary-bar": "idea-rosemary-bar-original.jpg",
  "idea-purple-bundle": "idea-purple-bundle-original.jpg",
  "idea-rosemary-bundle": "idea-rosemary-bundle-original.jpg",
  "rice-liquid": "rice-liquid-original.jpg",
  "argan-liquid-combo": "argan-liquid-combo-original.jpg",
  "home-drmtlgy-retinol": "home-drmtlgy-retinol.jpg",
  "home-drmtlgy-needleless": "home-drmtlgy-needleless.jpg",
  "home-drmtlgy-eye": "home-drmtlgy-eye.jpg",
  "home-drmtlgy-tinted": "home-drmtlgy-tinted.jpg",
  "home-curl-cream": "home-curl-cream.jpg",
  "home-air-dry-cream": "home-air-dry-cream.jpg",
  "shea-gallery-hand": "shea-gallery-hand.jpg",
  "shea-gallery-shower": "shea-gallery-shower.jpg",
  "beauty-starface-product": "beauty-starface.png",
  "beauty-juvia-partial": "beauty-juvia.jpg",
  "beauty-fenty-partial": "beauty-fenty.jpg",
  "beauty-necessaire-product": "beauty-necessaire.jpg",
  "beauty-crown-product": "beauty-crown.jpg",
  "beauty-athena-product": "beauty-athena.png",
  "shea-gallery-hero": "shea-gallery-hero-original.jpg",
  "shea-gallery-testimonial": "shea-gallery-testimonial-original.jpg",
  "shea-gallery-benefits": "shea-gallery-benefits-original.jpg",
  "sugar-body-scrub": "sugar-body-scrub.jpg",
  "charcoal-body-wash": "charcoal-body-wash.jpg",
  "assistant-armor-cap": "mob-armor-angle.jpg",
  "mini-homescape-icon": "homescape-original.png",
  "collection-coastal": "coastal-model-3.jpg",
  "black-conditioner-bag": "black-conditioner-bag.jpeg",
  "chocolate-body-bag": "chocolate-body-bag.jpeg",
  "shower-caddy": "shower-caddy.jpeg",
  "solid-shave-butter": "solid-shave-butter.jpeg",

  "beachy-gelato": "gelato-original.jpeg",
  "buffy-breeze": "buffy-original.webp",
  "carbon-crew": "carbon-original.jpeg",
  "jordan-legend": "jordan-original.jpeg",
  "gift-buds": "skullcandy-original.png",
  "gift-nirvana": "nirvana-original.jpeg",
  "rice-bundle": "rice-bundle.jpeg",
  "whip-mousse": "whip-original.jpeg",
  "hanacure-cleanser": "hanacure-original.png",
  cleo: "cleo.jpeg",
  "round-sunglasses": "round-sunglasses.jpeg",
  "u-see-me": "u-see-me.jpeg",
  "rice-conditioner": "rice-conditioner.jpeg",
  "shampoo-bag": "shampoo-bag.jpeg",
  "carpenter-jeans": "carpenter-jeans.jpeg",
  "heritage-jeans": "heritage-jeans.jpeg",
  "store-hero": "store-hero.png",
  "order-hero": "order-hero.png",
};
const pending = new Map<string, Promise<Buffer>>();
export function readReferenceMedia(key: string): Promise<Buffer> | undefined {
  if (!Object.hasOwn(media, key) && !Object.hasOwn(originals, key))
    return undefined;
  if (!pending.has(key)) {
    const entry = media[key];
    const job = (async () => {
      if (Object.hasOwn(originals, key)) {
        const input = await readFile(
          resolve(
            process.cwd(),
            "../../reference-assets/shop/products",
            originals[key],
          ),
        );
        const picture = sharp(input);
        return (
          key === "store-hero" ||
          key === "order-hero" ||
          key === "collection-coastal"
            ? picture
            : picture.resize(1080, 1080, { fit: "cover", position: "centre" })
        )
          .webp({ quality: 95 })
          .toBuffer();
      }
      const input = await readFile(
        resolve(process.cwd(), "../../references/shop", entry.file),
      );
      const metadata = await sharp(input).metadata();
      if (!metadata.width) throw new Error("Reference image has no dimensions");
      const scale = metadata.width / 393;
      const [left, top, width, height] = entry.rect.map((value) =>
        Math.round(value * scale),
      );
      return sharp(input)
        .extract({ left, top, width, height })
        .webp({ quality: 95 })
        .toBuffer();
    })();
    pending.set(key, job);
    void job.catch(() => pending.delete(key));
  }
  return pending.get(key);
}
