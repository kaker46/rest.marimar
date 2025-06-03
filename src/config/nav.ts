
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  iconName: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
}

export interface NavConfig {
  sidebarNav: NavItem[];
}

export const navConfig: NavConfig = {
  sidebarNav: [
    {
      title: 'Panel de Control',
      href: '/dashboard',
      iconName: 'Home',
    },
    {
      title: 'Menú de la Semana',
      href: '/menu',
      iconName: 'UtensilsCrossed',
    },
    {
      title: 'Eventos',
      href: '/events',
      iconName: 'CalendarDays',
    },
    {
      title: 'Reservas', // Cambiado de 'Reservaciones'
      href: '/reservations',
      iconName: 'CalendarClock',
    },
    {
      title: 'Personal',
      href: '/staff',
      iconName: 'UsersRound',
    },
    {
      title: 'Organización Interna',
      href: '/internal-organization',
      iconName: 'Workflow',
    },
    {
      title: 'Configuración',
      href: '/settings',
      iconName: 'Settings',
    },
  ],
};
