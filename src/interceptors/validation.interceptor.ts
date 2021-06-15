/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import {Interceptor} from '@loopback/core';
import {RestBindings} from '@loopback/rest';
import {plainToClass} from 'class-transformer';
import {validateDTO} from '../dtos';

const validation = (DTOClass: any): Interceptor => {
  return async (invocationCtx, next) => {
    const httpReq = await invocationCtx.get(RestBindings.Http.REQUEST, {
      optional: true,
    });
    const httpRes = await invocationCtx.get(RestBindings.Http.RESPONSE, {
      optional: true,
    });
    if (httpReq) {
      console.log('Endpoint being called:', httpReq);
    }
    console.error('DTOClass', DTOClass);
    // before
    console.log('log: before-', invocationCtx.args[0]);
    const dto = plainToClass(DTOClass, invocationCtx.args[0]);
    const {errors, valid} = await validateDTO(dto, 'category', {});
    if (!valid) {
      console.error(errors);
      httpRes?.status(422).send({
        message: 'Validation Failed',
        errors,
      });
      return httpRes;
    }

    // if (invocationCtx.methodName == 'create')
    //     Object.assign(order, invocationCtx.args[0]);
    // else if (invocationCtx.methodName == 'updateById')
    //     Object.assign(order, invocationCtx.args[1]);

    // if (order.orderNum.length !== 6) {
    //     throw new HttpErrors.InternalServerError('Invalid order number');
    // }

    const result = await next();

    // after
    return result;
  };
};

export {validation};
