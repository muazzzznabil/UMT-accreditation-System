# UMT Accreditation System
The UMT Academic Programme Accreditation System streamlines accreditation processes for PPPK staff at UMT. Features include ChatBot by integrating Gemini LLM API , program registration, evaluator management, PA/FA submissions, MQA feedback tracking, and reporting . Built using MySQL, Visual Studio Code, and Docker for efficiency and scalability. 

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/umt-accreditation-system.git
   cd umt-accreditation-system
   ```

2. **Install Client Dependencies**

   Navigate to the client directory and install the dependencies:

   ```bash
   cd clients/umtAccreditationSystem
   npm install
   ```

3. **Install Server Dependencies**

   Navigate to the server directory and install the dependencies:

   ```bash
   cd ../../server
   npm install
   ```

## Running the Project

### Client

1. **Navigate to the Client Directory**

   ```bash
   cd clients/umtAccreditationSystem
   ```

2. **Start the Development Server**

   ```bash
   npm run dev
   ```

   This will start the Vite development server. You can access the client application at `http://localhost:3000`.

### Server

1. **Navigate to the Server Directory**

   ```bash
   cd ../../server
   ```

2. **Start the Server**

   ```bash
   node index.js
   ```

   The Express.js server will start running. Ensure your server is properly configured to connect to your MySQL database.

## Building for Production

To build the client for production, use the following command:

```bash
cd clients/umtAccreditationSystem
npm run build
```

This will create an optimized build of the client application in the `dist` directory.

## License

This project is licensed under the MIT License.
