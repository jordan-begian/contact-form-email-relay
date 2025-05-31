import { Request, Response, NextFunction } from "express";

const controller = {
  emailRelay: (request: Request, response: Response, next: NextFunction) => {
    // TODO: Extract request body, and call to email relay service
    return;
  }
};

export default controller;
