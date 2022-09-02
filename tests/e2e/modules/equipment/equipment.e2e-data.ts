//mock data and test factories
const dtoParams = {}

export const makeDtoParams = (dto) => {
  dtoParams[''] = dto
  return dtoParams
}

export const makeEquipmentDtoParams = (params?: any) => ({
  model: [params.required, 'IsString', 'IsNotEmpty', 'MinLength.2', 'MaxLength.100'],
  category: [params.required, 'IsString','IsNotEmpty'],
  ppm: ['IsOptional', 'IsInt', 'Min.0', 'Max.999999'],
  wifi: ['IsOptional', 'IsBoolean'],
  consumption: ['IsOptional', 'IsNumber', 'Min.0', 'Max.999999']
})

export const equipmentDtoParams = makeEquipmentDtoParams({required: 'Required'})

export const equipmentUpdateDtoParams = makeEquipmentDtoParams({required: 'IsOptional'})


export const makeEquipmentDto = (params?: any) => ({ 
  model: params?.model || "Model PTW",
  category: "toner",
  ppm: 33355, 
  wifi: true,   
  consumption: 16.7
})