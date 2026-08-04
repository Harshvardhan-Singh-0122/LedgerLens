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
export const sendVerificationEmail = async (
  email,
  fullName,
  verificationLink
) => {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        name: "LedgerLens",
        email: process.env.EMAIL_USER,
      },
      to: [
        {
          email,
          name: fullName,
        },
      ],
      subject: "Verify your LedgerLens Account",
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
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
};