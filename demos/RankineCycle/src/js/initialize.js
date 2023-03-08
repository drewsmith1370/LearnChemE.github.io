const Tsat_list = [[0.0006, 0.01], [0.0009, 5], [0.0012, 10], [0.0017, 15], [0.0023, 20], [0.0032, 25], [0.0042, 30], [0.0056, 35], [0.0074, 40], [0.0096, 45], [0.0124, 50], [0.0158, 55], [0.0199, 60], [0.025, 65], [0.0312, 70], [0.0386, 75], [0.0474, 80], [0.0579, 85], [0.0702, 90], [0.0846, 95], [0.1014, 100], [0.1434, 110], [0.1987, 120], [0.2703, 130], [0.3615, 140], [0.4762, 150], [0.6182, 160], [0.7922, 170], [1.0028, 180], [1.2552, 190], [1.5549, 200], [1.9077, 210], [2.3196, 220], [2.7971, 230], [3.3469, 240], [3.9762, 250], [4.6923, 260], [5.503, 270], [6.4166, 280], [7.4418, 290], [8.5879, 300], [9.8651, 310], [11.284, 320], [12.858, 330], [14.601, 340], [16.529, 350], [18.666, 360], [21.044, 370], [22.064, 373.95]];

const S_list = [[0.001, 0.10591, 8.9749], [0.0012, 0.14595, 8.9082], [0.0014, 0.18015, 8.8521], [0.0016, 0.21004, 8.8035], [0.0018, 0.23662, 8.7608], [0.002, 0.26056, 8.7226], [0.003, 0.35429, 8.5764], [0.004, 0.42239, 8.4734], [0.006, 0.52082, 8.329], [0.008, 0.59249, 8.2273], [0.01, 0.6492, 8.1488], [0.012, 0.69628, 8.0849], [0.014, 0.73664, 8.0311], [0.016, 0.77201, 7.9846], [0.018, 0.80355, 7.9437], [0.02, 0.83202, 7.9072], [0.03, 0.94407, 7.7675], [0.04, 1.0261, 7.669], [0.06, 1.1454, 7.5311], [0.08, 1.233, 7.4339], [0.1, 1.3028, 7.3588], [0.12, 1.3609, 7.2977], [0.14, 1.411, 7.2461], [0.16, 1.4551, 7.2014], [0.18, 1.4945, 7.1621], [0.2, 1.5302, 7.1269], [0.3, 1.6717, 6.9916], [0.4, 1.7765, 6.8955], [0.6, 1.9308, 6.7592], [0.8, 2.0457, 6.6616], [1, 2.1381, 6.585], [1.2, 2.2159, 6.5217], [1.4, 2.2835, 6.4675], [1.6, 2.3435, 6.4199], [1.8, 2.3975, 6.3775], [2, 2.4468, 6.339], [3, 2.6455, 6.1856], [4, 2.7968, 6.0696], [6, 3.0278, 5.8901], [8, 3.2081, 5.745], [10, 3.3606, 5.616], [12, 3.4967, 5.4939], [14, 3.6232, 5.3727], [16, 3.7457, 5.2463], [18, 3.8718, 5.1061], [20, 4.0156, 4.9314], [22.064, 4.407, 4.407]];

const H_list = [[0.001, 29.299, 2513.7], [0.0012, 40.569, 2518.6], [0.0014, 50.28, 2522.8], [0.0016, 58.833, 2526.5], [0.0018, 66.489, 2529.9], [0.002, 73.428, 2532.9], [0.003, 100.98, 2544.8], [0.004, 121.39, 2553.7], [0.006, 151.48, 2566.6], [0.008, 173.84, 2576.2], [0.01, 191.81, 2583.9], [0.012, 206.91, 2590.3], [0.014, 219.99, 2595.8], [0.016, 231.57, 2600.6], [0.018, 241.96, 2605], [0.02, 251.42, 2608.9], [0.03, 289.27, 2624.5], [0.04, 317.62, 2636.1], [0.06, 359.91, 2652.9], [0.08, 391.71, 2665.2], [0.1, 417.5, 2674.9], [0.12, 439.36, 2683.1], [0.14, 458.42, 2690], [0.16, 475.38, 2696], [0.18, 490.7, 2701.4], [0.2, 504.7, 2706.2], [0.3, 561.43, 2724.9], [0.4, 604.65, 2738.1], [0.6, 670.38, 2756.1], [0.8, 720.86, 2768.3], [1, 762.52, 2777.1], [1.2, 798.33, 2783.7], [1.4, 829.97, 2788.8], [1.6, 858.46, 2792.8], [1.8, 884.47, 2795.9], [2, 908.5, 2798.3], [3, 1008.3, 2803.2], [4, 1087.5, 2800.8], [6, 1213.9, 2784.6], [8, 1317.3, 2758.7], [10, 1408.1, 2725.5], [12, 1491.5, 2685.4], [14, 1571, 2637.9], [16, 1649.7, 2580.8], [18, 1732.1, 2509.8], [20, 1827.2, 2412.3], [22.064, 2084.3, 2084.3]];

