import express from "express";
import { hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import {
  createUser,
  findAdminAndUpdate,
} from "../model/adminUser/AdminUserModel.js";
import { adminSignUpVerificationEmail } from "../utils/email.js";
import {
  adminRegistrationValidation,
  emailVerifcationValidation,
} from "../middleware/joiMiddleware.js";
const router = express.Router();

// register the admin user

router.post("/", adminRegistrationValidation, async (req, res, next) => {
  try {
    // grad the password and hash the password

    req.body.password = hashPassword(req.body.password);
    // also create a randomly generated uuid/verification code to be used later for verification process
    req.body.verificationCode = uuidv4();
    // TODO stop sending the data to the database if it doesn't fulfill the schema. We can use Joi for this purpose. But we also need to c
    // add the new user information into the database
    const result = await createUser(req.body);

    console.log("after database operation", result);

    if (result?._id) {
      // we create a unique url and send it to the user as an email. So the user can be verified.
      // we use the unique verfication code that was generated and assigned to the user

      const uniqueURL = `http://localhost:9000/verify?c=${result.verificationCode}&email=${result.email}`;

      // call the mail sender function
      adminSignUpVerificationEmail(result, uniqueURL);

      res.json({
        status: "success",
        message:
          "Please check your email and follow the instruction to activate your email address",
      });

      return;
    }

    res.json({
      status: "error",
      message: "Unable to create a new admin, please try again",
    });
  } catch (error) {
    // we also need to send the error code and the error message with this which will be handled by the global error handler

    error.errorCode = 500;

    // error handling if the user tries to use the same email for  creating two different account

    if (error.message.includes("E11000 duplicate key error collection")) {
      error.errorCode = 200;
      error.message = "There is already an account with this email";
    }
    next(error);
  }
});

// email verification
//
router.post(
  "/email-verify",
  emailVerifcationValidation,
  async (req, res, next) => {
    try {
      // if the email is validated and the user also has gone through the link where we provide the verification code we can change the status of the verification
      const obj = {
        status: "active",
        verificationCode: "",
        isEmailVerified: true,
      };

      const result = await findAdminAndUpdate(obj);
      if (result?._id) {
        res.json({
          status: "success",
          message: "Your email is verified. You can login now",
        });

        return;
      }

      res.json({
        status: "error",
        message: "Invalid link",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
