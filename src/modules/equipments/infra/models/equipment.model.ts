import { DataTypes } from 'sequelize'
import { AllowNull, Column, Length, Model, Table } from 'sequelize-typescript'


@Table({
  tableName: 'Equipment',
  freezeTableName: true
})
export class EquipmentModel extends Model {
  @Column({
    primaryKey: true,
    type: DataTypes.UUID,
    autoIncrement: false
  })
  id: string

  @Length({ min: 3, max: 100 })
  @AllowNull(false)
  @Column
  model: string

  @Length({ min: 3, max: 100 })  
  @AllowNull(false)
  @Column
  category: string

  @Column({
    type: DataTypes.BOOLEAN,
    allowNull: true    
  })
  wifi: boolean

  @Column({
    type: DataTypes.INTEGER,
    allowNull: true
  })
  ppm: number

  @Column({
    type: DataTypes.REAL,
    allowNull: true
  })
  consumption: number
}
