const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.post("/api/email", async (req, res) => {
  const {
    name,
    title,
    phone,
    email,
    otherContactMethod,
    language,
    purpose,
    quantity,
    packaging,
    when,
    where,
    discover,
    vatInvoiceIssued,
    notes,
  } = req.body.payload;
  console.log("body", req.body);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "at.yeoubi2@gmail.com",
      pass: "hglgwrnylkvadfwr",
    },
  });
  // send mail with defined transport object
  await transporter.sendMail(
    {
      from: `at.yeoubi2@gmail.com`, // sender address
      to: "123chaydigacon@gmail.com", // list of receivers
      subject: `[YEOUBI] - Message from ${name} ✔`, // Subject line
      html: `<p><b>Name: </b>${name}</p>
      <p><b>Title: </b>${title}</p>
      <p><b>Phone: </b>${phone}</p>
      <p><b>Email: </b>${email}</p>
      <p><b>Other Contact Method: </b>${otherContactMethod}</p>
      <p><b>Language: </b>${language}</p>
      <p><b>Purpose: </b>${purpose}</p>
      <p><b>Quantity: </b>${quantity}</p>
      <p><b>Packaging: </b>${packaging}</p>
      <p><b>When: </b>${when}</p>
      <p><b>Where: </b>${where}</p>
      <p><b>Discover: </b>${discover}</p>
      <p><b>Vat Invoice Issued: </b>${vatInvoiceIssued}</p>
      <p><b>Notes: </b>${notes}</p>
      `, // html body
    },
    (error, response) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully");
      }
    }
  );
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server runs at port ${port}`);
});
