/*
 * Copyright (c) Fing. All rights reserved.
 */

export function powerToSignalPercentage(power) {
    if (power>=-20) return 100;
    else if (power>=-23) return 99;
    else if (power>=-26) return 98;
    else if (power>=-28) return 97;
    else if (power>=-30) return 96;
    else if (power>=-32) return 95;
    else if (power>=-33) return 94;
    else if (power>=-35) return 93;
    else if (power>=-36) return 92;
    else if (power>=-37) return 91;
    else if (power>=-39) return 90;
    else if (power>=-40) return 89;
    else if (power>=-41) return 88;
    else if (power>=-42) return 87;
    else if (power>=-43) return 86;
    else if (power>=-44) return 85;
    else if (power>=-45) return 84;
    else if (power>=-46) return 83;
    else if (power>=-47) return 82;
    else if (power>=-48) return 81;
    else if (power>=-49) return 80;
    else if (power>=-50) return 79;
    else if (power>=-51) return 78;
    else if (power>=-52) return 76;
    else if (power>=-53) return 75;
    else if (power>=-54) return 74;
    else if (power>=-55) return 73;
    else if (power>=-56) return 71;
    else if (power>=-57) return 70;
    else if (power>=-58) return 69;
    else if (power>=-59) return 67;
    else if (power>=-60) return 66;
    else if (power>=-61) return 64;
    else if (power>=-62) return 63;
    else if (power>=-64) return 60;
    else if (power>=-65) return 58;
    else if (power>=-66) return 56;
    else if (power>=-67) return 55;
    else if (power>=-68) return 53;
    else if (power>=-69) return 51;
    else if (power>=-70) return 50;
    else if (power>=-71) return 48;
    else if (power>=-72) return 46;
    else if (power>=-73) return 44;
    else if (power>=-74) return 42;
    else if (power>=-75) return 40;
    else if (power>=-76) return 38;
    else if (power>=-77) return 36;
    else if (power>=-78) return 34;
    else if (power>=-79) return 32;
    else if (power>=-80) return 30;
    else if (power>=-81) return 28;
    else if (power>=-82) return 26;
    else if (power>=-83) return 24;
    else if (power>=-84) return 22;
    else if (power>=-85) return 20;
    else if (power>=-86) return 17;
    else if (power>=-87) return 15;
    else if (power>=-88) return 13;
    else if (power>=-89) return 10;
    else if (power>=-90) return 8;
    else if (power>=-91) return 6;
    else if (power>=-92) return 3;
    else return 1;

}
