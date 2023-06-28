import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import PermContactCalendarRoundedIcon from '@mui/icons-material/PermContactCalendarRounded';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';

export const items = {
  admin:  [
  {
    title: 'Dashboard',
    path: '/dashboard/admin',
    icon: (
      <SvgIcon fontSize="small">
        <SpaceDashboardRoundedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Analytics',
    path: '/analytics',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Employees',
    path: '/employees',
    icon: (
      <SvgIcon fontSize="small">
        <PermContactCalendarRoundedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Gym',
    path: '/Gym',
    icon: (
      <SvgIcon fontSize="small">
        <FitnessCenterRoundedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Members',
    path: '/customers',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  }],

  employee:  [
    {
      title: 'Overview',
      path: '/dashboard/admin',
      icon: (
        <SvgIcon fontSize="small">
          <ChartBarIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Employees',
      path: '/employees',
      icon: (
        <SvgIcon fontSize="small">
          <UsersIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Member',
      path: '/customers',
      icon: (
        <SvgIcon fontSize="small">
          <ShoppingBagIcon />
        </SvgIcon>
      )
    }],

    user:  [
      {
        title: 'Overview',
        path: '/dashboard/admin',
        icon: (
          <SvgIcon fontSize="small">
            <ChartBarIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Employees',
        path: '/employees',
        icon: (
          <SvgIcon fontSize="small">
            <UsersIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Customers',
        path: '/customers',
        icon: (
          <SvgIcon fontSize="small">
            <ShoppingBagIcon />
          </SvgIcon>
        )
      }],
};
