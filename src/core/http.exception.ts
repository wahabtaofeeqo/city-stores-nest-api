import {
    ExceptionFilter,
    HttpException,
    HttpStatus,
    ArgumentsHost,
    Catch,
    Logger,
    BadRequestException,
  } from '@nestjs/common';
  import { ErrResponse } from 'src/interfaces/response.interface';
  
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      const status = exception.getStatus
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const responseBody: ErrResponse = {
        status: false,
        message: exception.message || 'Internal server error',
        error: null,
      };
  
      /**
       * Validation Error
       *
       */
      if (exception instanceof BadRequestException) {
        const body: any = exception.getResponse();
        const isValidation = Array.isArray(body?.message);
        responseBody.message = isValidation ? 'Validation Error' : body?.message;
        responseBody.error = isValidation ? body?.message : null;
      }
  
      // Log
      Logger.error(
        `${request.method} ${request.url}`,
        exception.stack,
        'HttpException',
      );
  
      //
      response.status(status).json(responseBody);
    }
  }
  