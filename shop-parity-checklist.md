# Shop 1:1 parity checklist

> Canonical acceptance ledger for the frozen Shop reference. A route existing is not acceptance. Check boxes only after the named proof was actually performed.

**Frozen source:** 97 flows - 424 ordered flow frames - 323 standalone media entries.

**Acceptance progress:** 0 / 97 flows owner-accepted. Source capture is complete; implementation/test evidence does not count as visual acceptance without owner/design approval.

## Checkbox meaning

- **Src**: every ordered source frame for the flow was opened and visually inspected.
- **Impl**: all app-owned states required by those frames exist in the canonical UI.
- **UX**: transitions, Back, focus, scroll, keyboard/sheet behavior required by the flow were exercised.
- **393**: rendered app was compared against the source at the 393x793 browser content target.
- **Widths**: relevant 320px and 430px containment/adaptation checks passed.
- **Test**: focused automated coverage for the flow/family passed.
- **Accept**: all required evidence is satisfied or a named exception is documented and approved.

The single execution session owns this file. The Lane column is retained only as historical family grouping; do not launch parallel writers or lane locks.

| # | Flow | Frames | Lane | State | Src | Impl | UX | 393 | Widths | Test | Accept |
|---:|---|---:|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | Onboarding<br><sub>`b778fdce-2c65-4153-aaee-6703098f27d4`</sub> | 15 | A Account | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 2 | Home<br><sub>`8d7a8acd-de80-444e-93ba-65c61d7b6444`</sub> | 6 | C Discovery | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 3 | Notifications from Home<br><sub>`7d658ff4-e530-401f-9ce3-07b9533e913b`</sub> | 2 | C Discovery | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 4 | Deals from Home<br><sub>`7fd66949-219c-4ef9-ba53-a3482dbe2e60`</sub> | 3 | C Discovery | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 5 | Following from Home<br><sub>`d0ac7fdc-d174-4a9c-a18d-3136f358c5a7`</sub> | 4 | C Discovery | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 6 | Following list from Following<br><sub>`86f7d1aa-4b5a-485d-b106-c0bc09983673`</sub> | 2 | C Discovery | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 7 | Saved from Home<br><sub>`75b26fee-826f-4403-9288-be499890cd72`</sub> | 4 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 8 | Creating a collection from Saved<br><sub>`b74ee3f5-005d-40d3-9466-f6d080f62b40`</sub> | 7 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 9 | Collection detail (saved) from Saved<br><sub>`a3ff00dc-6536-4966-89ae-2af61582d347`</sub> | 3 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 10 | More ideas from Collection detail (saved)<br><sub>`972c6dae-9ab4-4aaf-9f21-999808493dc6`</sub> | 2 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 11 | Editing a collection name from Collection detail (saved)<br><sub>`c01a7936-24cd-44fb-97fc-a25302b0a2cf`</sub> | 5 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 12 | Changing a collection visibility from Collection detail (saved)<br><sub>`bd9d1905-9b47-445b-805f-0dcc71b59427`</sub> | 3 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 13 | Deleting a collection from Collection detail (saved)<br><sub>`bca3a9c6-3340-4b93-881d-ee1a26c2b26a`</sub> | 3 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 14 | Collection detail (shop detail) from Shop detail<br><sub>`e85d0150-4fe9-4ee0-bde4-de17fe6da7df`</sub> | 3 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 15 | Watching a video from Shop detail<br><sub>`154e77d4-6ee5-4215-9dd4-2688a0035e16`</sub> | 2 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 16 | Filtering products (shop detail) from Shop detail<br><sub>`85a58afb-b3e8-4f69-b274-69762b09ffbf`</sub> | 5 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 17 | Product detail from Shop detail<br><sub>`a99e7161-595d-466c-b0b1-bc1183f1d4d7`</sub> | 9 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 18 | Photos from Product detail<br><sub>`0f9653b4-5412-485a-a3a4-62bfb492a27e`</sub> | 3 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 19 | Saving a product to a collection from Product detail<br><sub>`300d3e11-4ba4-4c43-b720-a7132c6eb7f5`</sub> | 3 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 20 | Adding a product to cart from Product detail<br><sub>`9211553e-bc3c-45f9-943b-f032766e6799`</sub> | 3 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 21 | Purchasing a product from Adding a product to cart<br><sub>`968f374e-69af-4adb-b913-0bb5c0e5e8b1`</sub> | 10 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 22 | Deleting a product from cart from Purchasing a product<br><sub>`c5c9c07b-c093-4221-a2f8-44ca7c29ded0`</sub> | 2 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 23 | Saving a product for later from Purchasing a product<br><sub>`07f5c915-d967-4ef4-89f7-e08ac90c974c`</sub> | 2 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 24 | Adding a phone number from Purchasing a product<br><sub>`5d20e36e-e6c5-4561-b42b-b0385bf6ae86`</sub> | 6 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 25 | Adding an address from Purchasing a product<br><sub>`e116f3b1-f952-4b4d-a0ba-0125bd3e65f7`</sub> | 6 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 26 | Adding a card (purchasing a product) from Purchasing a product<br><sub>`d92a8091-56fb-4119-baf8-13c9baaba2ad`</sub> | 3 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 27 | Adding an address (review & pay) from Purchasing a product<br><sub>`8ecf7b0b-df5a-4773-9ac4-c61d62ca4459`</sub> | 6 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 28 | Deleting an address from Adding an address (review & pay)<br><sub>`797e33cd-30bd-4d70-b3ef-72aa655394fb`</sub> | 4 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 29 | Adding a card (review & pay) from Purchasing a product<br><sub>`604544ec-654f-4358-b33b-ce189f5fd4e4`</sub> | 5 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 30 | Order summary from Purchasing a product<br><sub>`5a094147-42c1-4132-9f3d-b8ac55a25ef4`</sub> | 2 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 31 | Order receipt (purchasing a product) from Purchasing a product<br><sub>`c61e4d3b-629f-48b5-a322-5472f46e9b1b`</sub> | 3 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 32 | Description from Product detail<br><sub>`1dc39cc8-951e-4207-96a5-296145053e26`</sub> | 2 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 33 | Reviews (product detail) from Product detail<br><sub>`4e59dce2-d2a0-4f4e-ae16-54267243df75`</sub> | 2 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 34 | Searching keywords from Reviews (product detail)<br><sub>`b2a75fc0-0d02-462f-8bb7-65ae38d08840`</sub> | 2 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 35 | Marking a review as helpful from Reviews (product detail)<br><sub>`36c23a43-49d3-4932-9595-f122062480b4`</sub> | 2 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 36 | Reporting a review from Reviews (product detail)<br><sub>`fae1016a-facb-4633-b62b-7ddd809e0fac`</sub> | 6 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 37 | Contact a shop from Product detail<br><sub>`6b220d0d-825a-477b-b42f-2e2330f6b8bb`</sub> | 3 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 38 | Reporting a product from Product detail<br><sub>`82159116-18bf-4988-9acd-0f1bb1f76a0f`</sub> | 6 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 39 | Reviews (shop information) from Shop information<br><sub>`2d948785-52f0-49dd-985e-4a016ced6ae2`</sub> | 2 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 40 | Searching products from Shop detail<br><sub>`1df75dd0-05f6-445c-9709-0e0bda2df3af`</sub> | 4 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 41 | Following a shop from Shop detail<br><sub>`356a3c6b-0570-47ae-b0c5-949f06a6a6f6`</sub> | 2 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 42 | Marking a shop as not interested from Home<br><sub>`5f25f0ee-f19a-49a8-8f9d-ca2f3259c3c6`</sub> | 4 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 43 | Search<br><sub>`52c46d53-6d5f-4c10-964a-f9b0c404203c`</sub> | 3 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 44 | Searching Shop from Search<br><sub>`4d0f0532-ce38-49b5-a94b-32e8ace4716c`</sub> | 6 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 45 | Chatting with AI Assistant from Searching Shop<br><sub>`d6910bbb-655d-44ad-842e-11da062a1e66`</sub> | 8 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 46 | Answer detail from Searching Shop<br><sub>`8b512345-0d92-4125-b037-4c6f05288cee`</sub> | 3 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 47 | Giving feedback from Answer detail<br><sub>`2e218159-702e-4708-b9aa-270dbca77f0b`</sub> | 5 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 48 | Filtering results from Searching Shop<br><sub>`0344c453-dece-4e8d-bb54-68f6e551b83f`</sub> | 10 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 49 | Recently viewed from Search<br><sub>`1cb8d743-c728-4317-8c60-1cc3c2761f8c`</sub> | 2 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 50 | Explore<br><sub>`5c39eb04-f5fe-43a0-92da-b79b275051e0`</sub> | 4 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 51 | Category detail from Explore<br><sub>`3fd0a145-a819-409f-a853-c6b03e2e2d27`</sub> | 6 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 52 | Minis from Explore<br><sub>`5fc61632-627a-4875-883e-7cfea2bae666`</sub> | 6 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 53 | Setting up a minis from Minis<br><sub>`2f492f6c-2db7-440b-8515-aa56a2d029e5`</sub> | 6 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 54 | Chatting with Sol from Setting up a minis<br><sub>`ae7711ef-6c54-4aa1-bb56-bee25cf3bef7`</sub> | 5 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 55 | Chatting with Sol (text) from Chatting with Sol<br><sub>`763ecd50-4acd-4a7c-8323-ad622a6df77f`</sub> | 4 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 56 | Turning off microphone from Chatting with Sol<br><sub>`ef624475-7198-4d98-8ec1-ec9dc646a19a`</sub> | 2 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 57 | Analyzing skin from Minis<br><sub>`01972be8-07ed-4dfa-9ec9-d1e6824c35bc`</sub> | 7 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 58 | Finding similar clothes from Minis<br><sub>`d0dd4fc3-7ffe-4f1e-81d8-d2a17e904e24`</sub> | 8 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 59 | Chatting with Gift Sense from Minis<br><sub>`dc8fb947-e214-4d8c-ad6d-e814406e6ef7`</sub> | 11 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 60 | Orders<br><sub>`8f406a69-ad1c-4de8-a699-12aa504efb74`</sub> | 6 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 61 | Order detail from Orders<br><sub>`d3bf7c94-4d9e-4298-a255-eaf177f9efd1`</sub> | 11 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 62 | Copying order number from Order detail<br><sub>`5dacb846-9f3f-4c7f-9378-d6178924867d`</sub> | 3 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 63 | Marking an order as delivered from Order detail<br><sub>`e6c06e9f-26c9-476e-a3e5-d34c968eaa3d`</sub> | 3 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 64 | Delivery progress from Order detail<br><sub>`10af411e-3523-4f6a-bb2f-ed4355895f4b`</sub> | 3 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 65 | Updating tracking detail from Order detail<br><sub>`db478544-df8f-4e16-9e16-39a4829975f8`</sub> | 4 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 66 | Archived orders from Orders<br><sub>`fd0628d8-b28d-4e15-b677-89c328603be6`</sub> | 3 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 67 | Reviewing an order from Orders<br><sub>`7e196d37-7a35-4e2c-a398-eaae5dcf8f26`</sub> | 4 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 68 | Creating an order from Orders<br><sub>`bdd3954f-d943-464a-8c57-6621ffba7fa6`</sub> | 6 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 69 | Profile<br><sub>`cf77c541-39be-418c-91ef-2ca98f8d9f73`</sub> | 7 | A Account | REVIEW | [x] | [x] | [x] | [ ] | [ ] | [x] | [ ] |
| 70 | Account from Profile<br><sub>`537d6d87-4f1a-4202-a1aa-82fc3bdb934b`</sub> | 2 | A Account | REVIEW | [x] | [x] | [x] | [ ] | [ ] | [x] | [ ] |
| 71 | Uploading profile picture from Account<br><sub>`bb30504f-8cba-413a-9d99-ea413dd27406`</sub> | 3 | A Account | REVIEW | [x] | [x] | [x] | [ ] | [ ] | [x] | [ ] |
| 72 | Public profile from Account<br><sub>`15438558-fbdc-457c-ac42-903c2ce730d2`</sub> | 3 | A Account | REVIEW | [x] | [x] | [x] | [ ] | [ ] | [x] | [ ] |
| 73 | Adding a name from Account<br><sub>`ac3a3958-4d65-4687-91b5-d9489c7a5996`</sub> | 3 | A Account | REVIEW | [x] | [x] | [x] | [ ] | [ ] | [x] | [ ] |
| 74 | Selecting a gender from Account<br><sub>`eed20121-4176-4109-8b3b-3eef33911769`</sub> | 3 | A Account | REVIEW | [x] | [x] | [x] | [ ] | [ ] | [x] | [ ] |
| 75 | Adding a birthday from Account<br><sub>`037b3248-e197-46f1-be66-b1bf2b560990`</sub> | 3 | A Account | REVIEW | [x] | [x] | [x] | [ ] | [ ] | [x] | [ ] |
| 76 | Adding a shoe size from Account<br><sub>`8b113fe6-f2d5-4756-ba1f-82a5e1fb571b`</sub> | 3 | A Account | REVIEW | [x] | [x] | [x] | [ ] | [ ] | [x] | [ ] |
| 77 | Adding a skin condition from Account<br><sub>`232ee098-779e-4cb4-85c4-2a49de1a8a98`</sub> | 6 | A Account | REVIEW | [x] | [x] | [x] | [ ] | [ ] | [x] | [ ] |
| 78 | Adding a person to shop from Account<br><sub>`e4568c11-f824-4bfe-9d63-ac0d62665a7d`</sub> | 8 | A Account | REVIEW | [x] | [x] | [x] | [ ] | [ ] | [x] | [ ] |
| 79 | Order history from Profile<br><sub>`36ccec04-834a-4bdb-85e8-8f828c1070be`</sub> | 2 | B Commerce | REVIEW | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 80 | Adding a card (profile) from Profile<br><sub>`0b84e516-1c43-4a00-8832-a659bdb587e7`</sub> | 8 | A Account | REVIEW | [x] | [x] | [x] | [x] | [x] | [x] | [ ] |
| 81 | Card detail from Profile<br><sub>`78af4bc8-3317-4c8b-9d7f-1cd3c82061ea`</sub> | 2 | A Account | REVIEW | [x] | [x] | [x] | [x] | [x] | [x] | [ ] |
| 82 | Deleting a card from Card detail<br><sub>`57811b67-ea3f-4231-bdc0-1776716034db`</sub> | 3 | A Account | REVIEW | [x] | [x] | [x] | [x] | [x] | [x] | [ ] |
| 83 | Addresses from Profile<br><sub>`47a532d7-bcaa-4cc6-9322-48325718f109`</sub> | 2 | A Account | REVIEW | [x] | [x] | [x] | [x] | [x] | [x] | [ ] |
| 84 | Deleting an address (profile) from Addresses<br><sub>`7566d104-783f-4762-894a-e1465dfa554b`</sub> | 4 | A Account | REVIEW | [x] | [x] | [x] | [x] | [x] | [x] | [ ] |
| 85 | Sign in & security from Profile<br><sub>`ad155bf8-4b64-415c-be6d-43e32d3be745`</sub> | 3 | A Account | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 86 | Turning off notifications from Profile<br><sub>`27ee8718-69b7-460f-a26d-96be39cf6ef2`</sub> | 3 | A Account | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 87 | Connections from Profile<br><sub>`18dbe0a9-2fa4-4174-887d-41f5272c2fac`</sub> | 2 | A Account | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 88 | Connect to a Gmail account from Connections<br><sub>`3d1f4110-721a-44e8-b35d-be4c015a9e03`</sub> | 3 | A Account | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 89 | Deleting an account from Profile<br><sub>`edf3324f-4112-4d2f-a7cd-f78f6e6ebbc7`</sub> | 7 | A Account | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 90 | Support from Profile<br><sub>`9e7c0890-7d2d-4e20-83eb-bacf3763d443`</sub> | 2 | A Account | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 91 | Chatting with AI assistant (support) from Support<br><sub>`26a34b32-f094-4805-bdff-4024bb3caf5f`</sub> | 5 | A Account | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 92 | About from Support<br><sub>`ccb0b141-1aac-461e-b8ca-2bfac2886e93`</sub> | 2 | A Account | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 93 | Logging out from Profile<br><sub>`9143aaad-196e-459f-bf7d-6482d8c9f330`</sub> | 4 | A Account | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 94 | Logging in<br><sub>`b5716e20-b094-463c-b74b-a5e983dd1651`</sub> | 9 | A Account | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 95 | Widgets<br><sub>`403ffb92-8c6c-4117-8d75-21555bb8db42`</sub> | 1 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 96 | Shop detail from Home<br><sub>`ea05a60f-ccf7-427a-97b3-9c2bb9a5674c`</sub> | 6 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 97 | Shop information from Shop detail<br><sub>`069d1098-37bd-4600-85ab-28342cf021ad`</sub> | 5 | C Discovery | OPEN | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

