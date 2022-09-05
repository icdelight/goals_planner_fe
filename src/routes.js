import { DEFAULT_PATHS } from 'config.js';

import HomePage from 'views/default/Home';
import HorizontalPage from 'views/Horizontal';
import VerticalPage from 'views/Vertical';
import TreePage from 'views/TreeAdmin';
import TreeAdminFun from 'views/TreeAdminFun';
import TreeView from 'views/TreeView';
import TreeViewDabeng from 'views/TreeViewDabeng';
import AddChild from 'views/addChildTree';
import UpdNode from 'views/UpdNode';
import UserSetting from 'views/user/UserSetting';
import UpdUser from 'views/user/EditUser';
import { USER_ROLE } from 'constants.js';

const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const routesAndMenuItems = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      exact: true,
      redirect: true,
      to: `${appRoot}/home`,
      roles: [USER_ROLE.Admin,USER_ROLE.Editor],
    },
    {
      path: `${appRoot}/home`,
      component: HomePage,
      label: 'Home',
      icon: 'home',
      roles: [USER_ROLE.Admin,USER_ROLE.Editor],
    },
    // {
    //   path: `${appRoot}/horizontal`,
    //   component: HorizontalPage,
    //   label: 'menu.horizontal',
    //   icon: 'grid-2',
    //   roles: [USER_ROLE.Admin],
    // },
    // {
    //   path: `${appRoot}/vertical`,
    //   label: 'menu.vertical',
    //   icon: 'grid-3',
    //   component: VerticalPage,
    //   roles: [USER_ROLE.Admin],
    // },
    {
      path: `${appRoot}/tree`,
      label: 'Tree',
      icon: 'diagram-1',
      subs:[
      {
        path: `${appRoot}/treeadmf`,
        label: 'Tree Admin',
        icon: 'settings-1',
        component: TreeAdminFun,
        roles: [USER_ROLE.Admin],
        subs: [
        { 
          path: `${appRoot}/addchild`, 
          label: 'Tree Admin F Child', 
          icon: 'grid-2',
          component: AddChild, 
          roles: [USER_ROLE.Admin], 
          hideInMenu: true,
        },
        { 
          path: `${appRoot}/updnode`, 
          label: 'Update Node', 
          icon: 'grid-2',
          component: UpdNode, 
          roles: [USER_ROLE.Admin], 
          hideInMenu: true,
        }
        ],
      },
      // {
      //   path: `${appRoot}/treeview`,
      //   label: 'Tree View',
      //   icon: 'grid-2',
      //   component: TreeView,
      //   roles: [USER_ROLE.Admin,USER_ROLE.Editor],
      // },
      {
        path: `${appRoot}/treeviewd`,
        label: 'Tree View',
        icon: 'board-2',
        component: TreeViewDabeng,
        roles: [USER_ROLE.Admin,USER_ROLE.Editor],
      }]
    },
    {
      path: `${appRoot}/setting`,
      label: 'Setting',
      icon: 'gear',
      roles: [USER_ROLE.Admin],
      subs: [
        {
          path: `${appRoot}/usersetting`,
          label: 'User Setting',
          icon: 'user',
          component: UserSetting,
          roles: [USER_ROLE.Admin],
          subs : [
            { 
              path: `${appRoot}/upduser`, 
              label: 'Update User', 
              icon: 'user',
              component: UpdUser, 
              roles: [USER_ROLE.Admin], 
              hideInMenu: true,
            }
          ]
        },
        {
          path: `${appRoot}/rolesetting`,
          label: 'Role Setting',
          icon: 'menu-dashed',
          component: UserSetting,
          roles: [USER_ROLE.Admin],
        },
      ]
    },
  ],
  sidebarItems: [],
};
export default routesAndMenuItems;
