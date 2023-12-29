import { JwtModuleOptions } from '@nestjs/jwt'

export const getJwtConfig = async (): Promise<JwtModuleOptions> => ({
	secret: `${process.env.JWT_SECRET}`,
	signOptions: { expiresIn: '60s' },
})
