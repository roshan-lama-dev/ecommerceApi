import ProductSchema from "./ProductSchema.js";

export const createProduct = (productObj) => {
  return ProductSchema(productObj).save();
};

export const getAllProduct = () => {
  return ProductSchema.find();
};

// get single Product
export const getSingleProduct = (_id) => {
  return ProductSchema.findById(_id);
};

// update product

export const updateProduct = ({ _id, ...updateObj }) => {
  return ProductSchema.findByIdAndUpdate(_id, updateObj, { new: true });
};

// delete Product

export const deleteProduct = (_id) => {
  return ProductSchema.findByIdAndDelete(_id);
};

// delete Multiple Product
// the parameter idsArg contains array of the ids of the product to be deleted
export const deleteMultipleProduct = (idsArg) => {
  return ProductSchema.deleteMany({
    _id: { $in: idsArg },
  });
};
