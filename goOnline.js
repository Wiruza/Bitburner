/** @param {NS} ns */
export async function main(ns) {
    ns.tprint("=== VELKOMMEN TILBAGE - STARTER ONLINE MODE ===");

     // 1. Stop maxprofit.js if it's already running
    if (ns.scriptRunning("maxprofit.js", "home")) {
        ns.scriptKill("maxprofit.js", "home");
        ns.tprint("✔ Stoppede offline maxprofit.js.");
    }

    // 2. Start din hacking af servere (hacktheplanet.js)
        ns.run("hacktheplanet.js", 1);
        ns.tprint("✔ hacktheplanet.js er startet!");
    

    // 3. Calculate remaining RAM
    const scriptCost = ns.getScriptRam("maxprofit.js");
    const maxRam = ns.getServerMaxRam("home");
    const usedRam = ns.getServerUsedRam("home");
    const freeRam = maxRam - usedRam;

    ns.tprint(`Free RAM on home: ${freeRam.toFixed(2)} GB`);

    const reserveRam = 8;      // Keep some RAM free
    const threads = Math.floor((freeRam - reserveRam) / scriptCost);
    
    if (threads > 0) {
        ns.run("maxprofit.js", threads);
        ns.tprint(`✔ Genstartede maxprofit.js online med ${threads} tråde.`);
    }
    //4. 
    /*let ramscriptCost = ns.getScriptRam("ram-share.js");
    ns.tprint("Free RAM on host: " + freeRam);
    let ramthreads = Math.floor((freeRam) / ramscriptCost);
    if (ramthreads > 0) {
        ns.run("ram-share.js", ramthreads);
        ns.tprint(`✔ Genstartede ram-share.jss online med ${ramthreads} tråde.`);
    }*/


    ns.tprint("=== Klar til online dominans! ===");
}
