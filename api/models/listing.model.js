import mongoose from "mongoose";

export const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  furnished: {
    type: Boolean,
    required: true,
  },
  parking: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  offer: {
    type: Boolean,
    required: true,
  },
  userRef: {
    type: String,
    required: true,
  },
  imageUrls: {
    type: [String],
    default: [
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    ],
  },
});

const Listing = mongoose.model("listing", listingSchema);

export default Listing;
