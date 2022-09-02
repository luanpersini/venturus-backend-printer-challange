import { Logger, Module } from '@nestjs/common'


const logger = {
  provide: 'ConsoleLogger',
  useClass: Logger
}

@Module({
  imports: [],
  controllers: [],
  providers: [logger],
  exports: [logger]
})
export class PresentationModule {}
