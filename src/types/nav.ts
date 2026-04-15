import type { Component } from 'vue';

export interface NavItem {
  text: string;
  icon: Component;
  href: string;
  active?: boolean;
}
