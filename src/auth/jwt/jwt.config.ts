import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

export const getJwtConfig = async (
	configService: ConfigService
): Promise<JwtModuleOptions> => ({
	secret: configService.get(`${process.env.JWT_SECRET}`),
	signOptions: { expiresIn: '60s' },
})
