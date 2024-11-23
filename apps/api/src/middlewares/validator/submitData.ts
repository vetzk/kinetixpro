import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const submitData = [
  body("name").notEmpty().withMessage("Please provide your name"),
  body("email")
    .notEmpty()
    .withMessage("Please provide your email")
    .isEmail()
    .withMessage("Email format is wrong"),
  body("address").notEmpty().withMessage("Please provide your address"),
  body("phoneNumber").notEmpty().withMessage("Please provide your number"),
  body("hobby").notEmpty().withMessage("Please provide your hobby"),
  body("gender").notEmpty().withMessage("Please provide your gender"),
];
