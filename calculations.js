// 'use strict'

var dict = {};

function getInput(a, b) {
    var A = parseFloat(document.getElementById(a).value);
    var B = parseFloat(document.getElementById(b).value);

    if (!isNaN(A) && !isNaN(B)) {
        return [true, A, B];
    } else {
        return [false, 0, 0];
    }
}

function calcDiv(a, b) {
    var [flag, A, B] = getInput(a, b);
    if (flag) {
        var res = B != 0 ? A / B : NaN;
        return isNaN(res) ? NaN : res;
    }
    return NaN;
}

function calcKVip(a, b, c) {
    res = calcDiv(a, b);

    dict[c] = isNaN(res) ? NaN: (res >= 1.5 ? 1.5 : res);
    document.getElementById(c).innerHTML = isNaN(res) ? "": (res >= 1.5 ? 1.5 : Math.round(res * 100) / 100);
}

function calcTime(a, b, c) {
    res = calcDiv(a, b);
    document.getElementById(c).innerHTML = isNaN(res) ? "": res >= 1 ? 1 : res;
    document.getElementById("R9_1").innerHTML = isNaN(res) ? "": res >= 1 ? 1 : res;
    dict[c] = isNaN(res) ? NaN: res >= 1 ? 1 : res;
}

function calcVip(a, b, c) {
    res = calcDiv(a, b);
    dict[c] = isNaN(res) ? NaN: res;
    document.getElementById(c).innerHTML = isNaN(res) ? "": Math.round(res * 100) + "%";;
}

function calcKMP(a, c, coeff) {
    A = dict[a];
    B = 1.0;
    if (!isNaN(A) && !isNaN(B)) {
        dict[c] = A * B * coeff;
        document.getElementById(c).innerHTML = Math.round(A * B * coeff * 100) / 100;
    }
}

function calcCSI() {
    csi = parseFloat(document.getElementById("I10").value);
    if (isNaN(csi)) {
        return;
    }
    if (csi <= 8.0) {
        dict["CSI"] = 0
    } else if (csi <= 8.4) {
        dict["CSI"] = 0.5;
    } else if (csi <= 8.9) {
        dict["CSI"] = 0.75;
    } else if (csi <= 9.5) {
        dict["CSI"] = 1;
    } else if (csi <= 9.8) {
        dict["CSI"] = 1.1;
    } else if (csi <= 10) {
        dict["CSI"] = 1.2;
    } else if (csi >= 10) {
        dict["CSI"] = 1.2;
    }

    csiIf = dict["CSI"];
    if (!isNaN(csiIf)) {
        dict["P3"] = csiIf * 0.1;
        document.getElementById("P3").innerHTML = Math.round(csiIf * 0.1 * 100) / 100;
    }
}

function calcKUB() {
    C7 = dict['F9'];
    C9 = dict['F11'];
    if (!isNaN(C7) && !isNaN(C9)) {
        if (C7 <= 0.5) {
            C7 = 0.5;
        }
        if (C9 <= 0.5) {
            C9 = 0.5;
        } else {
            C9 = C7;
        }
        if (C9 >= 1) {
            C9 = 1;
        }
        document.getElementById("I4").innerHTML = C9;
    }
}

function calcKRES() {
    L3 = dict["L3"];
    N3 = dict["N3"];
    P3 = dict["P3"];
    if (!isNaN(L3) && !isNaN(N3) && !isNaN(P3)) {
        dict["R3"] = (L3 + N3 + P3);
        document.getElementById("R3").innerHTML = Math.round((L3 + N3 + P3) * 100) / 100;
        document.getElementById("R3_1").innerHTML = Math.round((L3 + N3 + P3) * 100) / 100;
    }
}

function calclKCen() {
    A = document.getElementById("T5").value;
    res = 0
    if (A == "E") {
        res = 0;
    } else if (A == "D") {
        res = 0.85;
    } else if (A == "C") {
        res = 1;
    } else if (A == "B") {
        res = 1.15;
    } else if (A == "A") {
        res = 1.3;
    }
    document.getElementById("R5").innerHTML = res;
    dict["R5"] = res;
}

function calcPrem() {
    R3 = dict["R3"];
    R5 = dict["R5"];
    R9 = dict["R9"];
    R10 = 1.6;
    L12 = parseFloat(document.getElementById("L12").value);
    if (!isNaN(R3) && !isNaN(R5) && !isNaN(R9) && !isNaN(R10) && !isNaN(L12)) {
        document.getElementById("L12_1").innerHTML = L12;
        document.getElementById("Q12").innerHTML = "Ваша премия " + Math.round(R3 * R5 * R9 * R10 * 0.87 * L12 * 100) / 100 + " р.";
    }
}

function calc1() {
    calcKVip('B3', 'E3', 'F3');
    calcKVip('B5', 'E5', 'F5');

    calcVip('E9', 'B9', 'F9');
    calcVip('E11', 'B11', 'F11');

    calcTime('N9', 'P9', 'R9');

    calcKUB();

    calcKMP('F3', 'L3', 0.6);

    calcKMP('F5', 'N3', 0.3);

    calcCSI();

    calcKRES();

    calclKCen();

    calcPrem();

    return false;
}

document.getElementById('calc-btn').addEventListener('click', calc1);