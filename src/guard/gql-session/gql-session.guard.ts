import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class GqlSessionGuard implements CanActivate {
  
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    console.log(request);
    if (!request.isAuthenticated()) {
      throw new UnauthorizedException('You must be logged in');
    }
    
    return true;
  }
}
