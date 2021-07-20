## CookBook 2021

CookBook is a Next.js web application that allows users to record their own recipes.

Click [here](https://cookbook-nextjs.vercel.app/) to visit the website.

Click [here](https://github.com/cxnld/CookBook-API) to visit the backend code.

Features:
A RESTful API created with Express.js handles incoming requests
Login, register and authentication using JSON Web Tokens with passwords encrypted with bcrypt.
User information modeled by Mongoose and stored in MongoDB Atlas.

#### Frontend Features:

**Next.js** as main React framework.<br/>
**Redux Toolkit** manages login state application.<br/>
**SWR** hook serves cached information while fetching updated info.<br/>
**Axios** sends HTTP requests to third-party APIs as well as our own server.<br/>
**react-bootstrap** for some component styling.<br/>
Deplyed using Vercel.

#### Backend Features:
A RESTful API created with Express.js handles incoming requests.<br/>
User password is hashed with bcrypt.<br/>
JSON Web Tokens are used to authenticate the user each time they login.<br/>
User information is modeled by Mongoose and stored in MongoDB Atlas.<br/>
Deployed using Serverless and AWS Lambda.<br/>