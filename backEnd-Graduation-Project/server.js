const express = require("express");
const port = 4000;
const app = express();
const connectDB = require("./config/MongoDBconnection");
connectDB();
const homeRoutes = require("./routes/home-route");
const projectsRoutes = require("./routes/prjects-route");
const userRouter = require("./routes/userRouter");
const aboutRouter = require("./routes/about-me-route");
const contactMeRouter = require('./routes/contact-me-route')
const dotenv = require("dotenv");
const cors = require("cors");

// app.use(
//   cors({
//     origin: "http://localhost:4200",
//   })
// );
// app.use(cors());

app.use(cors({
  origin: "*", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}));


app.use(express.json());

// use home
app.use("/home", homeRoutes);
app.use('/uploads', express.static('uploads')); 


// use Projects
// app.use("/projects", projectsRoutes);

// use adminLogin

app.use("/users", userRouter);

// use about

app.use("/about", aboutRouter);

// use contact-me

app.use('/contact', contactMeRouter)


// // use projects

app.use('/projects', projectsRoutes)
app.use('/uploads', express.static('uploads')); 



app.listen(port, "0.0.0.0" , () => console.log(`Server started at port ${port}`));
