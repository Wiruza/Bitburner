/** @param {NS} ns **/
export async function main(ns) {

    const targets = [
        "crush-fitness", "omega-net", "phantasy", "silver-helix", "iron-gym", "omnitek", "b-and-a", "nwo", "ecorp", "clarkinc", "4sigma", "kuai-gong", "blade", 
        "megacorp", "millenium-fitness", "run4theh111z", "alpha-ent", ".", "syscore", "lexo-corp", "zb-institute", "solaris", "global-pharm", "unitalife",
        "snap-fitness", "zb-def", "applied-energetics", "helios", "nova-med", "vitalife", "zeus-med", "univ-energy", "microdyne", "icarus", "titan-labs",
        "galactic-cyber", "aerocorp", "deltaone", "defcomm", "taiyang-digital", "stormtech", "The-Cave", "infocomm", "omnia", "powerhouse-fitness", 
        "fulcrumtech", "fulcrumassets"
    ];

    // ---- Reduce log noise ----
  ns.disableLog("ALL");

    let bestTarget = "n00dles";
    let lastHackLevel = 0;

    // Profit tracking
    let totalProfit = 0;
    let lastReport = Date.now();

    const threads = ns.getRunningScript().threads;

    ns.print(`maxprofit.js started with ${threads} threads`);

    while (true) {

        // Only search for a new target when hacking level changes
        if (ns.getHackingLevel() !== lastHackLevel) {

            lastHackLevel = ns.getHackingLevel();

            let bestScore = 0;

            for (const target of targets) {

                if (!ns.hasRootAccess(target))
                    continue;

                if (ns.getServerRequiredHackingLevel(target) > lastHackLevel)
                    continue;

                const maxMoney = ns.getServerMaxMoney(target);

                if (maxMoney <= 0)
                    continue;

                const score =
                    maxMoney *
                    ns.hackAnalyze(target) *
                    ns.hackAnalyzeChance(target) /
                    ns.getWeakenTime(target);

                if (score > bestScore) {
                    bestScore = score;
                    bestTarget = target;
                }
            }

            ns.print(
                `New target: ${bestTarget} | ` +
                `Score: ${ns.format.number(bestScore)}`
            );
        }


        const moneyThresh =
            ns.getServerMaxMoney(bestTarget) * 0.95;

        const securityThresh =
            ns.getServerMinSecurityLevel(bestTarget) + 2;


        if (ns.getServerSecurityLevel(bestTarget) > securityThresh) {

            await ns.weaken(bestTarget);


        } else if (ns.getServerMoneyAvailable(bestTarget) < moneyThresh) {

            await ns.grow(bestTarget);


        } else {

            // Hack returns the amount stolen
            const stolen = await ns.hack(bestTarget);

            totalProfit += stolen;
        }


        // Report every minute
if (Date.now() - lastReport >= 60000) {

    const profitPerHour = totalProfit * 60;

    ns.print("--------------------------------");
    ns.print(
        `Target: ${bestTarget}`
    );
    ns.print(
        `Profit/min: ${ns.format.number(totalProfit)}`
    );
    ns.print(
        `Estimated/hour: ${ns.format.number(profitPerHour)}`
    );
    ns.print("--------------------------------");

    totalProfit = 0;
    lastReport = Date.now();
    }
    }
}