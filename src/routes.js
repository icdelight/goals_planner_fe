import { DEFAULT_PATHS } from 'config.js';

import HomePage from 'views/default/Home';
// import HorizontalPage from 'views/Horizontal';
// import VerticalPage from 'views/Vertical';
// import TreePage from 'views/goals/TreeAdmin';
import TreeAdminFun from 'views/goals/TreeAdminFun';
// import TreeView from 'views/goals/TreeView';
import TreeViewDabeng from 'views/goals/TreeViewDabeng';
import AddChild from 'views/goals/addChildTree';
import UpdNode from 'views/goals/UpdNode';
import UserSetting from 'views/user/UserSetting';
import UpdUser from 'views/user/EditUser';
import AreaSetting from 'views/area/AreaSetting';
import AddArea from 'views/area/AddArea';
import EditArea from 'views/area/EditArea';
import ClusterSettingPage from 'views/cluster/ClusterSetting';
import AddCluster from 'views/cluster/AddCluster';
import EditCluster from 'views/cluster/EditCluster';
import { USER_ROLE } from 'constants.js';

const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const routesAndMenuItems = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      exact: true,
      redirect: true,
      to: `${appRoot}/home`,
      roles: [USER_ROLE.SuperAdmin,USER_ROLE.Admin,USER_ROLE.Editor,USER_ROLE.Viewer],
    },
    {
      path: `${appRoot}/home`,
      component: HomePage,
      label: 'Home',
      icon: 'home',
      roles: [USER_ROLE.SuperAdmin,USER_ROLE.Admin,USER_ROLE.Editor,USER_ROLE.Viewer],
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
        roles: [USER_ROLE.SuperAdmin,USER_ROLE.Admin,USER_ROLE.Editor],
        subs: [
        { 
          path: `${appRoot}/addchild`, 
          label: 'Tree Admin F Child', 
          icon: 'grid-2',
          component: AddChild, 
          roles: [USER_ROLE.SuperAdmin,USER_ROLE.Admin,USER_ROLE.Editor], 
          hideInMenu: true,
        },
        { 
          path: `${appRoot}/updnode`, 
          label: 'Update Node', 
          icon: 'grid-2',
          component: UpdNode, 
          roles: [USER_ROLE.SuperAdmin,USER_ROLE.Admin,USER_ROLE.Editor], 
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
        roles: [USER_ROLE.SuperAdmin,USER_ROLE.Admin,USER_ROLE.Editor,USER_ROLE.Viewer],
      }]
    },
    {
      path: `${appRoot}/setting`,
      label: 'Setting',
      icon: 'gear',
      roles: [USER_ROLE.SuperAdmin,USER_ROLE.Admin],
      subs: [
        {
          path: `${appRoot}/usersetting`,
          label: 'User Setting',
          icon: 'user',
          component: UserSetting,
          roles: [USER_ROLE.SuperAdmin,USER_ROLE.Admin],
          subs : [
            { 
              path: `${appRoot}/upduser`, 
              label: 'Update User', 
              icon: 'user',
              component: UpdUser, 
              roles: [USER_ROLE.SuperAdmin,USER_ROLE.Admin], 
              hideInMenu: true,
            }
          ]
        },
        // {
        //   path: `${appRoot}/rolesetting`,
        //   label: 'Role Setting',
        //   icon: 'menu-dashed',
        //   component: UserSetting,
        //   roles: [USER_ROLE.SuperAdmin,USER_ROLE.Admin],
        // },
        {
          path: `${appRoot}/areasetting`,
          label: 'Area Setting',
          icon: 'flag',
          component: AreaSetting,
          roles: [USER_ROLE.SuperAdmin,USER_ROLE.Admin],
          subs : [
            { 
              path: `${appRoot}/addarea`, 
              label: 'Add Area', 
              icon: 'flag',
              component: AddArea, 
              roles: [USER_ROLE.SuperAdmin,USER_ROLE.Admin], 
              hideInMenu: true,
            },
            { 
              path: `${appRoot}/editarea`, 
              label: 'Edit Area', 
              icon: 'flag',
              component: EditArea, 
              roles: [USER_ROLE.SuperAdmin,USER_ROLE.Admin], 
              hideInMenu: true,
            }
          ]
        },
        {
          path: `${appRoot}/clustersetting`,
          label: 'Cluster Setting',
          icon: 'bookmark',
          component: ClusterSettingPage,
          roles: [USER_ROLE.SuperAdmin,USER_ROLE.Admin],
          subs : [
            { 
              path: `${appRoot}/addcluster`, 
              label: 'Add Cluster', 
              icon: 'flag',
              component: AddCluster, 
              roles: [USER_ROLE.SuperAdmin,USER_ROLE.Admin], 
              hideInMenu: true,
            },
            { 
              path: `${appRoot}/editcluster`, 
              label: 'Edit Cluster', 
              icon: 'flag',
              component: EditCluster, 
              roles: [USER_ROLE.SuperAdmin,USER_ROLE.Admin], 
              hideInMenu: true,
            }
          ]
        },
      ]
    },
  ],
  sidebarItems: [],
};
export default routesAndMenuItems;
