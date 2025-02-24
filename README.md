
  

# Node.js & MongoDB Cluster Setup Guide

  

This guide provides a comprehensive walkthrough to create your MongoDB account, set up a cluster, and configure your Node.js application to interact with it. Whether you're new to MongoDB or looking to streamline your development process, follow these steps for a smooth setup.

  

---

## Table of Contents

1. [Creating a MongoDB Account and Cluster](#creating-a-mongodb-account-and-cluster)

- [Sign Up for MongoDB Atlas](#sign-up-for-mongodb-atlas)

- [Create a New Cluster](#create-a-new-cluster)

- [Configure Cluster Access](#configure-cluster-access)

- [Retrieve Your Connection String](#retrieve-your-connection-string)

2. [npm Installation](#npm-installation)

3. [Running the Application Locally](#running-the-application-locally)

<br>

---

  

## Creating a MongoDB Account and Cluster

### Sign Up for MongoDB Atlas

1.  **Visit the MongoDB Atlas Website:**

- Go to the [MongoDB Atlas website](https://www.mongodb.com/cloud/atlas) and click **"Start Free"**.

2.  **Create Your Account:**

- Fill in the required details and create your account.

- Verify your email by clicking the link sent to your inbox.

### Create a New Cluster

1.  **Log In and Build a Cluster:**

- Once logged in, click **"Build a Cluster"**.

2.  **Choose Your Settings:**

- Select your cloud provider (AWS, Azure, or GCP) and your preferred region.

- Choose a cluster tier. For testing or development, the **M0 free tier** is a great starting point.

3.  **Create the Cluster:**

- Click **"Create Cluster"** and wait a few minutes for the setup to complete.

### Configure Cluster Access

1.  **Whitelist Your IP Address:**

- Navigate to the **"Network Access"** section.

- Click **"Add IP Address"** and either add your current IP or allow access from anywhere (`0.0.0.0/0`) for development purposes.

2.  **Create a Database User:**

- Go to **"Database Access"**.

- Create a new database user by providing a username and password.

- Assign the necessary permissions to the user.

### Retrieve Your Connection String

1.  **Connect Your Application:**

- Once your cluster is ready, click **"Connect"** and choose **"Connect your application"**.

2.  **Copy the Connection String:**

- Copy the provided connection string, replacing `<username>`, `<password>`, and `<dbname>` with your actual credentials and desired database name.

<br>

---

# npm Installation

1. **Download the Node.js Installer:**

- Visit the official [Node.js website](https://nodejs.org/en/) and download the installer (the LTS version is recommended) related to your OS.

2. **Run the Installer:**

- Launch the downloaded file and follow the on-screen instructions. The installer will set up both Node.js and npm on your system.

3. **Verify the Installation:**

- Open Command Prompt and type:

```bash

node -v

npm -v

```

- These commands will display the installed versions of Node.js and npm, respectively.

<br>

---

## Running the Application Locally

1. **Clone the Repository:**

- First, clone the API repository from GitHub to your local machine.

```bash

git clone https://github.com/nataliasviattseva/api.git

```

2. **Navigate to Your Project Directory:**

- Open your terminal and navigate to your project directory `api`:

```bash

cd api

```

3. **Install Dependencies:**

- Run the following command to install all the necessary packages specified in your `package.json` file:

```bash

npm i

```

4. **Start the Development Server:**

- Once the installation is complete, start the development server with:

```bash

npm run dev

```

<br>

---
