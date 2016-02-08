/* 
 * Copyright (C) 2016 Marc Nuri <marc@marcnuri.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function (Ext) {
    Ext.define('GithubTest.GlobalData', {
        extend: 'Ext.data.Model',
        singleton: true,
        fields: [
            'githubToken',
            {name: 'user', defaultValue: 'manusa'}
        ],
        generateUrl: function () {
            var accessToken = this.get('githubToken');
            var user = this.get('user');
            var url = Ext.String.format(
                    'https://api.github.com/users/{0}/repos{1}',
                    user,
                    (accessToken && accessToken !== '' ?
                            Ext.String.format('?access_token={0}', accessToken) :
                            ''));
            return url;
        }
    });
})(Ext);


/* 
 * Copyright (C) 2016 Marc Nuri <marc@marcnuri.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function (Ext) {
    Ext.define('GithubTest.RepositoryStore', {
        extend: 'Ext.data.Store',
        config: {
            autoLoad: true,
            storeId: 'repositoryStore',
            model: 'GithubTest.Repository',
            proxy: {
                type: 'jsonp',
                url: GithubTest.GlobalData.generateUrl(),
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                },
                listeners: {
                    exception: function (proxy, response, operation) {
                        debugger;
                        Ext.Msg.alert("Error with data from server", operation.error);
                    }
                }
            },
            listeners: {
                load: function (store, records, successful, operation, eOpts) {
                    //Trigger when Store loads data (Can't be used to parse JSON response)
                }

            }
        },
        initComponent: function () {

        },
        reload: function () {
            this.proxy.setUrl(GithubTest.GlobalData.generateUrl());
            this.load();
        }
    });
})(Ext);

/* 
 * Copyright (C) 2016 Marc Nuri <marc@marcnuri.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function (Ext) {
    //"use strict";
    Ext.require([
        'Ext.grid.*'
    ]);
    Ext.define('GithubTest.App', {
        extend: 'Ext.container.Viewport',
        initComponent: function () {
            Ext.apply(this, {
                baseCls: 'github-test',
                layout: {
                    type: 'border',
                    padding: 5
                },
                items: [
                    this.createTitle(),
                    this.createGridPanel(),
                    this.createTokenForm()]
            });
            this.callParent(arguments);
        },
        createTitle: function () {
            return {region: 'north',
                html: '<h1 class="x-panel-header">Github Repositories</h1>',
                border: false,
                margin: '0 0 0 0',
                weight: 1};
        },
        createGridPanel: function () {
            this.gridPanel = Ext.create('GithubTest.GridPanel', {
                layout: 'fit',
                region: 'center',
                collapsible: true,
                //floatable: false,
                //split: true,
                minWidth: 175,
                weight: 2
            });
            return this.gridPanel;
        },
        createTokenForm: function () {
            this.tokenForm = Ext.create('GithubTest.TokenForm', {
//                layout: 'fit',
                region: 'south'
            });
            return this.tokenForm;
        }
    });
    Ext.onReady(initApp);
    function initApp() {
        var app = new GithubTest.App();
    }
})(Ext);

/* 
 * Copyright (C) 2016 Marc Nuri <marc@marcnuri.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


(function (Ext) {
    //"use strict";
    Ext.define('GithubTest.GridPanel', {
        extend: 'Ext.grid.Panel',
        initComponent: function () {
            Ext.apply(this, {
                title: "Github Repos",
                /* Container css class*/
                cls: 'grid-panel',
                viewConfig: {
                    itemId: 'view'
                },
                store: new GithubTest.RepositoryStore(),
                columns: [{
                        text: 'Full Name',
                        dataIndex: 'full_name',
                        flex: 1
                    },
                    {
                        text: 'Stars',
                        dataIndex: 'watchers_count',
                        hidden: false

                    },
                    {
                        text: 'Url',
                        dataIndex: 'html_url',
                        hidden: false,
                        width: 300,
                        renderer: this.formatUrl

                    }]
            });
            this.callParent(arguments);
        },
        formatUrl: function (value) {
            return Ext.String.format('<a href=\"{0}\" target=\"_blank\">{0}</a>', value);
        }
    });
})(Ext);
/* 
 * Copyright (C) 2016 Marc Nuri <marc@marcnuri.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function (Ext) {
    Ext.define('GithubTest.TokenForm', {
        extend: 'Ext.panel.Panel',
        title: 'Github Repository list options',
        viewModel: {
            type: 'tokenformvm',
        },
        items: [
            {
                xtype: 'textfield',
                id: 'accessToken',
                fieldLabel: 'Access token',
                // The default config for textfield in a bind is "value" (two-way):
                bind: '{globalData.githubToken}',
                listeners: {
                    render: function (c) {
                        Ext.create('Ext.tip.ToolTip', {
                            target: c.getEl(),
                            html: 'Insert a OAuth token for identified Github API access'
                        });
                    },
                    specialkey: function (f, e) {
                        if (e.getKey() === e.ENTER) {
                            Ext.getStore('repositoryStore').reload();

                        }
                    }
                }
            },{
                xtype: 'textfield',
                id: 'user',
                fieldLabel: 'Github user',
                // The default config for textfield in a bind is "value" (two-way):
                bind: '{globalData.user}',
                listeners: {
                    render: function (c) {
                        Ext.create('Ext.tip.ToolTip', {
                            target: c.getEl(),
                            html: 'Insert a valid Github user id'
                        });
                    },
                    specialkey: function (f, e) {
                        if (e.getKey() === e.ENTER) {
                            Ext.getStore('repositoryStore').reload();

                        }
                    }
                }
            }
        ]
    });

    Ext.define('GithubTest.TokenFormVM', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.tokenformvm',
        data: {
            globalData: GithubTest.GlobalData
        }
    });
})(Ext);


/* 
 * Copyright (C) 2016 Marc Nuri <marc@marcnuri.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function (Ext) {
    //Unsupported in ExtJS
    //"use strict";
    Ext.define('GithubTest.Repository', {
        extend: 'Ext.data.Model',
        fields: [
            'id',
            'name',
            'full_name',
            {name: 'private', type: 'boolean'},
            'html_url',
            'watchers_count',
            'forks_count'
        ]
    });
})(Ext);
