const joi = require("joi");

const bookCreateValidationScheme = joi
  .object({
    title: joi.string().required(),
    pageCount: joi.number(),
    publishedDate: joi.date(),
    thumbnailUrl: joi.string().uri(),
    shortDescription: joi.string(),
    longDescription: joi.string(),
    status: joi
      .string()
      .valid("PUBLISH", "IN PRINTERY", "WAITING FOR APPROVAL"),
    authors: joi.array().items(joi.string()),
  })
  .required();

const bookUpdateValidationScheme = joi.object({
  title: joi.string(),
  pageCount: joi.number(),
  publishedDate: joi.date(),
  thumbnailUrl: joi.string().uri(),
  shortDescription: joi.string(),
  longDescription: joi.string(),
  status: joi.string().valid("PUBLISH", "IN PRINTERY", "WAITING FOR APPROVAL"),
  authors: joi.array().items(joi.string()),
});

const idValidationScheme = joi.object({
  id: joi.string(),
});

const getBookListValidationScheme = joi.object({
  page: joi.number(),
  perPage: joi.number(),
  sort: joi.object({
    title: joi.string().valid("asc", "desc"),
    pageCount: joi.string().valid("asc", "desc"),
    publishedDate: joi.string().valid("asc", "desc"),
    thumbnailUrl: joi.string().valid("asc", "desc"),
    shortDescription: joi.string().valid("asc", "desc"),
    longDescription: joi.string().valid("asc", "desc"),
    status: joi.string().valid("asc", "desc"),
  }),
  where: bookUpdateValidationScheme,
});

module.exports = {
  bookCreateValidationScheme,
  bookUpdateValidationScheme,
  idValidationScheme,
  getBookListValidationScheme,
};
