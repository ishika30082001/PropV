const mongoose = require("mongoose");
const express = require("express");

const listingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    PropertyOwnerName: {
      type: String,
      required: [true, "Please enter propertyOwnerName name"],
      minLength: [4, "name should be minimum 4 characters"],
      maxLength: [32, "name cannot exceed 32 characters"],
    },
    address: {
      type: String,
      required: [true, "Please enter address"],
    },
    pincode: {
      type: Number,
      required: [true, "Please Enter your pincode"],
    },
    phoneNo: {
      type: Number,
      required: [true, "Please Enter your number"],
    },
    Property_type: {
      // commercial // residential
      type: String,
      enum: ["residential", "commercial"],
      required: [true, "please enter type of your property"],
    },
    residential_type: {
      type: String,
      // No custom validator needed here
    },
    commercial_type: {
      type: String,
      // No custom validator needed here
    },
    Area_of_the_property: {
      type: String, //area in square meter/feet
      required: [true, "please specify Property area"],
    },
    price: {
      type: Number,
      required: [true, "please enter property price"],
    },
    Purpose: {
      enum: ["Rent", "Sale", "PG"],
      type: String,
      required: [true, "Please specify your category"],
    },
    tenantType: {
      //familymembers, Bachelors
      type: String,
      required: [true, "Please specify tenantType"],
    },
    facilities: [
      {
        name: {
          type: String,
          default: null,
          required: true,
        },
        food: {
          type: Boolean,
          default: false,
        },
        parking: {
          type: Boolean,
          default: false,
        },
        park: {
          type: Boolean,
          default: false,
        },
        backupGenerator: {
          type: Boolean,
          default: false,
        },
        securityGuard: {
          type: Boolean,
          default: false,
        },
        gym: {
          type: Boolean,
          default: false,
        },
      },
    ],
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    Building_name: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

listingSchema.pre("validate", function (next) {
  if (!this.residential_type && !this.commercial_type) {
    this.invalidate(
      "residential_type",
      "please specify either the residential type or commercial type"
    );
    this.invalidate(
      "commercial_type",
      "please specify either the residential type or commercial type"
    );
  }
  next();
});

module.exports = mongoose.model("listing", listingSchema);
