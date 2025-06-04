import service from "@/backend/services/EmailRelayService";
import { ContactFormFields } from "@/shared/models/ContactFormFields";
import { NextFunction, Request, Response } from "express";
import { Observable, of } from "rxjs";

const controller = {
  emailRelay: (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const form: Observable<ContactFormFields> = of(request.body)
    service.emailRelay(form)
      .subscribe({
        next: () => response.status(200).json({}),
        error: (error) => next(error)
      });
  }
};

export default controller;
