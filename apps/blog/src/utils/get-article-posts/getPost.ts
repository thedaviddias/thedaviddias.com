import fs from 'fs'
import path from 'path'

import { CONTENT_DIR } from '@/constants/paths'

/**
 *
 * @param slug
 * @param dataType
 * @returns
 */
export const getPost = (slug: string, dataType: string) =>
  fs.readFileSync(path.join(CONTENT_DIR, dataType, `${slug}.mdx`), 'utf8')
