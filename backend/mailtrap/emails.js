import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

//SENDING EMAIL VERIFICATION LOGIC using MAILTRAP
//picking from the mail config file and the email template for verification using a sendVerification Email
export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verfication",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "23641c62-fc96-431b-a7b7-e487ec0c71e7",
      template_variables: {
        name: name,
        company_info_name: "Techy Garage",
      },
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error("Email could not be sent", error);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
    console.log("Password reset email sent successfully", response);

  } catch (error) {
    console.error("Error sending password reset email", error);

  }
};

export const sendResetSuccessEmail = async (email) => {
const recipient = [{email}];

try {
  const response = await mailtrapClient.send({
    from: sender,
    to: recipient,
    subject: "Password Reset Successful",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    category: "Password Reset"
  })
} catch (error) {
  console.error("Error sending password reset success email ", error);
}
};