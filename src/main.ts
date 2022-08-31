
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { HttpExceptionFilter } from 'src/presentation/filters/httpException.filter'
import { AppModule } from './app.module'

//using a fixed value instead of .env to ease the correction process
const port = 3003

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )
  app.useGlobalFilters(new HttpExceptionFilter())
  
  await app.listen(port)
}

bootstrap().then(() => {
  console.log(`server running at port ${port}`)
})
