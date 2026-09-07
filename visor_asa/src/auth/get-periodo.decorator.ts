import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Extrae el periodo activo desde la cabecera 'x-periodo'
export const GetPeriodo = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): string => {
        const request = ctx.switchToHttp().getRequest();
        return request.headers['x-periodo'] || '';
    },
);

// Extrae el tipo de cambio desde la cabecera 'x-tipo-cambio'
export const GetTipoCambio = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): number => {
        const request = ctx.switchToHttp().getRequest();
        const tc = request.headers['x-tipo-cambio'];
        return tc ? parseFloat(tc) : 0;
    },
);