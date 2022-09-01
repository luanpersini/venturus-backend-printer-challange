
import { v4 as uuidv4 } from 'uuid'

type EquipmentParams = {
  id?: string,
  model: string,
  category: string,
  ppm: number,
  wifi: boolean,
  consumption: number
}

export class Equipment {
  readonly id: string = null
  readonly model: string
  readonly category: string
  readonly ppm: number
  readonly wifi: boolean
  readonly consumption: number

  constructor(equip: EquipmentParams) {
    this.id = this.createOrReturnId(equip.id)
    this.model = equip.model
    this.category = equip.category
    this.ppm = equip.ppm
    this.wifi = equip.wifi
    this.consumption = equip.consumption
  }

  private createOrReturnId(id: string): string {
    return id ? id : uuidv4()
  }

}
