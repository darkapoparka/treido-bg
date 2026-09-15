import "server-only";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp, { type OverlayOptions } from "sharp";
// Rectangles are measured on a 393px-wide reference, including its system chrome.
// Only product photography, brand marks and decorative imagery are extracted.
// Interface text, cards, navigation and controls are rendered by React, never screenshots.
const media: Record<
  string,
  {
    file: string;
    rect: readonly [number, number, number, number];
    // Remove captured interface occlusions from tightly cropped product photography.
    // The image never supplies price labels, save controls, card edges or navigation.
    occlusions?: readonly (readonly [number, number, number, number])[];
    // Remove light caption ink within these bounds, preserving the surrounding
    // photo instead of clearing a rectangular block behind the DOM caption.
    lightTextOcclusions?: readonly (readonly [
      number,
      number,
      number,
      number,
    ])[];
    // Exclude the recorded card edge while retaining only its product photograph.
    photoRadius?: number;
    // Circular native controls are removed without erasing extra photo corners.
    circularOcclusions?: readonly (readonly [number, number, number])[];
  }
> = {
  "beauty-curls-photo": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/002.webp",
    rect: [16, 196, 361, 203],
    photoRadius: 28,
    lightTextOcclusions: [
      [19, 140, 176, 23],
      [19, 164, 187, 19],
    ],
    circularOcclusions: [[325, 166, 17]],
  },
  "beauty-starter-photo": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/003.webp",
    rect: [16, 393, 361, 203],
    photoRadius: 28,
    lightTextOcclusions: [
      [19, 142, 177, 23],
      [19, 166, 254, 19],
    ],
    circularOcclusions: [[325, 167, 17]],
  },
  "beauty-perfume-photo": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/004.webp",
    rect: [16, 116, 176, 83],
    photoRadius: 14,
    lightTextOcclusions: [[25, 31, 126, 22]],
  },
  "beauty-bath-photo": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/004.webp",
    rect: [201, 116, 176, 83],
    photoRadius: 14,
    lightTextOcclusions: [[46, 31, 85, 22]],
  },
  "beauty-hair-photo": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/004.webp",
    rect: [16, 208, 176, 83],
    photoRadius: 14,
    lightTextOcclusions: [[49, 23, 84, 39]],
  },
  "beauty-nail-photo": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/004.webp",
    rect: [201, 208, 176, 83],
    photoRadius: 14,
    lightTextOcclusions: [[57, 31, 63, 22]],
  },
  "chemical-video-photo": {
    file: "flows/154e77d4-6ee5-4215-9dd4-2688a0035e16/002.webp",
    rect: [0, 59, 393, 793],
    occlusions: [
      [67, 617, 103, 17],
      [68, 637, 37, 15],
      [64, 672, 295, 17],
      [64, 690, 41, 14],
      [16, 667, 40, 41],
      [27, 729, 17, 20],
      [59, 737, 311, 4],
    ],
    circularOcclusions: [
      [37, 20, 23],
      [355, 20, 23],
      [355, 78, 23],
      [38, 634, 27],
    ],
  },
  "chemical-video-logo": {
    file: "flows/154e77d4-6ee5-4215-9dd4-2688a0035e16/002.webp",
    rect: [20, 675, 38, 38],
    photoRadius: 19,
  },
  "chemical-video-item-photo": {
    file: "flows/154e77d4-6ee5-4215-9dd4-2688a0035e16/002.webp",
    rect: [27, 734, 15, 29],
  },
  "chemical-store-header-photo": {
    file: "flows/154e77d4-6ee5-4215-9dd4-2688a0035e16/001.webp",
    rect: [1, 68, 391, 144],
    occlusions: [[14, 82, 377, 44]],
    circularOcclusions: [
      [37, 37, 23],
      [85, 37, 23],
    ],
    photoRadius: 35,
  },
  "chemical-store-trim-photo": {
    file: "flows/154e77d4-6ee5-4215-9dd4-2688a0035e16/001.webp",
    rect: [33, 267, 133, 133],
    occlusions: [[10, 10, 51, 19]],
    circularOcclusions: [[106, 106, 17]],
    photoRadius: 19,
  },
  "chemical-store-protect-photo": {
    file: "flows/154e77d4-6ee5-4215-9dd4-2688a0035e16/001.webp",
    rect: [176, 267, 133, 133],
    occlusions: [[10, 10, 44, 19]],
    circularOcclusions: [[106, 106, 17]],
    photoRadius: 19,
  },
  "chemical-store-deep-partial": {
    file: "flows/154e77d4-6ee5-4215-9dd4-2688a0035e16/001.webp",
    rect: [319, 267, 57, 133],
    occlusions: [[10, 10, 47, 19]],
  },
  "chemical-store-clip-one": {
    file: "flows/154e77d4-6ee5-4215-9dd4-2688a0035e16/001.webp",
    rect: [17, 477, 108, 158],
    occlusions: [[9, 130, 48, 20]],
    photoRadius: 19,
  },
  "chemical-store-clip-two": {
    file: "flows/154e77d4-6ee5-4215-9dd4-2688a0035e16/001.webp",
    rect: [134, 477, 108, 158],
    occlusions: [[9, 130, 48, 20]],
    photoRadius: 19,
  },
  "chemical-store-clip-three": {
    file: "flows/154e77d4-6ee5-4215-9dd4-2688a0035e16/001.webp",
    rect: [251, 477, 108, 158],
    occlusions: [[9, 130, 48, 20]],
    photoRadius: 19,
  },
  "chemical-featured-one-partial": {
    file: "flows/154e77d4-6ee5-4215-9dd4-2688a0035e16/001.webp",
    rect: [35, 710, 129, 52],
    photoRadius: 18,
  },
  "chemical-featured-two-partial": {
    file: "flows/154e77d4-6ee5-4215-9dd4-2688a0035e16/001.webp",
    rect: [178, 710, 129, 52],
    photoRadius: 18,
  },
  "chemical-featured-three-partial": {
    file: "flows/154e77d4-6ee5-4215-9dd4-2688a0035e16/001.webp",
    rect: [321, 710, 55, 52],
    occlusions: [
      [0, 0, 17, 9],
      [0, 9, 5, 8],
    ],
  },
  "chemical-category-shop": {
    file: "flows/154e77d4-6ee5-4215-9dd4-2688a0035e16/001.webp",
    rect: [20, 156, 30, 30],
    photoRadius: 15,
  },
  "chemical-category-kits": {
    file: "flows/154e77d4-6ee5-4215-9dd4-2688a0035e16/001.webp",
    rect: [134, 156, 30, 30],
    photoRadius: 15,
  },
  "chemical-category-exterior": {
    file: "flows/154e77d4-6ee5-4215-9dd4-2688a0035e16/001.webp",
    rect: [219, 156, 30, 30],
    photoRadius: 15,
  },
  "chemical-category-interior": {
    file: "flows/154e77d4-6ee5-4215-9dd4-2688a0035e16/001.webp",
    rect: [333, 156, 30, 30],
    photoRadius: 15,
  },
  "beauty-whip-card-photo": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/002.webp",
    rect: [17, 471, 170, 170],
    photoRadius: 21,
    occlusions: [[10, 10, 58, 19]],
    circularOcclusions: [[143, 143, 18]],
  },
  "beauty-hanacure-card-photo": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/002.webp",
    rect: [198, 471, 170, 170],
    photoRadius: 21,
    occlusions: [[10, 10, 76, 19]],
    circularOcclusions: [[143, 143, 18]],
  },
  "beauty-bubble-card-photo": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/003.webp",
    rect: [17, 111, 170, 170],
    photoRadius: 21,
    circularOcclusions: [[143, 143, 18]],
  },
  "beauty-bare-card-photo": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/003.webp",
    rect: [198, 111, 170, 170],
    photoRadius: 21,
    occlusions: [[10, 10, 58, 19]],
    circularOcclusions: [[143, 143, 18]],
  },
  "beauty-athena-header": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/005.webp",
    rect: [17, 125, 175, 118],
    photoRadius: 23,
    occlusions: [[30, 73, 118, 42]],
  },
  "beauty-crown-header": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/005.webp",
    rect: [202, 125, 174, 118],
    photoRadius: 23,
    occlusions: [[30, 73, 118, 42]],
  },
  "beauty-starface-header": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/005.webp",
    rect: [17, 422, 175, 118],
    photoRadius: 23,
    occlusions: [[24, 67, 130, 43]],
  },
  "beauty-necessaire-header": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/005.webp",
    rect: [202, 422, 174, 118],
    photoRadius: 23,
    occlusions: [[24, 67, 126, 43]],
  },
  "beauty-athena-card-photo": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/005.webp",
    rect: [25, 245, 158, 158],
    photoRadius: 21,
    occlusions: [[10, 10, 51, 19]],
  },
  "beauty-crown-card-photo": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/005.webp",
    rect: [210, 245, 158, 158],
    photoRadius: 21,
  },
  "beauty-starface-card-photo": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/005.webp",
    rect: [25, 542, 158, 158],
    photoRadius: 21,
  },
  "beauty-necessaire-card-photo": {
    file: "flows/3fd0a145-a819-409f-a853-c6b03e2e2d27/005.webp",
    rect: [210, 542, 158, 158],
    photoRadius: 21,
    occlusions: [[10, 10, 59, 19]],
  },
  "assistant-dad-photo": {
    file: "flows/d6910bbb-655d-44ad-842e-11da062a1e66/005.webp",
    rect: [18, 468, 148, 148],
    photoRadius: 21,
    circularOcclusions: [[122, 123, 18]],
  },
  "assistant-merch-photo": {
    file: "flows/d6910bbb-655d-44ad-842e-11da062a1e66/005.webp",
    rect: [178, 468, 148, 148],
    photoRadius: 21,
    circularOcclusions: [[122, 123, 18]],
  },
  "assistant-armor-photo": {
    file: "flows/d6910bbb-655d-44ad-842e-11da062a1e66/007.webp",
    rect: [26, 504, 163, 163],
    photoRadius: 22,
    circularOcclusions: [
      [135, 135, 18],
      [49, 149, 3.5],
      [57, 149, 3.5],
      [65, 149, 3.5],
      [73, 149, 3.5],
      [81, 149, 3.5],
      [89, 149, 3.5],
      [97, 149, 3.5],
      [105, 149, 3.5],
      [113, 149, 3.5],
    ],
  },
  "order-peach-bee-photo": {
    file: "flows/e6c06e9f-26c9-476e-a3e5-d34c968eaa3d/003.webp",
    rect: [198, 458, 171, 171],
    photoRadius: 21,
    occlusions: [[10, 10, 51, 19]],
    circularOcclusions: [[143, 143, 17]],
  },
  "order-drmtlgy-eye-photo": {
    file: "flows/e6c06e9f-26c9-476e-a3e5-d34c968eaa3d/003.webp",
    rect: [17, 458, 171, 171],
    photoRadius: 21,
    occlusions: [[10, 10, 57, 19]],
    circularOcclusions: [[143, 143, 17]],
  },
  "order-deal-blue-bag": {
    file: "flows/8f406a69-ad1c-4de8-a699-12aa504efb74/006.webp",
    rect: [17, 304, 113, 113],
    photoRadius: 21,
    occlusions: [[10, 10, 51, 20]],
    circularOcclusions: [[85.5, 85.5, 17.5]],
  },
  "order-deal-dropper": {
    file: "flows/8f406a69-ad1c-4de8-a699-12aa504efb74/006.webp",
    rect: [140, 304, 113, 113],
    photoRadius: 21,
    occlusions: [[10, 10, 73, 20]],
    circularOcclusions: [[85.5, 85.5, 17.5]],
  },
  "order-deal-strawberry-balm": {
    file: "flows/8f406a69-ad1c-4de8-a699-12aa504efb74/006.webp",
    rect: [263, 304, 113, 113],
    photoRadius: 21,
    occlusions: [[10, 10, 51, 20]],
    circularOcclusions: [[85.5, 85.5, 17.5]],
  },
  "order-deal-white-treatment": {
    file: "flows/8f406a69-ad1c-4de8-a699-12aa504efb74/006.webp",
    rect: [17, 427, 113, 113],
    photoRadius: 21,
    occlusions: [[10, 10, 57, 20]],
    circularOcclusions: [[85.5, 85.5, 17.5]],
  },
  "order-deal-mascara": {
    file: "flows/8f406a69-ad1c-4de8-a699-12aa504efb74/006.webp",
    rect: [140, 427, 113, 113],
    photoRadius: 21,
    occlusions: [[10, 10, 57, 20]],
    circularOcclusions: [[85.5, 85.5, 17.5]],
  },
  "order-deal-hush": {
    file: "flows/8f406a69-ad1c-4de8-a699-12aa504efb74/006.webp",
    rect: [263, 427, 113, 113],
    photoRadius: 21,
    occlusions: [[10, 10, 57, 20]],
    circularOcclusions: [[85.5, 85.5, 17.5]],
  },
  "order-deal-carpe": {
    file: "flows/8f406a69-ad1c-4de8-a699-12aa504efb74/004.webp",
    rect: [263, 418, 113, 113],
    photoRadius: 21,
    occlusions: [[10, 10, 57, 20]],
    circularOcclusions: [[85.5, 85.5, 17.5]],
  },
  "home-carpe-wordmark": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/006.webp",
    // Brand ink only. The circular frame, card, labels and native dock are excluded.
    rect: [34, 792, 40, 19],
  },
  "home-campaign-princess-header": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/001.webp",
    rect: [17, 194, 359, 85],
    occlusions: [
      [14, 21, 162, 25],
      [221, 24, 84, 19],
    ],
    circularOcclusions: [[327, 33, 18]],
    photoRadius: 27,
  },
  "home-campaign-princess-wordmark": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/001.webp",
    rect: [31, 215, 162, 25],
  },
  "home-campaign-princess-top": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/001.webp",
    rect: [32, 280, 135, 135],
    occlusions: [[11, 11, 89, 20]],
    circularOcclusions: [[107, 107, 17]],
    photoRadius: 20,
  },
  "home-campaign-princess-dress": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/001.webp",
    rect: [175, 280, 135, 135],
    occlusions: [[11, 11, 49, 20]],
    circularOcclusions: [[107, 107, 17]],
    photoRadius: 20,
  },
  "home-campaign-drmtlgy-header": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/001.webp",
    rect: [17, 519, 359, 67],
    occlusions: [
      [21, 25, 153, 22],
      [234, 23, 73, 21],
    ],
    circularOcclusions: [[327, 33, 18]],
    photoRadius: 27,
  },
  "home-campaign-drmtlgy-wordmark": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/001.webp",
    rect: [38, 544, 153, 22],
  },
  "home-campaign-drmtlgy-footer": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/001.webp",
    rect: [17, 722, 359, 69],
    occlusions: [
      [113, 0, 133, 39],
      [13, 21, 108, 30],
      [64, 39, 231, 30],
    ],
    circularOcclusions: [[327, 37, 18]],
    photoRadius: 27,
  },
  "home-campaign-tea-blue": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/005.webp",
    rect: [32, 195, 135, 128],
    occlusions: [[11, 10, 74, 21]],
    circularOcclusions: [[107, 100, 17]],
    photoRadius: 20,
  },
  "home-campaign-tea-orange": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/005.webp",
    rect: [175, 195, 135, 128],
    occlusions: [[11, 10, 73, 21]],
    circularOcclusions: [[107, 100, 17]],
    photoRadius: 20,
  },
  "home-campaign-accessories-header": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/005.webp",
    rect: [17, 439, 359, 67],
    occlusions: [[234, 24, 75, 20]],
    circularOcclusions: [[327, 33, 18]],
    photoRadius: 27,
  },
  "home-campaign-accessory-cap": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/005.webp",
    rect: [32, 506, 135, 135],
    occlusions: [[11, 11, 86, 21]],
    circularOcclusions: [[107, 107, 17]],
    photoRadius: 20,
  },
  "home-campaign-accessory-glasses": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/005.webp",
    rect: [175, 506, 135, 135],
    occlusions: [[11, 11, 109, 21]],
    circularOcclusions: [[107, 107, 17]],
    photoRadius: 20,
  },
  "home-campaign-mountain-header": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/004.webp",
    rect: [17, 595, 359, 89],
    occlusions: [[65, 17, 166, 40]],
    circularOcclusions: [
      [37, 38, 23],
      [327, 37, 18],
    ],
    photoRadius: 27,
  },
  "home-campaign-kitsch-header": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/006.webp",
    rect: [17, 115, 359, 59],
    occlusions: [
      [11, 14, 137, 42],
      [219, 23, 95, 20],
    ],
    circularOcclusions: [[327, 33, 18]],
    photoRadius: 27,
  },
  "home-campaign-kitsch-footer": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/006.webp",
    rect: [17, 647, 359, 63],
    occlusions: [[13, 18, 108, 29]],
    circularOcclusions: [[327, 33, 18]],
    photoRadius: 27,
  },
  "recent-kitsch-cover": {
    file: "flows/1cb8d743-c728-4317-8c60-1cc3c2761f8c/002.webp",
    rect: [17, 120, 173, 173],
    circularOcclusions: [[146, 27, 17]],
    photoRadius: 19,
  },
  "recent-pura-cover": {
    file: "flows/1cb8d743-c728-4317-8c60-1cc3c2761f8c/002.webp",
    rect: [202, 493, 172, 172],
    circularOcclusions: [[145, 27, 17]],
    photoRadius: 19,
  },
  "recent-terracotta-photo": {
    file: "flows/1cb8d743-c728-4317-8c60-1cc3c2761f8c/002.webp",
    rect: [17, 493, 173, 173],
    occlusions: [[10, 11, 56, 18]],
    circularOcclusions: [
      [146, 27, 17],
      [146, 148, 17],
    ],
    photoRadius: 19,
  },
  "recent-drmtlgy-photo": {
    file: "flows/1cb8d743-c728-4317-8c60-1cc3c2761f8c/002.webp",
    rect: [202, 680, 172, 80],
    circularOcclusions: [[145, 27, 17]],
  },
  "recent-loaded-logo": {
    file: "flows/8d7a8acd-de80-444e-93ba-65c61d7b6444/005.webp",
    rect: [33, 137, 42, 42],
    photoRadius: 21,
  },
  "recent-jeans-conversation": {
    file: "flows/52c46d53-6d5f-4c10-964a-f9b0c404203c/003.webp",
    rect: [16, 331, 48, 49],
    photoRadius: 11,
  },
  "assistant-mobbin-merch-cap": {
    file: "flows/d6910bbb-655d-44ad-842e-11da062a1e66/005.webp",
    // Cap photography only, above the source card's heart control.
    rect: [192, 513, 108, 72],
    occlusions: [[99, 65, 9, 7]],
  },
  "assistant-white-square": {
    file: "flows/8b512345-0d92-4125-b037-4c6f05288cee/002.webp",
    rect: [18, 386, 148, 148],
    occlusions: [[105, 104, 36, 35]],
  },
  "assistant-black-square": {
    file: "flows/8b512345-0d92-4125-b037-4c6f05288cee/002.webp",
    rect: [178, 386, 148, 148],
    occlusions: [[105, 104, 36, 35]],
  },
  "assistant-city-square": {
    file: "flows/8b512345-0d92-4125-b037-4c6f05288cee/003.webp",
    rect: [26, 172, 162, 162],
    occlusions: [
      [8, 8, 58, 22],
      [118, 118, 36, 36],
      [48, 144, 56, 18],
    ],
  },
  "assistant-signature-square": {
    file: "flows/8b512345-0d92-4125-b037-4c6f05288cee/003.webp",
    rect: [26, 372, 162, 162],
    occlusions: [
      [118, 118, 36, 36],
      [54, 144, 48, 18],
    ],
  },
  "profile-empty-package": {
    file: "flows/cf77c541-39be-418c-91ef-2ca98f8d9f73/002.webp",
    rect: [32, 570, 66, 62],
  },
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

  "auth-returning-package": {
    file: "flows/b5716e20-b094-463c-b74b-a5e983dd1651/002.webp",
    rect: [70, 375, 235, 176],
  },
  "auth-tracking-product": {
    file: "flows/b5716e20-b094-463c-b74b-a5e983dd1651/008.webp",
    rect: [52, 363, 80, 80],
  },
  "auth-tracking-package": {
    file: "flows/b5716e20-b094-463c-b74b-a5e983dd1651/008.webp",
    rect: [156, 363, 80, 80],
  },
  "auth-reference-avatar": {
    file: "flows/b5716e20-b094-463c-b74b-a5e983dd1651/007.webp",
    rect: [168, 183, 57, 57],
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
    rect: [17, 240, 171, 171],
    photoRadius: 20,
    circularOcclusions: [[144, 144, 17]],
  },
  "deals-rinse-rainbow": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/002.webp",
    rect: [198, 240, 171, 171],
    photoRadius: 20,
    circularOcclusions: [[144, 144, 17]],
  },
  "deals-syman-logo": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/002.webp",
    rect: [24, 516, 26, 26],
  },
  "deals-syman-fir": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/002.webp",
    rect: [17, 573, 171, 171],
    photoRadius: 20,
    circularOcclusions: [[144, 144, 17]],
  },
  "deals-syman-lilac": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/002.webp",
    rect: [198, 573, 171, 171],
    photoRadius: 20,
    circularOcclusions: [[144, 144, 17]],
  },
  "deals-francesco-logo": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/003.webp",
    rect: [24, 127, 26, 26],
  },
  "deals-francesco-goat": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/003.webp",
    rect: [17, 180, 171, 171],
    photoRadius: 20,
    circularOcclusions: [[144, 144, 17]],
  },
  "deals-francesco-lavender": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/003.webp",
    rect: [198, 180, 171, 171],
    photoRadius: 20,
    circularOcclusions: [[144, 144, 17]],
  },
  "deals-solid-logo": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/003.webp",
    rect: [24, 454, 26, 26],
  },
  "deals-solid-raquels": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/003.webp",
    rect: [17, 514, 171, 171],
    photoRadius: 20,
    circularOcclusions: [[144, 144, 17]],
  },
  "deals-solid-mask": {
    file: "flows/7fd66949-219c-4ef9-ba53-a3482dbe2e60/003.webp",
    rect: [198, 514, 171, 171],
    photoRadius: 20,
    circularOcclusions: [[144, 144, 17]],
  },
  "home-drmtlgy-eye": {
    file: "flows/b5716e20-b094-463c-b74b-a5e983dd1651/009.webp",
    rect: [100, 339, 32, 134],
  },
  "home-drmtlgy-tinted": {
    file: "flows/b5716e20-b094-463c-b74b-a5e983dd1651/009.webp",
    rect: [93, 497, 36, 141],
  },
  "home-drmtlgy-bundle": {
    file: "flows/b5716e20-b094-463c-b74b-a5e983dd1651/009.webp",
    rect: [246, 500, 83, 140],
    occlusions: [
      [0, 0, 45, 24],
      [66, 104, 17, 36],
    ],
  },
  "home-drmtlgy-masks": {
    file: "flows/b5716e20-b094-463c-b74b-a5e983dd1651/009.webp",
    rect: [234, 664, 110, 136],
    occlusions: [
      [0, 0, 26, 18],
      [77, 93, 33, 37],
      [0, 99, 77, 37],
    ],
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
  "search-x721-photo": {
    file: "flows/4d0f0532-ce38-49b5-a94b-32e8ace4716c/006.webp",
    rect: [26, 397, 132, 132],
    circularOcclusions: [[103, 107, 17]],
    photoRadius: 20,
  },
  "search-tough-love-photo": {
    file: "flows/4d0f0532-ce38-49b5-a94b-32e8ace4716c/006.webp",
    rect: [26, 558, 132, 132],
    circularOcclusions: [[103, 107, 17]],
    photoRadius: 20,
  },
  "search-mmml-logo": {
    file: "flows/4d0f0532-ce38-49b5-a94b-32e8ace4716c/006.webp",
    rect: [171, 500, 26, 26],
    photoRadius: 13,
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
  "look-blazer-third-partial": {
    file: "flows/d0dd4fc3-7ffe-4f1e-81d8-d2a17e904e24/008.webp",
    rect: [360, 181, 33, 134],
  },
  "look-shirt-third-partial": {
    file: "flows/d0dd4fc3-7ffe-4f1e-81d8-d2a17e904e24/008.webp",
    rect: [360, 492, 33, 134],
  },
  "look-skirt-one-partial": {
    file: "flows/d0dd4fc3-7ffe-4f1e-81d8-d2a17e904e24/008.webp",
    rect: [30, 802, 129, 48],
  },
  "look-skirt-two-partial": {
    file: "flows/d0dd4fc3-7ffe-4f1e-81d8-d2a17e904e24/008.webp",
    rect: [198, 802, 128, 48],
  },
  "look-skirt-three-partial": {
    file: "flows/d0dd4fc3-7ffe-4f1e-81d8-d2a17e904e24/008.webp",
    rect: [360, 802, 33, 48],
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
  "skin-permission-avatar": {
    file: "flows/01972be8-07ed-4dfa-9ec9-d1e6824c35bc/003.webp",
    rect: [293, 676, 36, 36],
    photoRadius: 18,
  },
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
  "widget-kitsch-logo": {
    file: "flows/403ffb92-8c6c-4117-8d75-21555bb8db42/001.webp",
    rect: [42, 659, 56, 56],
  },
  "widget-shop-mark": {
    file: "flows/403ffb92-8c6c-4117-8d75-21555bb8db42/001.webp",
    rect: [335, 98, 16, 17],
  },
  "widget-dhl-logo": {
    file: "flows/403ffb92-8c6c-4117-8d75-21555bb8db42/001.webp",
    rect: [42, 269, 32, 33],
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
      const crop = sharp(input).extract({ left, top, width, height });
      if (
        entry.occlusions?.length ||
        entry.lightTextOcclusions?.length ||
        entry.circularOcclusions?.length ||
        entry.photoRadius
      ) {
        let cleanPhoto = await crop.ensureAlpha().png().toBuffer();
        if (entry.lightTextOcclusions?.length) {
          const pixels = await sharp(cleanPhoto)
            .raw()
            .toBuffer({ resolveWithObject: true });
          // At source scale, a small bounded dilation also removes the captured
          // glyph's dark antialiasing/shadow. Only alpha changes; no photo pixels
          // are synthesized and the mask cannot extend beyond the caption bounds.
          const inkRadius = Math.max(1, Math.ceil(1.5 * scale));
          for (const bounds of entry.lightTextOcclusions) {
            const [x, y, w, h] = bounds.map((value) =>
              Math.round(value * scale),
            );
            const left = Math.max(0, x),
              top = Math.max(0, y);
            const right = Math.min(x + w, width),
              bottom = Math.min(y + h, height);
            const maskWidth = right - left,
              maskHeight = bottom - top;
            if (maskWidth <= 0 || maskHeight <= 0) continue;
            const captionInk = new Uint8Array(maskWidth * maskHeight);
            for (let row = 0; row < maskHeight; row += 1) {
              for (let column = 0; column < maskWidth; column += 1) {
                const offset = ((top + row) * width + left + column) * 4;
                const low = Math.min(
                  pixels.data[offset],
                  pixels.data[offset + 1],
                  pixels.data[offset + 2],
                );
                const high = Math.max(
                  pixels.data[offset],
                  pixels.data[offset + 1],
                  pixels.data[offset + 2],
                );
                if (low < 175 || high - low > 28) continue;
                for (let delta = -inkRadius; delta <= inkRadius; delta += 1) {
                  const maskRow = row + delta;
                  if (maskRow < 0 || maskRow >= maskHeight) continue;
                  const reach = Math.floor(
                    Math.sqrt(inkRadius ** 2 - delta ** 2),
                  );
                  captionInk.fill(
                    1,
                    maskRow * maskWidth + Math.max(0, column - reach),
                    maskRow * maskWidth +
                      Math.min(maskWidth, column + reach + 1),
                  );
                }
              }
            }
            for (let row = 0; row < maskHeight; row += 1) {
              for (let column = 0; column < maskWidth; column += 1) {
                if (!captionInk[row * maskWidth + column]) continue;
                const offset = ((top + row) * width + left + column) * 4;
                pixels.data[offset + 3] = 0;
              }
            }
          }
          cleanPhoto = await sharp(pixels.data, { raw: pixels.info })
            .png()
            .toBuffer();
        }
        const cutouts = await Promise.all(
          (entry.occlusions ?? []).map(async ([x, y, w, h]) => ({
            left: Math.round(x * scale),
            top: Math.round(y * scale),
            input: await sharp({
              create: {
                width: Math.round(w * scale),
                height: Math.round(h * scale),
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 1 },
              },
            })
              .png()
              .toBuffer(),
            blend: "dest-out" as const,
          })),
        );
        const photoCutouts: OverlayOptions[] = [...cutouts];
        if (entry.circularOcclusions?.length) {
          photoCutouts.push({
            input: Buffer.from(
              `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${entry.circularOcclusions.map(([x, y, radius]) => `<circle cx="${x * scale}" cy="${y * scale}" r="${radius * scale}" fill="white"/>`).join("")}</svg>`,
            ),
            blend: "dest-out",
          });
        }
        if (entry.photoRadius) {
          photoCutouts.push({
            input: Buffer.from(
              `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${entry.photoRadius * scale}" fill="white"/></svg>`,
            ),
            blend: "dest-in",
          });
        }
        return sharp(cleanPhoto)
          .composite(photoCutouts)
          .webp({ quality: 95 })
          .toBuffer();
      }
      return crop.webp({ quality: 95 }).toBuffer();
    })();
    pending.set(key, job);
    void job.catch(() => pending.delete(key));
  }
  return pending.get(key);
}