const H_super_list = [[0.5, 3484.5], [0.6, 3483.4], [0.8, 3481.3], [1, 3479.1], [1.2, 3476.9], [1.4, 3474.8], [1.5, 3472.6], [1.8, 3470.4], [2, 3468.2]];

const S_super_list = [[0.5, 8.0892], [0.6, 8.0041], [0.8, 7.8692], [1, 7.7641], [1.2, 7.6779], [1.4, 7.6047], [1.5, 7.5409], [1.8, 7.4845], [2, 7.4337]];

const SHsuper_list = [[[8.15, 2583.9], [8.17, 2592], [8.45, 2687.5], [8.69, 2783], [8.9, 2879.6], [9.1, 2977.4], [9.28, 3076.7], [9.45, 3177.5], [9.61, 3279.9], [9.76, 3384], [9.9, 3489.7], [10.16, 3706.3], [10.41, 3929.9], [10.63, 4160.6], [10.84, 4398.3], [11.04, 4642.8]], [[7.361, 2675.8], [7.6148, 2776.6], [7.8356, 2875.5], [8.0346, 2974.5], [8.2172, 3074.5], [8.3866, 3175.8], [8.5452, 3278.6], [8.6946, 3382.8], [8.8361, 3488.7], [9.0998, 3705.6], [9.3424, 3929.4], [9.5681, 4160.2], [9.78, 4398], [9.98, 4642.6]], [[7.281, 2769.1], [7.5081, 2870.7], [7.71, 2971.2], [7.8941, 3072.1], [8.0644, 3173.9], [8.2236, 3277], [8.3734, 3381.6], [8.5152, 3487.7], [8.7792, 3704.8], [9.022, 3928.8], [9.2479, 4159.8], [9.4598, 4397.6], [9.6599, 4642.3]], [[7.0791, 2761.2], [7.3131, 2865.9], [7.518, 2967.9], [7.7037, 3069.6], [7.875, 3172], [8.0347, 3275.5], [8.1849, 3380.3], [8.3271, 3486.6], [8.5914, 3704], [8.8344, 3928.2], [9.0604, 4159.3], [9.2724, 4397.3], [9.4726, 4642]]];

const HTsuper_list = [[[2592, 50], [2687.5, 100], [2783, 150], [2879.6, 200], [2977.4, 250], [3076.7, 300], [3177.5, 350], [3279.9, 400], [3384, 450], [3489.7, 500], [3706.3, 600], [3929.9, 700], [4160.6, 800], [4398.3, 900], [4642.8, 1000]], [[2675.8, 100], [2776.6, 150], [2875.5, 200], [2974.5, 250], [3074.5, 300], [3175.8, 350], [3278.6, 400], [3382.8, 450], [3488.7, 500], [3705.6, 600], [3929.4, 700], [4160.2, 800], [4398, 900], [4642.6, 1000]], [[2769.1, 150], [2870.7, 200], [2971.2, 250], [3072.1, 300], [3173.9, 350], [3277, 400], [3381.6, 450], [3487.7, 500], [3704.8, 600], [3928.8, 700], [4159.8, 800], [4397.6, 900], [4642.3, 1000]], [[2761.2, 150], [2865.9, 200], [2967.9, 250], [3069.6, 300], [3172, 350], [3275.5, 400], [3380.3, 450], [3486.6, 500], [3704, 600], [3928.2, 700], [4159.3, 800], [4397.3, 900], [4642, 1000]]];

