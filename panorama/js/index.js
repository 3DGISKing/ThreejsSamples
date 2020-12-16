const theApp = new App({
    initLookAtPosition : [1371.28, -4162.14, 2398.86]
});

theApp.setPanoramaExplanation("Diamba Sud Gold Project, 100%-owned by Chesser Resources (ASX:CHZ)  " +
    "Red lines are the sections released by company until July 2020" +
    "  " +
    "How to use: Zoom in and out/click icons and lines.");

theApp.setPanoramaExplanationTopLeft("Diamba Sud Gold Project, 100%-owned by Chesser Resources (ASX:CHZ)  " +
    "Red lines are the sections released by company until July 2020" +
    "  " +
    "How to use: Zoom in and out/click icons and lines.");

theApp.addInformationInfospot(899.92, -1673.62, 4617.48, 'Disclaimer', 'The5\n' +
    '                                hectares a, Sinaloa.\n' +
    '                                The areaeveral decades.');


theApp.addPhotoInfospot(934.99, -2507.10, 4218.03, 'Regional Mining and Exploration Map', 'http://abimaps.com/regionalmining.png');

theApp.addLinkInfospot(-5000.00, -2691.84, -2374.74, 'Corporate Presentation', 'https://www.investi.com.au/api/announcements/chz/9d26f636-b5f.pdf');

theApp.addLinkInfospot(-1428.70, -1724.78, 4464.93, 'View 3D Exploration Data', 'http://www.abimaps.com/project3/');

var points =
    [513.93, -3533.36, 3495.33,
    -2861.68, -4092.73, 113.26];


//theApp.addLine(points, 5 , 0xff0000,'https://cdn.vrify.com/shelf/companies/1297/files/05a397a4-d567-43df-aaf6-eb4294cb565e.jpg?cachebuster', "Test");


var points =
    [-532.64, -4826.78, -1176.19,
    -493.83, -4955.88, -397.53];





theApp.addLine(points, 5 , 0xff0000,'http://abimaps.com/jul20.png', "July 2020, Area D section");

var points =
    [1624.16, -1440.23, 4494.79,
    3366.41, -3127.95, -1959.86];


//theApp.addLine(points, 5 , 0xff0000,'', "5 km West-East Reference Line");
theApp.addLineWithOnlyText(points, 5 , 0xff0000,"5 km West-East Reference Line");


var points =
    [-3845.39, -1664.82, 2716.74,
    -3827.13, -1786.21, 2662.74];


theApp.addLine(points, 5 , 0xff0000,'http://abimaps.com/westjuly.png', "July 2020, Western Splay section");


var points =
    [674.84, -4907.27, -651.15,
    627.76, -4780.26, -1312.60];


theApp.addLine(points, 5 , 0xff0000,'http://abimaps.com/areaa1.png', "Mar 2020, Area A section ");

theApp.addText(158.77, -2890.35, 4069.22, "Only text");





