
export function getDeviceAvailability(device, endDate, intervals, step) {

    let result = [];
    if (!device) return result;

    var now = new Date();
    var curStart = endDate;

    for (let i=0; i<intervals; ++i) {
        var nextEnd = new Date(curStart.getTime()+(step));
        result.push(
            { start: curStart, end: nextEnd, state: 0}
        );
        if (nextEnd>now) break;
        curStart=nextEnd;
    }
    

    if (!device.logs || device.logs.length==0) {
        if (device.state==='UP') {
            markOnline(result, new Date(Number(device.firstseentime)), new Date(Number(device.statechangetime), now));
        }
        return result;
    }

    // we have logs
    let curDownTime = result[result.length-1].end;
    for (let i=0; i<device.logs.length; ++i) {
        //console.log("proc: "+i+" curDown= "+curDownTime);
        const log = device.logs[i];
        const thisTime = Number(log.sharptime);
        if (log.state.change=='UP') {
            markOnline(result, new Date(thisTime), curDownTime, now);
        } else {
            curDownTime=new Date(thisTime);
        }
    }

    // last event was a down: it's been online all the time, maybe ;)
    if (device.logs.length<50 && device.logs[device.logs.length-1].state.change=='DOWN') {
        markOnline(result, new Date(Number(device.firstseentime)), curDownTime, now);
    }
    
    return result;
}

export function markOnline(availability, start, end, now) {
    for (var i=0; i<availability.length; ++i) {
        if (availability[i].start>=end) break;
        if (start>=availability[i].end) continue;

        let uptime = Math.min(availability[i].end.getTime(),end.getTime(),now) - Math.max(availability[i].start.getTime(),start.getTime());
        if (uptime<0) continue;
        uptime=Math.max(300000,uptime);
        availability[i].state+=uptime;
    }
}

export function aggregateAvailability(avail) {
    let result = {slots: [],
                  totalup: 0};

    if (!avail || avail.length==0) return result;

    for (let i=0; i<avail.length; ++i) {
        result.totalup+=avail[i].state;
        const state = avail[i].state>0 ? 1 : 0
        if (i==0) {
            result.slots.push([state, 1, avail[i].start, avail[i].end, avail[i].state]);
            continue;
        }
        if (result.slots[result.slots.length-1][0]==state) {
            result.slots[result.slots.length-1][1] = result.slots[result.slots.length-1][1]+1;
            result.slots[result.slots.length-1][3] = avail[i].end;
            result.slots[result.slots.length-1][4] = result.slots[result.slots.length-1][4]+avail[i].state;
        } else {
            result.slots.push([state, 1, avail[i].start, avail[i].end, avail[i].state]);
        }
    }
    return result;
}



// network summary timeline helpers

export function getNetworkAvailability(discovery, endDate, intervals, step) {
    let result = [];
    if (!discovery || !discovery.nodes) return result;


    var now = new Date();
    var curStart = endDate;

    for (let i=0; i<intervals; ++i) {
        var nextEnd = new Date(curStart.getTime()+(step));
        result.push(
            { start: curStart, end: nextEnd, devices: {}}
        );
        if (nextEnd>now) break;
        curStart=nextEnd;
    }


    for (let i=0; i<discovery.nodes.length; ++i) {
        const device = discovery.nodes[i];
        const mac = device.mac_address;


        if (!device.logs || device.logs.length==0) {
            if (device.state==='UP') {
                countOnline(result, new Date(Number(device.firstseentime)), new Date(Number(device.statechangetime), now, mac));
            }
            continue;
        }
        // we have logs
        let curDownTime = result[result.length-1].end;
        for (let i=0; i<device.logs.length; ++i) {
            //console.log("proc: "+i+" curDown= "+curDownTime);
            const log = device.logs[i];
            if (!log || !log.state || !log.sharptime) continue;
            const thisTime = Number(log.sharptime);
            if (log.state.change=='UP') {
                countOnline(result, new Date(thisTime), curDownTime, now, mac);
            } else {
                curDownTime=new Date(thisTime);
            }
        }
    
        // last event was a down: it's been online all the time, maybe ;)
        if (device.logs.length<50 && device.logs[device.logs.length-1]) {
            const lastLog = device.logs[device.logs.length-1];
            if (lastLog && lastLog.state && lastLog.state.change=='DOWN') {
                countOnline(result, new Date(Number(device.firstseentime)), curDownTime, now, mac);
            }
        }
    }

    return result;
}


export function countOnline(availability, start, end, now, mac) {
    for (var i=0; i<availability.length; ++i) {
        if (availability[i].start>=end) break;
        if (start>=availability[i].end) continue;

        let uptime = Math.min(availability[i].end.getTime(),end.getTime(),now) - Math.max(availability[i].start.getTime(),start.getTime());
        if (uptime<0) continue;
        uptime=Math.max(300000,uptime);
        if (!availability[i].devices[mac]) availability[i].devices[mac]=0;
        availability[i].devices[mac] += uptime;
    }
}


export function aggregateNetworkAvailability(avail) {
    let result = {slots: [],minup: 0,maxup: 0,distinct: 0};

    if (!avail || avail.length==0) return result;

    let distinctDevices = {};

    for (let i=0; i<avail.length; ++i) {
        const thisTotUp = Object.keys(avail[i].devices).length;
        Object.keys(avail[i].devices).forEach((mac) => { distinctDevices[mac]=1; });
        
        if (i==0) {
            result.minup = thisTotUp;
            result.maxup = thisTotUp;
            result.slots.push([thisTotUp, 1, avail[i].start, avail[i].end]);
            continue;
        }

        result.minup = Math.min(result.minup, thisTotUp);
        result.maxup = Math.max(result.maxup, thisTotUp);

        if (result.slots[result.slots.length-1][0]==thisTotUp) {
            result.slots[result.slots.length-1][1] = result.slots[result.slots.length-1][1]+1;
            result.slots[result.slots.length-1][3] = avail[i].end;
        } else {
            result.slots.push([thisTotUp, 1, avail[i].start, avail[i].end]);
        }
    }

    result.distinct = Object.keys(distinctDevices).length;

    return result;
}