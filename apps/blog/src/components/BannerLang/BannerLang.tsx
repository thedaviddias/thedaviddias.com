import { CustomLink } from '../CustomLink'
import FrFlag from '../../../public/images/svg/fr-flag.svg'

export const BannerLang = () => {
  return (
    <div className="flex justify-center items-center bg-slate-100 dark:bg-slate-800 p-2 space-x-3">
      <span>
        <FrFlag className="w-5 h-5 rounded-lg" alt="" aria-hidden />
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
