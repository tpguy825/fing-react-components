/*
 * Copyright (c) Fing. All rights reserved.
 */

export function bestMakeAndModelAsArray(node) {
    if (!node || (!node.bestMake && !node.best_make && !node.macVendor))
        return [];

    let make = node.bestMake || node.best_make;
    let model = node.bestModel;
    if (make && model) {
        return [make, model];
    } else if (model) {
        return [model];
    } else if (make) {
        return [make];
    } else {
        return [node.macVendor];
    }
}

export function bestMakeAndModelAsArrayForRouter(node) {
    if (!node || !node.make)
        return [];

    let make = node.make;
    let model = node.model;
    if (make && model) {
        return [make, model];
    } else if (model) {
        return [model];
    } else if (make) {
        return [make];
    } else {
        return [];
    }
}

export function getOsPrintableVersion(os, v) {
    if (!os || !v) return null;

    if (os==='Android') {

        if (v.startsWith("10")) return null;
        else if (v.startsWith("9")) return "Pie";
        else if (v.startsWith("8")) return "Oreo";
        else if (v.startsWith("7")) return "Nougat";
        else if (v.startsWith("6")) return "Marshmallow";
        else if (v.startsWith("5")) return "Lollipop";
        else if (v.startsWith("4.4")) return "KitKat";
        else if (v.startsWith("4.1")) return "Jelly Bean";
        else if (v.startsWith("4.0")) return "Ice Cream Sandwitch";
        else if (v.startsWith("3.0")) return "Honeycomb";
        else if (v.startsWith("2.3")) return "Gingerbread";
        else if (v.startsWith("2.2")) return "Froyo";

    } else if (os==='macOS' || os==='OS X') {

        if (v.startsWith("11.") || v.startsWith("20")) return "Big Sur";
        else if (v.startsWith("10.15.") || v.startsWith("19")) return "Catalina";
        else if (v.startsWith("10.14.") || v.startsWith("18")) return "Mojave";
        else if (v.startsWith("10.13.") || v.startsWith("17")) return "High Sierra";
        else if (v.startsWith("10.12.") || v.startsWith("16")) return "Sierra";
        else if (v.startsWith("10.11.") || v.startsWith("15")) return "El Capitan";
        else if (v.startsWith("10.10.") || v.startsWith("14")) return "Yosemite";
        else if (v.startsWith("10.9.")  || v.startsWith("13")) return "Mavericks";
        else if (v.startsWith("10.8.")  || v.startsWith("12")) return "Mountain Lion";
        else if (v.startsWith("10.7.")  || v.startsWith("11")) return "Lion";
        else if (v.startsWith("10.6.")) return "Snow Leopard";
        else if (v.startsWith("10.5.")) return "Leopard";
        else if (v.startsWith("10.4.")) return "Tiger";

    }
    return null;
}
