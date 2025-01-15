import {
  PersonIcon,
  SettingsIcon,
  FaqIcon,
} from '@/features/@shared/components/icon';

type Routes = {
  name: string;
  link: string;
  icon: React.FC;
  collapsed?: boolean;
  child: Routes[];
};

const routes: Routes[] = [
  {
    name: 'Reseller',
    link: '/reseller',
    icon: PersonIcon,
    child: [],
  },
  {
    name: 'Settings',
    link: '/settings',
    icon: SettingsIcon,
    child: [],
  },
  {
    name: 'FAQ',
    link: '/faq',
    icon: FaqIcon,
    child: [],
  },
];

export { routes, type Routes };
