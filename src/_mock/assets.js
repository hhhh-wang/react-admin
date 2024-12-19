import { faker } from '@faker-js/faker';

import { BasicStatus, PermissionType } from '#/enum';

/**
 * Organization data mock
 */
export const ORG_LIST = [
    {
        id: '1',
        name: 'East China Branch',
        status: 'enable',
        desc: faker.lorem.words(),
        sortValue: 1,
        children: [
            { id: '1-1', name: 'R&D Department', status: 'disable', desc: '', sortValue: 1 },
            { id: '1-2', name: 'Marketing Department', status: 'enable', desc: '', sortValue: 2 },
            { id: '1-3', name: 'Finance Department', status: 'enable', desc: '', sortValue: 3 },
        ],
    },
    {
        id: '2',
        name: 'South China Branch',
        status: 'enable',
        desc: faker.lorem.words(),
        sortValue: 2,
        children: [
            { id: '2-1', name: 'R&D Department', status: 'disable', desc: '', sortValue: 1 },
            { id: '2-2', name: 'Marketing Department', status: 'enable', desc: '', sortValue: 2 },
            { id: '2-3', name: 'Finance Department', status: 'enable', desc: '', sortValue: 3 },
        ],
    },
    {
        id: '3',
        name: 'Northwest Branch',
        status: 'enable',
        desc: faker.lorem.words(),
        sortValue: 3,
        children: [
            { id: '3-1', name: 'R&D Department', status: 'disable', desc: '', sortValue: 1 },
            { id: '3-2', name: 'Marketing Department', status: 'enable', desc: '', sortValue: 2 },
            { id: '3-3', name: 'Finance Department', status: 'enable', desc: '', sortValue: 3 },
        ],
    },
];

/**
 * User permission mock
 */
