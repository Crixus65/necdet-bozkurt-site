"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { MotionWrapper } from "@/components/animations/motion-wrapper";

interface FinanceData {
  usdTry: number;
  eurTry: number;
  goldTry: number;
  silverTry: number;
  bitcoin: number;
  ethereum: number;
  lastUpdate: string;
}

interface MetalPrice {
  symbol: string;
  price: number;
}

export function FinanceCard() {
  const [data, setData] = useState<FinanceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchFinanceData() {
      try {
        setIsLoading(true);
        setError(false);

        // Döviz kurları (ECB - güvenilir ücretsiz API)
        const forexResponse = await fetch(
          "https://open.er-api.com/v6/latest/USD"
        );
        const forexData = await forexResponse.json();
        const usdTry = forexData.rates.TRY;
        const eurTry = forexData.rates.EUR / forexData.rates.TRY;

        // Kripto paralar (CoinGecko - ücretsiz)
        const cryptoResponse = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=try"
        );
        const cryptoData = await cryptoResponse.json();
        const bitcoin = cryptoData.bitcoin?.try || 0;
        const ethereum = cryptoData.ethereum?.try || 0;

        // Altın ve Gümüş (metals.live - ücretsiz API)
        let goldTry = 0;
        let silverTry = 0;
        
        try {
          const metalsResponse = await fetch(
            "https://api.metals.live/v1/spot/gold,silver"
          );
          const metalsData = await metalsResponse.json();
          
          // metals.live API'si fiyatları USD olarak döndürür
          const goldUsd = metalsData.find((item: MetalPrice) => item.symbol === "XAU")?.price || 0;
          const silverUsd = metalsData.find((item: MetalPrice) => item.symbol === "XAG")?.price || 0;
          
          // USD'den TRY'ye çevir (1 ons = 31.1035 gram)
          goldTry = (goldUsd * usdTry) / 31.1035; // Gram altın
          silverTry = (silverUsd * usdTry) / 31.1035; // Gram gümüş
        } catch (metalError) {
          console.error("Metals API hatası:", metalError);
          // API başarısız olursa dövizden hesapla (yaklaşık değerler)
          goldTry = (usdTry * 75) / 31.1035; // 1 ons altın ~75 USD
          silverTry = (usdTry * 0.9) / 31.1035; // 1 ons gümüş ~0.9 USD
        }

        setData({
          usdTry,
          eurTry,
          goldTry,
          silverTry,
          bitcoin,
          ethereum,
          lastUpdate: new Date().toLocaleString("tr-TR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      } catch (err) {
        console.error("Finans verisi çekilemedi:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFinanceData();
    const interval = setInterval(fetchFinanceData, 300000); // 5 dakikada bir güncelle

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number, decimals = 2) => {
    return value.toLocaleString("tr-TR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const formatCrypto = (value: number) => {
    if (value >= 1000) {
      return formatCurrency(value, 0);
    }
    return formatCurrency(value, 2);
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="mb-4 h-6 w-32 animate-pulse rounded bg-muted" />
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-3 text-muted">
          <TrendingUp className="size-5" aria-hidden="true" />
          <p className="text-sm">Finans verileri şu anda yüklenemiyor.</p>
        </div>
      </div>
    );
  }

  const items = [
    { label: "USD/TRY", value: formatCurrency(data.usdTry), icon: "💵" },
    { label: "EUR/TRY", value: formatCurrency(data.eurTry), icon: "💶" },
    { label: "Gram Altın", value: `${formatCurrency(data.goldTry)} TL`, icon: "🥇" },
    { label: "Gümüş", value: `${formatCurrency(data.silverTry)} TL`, icon: "🥈" },
    { label: "Bitcoin", value: `${formatCrypto(data.bitcoin)} TL`, icon: "₿" },
    { label: "Ethereum", value: `${formatCrypto(data.ethereum)} TL`, icon: "Ξ" },
  ];

  return (
    <MotionWrapper variant="fade-up" delay={0.3}>
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:border-primary/25 hover:shadow-card"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">
            Finans Piyasaları
          </h3>
          <TrendingUp className="size-5 text-primary" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/50 p-3 transition-all duration-300 hover:border-primary/20 hover:bg-primary/5"
            >
              <span className="text-xl" aria-hidden="true">
                {item.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted truncate">{item.label}</p>
                <p className="text-sm font-semibold text-foreground truncate">
                  {item.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-border">
          <p className="text-xs text-muted">
            Son Güncelleme: {data.lastUpdate}
          </p>
        </div>
      </motion.div>
    </MotionWrapper>
  );
}