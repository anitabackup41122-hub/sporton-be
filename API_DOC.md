# API Documentation

Base URL: `http://localhost:PORT` (set `PORT` in .env or use 3000)

Notes:
- All JSON request/response use `application/json` except file upload endpoints (use `multipart/form-data`).
- Protected endpoints require `Authorization: Bearer <token>` header.

## Auth

- POST /api/auth/initiate-admin
  - Auth: none
  - Body (json): { "email": string, "password": string, "name": string }
  - Response: 201 created message

- POST /api/auth/signin
  - Auth: none
  - Body (json): { "email": string, "password": string }
  - Response: 200 { token, user: { id, email, name } }

## Banks

Base path: `/api/banks`

- POST /
  - Auth: required
  - Body (json): { "bankName": string, "accountName": string, "accountNumber": string }
  - Response: 201 created bank object

- GET /
  - Auth: none
  - Response: 200 [ bank ]

- PUT /:id
  - Auth: required
  - Body (json): updated fields same as create
  - Response: 200 updated bank

- DELETE /:id
  - Auth: required
  - Response: 200 message

## Categories

Base path: `/api/categories`

- POST /
  - Auth: required
  - Upload: single file field `image` (multipart/form-data)
  - Body fields (form-data): `name`, `description`, and `image`
  - Response: 201 created category

- GET /
  - Auth: none
  - Response: 200 [ category ]

- GET /:id
  - Auth: none
  - Response: 200 category object

- PUT /:id
  - Auth: required
  - Upload: single file field `image` (multipart/form-data)
  - Body: form-data fields like create
  - Response: 200 updated category

- DELETE /:id
  - Auth: required
  - Response: 200 message

## Products

Base path: `/api/products`

- POST /
  - Auth: required
  - Upload: single file field `image` (multipart/form-data)
  - Body (form-data): `name`, `description`, `stock` (number), `price` (number), `category` (category id), `image`
  - Response: 201 created product

- GET /
  - Auth: none
  - Response: 200 [ product ] (populated category)

- PUT /:id
  - Auth: required
  - Upload: optional `image` (multipart/form-data)
  - Body: fields to update
  - Response: 200 updated product

- DELETE /:id
  - Auth: required
  - Response: 200 message

## Transactions

Base path: `/api/transactions`

- POST /
  - Auth: none
  - Upload: single file field `paymentProof` (multipart/form-data) [required]
  - Body (form-data): `purchasedItems` (JSON string or application field), `totalPayment` (number), `customerName`, `customerContact`, `customerAddress`
    - Example `purchasedItems` value (string):
      - `[ { "productId": "<id>", "qty": 2 } ]`
  - Response: 201 created transaction

- GET /
  - Auth: required
  - Response: 200 [ transaction ] (populated purchasedItems.productId)

- GET /:id
  - Auth: none
  - Response: 200 transaction

- PUT /:id
  - Auth: required
  - Body (json): { "status": "pending" | "paid" | "rejected" }
  - Behavior: when status changes to `paid`, product stock is decreased
  - Response: 200 updated transaction


## How to use the included test file

- Open `test_endpoints.html` in a browser (after starting your server).
- Edit the `BASE_URL` value at the top of the HTML if your server runs on a non-default port.
- For protected requests, paste the JWT token into the "Auth Token" field (from signin response).

