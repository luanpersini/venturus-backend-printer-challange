import { EquipmentModel } from '@modules/equipments/infra/models/equipment.model'
import { Sequelize } from 'sequelize-typescript'

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize('sqlite::memory:')
      sequelize.addModels([EquipmentModel])
      await sequelize.sync()
      return sequelize
    }
  }
]
