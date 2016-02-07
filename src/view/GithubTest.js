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
        var app = new GithubTest.App();
    }
})(Ext);
