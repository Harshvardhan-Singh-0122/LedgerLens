// import nodemailer from "nodemailer";

// const transport = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// export default transport;


//--------for deplyoment-----------

// import nodemailer from "nodemailer";

// const transport = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   family: 4, // Force IPv4
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export default transport;



// import nodemailer from "nodemailer";

// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

// const transport = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// transport.verify((error, success) => {
//   if (error) {
//     console.error("SMTP Verify Error:", error);
//   } else {
//     console.log("SMTP Server is ready");
//   }
// });

// export default transport;]


import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default transporter;