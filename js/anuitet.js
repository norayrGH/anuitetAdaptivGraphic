/*COSNTANTS*/
var percent = 11 / 100;
var MONTH = 180;
var P = percent / 11;
var data = [
    [" ԱՄԻՍ ", " ՏՈԿՈՍ ", " ՄԱՅՐ ԳՈՒՄԱՐ ", " ԱՄՍԱՎՃԱՐ ", " ԸՆԴՀԱՆՈՒՐ ԳՈՒՄԱՐ ", " ՀԵՏ ԵԿԱԾ ՏՈԿՈՍ "]
];

             sda
function n(month) {
    return ((MONTH - month) / 12) * 11;
}

function a(P, n) {
    return (P * Math.pow(1 + P, n)) / (Math.pow(1 + P, n) - 1);
}

function calcAnuitet(mainCash, monthLeft) {
    var sa = mainCash * a(P, n(monthLeft));
    var s = sa * n(monthLeft);
    return s;
}


$(document).ready(function() {
    initData();

});

function startCount() {
    fillData($("#mainCash").val(), calcAnuitet($("#mainCash").val(), 0), 0);
    makeTable($("#table"), data);
}

function recalculate(id) {
    data[id][2] = $("#" + id).val();
    data[id][4] = Math.floor(parseInt(data[id][4]) + parseInt(data[id][2]));
    data[id][5] = Math.floor(parseInt(data[id][5]) + parseInt(data[id][1]));
    fillData($("#mainCash").val() - data[id][4], calcAnuitet($("#mainCash").val() - data[id][4], id), id)
    makeTable($("#table"), data);
}

function makeTable(container, data) {
    container.empty();

    var table = $("<table/>").addClass('table table-hover table-bordered');
    var tBody = $("<tbody/>")
    var tHead = $("<thead/>").addClass('thead-dark');
    $.each(data, function(rowIndex, r) {
        var row = $("<tr/>");
        $.each(r, function(colIndex, c) {
            if (rowIndex == 0) {
                tHead.append(row.append($("<th/>").attr({ scope: "col" }).append(c)));
            } else {
                if (colIndex == 0) {
                    tBody.append(row.append($("<th/>").attr({ class: rowIndex % 12 == 0 ? "table-danger text-center" : "text-center", scope: "row" }).append(c)));
                } else {
                    tBody.append(row.append(
                        $("<td/>").attr({ class: colIndex == 1 ? "table-active text-center" : colIndex == 3 ? "table-primary text-center" : colIndex == 4 ? "table-success text-center" : "table-warning text-center" + " text-center" }).append(colIndex == 2 ? $("<div/>").append($("<input />").attr({ class: "form-control text-center", type: "text", onchange: "recalculate(" + (rowIndex) + ")", id: colIndex == 2 ? rowIndex : "" }).val(c)) : c)
                    ));
                }

            }

        });
    });
    table.append(tHead);
    table.append(tBody);
    return container.append(table);
}

function makeArea(container) {

    var mainCashInput = $("<input>").attr({ type: "text", class: "form-control", placeholder: "Մուտքագրեք Անհրաժեշտ Գումարը", id: "mainCash" });
    container.append(mainCashInput);
    var mainCashButon = $("<div/>").attr({ class: "input-group-append" }).append($("<button>").text("ՀԱՇՎԵԼ").attr({ class: "btn btn-outline-secondary", type: "button", id: "startCount", onclick: "startCount()" }));

    container.append(mainCashButon);
    return container;

}



function initData() {
    for (i = 1; i <= MONTH; i++) {
        data.push([]);
    }
    makeArea($("#anuitet"), function() {});
}

function fillData(mainCash, s, monthLeft) {
    var allMainPay = monthLeft == 0 ? 0 : data[monthLeft][4];
    var revertedCloseProcent = monthLeft == 0 ? 0 : data[monthLeft][5];
    for (i = 1 + monthLeft; i <= MONTH; i++) {
        var closeProcent = Math.floor((mainCash / 12) * percent);
        var monthPay = Math.floor(s / (MONTH - monthLeft));
        var mainCashPay = Math.floor(monthPay - closeProcent);
        allMainPay = allMainPay + mainCashPay;
        revertedCloseProcent = revertedCloseProcent + closeProcent;
        for (c = 0; c < 6; c++) {
            switch (c) {
                case 0:
                    data[i][c] = i;
                    break;
                case 1:
                    data[i][c] = closeProcent;
                    break;
                case 2:
                    data[i][c] = mainCashPay;
                    break;
                case 3:
                    data[i][c] = monthPay;
                    break;
                case 4:
                    data[i][c] = allMainPay;
                    break;
                case 5:
                    data[i][c] = revertedCloseProcent;
                    break;
            }

        }
        mainCash = mainCash - mainCashPay;
    }
    return data;

}