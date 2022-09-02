import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import helmet from 'helmet'
import { Server } from 'http'
import { AppModule } from 'src/app.module'
import { HttpExceptionFilter } from 'src/presentation/filters/httpException.filter'
import { clearAllDatabases } from './clear-databases'

let server: Server
let app: INestApplication

export const initServer = async (clearDb = true) => {
  const module = await Test.createTestingModule({imports: [AppModule]}).compile()
  app = module.createNestApplication()

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )  
  app.useGlobalFilters(new HttpExceptionFilter())
  app.use(helmet())

  server = app.getHttpServer()
  await app.init()
  if (clearDb) await clearAllDatabases()
}

export { server, app }

