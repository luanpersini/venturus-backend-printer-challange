import { DatabaseModule } from '@infrastructure/database/database.module'
import { EquipmentModule } from '@modules/equipments/equipments.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [EquipmentModule, DatabaseModule],
  controllers: [],
  providers: []
})
export class AppModule {}