const DASHBOARD_PERMISSION = {
    id: '9100714781927703',
    parentId: '',
    label: 'sys.menu.dashboard',
    name: 'Dashboard',
    icon: 'ic-analysis',
    resourceType: PermissionType.CATALOGUE,
    path: 'dashboard',
    sortValue: 1,
    children: [
        {
            id: '8426999229400979',
            parentId: '9100714781927703',
            label: 'sys.menu.workbench',
            name: 'Workbench',
            resourceType: PermissionType.MENU,
            path: 'workbench',
            component: '/dashboard/workbench/index.tsx',
        },
        {
            id: '9710971640510357',
            parentId: '9100714781927703',
            label: 'sys.menu.analysis',
            name: 'Analysis',
            resourceType: PermissionType.MENU,
            path: 'analysis',
            component: '/dashboard/analysis/index.tsx',
        },
    ],
};
const MANAGEMENT_PERMISSION = {
    id: '0901673425580518',
    parentId: '',
    label: 'sys.menu.management',
    name: 'Management',
    icon: 'ic-management',
    resourceType: PermissionType.CATALOGUE,
    path: 'management',
    sortValue: 2,
    children: [
        {
            id: '2781684678535711',
            parentId: '0901673425580518',
            label: 'sys.menu.user.index',
            name: 'User',
            resourceType: PermissionType.CATALOGUE,
            path: 'user',
            children: [
                {
                    id: '4754063958766648',
                    parentId: '2781684678535711',
                    label: 'sys.menu.user.profile',
                    name: 'Profile',
                    resourceType: PermissionType.MENU,
                    path: 'profile',
                    component: '/management/user/profile/index.tsx',
                },
                {
                    id: '2516598794787938',
                    parentId: '2781684678535711',
                    label: 'sys.menu.user.account',
                    name: 'Account',
                    resourceType: PermissionType.MENU,
                    path: 'account',
                    component: '/management/user/account/index.tsx',
                },
            ],
        },
        {
            id: '0249937641030250',
            parentId: '0901673425580518',
            label: 'sys.menu.system.index',
            name: 'System',
            resourceType: PermissionType.CATALOGUE,
            path: 'system',
            children: [
                {
                    id: '1985890042972842',
                    parentId: '0249937641030250',
                    label: 'sys.menu.system.organization',
                    name: 'Organization',
                    resourceType: PermissionType.MENU,
                    path: 'organization',
                    component: '/management/system/organization/index.tsx',
                },
                {
                    id: '4359580910369984',
                    parentId: '0249937641030250',
                    label: 'sys.menu.system.permission',
                    name: 'Permission',
                    resourceType: PermissionType.MENU,
                    path: 'permission',
                    component: '/management/system/permission/index.tsx',
                },
                {
                    id: '1689241785490759',
                    parentId: '0249937641030250',
                    label: 'sys.menu.system.role',
                    name: 'Role',
                    resourceType: PermissionType.MENU,
                    path: 'role',
                    component: '/management/system/role/index.tsx',
                },
                {
                    id: '0157880245365433',
                    parentId: '0249937641030250',
                    label: 'sys.menu.system.user',
                    name: 'User',
                    resourceType: PermissionType.MENU,
                    path: 'user',
                    component: '/management/system/user/index.tsx',
                },
            ],
        },
    ],
};
const COMPONENTS_PERMISSION = {
    id: '2271615060673773',
    parentId: '',
    label: 'sys.menu.components',
    name: 'Components',
    icon: 'solar:widget-5-bold-duotone',
    resourceType: PermissionType.CATALOGUE,
    path: 'components',
    sortValue: 3,
    children: [
        {
            id: '2478488238255411',
            parentId: '2271615060673773',
            label: 'sys.menu.icon',
            name: 'Icon',
            resourceType: PermissionType.MENU,
            path: 'icon',
            component: '/components/icon/index.tsx',
        },
        {
            id: '6755238352318767',
            parentId: '2271615060673773',
            label: 'sys.menu.animate',
            name: 'Animate',
            resourceType: PermissionType.MENU,
            path: 'animate',
            component: '/components/animate/index.tsx',
        },
        {
            id: '9992476513546805',
            parentId: '2271615060673773',
            label: 'sys.menu.scroll',
            name: 'Scroll',
            resourceType: PermissionType.MENU,
            path: 'scroll',
            component: '/components/scroll/index.tsx',
        },
        {
            id: '1755562695856395',
            parentId: '2271615060673773',
            label: 'sys.menu.markdown',
            name: 'Markdown',
            resourceType: PermissionType.MENU,
            path: 'markdown',
            component: '/components/markdown/index.tsx',
        },
        {
            id: '2122547769468069',
            parentId: '2271615060673773',
            label: 'sys.menu.editor',
            name: 'Editor',
            resourceType: PermissionType.MENU,
            path: 'editor',
            component: '/components/editor/index.tsx',
        },
        {
            id: '2501920741714350',
            parentId: '2271615060673773',
            label: 'sys.menu.i18n',
            name: 'Multi Language',
            resourceType: PermissionType.MENU,
            path: 'i18n',
            component: '/components/multi-language/index.tsx',
        },
        {
            id: '2013577074467956',
            parentId: '2271615060673773',
            label: 'sys.menu.upload',
            name: 'upload',
            resourceType: PermissionType.MENU,
            path: 'Upload',
            component: '/components/upload/index.tsx',
        },
        {
            id: '7749726274771764',
            parentId: '2271615060673773',
            label: 'sys.menu.chart',
            name: 'Chart',
            resourceType: PermissionType.MENU,
            path: 'chart',
            component: '/components/chart/index.tsx',
        },
    ],
};
const FUNCTIONS_PERMISSION = {
    id: '8132044808088488',
    parentId: '',
    label: 'sys.menu.functions',
    name: 'functions',
    icon: 'solar:plain-2-bold-duotone',
    resourceType: PermissionType.CATALOGUE,
    path: 'functions',
    sortValue: 4,
    children: [
        {
            id: '3667930780705750',
            parentId: '8132044808088488',
            label: 'sys.menu.clipboard',
            name: 'Clipboard',
            resourceType: PermissionType.MENU,
            path: 'clipboard',
            component: '/functions/clipboard/index.tsx',
        },
    ],
};
const MENU_LEVEL_PERMISSION = {
    id: '0194818428516575',
    parentId: '',
    label: 'sys.menu.menulevel.index',
    name: 'Menu Level',
    icon: 'ic-menulevel',
    resourceType: PermissionType.CATALOGUE,
    path: 'menu-level',
    sortValue: 5,
    children: [
        {
            id: '0144431332471389',
            parentId: '0194818428516575',
            label: 'sys.menu.menulevel.1a',
            name: 'Menu Level 1a',
            resourceType: PermissionType.MENU,
            path: 'menu-level-1a',
            component: '/menu-level/menu-level-1a/index.tsx',
        },
        {
            id: '7572529636800586',
            parentId: '0194818428516575',
            label: 'sys.menu.menulevel.1b.index',
            name: 'Menu Level 1b',
            resourceType: PermissionType.CATALOGUE,
            path: 'menu-level-1b',
            children: [
                {
                    id: '3653745576583237',
                    parentId: '7572529636800586',
                    label: 'sys.menu.menulevel.1b.2a',
                    name: 'Menu Level 2a',
                    resourceType: PermissionType.MENU,
                    path: 'menu-level-2a',
                    component: '/menu-level/menu-level-1b/menu-level-2a/index.tsx',
                },
                {
                    id: '4873136353891364',
                    parentId: '7572529636800586',
                    label: 'sys.menu.menulevel.1b.2b.index',
                    name: 'Menu Level 2b',
                    resourceType: PermissionType.CATALOGUE,
                    path: 'menu-level-2b',
                    children: [
                        {
                            id: '4233029726998055',
                            parentId: '4873136353891364',
                            label: 'sys.menu.menulevel.1b.2b.3a',
                            name: 'Menu Level 3a',
                            resourceType: PermissionType.MENU,
                            path: 'menu-level-3a',
                            component:
                                '/menu-level/menu-level-1b/menu-level-2b/menu-level-3a/index.tsx',
                        },
                        {
                            id: '3298034742548454',
                            parentId: '4873136353891364',
                            label: 'sys.menu.menulevel.1b.2b.3b',
                            name: 'Menu Level 3b',
                            resourceType: PermissionType.MENU,
                            path: 'menu-level-3b',
                            component:
                                '/menu-level/menu-level-1b/menu-level-2b/menu-level-3b/index.tsx',
                        },
                    ],
                },
            ],
        },
    ],
};
const ERRORS_PERMISSION = {
    id: '9406067785553476',
    parentId: '',
    label: 'sys.menu.error.index',
    name: 'Error',
    icon: 'bxs:error-alt',
    resourceType: PermissionType.CATALOGUE,
    path: 'error',
    sortValue: 6,
    children: [
        {
            id: '8557056851997154',
            parentId: '9406067785553476',
            label: 'sys.menu.error.403',
            name: '403',
            resourceType: PermissionType.MENU,
            path: '403',
            component: '/sys/error/Page403.tsx',
        },
        {
            id: '5095669208159005',
            parentId: '9406067785553476',
            label: 'sys.menu.error.404',
            name: '404',
            resourceType: PermissionType.MENU,
            path: '404',
            component: '/sys/error/Page404.tsx',
        },
        {
            id: '0225992135973772',
            parentId: '9406067785553476',
            label: 'sys.menu.error.500',
            name: '500',
            resourceType: PermissionType.MENU,
            path: '500',
            component: '/sys/error/Page500.tsx',
        },
    ],
};
const OTHERS_PERMISSION = [
    {
        id: '3981225257359246',
        parentId: '',
        label: 'sys.menu.calendar',
        name: 'Calendar',
        icon: 'solar:calendar-bold-duotone',
        resourceType: PermissionType.MENU,
        path: 'calendar',
        component: '/sys/others/calendar/index.tsx',
    },
    {
        id: '3513985683886393',
        parentId: '',
        label: 'sys.menu.kanban',
        name: 'kanban',
        icon: 'solar:clipboard-bold-duotone',
        resourceType: PermissionType.MENU,
        path: 'kanban',
        component: '/sys/others/kanban/index.tsx',
    },
    {
        id: '5455837930804461',
        parentId: '',
        label: 'sys.menu.disabled',
        name: 'Disabled',
        icon: 'ic_disabled',
        resourceType: PermissionType.MENU,
        path: 'disabled',
        status: BasicStatus.DISABLE,
        component: '/sys/others/calendar/index.tsx',
    },
    {
        id: '7728048658221587',
        parentId: '',
        label: 'sys.menu.label',
        name: 'Label',
        icon: 'ic_label',
        resourceType: PermissionType.MENU,
        path: 'label',
        newFeature: true,
        component: '/sys/others/blank.tsx',
    },
    {
        id: '5733704222120995',
        parentId: '',
        label: 'sys.menu.frame',
        name: 'Frame',
        icon: 'ic_external',
        resourceType: PermissionType.CATALOGUE,
        path: 'frame',
        children: [
            {
                id: '9884486809510480',
                parentId: '5733704222120995',
                label: 'sys.menu.external_link',
                name: 'External Link',
                resourceType: PermissionType.MENU,
                path: 'external_link',
                component: '/sys/others/iframe/external-link.tsx',
                frameSrc: 'https://ant.design/',
            },
            {
                id: '9299640886731819',
                parentId: '5733704222120995',
                label: 'sys.menu.iframe',
                name: 'Iframe',
                resourceType: PermissionType.MENU,
                path: 'frame',
                component: '/sys/others/iframe/index.tsx',
                frameSrc: 'https://ant.design/',
            },
        ],
    },
    {
        id: '0941594969900756',
        parentId: '',
        label: 'sys.menu.blank',
        name: 'Disabled',
        icon: 'ic_blank',
        resourceType: PermissionType.MENU,
        path: 'blank',
        component: '/sys/others/blank.tsx',
    },
];

