let express = require("express");
const {
  enquiryInsert,
  enquiryList,
  enquiryDelete,
  enquiryUpdate,
  enquirySingleRow,
} = require("../../controllers/web/enquiryController");
let enquiryRouter = express.Router();

//enquiryInsert is the controller
enquiryRouter.post("/insert", enquiryInsert);

//enquiryList is the controller
enquiryRouter.get("/view", enquiryList);

////enquiryDelete is the controller
enquiryRouter.delete("/delete/:id", enquiryDelete);

//enquiryUpdate is the controller
enquiryRouter.get("/single/:id", enquirySingleRow);

//enquiryUpdate is the controller
enquiryRouter.put("/update/:id", enquiryUpdate);

module.exports = enquiryRouter;
