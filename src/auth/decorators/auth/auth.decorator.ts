import { applyDecorators, UseGuards } from '@nestjs/common';
import { GqlSessionGuard } from 'src/guard/gql-session/gql-session.guard';


export function Auth() {
  return applyDecorators(UseGuards(GqlSessionGuard));
}