export const PERMISSION_LIST = [
    DASHBOARD_PERMISSION,
    MANAGEMENT_PERMISSION,
    COMPONENTS_PERMISSION,
    FUNCTIONS_PERMISSION,
    MENU_LEVEL_PERMISSION,
    ERRORS_PERMISSION,
    ...OTHERS_PERMISSION,
];

/**
 * User role mock
 */
const ADMIN_ROLE = {
    id: '4281707933534332',
    name: 'Admin',
    label: 'admin',
    status: BasicStatus.ENABLE,
    sortValue: 1,
    desc: 'Super Admin',
    permission: PERMISSION_LIST,
};
const TEST_ROLE = {
    id: '9931665660771476',
    name: 'Test',
    label: 'test',
    status: BasicStatus.ENABLE,
    sortValue: 2,
    desc: 'test',
    permission: [DASHBOARD_PERMISSION, COMPONENTS_PERMISSION, FUNCTIONS_PERMISSION],
};
export const ROLE_LIST = [ADMIN_ROLE, TEST_ROLE];

/**
 * User data mock
 */
export const DEFAULT_USER = {
    id: faker.string.uuid(),
    account: 'reactAdmin',
    email: faker.internet.email(),
    avatar: faker.image.avatarLegacy(),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.recent(),
    password: '123456',
    role: ADMIN_ROLE,
    permissions: ADMIN_ROLE.permission,
};
export const TEST_USER = {
    id: faker.string.uuid(),
    account: 'reactTest',
    password: '123456',
    email: faker.internet.email(),
    avatar: faker.image.avatarLegacy(),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.recent(),
    role: TEST_ROLE,
    permissions: TEST_ROLE.permission,
};
export const USER_LIST = [DEFAULT_USER, TEST_USER];
