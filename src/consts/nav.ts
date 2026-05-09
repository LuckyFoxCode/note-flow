import { IconArchive, IconChart, IconHome, IconNotes, IconSettings } from '@/assets/icons';
import type { NavItem } from '@/types';

export const NAV_ITEM: NavItem[] = [
  { name: 'Home', icon: IconHome },
  { name: 'Categories', icon: IconNotes },
  { name: 'Statistics', icon: IconChart },
  { name: 'Archive', icon: IconArchive },
  { name: 'Settings', icon: IconSettings },
];
