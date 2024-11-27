# **URL Shortener API**

A simple Node.js-based backend service to shorten URLs, redirect users to the original URL, and track usage statistics. Built with **Express** and **MongoDB**.

---

## **Features**
- **Shorten URLs:** Generate a unique short URL for any provided original URL.
- **Redirection:** Redirect users from the short URL to the original URL.
- **Statistics:** Track and retrieve usage data, including total clicks and the last accessed time.
- **Rate Limiting:** Protects the API from excessive requests (100 requests per minute per IP).
- **Validation:** Ensures the input URL is valid.
- **Deployment:** Application deployed and accessible online.

---

## **Endpoints**

### **1. POST /shorten**
Shorten a given URL.

#### Request:
```json
{
  "originalUrl": "https://example.com"
}
```

#### Response:
```json
{
  "shortUrl": "http://localhost:3000/HkTJntAyn"
}
```

#### Errors:
- `400`: Missing or invalid URL.
- `500`: Server/database error.

---

### **2. GET /:shortId**
Redirects the user to the original URL associated with the given `shortId`.

#### Request:
```plaintext
GET http://localhost:3000/HkTJntAyn
```

#### Response:
- Redirects to the original URL (`https://example.com`).

#### Errors:
- `404`: Short URL not found.
- `500`: Server/database error.

---

### **3. GET /stats/:shortId**
Retrieve usage statistics for a specific short URL.

#### Request:
```plaintext
GET http://localhost:3000/stats/HkTJntAyn
```

#### Response:
```json
{
  "originalUrl": "https://example.com",
  "clicks": 42,
  "lastAccessed": "2024-11-26T12:34:56.000Z"
}
```

#### Errors:
- `404`: Short URL not found.
- `500`: Server/database error.

---

## **Technologies Used**
- **Node.js**: Backend runtime.
- **Express.js**: Web framework.
- **MongoDB**: Database for storing URL data.
- **Rate-Limiter-Flexible**: Middleware for rate-limiting requests.
- **Shortid**: Generates unique short IDs for URLs.
- **Dotenv**: Manages environment variables.

---

## **Setup and Installation**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-repo/url-shortener.git
cd url-shortener
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Environment Variables**
Create a `.env` file in the project root and configure the following variables:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
PORT=3000
```

### **4. Run the Server**
```bash
npm start
```

Server will start at `http://localhost:3000`.

---

## **Testing the API**

Use tools like **Postman**, **cURL**, or your browser to test the API. Example:

### **Shorten a URL:**
```bash
curl -X POST http://localhost:3000/api/v1/shorten \
-H "Content-Type: application/json" \
-d '{"originalUrl": "https://example.com"}'
```

### **Redirect to Original URL:**
```bash
curl -L http://localhost:3000/api/v1/HkTJntAyn
```

### **Get Statistics:**
```bash
curl http://localhost:3000/api/v1/stats/HkTJntAyn
```

---

## **Rate Limiting**
- Each client (IP address) is limited to **100 requests per minute**.
- Exceeding the limit will result in a `429 Too Many Requests` response.

---

## **Deployment**
This application has been deployed at:
[**Live Demo**](https://your-deployment-url.com)

### **Deployment Instructions**
1. Create an account on **Render**, **Railway**, or **Vercel**.
2. Connect your repository and configure the following environment variables:
   ```
   MONGO_URI
   PORT
   ```
3. Deploy the application.

---

## **Database Schema**
The `urls` collection stores the following fields:
```json
{
  "_id": "ObjectId",
  "originalUrl": "https://example.com",
  "shortId": "HkTJntAyn",
  "clicks": 42,
  "lastAccessed": "2024-11-26T12:34:56.000Z",
  "createdAt": "2024-11-01T08:12:34.000Z",
  "updatedAt": "2024-11-26T12:34:56.000Z"
}
```

## **Contributing**
Feel free to fork this repository, create a feature branch, and submit a pull request. Contributions are welcome!

---