// import transporter from "../config/mail.js";

// export const sendVerificationEmail = async (email, fullName, verificationLink) => {

//     await transporter.sendMail({
//         from: `"LedgerLens" <${process.env.EMAIL_USER}>`,
//         to: email,
//         subject: "Verify your LedgerLens account",

//         html: `
//             <h2>Hello ${fullName},</h2>

//             <p>Thank you for registering with LedgerLens.</p>

//             <p>Please click the button below to verify your email.</p>

//             <a href="${verificationLink}">
//                 Verify Email
//             </a>

//             <p>This link will expire in 24 hours.</p>
//         `,
//     });

// };


//----------------for deployment-----------------
import * as brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export const sendVerificationEmail = async (
  email,
  fullName,
  verificationLink
) => {
  await apiInstance.sendTransacEmail({
    sender: {
      name: "LedgerLens",
      email: process.env.EMAIL_USER,
    },
    to: [
      {
        email: email,
        name: fullName,
      },
    ],
    subject: "Verify your LedgerLens account",
    htmlContent: `
      <h2>Hello ${fullName},</h2>

      <p>Thank you for registering with LedgerLens.</p>

      <p>Please click the button below to verify your email.</p>

      <p>
        <a href="${verificationLink}">
          Verify Email
        </a>
      </p>

      <p>This link will expire in 24 hours.</p>
    `,
  });
};