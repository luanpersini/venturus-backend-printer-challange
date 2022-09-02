import { EquipmentModel } from '@modules/equipments/infra/equipment.model'

export const clearAllDatabases = async () => {  
    await EquipmentModel.destroy({
      where: {},
      truncate: true,
      cascade: true  
  })
}

