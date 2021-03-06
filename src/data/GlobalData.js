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

