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
                            html: 'Insert a OAuth token for identified Github API access'
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

