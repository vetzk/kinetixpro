import { Request, Response, NextFunction } from "express";

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  //The asyncHandler function takes a single argument fn, which is a route handler function that is asynchronous (i.e., it returns a Promise).
  // This pattern, where one function returns another, is called a higher-order function.
  // The purpose of asyncHandler is to take this asynchronous fn and wrap it with additional functionality.
  (req: Request, res: Response, next: NextFunction) => {
    //The asyncHandler returns a new function that takes req, res, and next as arguments. This inner function is what Express will actually use as middleware.
    Promise.resolve(fn(req, res, next)).catch(next);
    // Inside this inner function, asyncHandler calls fn (the original async handler function) with req, res, and next as arguments.
    // By wrapping fn in Promise.resolve(...).catch(next), it ensures that any error thrown by fn (whether by a throw statement or by an unhandled rejection in a Promise) will be caught.
    // If an error occurs, .catch(next) sends the error to the next function, which is Express's built-in way to pass errors to error-handling middleware.
  };
