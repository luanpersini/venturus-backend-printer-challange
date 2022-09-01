import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
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

  const options = new DocumentBuilder().setTitle('equipments-api').setDescription('Printer Equipments').setVersion('1.0.0').build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  await app.listen(port)
}

bootstrap().then(() => {
  console.log(`server running at port ${port}`)
})
