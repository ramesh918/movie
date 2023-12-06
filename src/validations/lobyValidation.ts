import Joi from 'joi';

export const lobbyValidationSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'Title is required',
    'string.empty': 'Title cannot be empty',
  }),
  genre: Joi.string().required().messages({
    'any.required': 'Genre is required',
    'string.empty': 'Genre cannot be empty',
  }),
  rating: Joi.number().required().messages({
    'any.required': 'Rating is required',
    'number.base': 'Rating must be a number',
    'number.empty': 'Rating cannot be empty',
  }),
  streamingLink: Joi.string().uri().required().messages({
    'any.required': 'Streaming link is required',
    'string.uri': 'Streaming link must be a valid URL',
    'string.empty': 'Streaming link cannot be empty',
  }),
});
