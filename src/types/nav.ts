import type { Component } from 'vue';
import type { RouteRecordName } from 'vue-router';

export interface NavItem {
  name: RouteRecordName;
  icon: Component;
}
