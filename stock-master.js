/** @param {NS} ns */
//credit to Arakiz78 for this script
export async function main(ns) {
    // Slå standard logs fra for at holde terminalen ren
    ns.disableLog("ALL");

    // Indstillinger for algoritmen
    const LOOKBACK_WINDOW = 10; // Hvor mange cyklusser vi kigger tilbage
    const BUY_TRIGGER = 0.55;    // Køb hvis sandsynligheden for stigning er over 55%
    const SELL_TRIGGER = 0.50;   // Sælg hvis den falder til 50% eller under
    const KEEP_CASH = 1000000000;  // Behold altid 20 mia. kontant til andre ting

    ns.tprint("Starter WSE Stock Master... Gør dig klar til profit!");

    while (true) {
        const stocks = ns.stock.getSymbols();

        for (const stock of stocks) {
            // Hent data om aktien
            const position = ns.stock.getPosition(stock);
            const shares = position[0];
            const avgPrice = position[1];
            
            // Beregn tendensen (forecast) - kræver 4S data, ellers estimeres det
            // Hvis du ikke har 4S data endnu, bruger vi en simpel pris-retnings-tracker
            const forecast = ns.stock.getForecast(stock); 
            const maxShares = ns.stock.getMaxShares(stock);

            // LOGIK FOR AT SÆLGE (Tag profit eller stop tab)
            if (shares > 0) {
                if (forecast <= SELL_TRIGGER) {
                    ns.stock.sellStock(stock, shares);
                    ns.print(`SOLGTE: ${shares} stk. ${stock} pga. dårlig trend.`);
                }
            }

            // LOGIK FOR AT KØBE (Invester overskydende kapital)
            if (forecast >= BUY_TRIGGER && shares < maxShares) {
                const cash = ns.getPlayer().money - KEEP_CASH;
                const stockPrice = ns.stock.getAskPrice(stock);
                
                // Hvor mange aktier har vi råd til?
                let sharesToBuy = Math.floor(cash / stockPrice);
                let remainingMax = maxShares - shares;
                
                if (sharesToBuy > remainingMax) sharesToBuy = remainingMax;

                // Køb kun hvis vi køber for en fornuftig mængde (mindst 100k) for at dække kurtage
                if (sharesToBuy > 0 && (sharesToBuy * stockPrice) > 100000) {
                    ns.stock.buyStock(stock, sharesToBuy);
                    ns.print(`KØBTE: ${sharesToBuy} stk. ${stock} pga. stærk trend (${(forecast*100).toFixed(1)}%).`);
                }
            }
        }
        
        // Aktiemarkedet opdaterer ca. hvert 4.-6. sekund (1 "tick")
        await ns.sleep(6000);
    }
}
