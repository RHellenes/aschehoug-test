
import {describe, it, expect, vi} from 'vitest'
import * as helper from '../helpers';

describe('fileTypeGuard', () => {
  it('should return false if fileType is null', () => {
    expect(helper.fileTypeGuard([], null)).toBe(false);
  });

  it('should return true if allowedFileTypes is empty', () => {
    expect(helper.fileTypeGuard([], 'image/jpeg')).toBe(true);
  });

  it('should return true if fileType is in allowedFileTypes', () => {
    expect(helper.fileTypeGuard(['image/jpeg'], 'image/jpeg')).toBe(true);
  });

  it('should return false if fileType is not in allowedFileTypes', () => {
    expect(helper.fileTypeGuard(['image/jpeg'], 'image/png')).toBe(false);
  });
})

vi.mock('../types', () => {
  return {
    units: ['bytes', 'KB', 'MB', 'GB'],
  }
})

describe('calculateBytesFromNumberAndUnits', () => {
  it('should return the same number if unit is bytes', () => {
    expect(helper.calculateBytesFromNumberAndUnits(100, 'bytes')).toBe(100);
  });

  it('should return the number multiplied by 1024 if unit is KB', () => {
    expect(helper.calculateBytesFromNumberAndUnits(100, 'KB')).toBe(1024 * 100);
  });

  it('should return the number multiplied by 1024^2 if unit is MB', () => {
    expect(helper.calculateBytesFromNumberAndUnits(10, 'MB')).toBe(1024 * 1024 * 10);
  });

  it('should return the number multiplied by 1024^3 if unit is GB', () => {
    expect(helper.calculateBytesFromNumberAndUnits(1, 'GB')).toBe(1024 * 1024 * 1024);
  });
})

describe('fileSizeGuard', () => {
  it('should return false if fileSize is undefined', () => {
    expect(helper.fileSizeGuard(100, 'bytes', undefined)).toBe(false);
  });

  it('should return false if fileSize is greater than maxFileSize', () => {
    expect(helper.fileSizeGuard(1, 'KB', 1025)).toBe(false);
  });
  // seems funky to me that this is false
  it('should return true if fileSize is less than maxFileSize', () => {
    expect(helper.fileSizeGuard(1, 'GB', 1024 * 1024 * 1024)).toBe(true);
  });

  it('should return true if fileSize is equal to maxFileSize', () => {
    expect(helper.fileSizeGuard(2.2, 'KB', 1024 * 2.2)).toBe(true);
  });
})

describe('shortenByteAndAddUnit', () => {
  it('should return 0 bytes if size is undefined', () => {
    expect(helper.shortenByteAndAddUnit(undefined)).toBe('0 bytes');
  })
  it('should return the size in bytes if size is less than 1024', () => {
    expect(helper.shortenByteAndAddUnit(100)).toBe('100 bytes');
  })
  it('should return the size in KB if size is greater than 1024', () => {
    expect(helper.shortenByteAndAddUnit(1024 * 2.2)).toBe('2.2 KB');
  })
  it('should return the size in MB if size is greater than 1024^2', () => {
    expect(helper.shortenByteAndAddUnit(1024 * 1024 * 2.2)).toBe('2.2 MB');
  })
  it('should return the size in GB if size is greater than 1024^3', () => {
    expect(helper.shortenByteAndAddUnit(1024 * 1024 * 1024 * 2.2)).toBe('2.2 GB');
  })
})