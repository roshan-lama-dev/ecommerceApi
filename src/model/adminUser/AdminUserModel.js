import AdminUserSchema from "./AdminUserSchema.js";

// creating a new user/admin

export const createUser = (userObj) => {
  return AdminUserSchema(userObj).save();
};

// find user by filter (The filter parameter passed from the frontend must be an object)
export const findAdmin = (filter) => {
  return AdminUserSchema.findOne(filter);
};

// find by filter and update the admin user information
// new true allows the new data after the operation

export const findAdminAndUpdate = (filter, updateObj) => {
  return AdminUserSchema.findOneAndUpdate(filter, updateObj, { new: true });
};
