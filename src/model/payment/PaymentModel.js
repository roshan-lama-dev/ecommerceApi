import PaymentSchema from "./PaymentSchema.js";

// create payment option
export const createPaymentOption = (paymentObj) => {
  return PaymentSchema(paymentObj).save();
};

// get Payment

export const getPaymentOption = () => {
  return PaymentSchema.find();
};

//update Payment Optionm
// TODO
// try and spread  the update obj in the findByIdAndUpdate parameter
// also try with and without spreading the update object
export const updatePaymentOption = ({ _id, ...updateObj }) => {
  return PaymentSchema.findByIdAndUpdate(_id, updateObj, { new: true });
};

// delete
export const deletePaymentOption = (_id) => {
  return PaymentSchema.findByIdAndDelete(_id);
};
