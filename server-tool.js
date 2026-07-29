/** @param {NS} ns */
export async function main(ns) {
    const target = ns.getHostname();
    // Defines how much money a server should have before we hack it
    let moneyThresh = ns.getServerMaxMoney(target) * 0.75;
    
    // Defines the minimum security level the target server can have. 
    let securityThresh = ns.getServerMinSecurityLevel(target) + 5;
    
    // Infinite loop that continously hacks/grows/weakens the target server  
    while(true) {
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            // If the server's security level is above our threshold, weaken it
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            // If the server's money is less than our threshold, grow it
            await ns.grow(target);
        } else {
            // Otherwise, hack it
            await ns.hack(target);
        }
    }
}
