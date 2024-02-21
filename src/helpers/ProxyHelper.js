export function getProxyWpadAddress(discovery){
    const servers = discovery && discovery.dhcpservers ? discovery.dhcpservers : [];
    let proxyWpadAddress = [];
    if(servers && servers.length > 0){
        for (const s of servers) {
            if (s.wpad) {
                proxyWpadAddress.push(s.wpad);
                break;
            }
        }
    }
    return proxyWpadAddress;
}