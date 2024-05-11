import 'dotenv/config'
import { z } from 'zod'


const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333), // coerce converte qualquer dado em number, por exemplo se no .env estiver representado como string ele vai converter para number
})
const _env = envSchema.safeParse(process.env) // Esse safeParse vai validar esse process.env pra ver se ele tem essas mesma informações lá dentro

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.') // vai derrubar a aplicação em caso de algum erro.
}

export const env = _env.data