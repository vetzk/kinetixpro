import { Router } from "express";
import { FormController } from "../controllers/form.controller";
import { submitData } from "../middlewares/validator/submitData";
import { asyncHandler } from "../utils/asyncHandler";
import { handleValidationErrors } from "../middlewares/validator/validationError";
import { body } from "express-validator";

export class FormRouter {
  private router: Router;
  private formController: FormController;

  constructor() {
    this.router = Router();
    this.formController = new FormController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/submitdata",
      [...submitData, asyncHandler(handleValidationErrors(submitData))],
      asyncHandler(this.formController.submitData),
    );

    this.router.get("/readdata", asyncHandler(this.formController.readData));
  }

  getRouter(): Router {
    return this.router;
  }
}
