import { IconHome, IconNotes, IconSettings } from '@/assets/icons';
import type { NavItem } from '@/types';

export const NAV_ITEM: NavItem[] = [
  { text: 'Home', icon: IconHome, href: '/', active: true },
  { text: 'Notes', icon: IconNotes, href: '/notes', active: false },
  { text: 'Settings', icon: IconSettings, href: '/settings', active: false },
];
