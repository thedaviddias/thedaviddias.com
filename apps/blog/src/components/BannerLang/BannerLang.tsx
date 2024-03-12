import { CustomLink } from '../CustomLink'
import FrFlag from '../../../public/images/svg/fr-flag.svg'

export const BannerLang = () => {
  return (
    <div className="flex items-center justify-center space-x-3 bg-slate-100 p-2 dark:bg-slate-800">
      <span>
        <FrFlag className="h-5 w-5 rounded-lg" alt="" aria-hidden />
      </span>
      <span>
        Ce blog existe aussi en langue française,{' '}
        <CustomLink href="/" locale="fr" className="underline">
          n&apos;hésite pas à le visiter.
        </CustomLink>
      </span>
    </div>
  )
}
