require('dotenv').config();
const express = require('express');
const authRoute = require('./routes/authRoutes');
const profileRoute = require('./routes/profileRoute');
const cors = require('cors');

const app = express();
// const while_list = process.env.CORS_ORIGINS;
// const corsOptions = {
//   origin: (origin, cb) => {
//     if (while_list.indexOf(origin) !== -1) {
//       cb(null, true);
//     } else {
//       cb(new Error("Not allowed by CORS"));
//     }
//   },
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', authRoute);
app.use('/profile', profileRoute);


app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
})