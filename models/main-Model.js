const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    default: ""
  },
  phone: {
    type: String,
    required: true,
    default: ""
  },
  fax: {
    type: String,
    required: true,
    default: ""
  },
  email: {
    type: String,
    required: true,
    default: ""
  },
  imageUrl: {
    type: String,
    required: true,
    default: ""
  }
});
const projectsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: ""
  },
  caption: {
    type: String,
    required: true,
    default: ""
  },
  imageUrl: {
    type: String,
    required: true,
    default: ""
  }
});
const servicesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: ""
  },
  content: {
    type: String,
    required: true,
    default: ""
  },
  imageUrl: {
    type: String,
    required: true,
    default: ""
  }
});
const aboutUsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  pdfUrl: {
    type: String,
    required: true
  }
});
const mainModelSchema = mongoose.Schema({
  bannerImageUrl: {
    type: String,
    required: true
  },
  aboutUs: aboutUsSchema,
  services: [servicesSchema],
  projects: [projectsSchema],
  contact: contactSchema
});
module.exports = mongoose.model("main-model", mainModelSchema);