const vol_list = [[0.001, 0.001], [2.001, 0.0012], [4.001, 0.0013], [6.001, 0.0013], [8.001, 0.0014], [10.001, 0.0015], [12.001, 0.0015], [14.001, 0.0016], [16.001, 0.0017], [18.001, 0.0018], [20.001, 0.002], [22.001, 0.0031]];

const saturation_list = [[29.299, 0.001], [311.85, 0.038], [430.24, 0.111], [640.41, 0.5], [762.71, 1], [844.7, 1.5], [908.61, 2], [962.01, 2.5], [1008.4, 3], [1049.9, 3.5], [1087.6, 4], [1122.3, 4.5], [1154.7, 5], [1185.2, 5.5], [1214, 6], [1241.4, 6.5], [1267.7, 7], [1293, 7.5], [1317.4, 8], [1341, 8.5], [1363.9, 9], [1386.3, 9.5], [1408.1, 10], [1429.5, 10.5], [1450.5, 11], [1471.1, 11.5], [1491.5, 12], [1511.6, 12.5], [1531.5, 13], [1551.3, 13.5], [1571, 14], [1590.6, 14.5], [1610.2, 15], [1629.9, 15.5], [1649.7, 16], [1669.7, 16.5], [1690.1, 17], [1710.8, 17.5], [1732.1, 18], [1754.2, 18.5], [1777.2, 19], [1801.4, 19.5], [1827.3, 20], [1855.4, 20.5], [1887.6, 21], [1929.6, 21.5], [2011.7, 22], [2055.6, 22.06], [2115.7, 22.06], [2172.6, 22], [2283, 21.5], [2338.5, 21], [2379.2, 20.5], [2412.3, 20], [2440.7, 19.5], [2466, 19], [2488.8, 18.5], [2509.8, 18], [2529.3, 17.5], [2547.5, 17], [2564.6, 16.5], [2580.8, 16], [2596.1, 15.5], [2610.7, 15], [2624.6, 14.5], [2637.8, 14], [2650.5, 13.5], [2662.7, 13], [2674.3, 12.5], [2685.4, 12], [2696.1, 11.5], [2706.3, 11], [2716.1, 10.5], [2725.5, 10], [2734.4, 9.5], [2742.9, 9], [2751, 8.5], [2758.7, 8], [2765.9, 7.5], [2772.6, 7], [2778.9, 6.5], [2784.6, 6], [2789.7, 5.5], [2794.2, 5], [2797.9, 4.5], [2800.8, 4], [2802.6, 3.5], [2803.2, 3], [2801.9, 2.5], [2798.3, 2], [2791, 1.5], [2777.1, 1], [2748.2, 0.5], [2679.7, 0.111], [2633.7, 0.038], [2513.7, 0.001]];

const partsat_list = [[2115.7, 22.06], [2172.6, 22], [2283, 21.5], [2338.5, 21], [2379.2, 20.5], [2412.3, 20], [2440.7, 19.5], [2466, 19], [2488.8, 18.5], [2509.8, 18], [2529.3, 17.5], [2547.5, 17], [2564.6, 16.5], [2580.8, 16], [2596.1, 15.5], [2610.7, 15], [2624.6, 14.5], [2637.8, 14], [2650.5, 13.5], [2662.7, 13], [2674.3, 12.5], [2685.4, 12], [2696.1, 11.5], [2706.3, 11], [2716.1, 10.5], [2725.5, 10], [2734.4, 9.5], [2742.9, 9], [2751, 8.5], [2758.7, 8], [2765.9, 7.5], [2772.6, 7], [2778.9, 6.5], [2784.6, 6], [2789.7, 5.5], [2794.2, 5], [2797.9, 4.5], [2800.8, 4], [2802.6, 3.5], [2803.2, 3], [2801.9, 2.5], [2798.3, 2], [2791, 1.5], [2777.1, 1], [2748.2, 0.5], [2679.7, 0.111], [2633.7, 0.038], [2513.7, 0.001]];
