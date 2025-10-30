import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CookieGetter = createParamDecorator(
    (key: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return key ? request.cookies?.[key] : request.cookies;
    },
);