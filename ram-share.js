/** @param {NS} ns */
export async function main(ns) {
    const worker = "ram-share-worker.js";
    const workerRam = 4.00; // Hvad ram-share-worker.js koster i RAM

    // 1. Beregn fri RAM lige nu
    let maxRam = ns.getServerMaxRam("home");
    let usedRam = ns.getServerUsedRam("home");
    let freeRam = maxRam - usedRam;

    // Vi trækker en lille buffer fra (f.eks. 10 GB), så din terminal ikke fryser helt
    let availableRam = freeRam ; 
    ns.tprint(`Avalible RAM: ` + availableRam);
    if (availableRam < workerRam) {
        ns.tprint("Der er ikke nok fri RAM til at dele ud af lige nu.");
        return;
    }

    // 2. Regn ud hvor mange tråde vi har råd til
    let threads = Math.floor(availableRam / workerRam);

    ns.tprint(`Deeler overskydende RAM med dine Factions!`);
    
    // 3. Start worker-scriptet med det maksimale antal tråde
    ns.run(worker, threads);
    ns.tprint(`Starter ${threads} tråde af ${worker}...`);
}