## Acceptance rule

A flow becomes **Accept** only after the required boxes are checked from actual evidence. Never infer checkmarks from route count, old prose, screenshots from another commit, or another flow in the same family. If native/system chrome or an unavailable provider is outside the web implementation boundary, document the exact exception next to the flow before acceptance.

### Evidence — flows 69–78 (2026-09-11)

All 41 ordered frozen frames were visually reviewed as one family. The canonical Account/Profile/People implementation was driven at 393×793 through Home → Profile → Account, profile-photo menu/upload state, public profile, name/gender/birthday edits, shoe-size and skin-preference states, and the full add-person nickname → relation → birthday → person-detail → Account return. Source-required preference-panel scroll alignment and the Account-backed person sheet were corrected; native file-picker/keyboard chrome remains outside the web boundary. 320/430 containment passed in the focused family test. `tests/reference/parity-account-69-78.spec.ts`: 3/3 passed. Web typecheck passed; web lint completed with one pre-existing unrelated `discovery/store.tsx:949` warning and no errors; `git diff --check` passed.

### Evidence — flows 80–84 (2026-09-11)

All 19 ordered frozen frames were opened and mapped to deterministic profile/payment/address states. The screenshot scorer compared every mapped frame at the 393×793 web-owned crop. Current family means are 4.102% MAE for 13 payment frames and 2.635% for 6 address frames; these are REVIEW evidence, not 1:1 acceptance because several states remain above the implementation-map threshold. A bounded bottom-space sweep improved flow 80 frame 7 from 11.664% to 7.108% with no measured sibling regression. `tests/reference/parity-account-80-84.spec.ts` exercises card validation/save/detail/delete, address list/detail/delete, Back/history behavior and 320/430 containment; combined with the 69–78 focused suite, 6/6 tests passed in reference dev mode. Seven failures in older broad account/commerce specs were reproduced against exact pre-batch `HEAD`, so they are pre-existing/stale expectations rather than regressions introduced by this batch.

## Current active queue

Parallel lanes are retired. Follow `single-session-execution.md`. Immediate order:

1. Finish and accept flows **69–78** from the consolidated Account/Profile checkpoint.
2. Continue **80–84**, then **85–94**.
3. Revisit/fix **2–6 + 42**, then **7–13**, then **14–20 + 32 + 37–41 + 96–97**.
4. Continue **33–36 + 38–39**, **43–51**, **52–59**, then **95**.
5. Validate/fix commerce **21–31 + 60–68 + 79** as one acceptance pass; preserve `0f92453` rather than rebuilding it.

Work family-by-family: inspect source once, implement in one pass, QA at 393x793, run one focused family test batch, update this ledger, commit/push, then continue.

**Owner visual review (2026-09-11): rejected 1:1 acceptance.** Functional/source/test evidence remains recorded, but 393px visual parity and cross-width visual acceptance are reopened for flows 69-78. These flows are REVIEW, not accepted.
