import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function Dashboard() {
  const [prices, setPrices] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, [selectedCoin]);

  const fetchPrices = async () => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=usd&days=1&interval=hourly`
    );
    const data = await res.json();
    setPrices(data.prices);
  };

  const handleBuy = () => alert(`Bought ${amount} USD of ${selectedCoin}`);
  const handleSell = () => alert(`Sold ${amount} USD of ${selectedCoin}`);

  const chartData = {
    labels: prices.map((p) => new Date(p[0]).toLocaleTimeString()),
    datasets: [
      {
        label: `${selectedCoin.toUpperCase()} Price (USD)`,
        data: prices.map((p) => p[1]),
        fill: false,
        borderColor: "#3b82f6",
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Crypto Dashboard</h1>
      <select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)}>
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
        <option value="dogecoin">Dogecoin</option>
        <option value="shiba">Shiba Inu</option>
        <option value="act">ACT</option>
        <option value="trump">Trump Coin</option>
        <option value="manta">Manta</option>
      </select>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount in USD" />
      <button onClick={handleBuy}>Buy</button>
      <button onClick={handleSell}>Sell</button>
      <div style={{ maxWidth: 600, marginTop: 20 }}>
        <Line data={chartData} />
      </div>
    </div>
  );
}
