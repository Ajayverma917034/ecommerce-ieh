const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT);
    console.log(process.env.MONGODB_CONNECT);
    console.log(`Server Running On ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`${error}`);
  }
};

// export const connectDatabase = async (Url) => {

//     try {
//         // connect take two paramerter 1 url, 2 object
//         await mongoose.connect(Url, { useUnifiedTopology: true, useNewUrlParser: true })
//         console.log("data base connnected sucessfully")
//     } catch (err) {
//         console.log(`Error while connecting with the database`, err.message);
//     }
// }

module.exports = connectDatabase;
