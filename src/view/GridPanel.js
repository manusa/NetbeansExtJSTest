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