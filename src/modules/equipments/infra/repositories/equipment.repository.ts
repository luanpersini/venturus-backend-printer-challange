import { Equipment } from '@modules/equipments/domain/entities/Equipment'
import { IEquipmentRepository } from '@modules/equipments/domain/interfaces/equipment-repository'
import { Injectable } from '@nestjs/common'
import { EquipmentModel } from '../models/equipment.model'

@Injectable()
export class EquipmentRepository implements IEquipmentRepository {
  public async createEquipment(equipment: Equipment): Promise<Equipment> {
    const result = await EquipmentModel.create({ ...equipment })
    return new Equipment(result)
  }

  public async getAllEquipments(): Promise<Equipment[]> {
    const result = await EquipmentModel.findAll({})

    return result.map((equip) => {
      return new Equipment(equip)
    })
  }

  public async equipmentExists(equipment: Equipment): Promise<boolean> {
    const { model, category } = equipment
    return (await EquipmentModel.count({ where: { model, category } })) > 0
  }

  public async updateEquipment(equipment: Equipment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  public async deleteEquipmentById(id: string): Promise<number> {
    throw new Error('Method not implemented.')
  }

  /*
 
  async updateUser(user: User): Promise<void> {
    //TODO throw exception if no data is affected
    await UserModel.update(
      {
        name: user.name,
        email: user.email,
        passwordAt: user.passwordAt,
        updatedAt: new Date(),
        isVerified: user.isVerified,
        verifiedAt: user.verifiedAt
      },
      { where: { id: user.id } }
    )
  }

  public async getUser(id: string): Promise<User> {
    const user = await UserModel.findOne({ where: { id } })
    if (user) {
      return User.Factory.New(user)
    }
    return null
  } 

  public async emailExists(email: string): Promise<boolean> {
    return (await UserModel.count({ where: { email } })) > 0
  }

  public async deleteUserById(id: string): Promise<number> {
    await UserInvitationModel.destroy({
      where: {
        [Op.or]: {
          inviterUserId: {
            [Op.eq]: id
          },
          inviteeUserId: {
            [Op.eq]: id
          }
        }
      }
    })

    await UserAssociationModel.destroy({ where: { userId: id } })

    //TODO throw exception if no data is affected
    return await UserModel.destroy({ where: { id } })
  }
  */
}
