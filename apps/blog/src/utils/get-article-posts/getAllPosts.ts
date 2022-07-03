import fs from 'fs'
import path from 'path'

import { CONTENT_DIR } from '@/constants/paths'
/**
 * Gets the list of content files
 *
 * @param dataType - Type of data to be returned
 * @returns - Array of files with .mdx
 */
export const getAllPosts = (dataType: string): string[] => {
  return fs.readdirSync(path.join(CONTENT_DIR, dataType), 'utf-8')
}
