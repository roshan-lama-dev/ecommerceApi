import nodemailer from "nodemailer";

// TODO try and use gmail
const emailProcessing = async (emailContent) => {
  try {
    // create a transport for (any email) SMTP configuration
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail(emailContent);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log("from mailtransporter");
    console.log(error.message);
  }
};

// create an email template for the signUpVerification
// make it an exportable function as it needs to be actually called when we create a new user.
// Also since we need the information of the users within the email content.$

// accept the registered users email and fname, and the preview  as a parameter
export const adminSignUpVerificationEmail = ({ email, fName }, url) => {
  console.log(email, fName);
  let info = {
    from: `"Register Form"  <${process.env.SMTP_USER}> `,
    to: email,
    subject: "Account Activation required",
    text: `Hi ${fName}, please follow the link ${url} to verify your account.`,
    html: `
      <p>Hi ${fName}</p>,
      <br />
      <br />
      Please follow the link below to verify you account:
      <br />
      <br />
  <a href="${url}" style="color: red; font-weight: bolder;">Verify Now </a>
  <br />
  <br />

  <p>
  ----------- <br />
  Customer care team <br />
  Coding Shop
  </p>

  `,
  };

  emailProcessing(info);
};

// resetPassword

export const resetPasswordOTP = ({ fname, token, email }) => {
  let info = {
    from: `"Coding" <${porcess.env.SMTP_USER}> `,
    to: email,
    subject: "OTP for password reset",
    text: `Hi, ${fname}, Please use the OTP ${token}. `,
    html: `
        <p>Hi ${fname}</p>
    <br />
    <br />
    Here is your otp:
    <br />
    <br />
 ${token} 
<br />
<br />

<p>
----------- <br />
Customer care team <br />
Coding Shop
</p>
        
        `,
  };

  emailProcessing(info);
};

// password reset verification

export const resetPasswordNotification = ({ fname, email }) => {
  let info = {
    from: `"Coding shop" <${process.env.SMTP_USER}>`, // sender address
    to: email, // list of receivers
    subject: "OTP for password reset", // Subject line
    text: `Hi ${fname}, We have update your password, you can now login with your new password .`, // plain text body
    html: `
        <p>Hi ${fname}</p>
        <br />
        <br />
        We have update your password, you can now login with your new password
        <br />
        <br />
    
    <br />
    <br />
    
    <p>
    ----------- <br />
    Customer care team <br />
    Coding Shop
    </p>
    
    `, // html body
  };

  emailProcessing(info);
};
