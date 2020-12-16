function simpleDateFormat(e, t) { this.locale = t && (t == "es_US" || t == "en_CA" || t == "fr_CA" || t == "en_GB" || t == "en_AU") ? t : "en_US"; this.applyPattern = function (e) { this.pattern = e || (this.locale == "en_CA" || this.locale == "fr_CA" || this.locale == "en_GB" || this.locale == "en_AU" ? "d/M/yy" : "M/d/yy"); }; this.applyPattern(e); this.format = function (e) { e = e || new Date; if (!(e instanceof Date)) {
    var n = e.split("T")[0].split("-"), r = e.split("T").length > 1 ? e.split("T")[1].split(".")[0].split("Z")[0].split("-")[0].split(":") : ["00", "00", "00"];
    e = new Date(n[0], n[1] - 1, n[2], r[0], r[1], r[2]);
} var i = function (e) { e = "" + e; return e.indexOf("0") == 0 && e != "0" ? e.substring(1) : e; }, s = function (e) { e = Number(e); return isNaN(e) ? "00" : (e < 10 ? "0" : "") + e; }, o = { month: s(e.getMonth() + 1), date: s(e.getDate()), year: s(e.getFullYear()), day: e.getDay(), hour24: e.getHours(), hour12: e.getHours(), minutes: s(e.getMinutes()), ampm: "AM" }; if (o.hour24 > 11) {
    o.ampm = "PM";
} o.hour24 = s(o.hour24); if (o.hour12 == 0) {
    o.hour12 = 12;
} if (o.hour12 > 12) {
    o.hour12 = o.hour12 - 12;
} o.hour12 = s(o.hour12); var u, a = function (e) { var n = e.replace(/yy+(?=y)/g, "yy").replace(/MMM+(?=M)/g, "MMM").replace(/d+(?=d)/g, "d").replace(/EEE+(?=E)/g, "EEE").replace(/a+(?=a)/g, "").replace(/k+(?=k)/g, "k").replace(/h+(?=h)/g, "h").replace(/m+(?=m)/g, "m"), r = n.replace(/yyy/g, o.year).replace(/yy/g, o.year.substring(2)).replace(/y/g, o.year).replace(/dd/g, o.date).replace(/d/g, i(o.date)), u = function (e, t, n) { for (var r = 1; r < e.length; r++) {
    if (!isNaN(e[r].substring(0, 1))) {
        var i = e[r].substring(0, 2);
        e[r] = e[r].substring(2);
        if (isNaN(i.substring(1))) {
            e[r] = i.substring(1) + e[r];
            i = i.substring(0, 1);
        }
        i = Number(i);
        if (i > 23) {
            i = 23;
        }
        var u = n == "+" ? i : 0 - i;
        if (t == "kk" || t == "k") {
            u = Number(o.hour24) + u;
            if (u > 24) {
                u = u - 24;
            }
            else if (u < 0) {
                u = u + 24;
            }
        }
        else {
            u = Number(o.hour12) + u;
            if (u > 24) {
                u = u - 24;
            }
            else if (u < 0) {
                u = u + 24;
            }
            if (u > 12) {
                u = u - 12;
            }
        }
        u = "" + u;
        if (t == "kk" || t == "hh") {
            u = s(u);
        }
        if (t == "h" && u == 0 || t == "hh" && u == "00") {
            u = "12";
        }
        e[r] = u + e[r];
    }
} return e.join(""); }; if (r.indexOf("k+") != -1) {
    r = u(r.split("kk+"), "kk", "+");
    r = u(r.split("k+"), "k", "+");
} if (r.indexOf("k-") != -1) {
    r = u(r.split("kk-"), "kk", "-");
    r = u(r.split("k-"), "k", "-");
} r = r.replace(/kk/g, o.hour24).replace(/k/g, i(o.hour24)); if (r.indexOf("h+") != -1) {
    r = u(r.split("hh+"), "hh", "+");
    r = u(r.split("h+"), "h", "+");
} if (r.indexOf("h-") != -1) {
    r = u(r.split("hh-"), "hh", "-");
    r = u(r.split("h-"), "h", "-");
} r = r.replace(/hh/g, o.hour12 < 12 && o.hour12.indexOf && o.hour12.indexOf("0") != 0 ? "0" + o.hour12 : o.hour12).replace(/h/g, i(o.hour12)); r = r.replace(/mm/g, o.minutes).replace(/m/g, i(o.minutes)); r = r.replace(/a/g, "A"); var a = ["January", "February", "march", "april", "may", "June", "July", "august", "September", "October", "November", "December"]; if (t == "es_US") {
    a = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
} if (t == "fr_CA") {
    a = ["janvier", "f&" + "#233;vrier", "mars", "avril", "mai", "juin", "juillet", "ao&" + "#251;t", "septembre", "octobre", "novembre", "d&" + "#233;cembre"];
} r = r.replace(/MMMM/g, a[Number(o.month) - 1]).replace(/MMM/g, a[Number(o.month) - 1].substring(0, 3)).replace(/MM/g, o.month).replace(/M/g, i(o.month)).replace(/march/g, "March").replace(/mar/g, "Mar").replace(/may/g, "May").replace(/Mayo/g, "mayo"); var f = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; if (t == "es_US") {
    f = ["domingo", "lunes", "martes", "mi&" + "eacute;rcoles", "jueves", "viernes", "s&" + "aacute;bado"];
} if (t == "fr_CA") {
    f = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
} r = r.replace(/EEEE/g, f[o.day]).replace(/EEE/g, f[o.day].substring(0, 3)).replace(/EE/g, f[o.day].substring(0, 3)).replace(/E/g, f[o.day].substring(0, 3)); r = r.replace(/A/g, o.ampm).replace(/april/g, "April").replace(/apr/g, "Apr").replace(/august/g, "August").replace(/aug/g, "Aug"); return r; }; if (this.pattern.indexOf("'") == -1) {
    u = a(this.pattern);
}
else {
    var f = this.pattern.replace(/\'+(?=\')/g, "''").split("''");
    if (f.length == 1) {
        f = this.pattern.split("'");
        for (var l = 0; l < f.length; l++) {
            if (l % 2 == 0) {
                f[l] = a(f[l]);
            }
        }
        return f.join("");
    }
    else {
        for (var l = 0; l < f.length; l++) {
            var c = f[l].split("'");
            for (var h = 0; h < c.length; h++) {
                if (h % 2 == 0) {
                    c[h] = a(c[h]);
                }
            }
            f[l] = c.join("");
        }
        return f.join("'");
    }
} return u; }; }


var InvestiWidget = /** @class */ (function () {
    function InvestiWidget() {
        this.activatedClassName = 'investi-announcements-accordion-year-activated';
    }

    InvestiWidget.prototype.sendRequest1 = function (url, callback) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    callback(xmlhttp.responseText);
                }
                else {
                    console.log('sendRequest returned non 200 result: ' + xmlhttp.status);
                }
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    };

    InvestiWidget.prototype.getContentDiv = function (announcement) {
        var div = document.createElement('div');

        var htmlPath = announcement.content;

        this.sendRequest1('./htmls/' + htmlPath, function (html) {
            div.innerHTML = html;
        });

        return div;
    };

    InvestiWidget.prototype.createInvestiAnnouncementAccordion = function () {
        var accordionName = 'investi-announcements-accordion';
        var elem = document.getElementById(accordionName);

        if (elem != null) {
            this.createInvestiAnnouncementAccordionInternal(elem);
        }

        var items = document.getElementsByClassName(accordionName);

        for (var i = 0; i < items.length; i++) {
            this.createInvestiAnnouncementAccordionInternal(items[i]);
        }
    };

    InvestiWidget.prototype.createInvestiAnnouncementAccordionInternal = function (elem) {
        var _this = this;

        var dateFormat = elem.getAttribute('data-investi-date-format');

        this.sendRequest1('./announcement.json', function (json) {
            var announcements = JSON.parse(json);

            elem.innerHTML = '';

            var currentYear = -1;
            var tableCount = 0;
            var tableElem;
            var that = _this;

            for (var i = 0; i < announcements.length; i++) {
                var announcement = announcements[i];
                var annDate = new Date(announcement.date);

                tableCount++;

                currentYear = annDate.getFullYear();

                var sectionDiv = document.createElement('div');
                var headlineElem = document.createElement('h2');

                headlineElem.innerHTML = announcement.headline;
                tableElem = document.createElement('table');

                headlineElem.addEventListener('click', (function (t, h2) { return function () {
                    that.toggleDisplay(t, h2);
                }; })(tableElem, headlineElem));

                sectionDiv.appendChild(headlineElem);
                sectionDiv.appendChild(tableElem);
                elem.appendChild(sectionDiv);

                _this.toggleDisplay(tableElem, headlineElem);

                // add content row

                var trContentElem = document.createElement('tr');
                var tdContent = document.createElement('td');

                tdContent.appendChild(_this.getContentDiv(announcement));

                trContentElem.appendChild(tdContent);

                tableElem.appendChild(trContentElem);
            }
        });
    };

    InvestiWidget.prototype.toggleDisplay = function (elem, headerYearElem) {
        if (elem.style.display === "none") {
            elem.style.display = "";
            headerYearElem.classList.add(this.activatedClassName);
        }
        else {
            elem.style.display = "none";
            headerYearElem.classList.remove(this.activatedClassName);
        }
    };

    return InvestiWidget;
}());

var widget = new InvestiWidget();

widget.createInvestiAnnouncementAccordion();
