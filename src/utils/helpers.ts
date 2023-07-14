import { type UnitTypes } from '@/utils/types'
import { units } from './types'

// Used to check if the file type is allowed
export const fileTypeGuard = (allowedFileTypes: string[], fileType:string | null):boolean => {  
  if (fileType === null) return false // no file type
  if (allowedFileTypes.length === 0) return true // every file type is allowed
  return !!allowedFileTypes.includes(fileType) // check if file type is in the array of allowed file types
}
// Used to check if the file size is allowed
export const fileSizeGuard = (maxFileSize: number, sizeUnit: UnitTypes, fileSize: number | undefined):boolean => {
  const maxFileSizeInBytes = calculateBytesFromNumberAndUnits(maxFileSize, sizeUnit)
  return fileSize ? fileSize <= maxFileSizeInBytes : false
} // true / false

// Used to show file size in a human readable format
export const shortenByteAndAddUnit = (size: number | undefined):string => {
  let unitIndex = 0, fileSize = size || 0

  
  while (fileSize >= 1024 && ++unitIndex) fileSize = fileSize / 1024 
  return (fileSize.toFixed(fileSize >= 10 || unitIndex < 1 ? 0 : 1) + ' ' + units[unitIndex])
} // 10 MB or 1.2 KB

// might be a problem if decimal numbers are used in unitValue — ref: https://0.30000000000000004.com/
export const calculateBytesFromNumberAndUnits = (unitValue: number, unit: UnitTypes):number => {
  const index = units.indexOf(unit)
  if(index === 0) return unitValue
  
  const multiplyer = [...Array(index).keys()].reduce((acc, curr) => acc * 1024, 1) 
  return unitValue * multiplyer
} // 1048576 bytes in 1 MB