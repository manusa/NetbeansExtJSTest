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
                url: 'https://api.github.com/users/manusa/repos',
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

        }
    });
})(Ext);
