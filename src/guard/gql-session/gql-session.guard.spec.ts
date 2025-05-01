import { GqlSessionGuard } from './gql-session.guard';

describe('GqlSessionGuard', () => {
  it('should be defined', () => {
    expect(new GqlSessionGuard()).toBeDefined();
  });
});
