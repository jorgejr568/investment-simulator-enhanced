import { meta } from '../../cfg'

export const MetaTitle = (title?: string) =>
  `${title && `${title} - `}${meta.titleSuffix}`
