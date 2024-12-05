const express = require("express");
const port = 3000;
const app = express();
const connectDB = require("./config/MongoDBconnection");
connectDB();
const homeRoutes = require("./routes/home-route");
const projectsRoutes = require("./routes/prjects-route");
const adminLoginRouter = require("./routes/adminLoginRouter");
const aboutRouter = require("./routes/about-me-route");
const contactMeRouter = require('./routes/contact-me-route')

const dotenv = require("dotenv");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.use(express.json());

// use home
app.use("/home", homeRoutes);
app.use('/uploads', express.static('uploads')); 


// use Projects
app.use("/projects", projectsRoutes);

// use adminLogin

app.use("/adminLogin", adminLoginRouter);

// use about

app.use("/about", aboutRouter);

// use contact-me

app.use('/contact', contactMeRouter)

// use projects

app.use('./projects', projectsRoutes)


app.listen(port, () => console.log(`Server started at port ${port}`));
