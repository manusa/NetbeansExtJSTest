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

