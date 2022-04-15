# Quick Vite React TypeScript Sign-In With Ethereum

A monorepo that implements Sign-In With Ethereum (SIWE) with an NodeJS TypeScript REST API and a client-side Single-Page Application in React with TypeScript.

If you like this content, please make sure to follow me:

- [http://twitter.com/codingwithmanny](http://twitter.com/codingwithmanny)
- [https://codingwithmanny.medium.com](https://codingwithmanny.medium.com)

---

## TOC

- [Requirements](#Requirements)
- [Sign Up Alchemy Account](#Sign-Up-Alchemy-Account)
- [Sign Up Etherscan Account](#Sign-Up-Etherscan-Account)
- [Sign Up Infura Account](#Sign-Up-Infura-Account)
- [Local Setup](#Sign-Up-Infura-Account)
- [Debugging](#Debugging)
- [Deployment](#Deployment)
- [License](#License)

---

## Requirements

- NVM or Node `v16.14.0`
- Yarn

---

## Sign Up Alchemy Account

### 1 - Website Sign Up

Go to [https://www.alchemy.com](https://www.alchemy.com)

### 2 - Create App

A - When logged in, in the top right, click on **Create App**

B - Set the **Name** to `Quick Vite React TypeScript SIWE`

C - Set the **Environment** to `Development`, **Chain** to `Ethereum`, and **Network** to `Mainnet`

D - Click **Create App**

### 3 - Add Environment Variable

In the Alchemy dashboard for your newly created project click **VIEW KEY** and opy the **API KEY**

**File**: `.env`

```yaml
VITE_ALCHEMY_API_KEY="<YOUR_ALCHEMY_API_KEY>"
VITE_ETHERSCAN_API_KEY=""
VITE_INFURA_ID=""
VITE_APP_NAME="QUICK VITE REACT TYPESCRIPT SIWE"
```

---

## Sign Up Etherscan Account

### 1 - Website Sign Up

Go to [https://etherscan.io](https://etherscan.io)

### 2 - Create API Keys

A - In the left sidebar click **API Keys**

B - In _My API Keys_ click **Add**

C - For **App Name** enter `Quick Vite React SIWE`

D - Click **Create New API Key**

E - Copy **API Key Token**

### 3 - Add Environment Variable

**File:** `packages/react/.env`

```yaml
VITE_ALCHEMY_API_KEY=""
VITE_ETHERSCAN_API_KEY="<YOUR_ETHERSCAN_API_KEY>"
VITE_INFURA_ID=""
VITE_APP_NAME="QUICK VITE REACT TYPESCRIPT SIWE"
```

---

## Sign Up Infura Account

### 1 - Website Sign Up

Go to [https://infura.io/register](https://infura.io/register)

### 2 - Create New Project

A - When signed in, in the top right section, click **Create New Project**

B - Set the **Product** to `Ethereum`

C - Set the **Project Name** to `Quick Vite React TypeScript SIWE`

D - Click **Create**

E - When the project is create copy the **Project ID**

### 3 - Add Environment Variable

**File:** `packages/react/.env`

```yaml
VITE_ALCHEMY_API_KEY=""
VITE_ETHERSCAN_API_KEY=""
INFURA_ID="<YOUR_INFURA_PROJECT_ID>"
APP_NAME="QUICK VITE REACT TYPESCRIPT SIWE"
```

---

## Local Setup

### 1 - Node

```bash
cp packages/node/.env.example packages/node/.env;
```

### 2 - React

**NOTE:** You will need the different API keys mentioned above

```bash
cp packages/react/.env.example packages/react/.env;
```

### 3 - Start

```bash
yarn dev;
```

---

## Debugging

In case you need to kill a port:

```bash
kill -9 $(lsof -ti:5001); # node
kill -9 $(lsof -ti:3000); # react
```

---

## Deployment

TBD

---

## License

MIT
