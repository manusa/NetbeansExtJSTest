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

/*
(function (Ext) {
    function helloWorld() {
        var win = new Ext.create('Ext.Window', {
            id: 'helloWorldWindow',
            title: 'Hello World!',
            width: 300,
            height: 150,
            layout: 'fit'
        });
        win.show();
    }
    Ext.onReady(helloWorld);
})(Ext);
*/
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
    Ext.define('GitHubTest.GlobalData', {
        extend: 'Ext.data.Model',
        singleton: true,
        fields: [
            'githubToken'
        ]
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
            storeId:'repositoryStore',
            model: 'GithubTest.Repository',
            proxy: {
                type: 'jsonp',
                url: 'https://api.github.com/users/manusa/repos',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        initComponent: function () {

        }
    });
    function getGithubUrl() {
        "use strict";
        var auth = GitHubTest.GlobalData.get('githubToken');
        return 'https://api.github.com/users/manusa/repos' +
                (typeof auth !== 'undefined'? '?auth_token='+auth :'');
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
                layout: 'fit',
                region: 'south'
            });
            return this.tokenForm;
        }
    });
    Ext.onReady(initApp);
    function initApp() {
        GitHubTest.GlobalData.set('githubToken','MockValue')
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
                        flex: 1/*,
                         renderer: this.formatTitle*/
                    }, {
                        text: 'Url',
                        dataIndex: 'html_url',
                        hidden: false,
                        width: 200

                    }]
            });
            this.callParent(arguments);
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
        title: 'Access Tokens',
        viewModel: {
            type: 'tokenformvm',
        },
        items: [
            {
                xtype: 'textfield',
                fieldLabel: 'Access token',
                // The default config for textfield in a bind is "value" (two-way):
                bind: '{globalData.githubToken}',
                listeners: {
                    specialkey: function (f, e) {
                        if (e.getKey() === e.ENTER) {
                            var store = Ext.getStore('repositoryStore');
                            var url = "https://api.github.com/users/manusa/repos";
                            var accessToken = GitHubTest.GlobalData.get('githubToken');
                            if(accessToken !== ''){
                                url = url + "?access_token="+accessToken;
                            }
                            store.proxy.setUrl(url);
                            store.load();

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
            globalData: GitHubTest.GlobalData
        }
    });
})(Ext);

