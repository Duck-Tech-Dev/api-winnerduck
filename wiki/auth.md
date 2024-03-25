Important things to keep in my mind while working in the Auth Module.

**Constants:** Constant values in the `auth/constants.ts` are always manually updated. If `jwtConstants.expiresIn` is changed, then the same value should be updated in the `cookieOptions.maxAge`. 