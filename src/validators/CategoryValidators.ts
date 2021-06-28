import { body, param, validationResult } from 'express-validator'
import { RequestHandler } from 'express'
const statesAllowed = ['A', 'D', 'E']
const typesAllowed = ['E', 'R']

export const indexRules = () => {
  return [
    param('userid').exists().isNumeric()
  ]
}

export const showRules = () => {
  return [
    param('userid').exists().isNumeric(),
    param('idCategory').exists().isNumeric()
  ]
}

export const createRules = () => {
  return [
    body('user_id').exists().isNumeric(),
    body('name').exists().isLength({ max: 100 }),
    body('type').exists().isIn(typesAllowed),
    body('state').exists().isIn(statesAllowed)
  ]
}

export const updateRules = () => {
  return [
    param('userid').exists().isNumeric(),
    param('idCategory').exists().isNumeric(),
    body('name').exists().isLength({ max: 100 }),
    body('type').exists().isIn(typesAllowed),
    body('state').exists().isIn(statesAllowed)
  ]
}

export const deleteRules = () => {
  return [
    param('userid').exists().isNumeric(),
    param('idCategory').exists().isNumeric()
  ]
}

export const validate: RequestHandler = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors: any = []
  errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors
  })
}
