import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

const jwtModuleOptions = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => ({
  secret: await configService.get('JWT_AUTH_SECRET'),
  signOptions: {
    expiresIn: '2d',
  },
});

export const options = (): JwtModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) =>
    await jwtModuleOptions(configService),
});
