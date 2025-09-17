import React from 'react';
import { 
    MOCK_LOYALTY_REWARDS, 
    MOCK_LOYALTY_TRANSACTIONS,
    SAVINGS_ALLOCATION_PERCENTAGE,
    POINT_TO_RUPIAH_CONVERSION,
    GOLD_PRICE_PER_GRAM,
    UMROH_COST,
    HAJJ_INITIAL_DEPOSIT_COST
} from '../constants';
import { StarIcon, GoldIcon, KaabaIcon } from '../components/Icons';

const Loyalty: React.FC = () => {
    // --- START: Poin Calculation Logic ---

    // 1. Calculate total points earned from all sources (marketplace, SHU, etc.).
    const totalEarned = MOCK_LOYALTY_TRANSACTIONS
        .filter(tx => tx.type === 'earned')
        .reduce((sum, tx) => sum + tx.points, 0);

    // 2. Calculate total points redeemed for rewards (e.g., vouchers). This value will be negative.
    const totalRedeemedForRewards = MOCK_LOYALTY_TRANSACTIONS
        .filter(tx => tx.type === 'redeemed')
        .reduce((sum, tx) => sum + tx.points, 0);

    // 3. Split the total earned points into two buckets:
    //    - Shopping points (for redeeming rewards)
    //    - Investment points (for long-term goals)
    const shoppingPointsEarned = Math.floor(totalEarned * (1 - SAVINGS_ALLOCATION_PERCENTAGE));
    const investmentPointsEarned = Math.floor(totalEarned * SAVINGS_ALLOCATION_PERCENTAGE);

    // 4. The final shopping balance is what's earned minus what's redeemed. It cannot go below zero.
    const shoppingPoints = Math.max(0, shoppingPointsEarned + totalRedeemedForRewards);

    // 5. The investment balance is purely the allocated portion of earned points, converted to Rupiah.
    const investmentBalance = investmentPointsEarned * POINT_TO_RUPIAH_CONVERSION;

    // --- END: Poin Calculation Logic ---

    // Goal-specific calculations
    const goldInGrams = GOLD_PRICE_PER_GRAM > 0 ? investmentBalance / GOLD_PRICE_PER_GRAM : 0;
    
    // A robust calculation for progress percentage, ensuring it's between 0 and 100.
    // If the balance is insufficient (i.e., less than or equal to zero), progress will be 0%.
    const goldProgressPercent = GOLD_PRICE_PER_GRAM > 0 ? Math.max(0, Math.min((investmentBalance / GOLD_PRICE_PER_GRAM) * 100, 100)) : 0;
    const canRedeemGold = investmentBalance >= GOLD_PRICE_PER_GRAM;

    const umrohProgressPercent = UMROH_COST > 0 ? Math.max(0, Math.min((investmentBalance / UMROH_COST) * 100, 100)) : 0;
    const canRedeemUmroh = investmentBalance >= UMROH_COST;

    const hajjProgressPercent = HAJJ_INITIAL_DEPOSIT_COST > 0 ? Math.max(0, Math.min((investmentBalance / HAJJ_INITIAL_DEPOSIT_COST) * 100, 100)) : 0;
    const canRedeemHajj = investmentBalance >= HAJJ_INITIAL_DEPOSIT_COST;


    const handleRedeem = (pointsRequired: number, rewardName: string) => {
        if (shoppingPoints >= pointsRequired) {
            alert(`Selamat! Anda berhasil menukarkan ${rewardName}.`);
        } else {
            alert(`Maaf, poin Anda tidak cukup untuk menukarkan ${rewardName}.`);
        }
    };
    
    const handleRedeemGoal = (goalName: string, goalCost: number) => {
        if(investmentBalance >= goalCost) {
             alert(`Selamat! Anda berhasil menukarkan ${goalName}. Saldo investasi Anda akan dikurangi.`);
        }
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    {/* Shopping Points Card */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl shadow-lg text-white">
                        <div className="flex items-center">
                            <div className="bg-white/20 p-3 rounded-full mr-4">
                                <StarIcon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold opacity-80">Poin Belanja Anda</h2>
                                <p className="text-4xl font-bold tracking-tight">{shoppingPoints.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Rewards Section */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Tukarkan Poin Belanja</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {MOCK_LOYALTY_REWARDS.map(reward => (
                                <div key={reward.id} className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
                                    <img src={reward.imageUrl} alt={reward.name} className="w-full h-40 object-cover" />
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h4 className="text-md font-semibold text-gray-800">{reward.name}</h4>
                                        <p className="text-sm text-gray-500 mt-1 flex-grow">{reward.description}</p>
                                        <div className="mt-4 flex justify-between items-center">
                                            <div className="flex items-center text-primary font-bold">
                                                <StarIcon className="w-5 h-5 mr-1 text-yellow-400" />
                                                <span>{reward.pointsRequired.toLocaleString('id-ID')}</span>
                                            </div>
                                            <button
                                                onClick={() => handleRedeem(reward.pointsRequired, reward.name)}
                                                disabled={shoppingPoints < reward.pointsRequired}
                                                className="px-4 py-2 text-sm font-semibold text-white bg-secondary rounded-lg hover:bg-secondary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow"
                                            >
                                                Tukar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-6 sticky top-24">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Investasi & Tujuan Jangka Panjang</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Total nilai investasi dari 50% poin Anda adalah <span className="font-bold text-primary">Rp{investmentBalance.toLocaleString('id-ID')}</span>.
                        </p>
                        
                        <div className="space-y-4">
                            {/* Gold Savings Card */}
                            <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
                                <div className="flex items-center mb-3">
                                    <GoldIcon className="w-6 h-6 text-amber-500 mr-3" />
                                    <h4 className="font-bold text-amber-800">Tabungan Emas</h4>
                                </div>
                                <div className="space-y-1 text-xs text-gray-600 mb-3">
                                    <div className="flex justify-between">
                                        <span>Saldo Tabungan:</span>
                                        <span className="font-semibold text-amber-900">Rp{investmentBalance.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Estimasi Emas:</span>
                                        <span className="font-semibold text-amber-900">{goldInGrams.toFixed(4)} gram</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-xs text-gray-500">
                                        Progres Menuju 1 Gram
                                    </p>
                                    <p className="text-xs font-semibold text-amber-800">{goldProgressPercent.toFixed(0)}%</p>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5" role="progressbar" aria-label="Progres tabungan emas menuju 1 gram" aria-valuenow={goldProgressPercent} aria-valuemin={0} aria-valuemax={100}>
                                    <div className="bg-amber-400 h-2.5 rounded-full" style={{ width: `${goldProgressPercent}%` }}></div>
                                </div>
                                <button
                                    onClick={() => handleRedeemGoal("1 Gram Emas", GOLD_PRICE_PER_GRAM)}
                                    disabled={!canRedeemGold}
                                    className="mt-4 w-full text-sm px-4 py-2 font-semibold text-white bg-amber-500 rounded-lg hover:bg-amber-600 disabled:bg-gray-300 shadow"
                                >
                                    Tukar 1 Gram
                                </button>
                            </div>

                            {/* Umroh Savings Card */}
                            <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                                <div className="flex items-center mb-3">
                                    <KaabaIcon className="w-6 h-6 text-blue-500 mr-3" />
                                    <h4 className="font-bold text-blue-800">Tabungan Umroh</h4>
                                </div>
                                <p className="text-xs text-gray-600 mb-2">
                                    Target: Rp{UMROH_COST.toLocaleString('id-ID')}
                                </p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5" role="progressbar" aria-label="Progres tabungan umroh" aria-valuenow={umrohProgressPercent} aria-valuemin={0} aria-valuemax={100}>
                                    <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: `${umrohProgressPercent}%` }}></div>
                                </div>
                                <button
                                    onClick={() => handleRedeemGoal("Paket Umroh", UMROH_COST)}
                                    disabled={!canRedeemUmroh}
                                    className="mt-4 w-full text-sm px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 shadow"
                                >
                                    Tukar
                                </button>
                            </div>

                            {/* Haji Savings Card */}
                            <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                                <div className="flex items-center mb-3">
                                    <KaabaIcon className="w-6 h-6 text-green-500 mr-3" />
                                    <h4 className="font-bold text-green-800">Tabungan Haji</h4>
                                </div>
                                <p className="text-xs text-gray-600 mb-2">
                                    Target: Rp{HAJJ_INITIAL_DEPOSIT_COST.toLocaleString('id-ID')} (Setoran Awal)
                                </p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5" role="progressbar" aria-label="Progres tabungan haji" aria-valuenow={hajjProgressPercent} aria-valuemin={0} aria-valuemax={100}>
                                    <div className="bg-green-400 h-2.5 rounded-full" style={{ width: `${hajjProgressPercent}%` }}></div>
                                </div>
                                <button
                                    onClick={() => handleRedeemGoal("Setoran Awal Haji", HAJJ_INITIAL_DEPOSIT_COST)}
                                    disabled={!canRedeemHajj}
                                    className="mt-4 w-full text-sm px-4 py-2 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:bg-gray-300 shadow"
                                >
                                    Tukar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction History Section */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Riwayat Poin</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poin</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {MOCK_LOYALTY_TRANSACTIONS.map(tx => (
                                <tr key={tx.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(tx.date).toLocaleDateString('id-ID')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tx.description}</td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${tx.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {tx.points > 0 ? `+${tx.points}` : tx.points.toLocaleString('id-ID')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Loyalty;
