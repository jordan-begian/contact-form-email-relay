import { logger } from "@/shared/utils/LoggerConfig";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

type RelayAPIError = Error & {
  status: number;
  name: string;
};

const buildRelayAPIError = (
  error: Error,
  status: number
): RelayAPIError => ({
  name: "RelayAPIError",
  status: status,
  message: error.message,
  stack: error.stack,
});

/* eslint-disable @typescript-eslint/no-unused-vars */
const globalErrorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const isRelayAPIError: boolean = error.name === 'RelayAPIError';
  const status = isRelayAPIError ?
    (error as RelayAPIError).status : StatusCodes.INTERNAL_SERVER_ERROR;
  logger.error({
    message: error.message,
    error: {
      status: status,
      stack: error.stack,
    },
    request: {
      method: request.method,
      path: request.path,
      headers: request.headers,
      body: request.body,
    }
  });

  response
    .status(status)
    .json({ message: "Ope! Something went wrong..." });
};

export { buildRelayAPIError, globalErrorHandler };
