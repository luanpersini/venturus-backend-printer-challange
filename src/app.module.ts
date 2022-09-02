import { DatabaseModule } from '@infrastructure/database/database.module'
import { EquipmentModule } from '@modules/equipments/equipments.module'
import { Module } from '@nestjs/common'
import { PresentationModule } from '@presentation/presentation.module'

@Module({
  imports: [EquipmentModule, DatabaseModule, PresentationModule],
  controllers: [],
  providers: []
})
export class AppModule {}
