"use strict";
var tester_1 = require('immutable-class/build/tester');
var customization_1 = require('./customization');
describe('Customization', function () {
    it('is an immutable class', function () {
        tester_1.testImmutableClass(customization_1.Customization, [
            {
                title: "Hello World",
                headerBackground: "brown",
                customLogoSvg: "ansvgstring"
            },
            {
                headerBackground: "green",
                externalViews: []
            },
            {
                externalViews: [
                    {
                        title: "corporate dashboard",
                        linkGenerator: "{ return 'https://dashboard.corporate.com/'+filter.toString() }",
                        sameWindow: true
                    }, {
                        title: "google docs",
                        linkGenerator: "{ return 'http://182.343.32.2273:8080/'+dataSource.name }"
                    }, {
                        title: "google docs",
                        linkGenerator: "{ return 'http://182.343.32.2273:8080/'+timezone.timezone }"
                    }
                ]
            }
        ]);
    });
});
