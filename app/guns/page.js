'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const GUNS = [
  {
    "name": "M249",
    "type": "lmg",
    "cost": "14,496",
    "reward": false,
    "damage": {
      "head": 103.0,
      "torso": 52.0,
      "arms": 20.0,
      "legs": 23.0
    },
    "weight_lbs": 18.51,
    "recoil": {
      "hip": 45.0,
      "ads": 38.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2810.03,
    "fire_rate": 725.0,
    "range_score": 1717.69,
    "reload_full": 10.15,
    "reload_partial": 9.48,
    "draw_time": 2.79,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "Most versatile LMG. Best for general use and supportive fire",
    "shotgun": false
  },
  {
    "name": "PKM",
    "type": "lmg",
    "cost": "9,600",
    "reward": false,
    "damage": {
      "head": 123.0,
      "torso": 78.0,
      "arms": 29.0,
      "legs": 45.0
    },
    "weight_lbs": 20.11,
    "recoil": {
      "hip": 48.0,
      "ads": 40.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2765.85,
    "fire_rate": 600.0,
    "range_score": 2659.67,
    "reload_full": 13.15,
    "reload_partial": 12.48,
    "draw_time": 2.79,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "Heavier and higher recoil. Best for wanting to pack some serious damage down range. Not very versatile.",
    "shotgun": false
  },
  {
    "name": "G28",
    "type": "dmr",
    "cost": "6,830",
    "reward": false,
    "damage": {
      "head": 121.0,
      "torso": 95.0,
      "arms": 29.0,
      "legs": 35.0
    },
    "weight_lbs": 11.44,
    "recoil": {
      "hip": 39.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2616.89,
    "fire_rate": 450.0,
    "range_score": 2735.74,
    "reload_full": 3.2,
    "reload_partial": 2.2,
    "draw_time": 2.79,
    "pvp": false,
    "pve": true,
    "beginner": false,
    "note": "Great DMR for all purpose deployments. Pretty nice to use, not the best DMR",
    "shotgun": false
  },
  {
    "name": "M110A3",
    "type": "dmr",
    "cost": "6,503",
    "reward": false,
    "damage": {
      "head": 116.0,
      "torso": 93.0,
      "arms": 29.0,
      "legs": 34.0
    },
    "weight_lbs": 11.93,
    "recoil": {
      "hip": 32.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2631.25,
    "fire_rate": 421.0,
    "range_score": 3606.96,
    "reload_full": 3.2,
    "reload_partial": 2.2,
    "draw_time": 0.0,
    "pvp": false,
    "pve": true,
    "beginner": false,
    "note": "Best DMR in the game. If you're a DMR player, this will be your top pick. Not recommended for PVP, but can work",
    "shotgun": false
  },
  {
    "name": "M110",
    "type": "dmr",
    "cost": "4,968",
    "reward": false,
    "damage": {
      "head": 122.0,
      "torso": 96.0,
      "arms": 29.0,
      "legs": 36.0
    },
    "weight_lbs": 11.16,
    "recoil": {
      "hip": 46.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2696.79,
    "fire_rate": 421.0,
    "range_score": 2903.19,
    "reload_full": 3.2,
    "reload_partial": 2.2,
    "draw_time": 0.0,
    "pvp": false,
    "pve": true,
    "beginner": false,
    "note": "700 feet less range than the M110A3. Good for more intermediate players looking for a DMR",
    "shotgun": false
  },
  {
    "name": "VSS Vintorez",
    "type": "dmr",
    "cost": "2,735",
    "reward": false,
    "damage": {
      "head": 121.0,
      "torso": 72.0,
      "arms": 24.0,
      "legs": 33.0
    },
    "weight_lbs": 5.64,
    "recoil": {
      "hip": 10.0,
      "ads": 8.0
    },
    "dispersion": {
      "hip": 9.59
    },
    "muzzle_velocity": 984.01,
    "fire_rate": 900.0,
    "range_score": 947.01,
    "reload_full": 2.43,
    "reload_partial": 1.82,
    "draw_time": 0.0,
    "pvp": true,
    "pve": false,
    "beginner": false,
    "note": "Terrible range and muzzle velocity. Best for PVP as it does not have super long gun fights",
    "shotgun": false
  },
  {
    "name": "OTs-03",
    "type": "dmr",
    "cost": "2,600",
    "reward": false,
    "damage": {
      "head": 122.0,
      "torso": 77.0,
      "arms": 28.0,
      "legs": 35.0
    },
    "weight_lbs": 7.75,
    "recoil": {
      "hip": 27.0,
      "ads": 23.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2678.39,
    "fire_rate": 379.0,
    "range_score": 2494.13,
    "reload_full": 3.38,
    "reload_partial": 2.35,
    "draw_time": 0.0,
    "pvp": false,
    "pve": true,
    "beginner": false,
    "note": "Good overall, not the best.",
    "shotgun": false
  },
  {
    "name": "SVDS",
    "type": "dmr",
    "cost": "2,530",
    "reward": false,
    "damage": {
      "head": 123.0,
      "torso": 78.0,
      "arms": 29.0,
      "legs": 35.0
    },
    "weight_lbs": 9.02,
    "recoil": {
      "hip": 27.0,
      "ads": 22.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2726.06,
    "fire_rate": 415.0,
    "range_score": 2538.71,
    "reload_full": 4.14,
    "reload_partial": 3.16,
    "draw_time": 0.0,
    "pvp": false,
    "pve": true,
    "beginner": false,
    "note": "Not a bad pick, better than OTs and Vintorez.",
    "shotgun": false
  },
  {
    "name": "Ak103",
    "type": "assault rifle",
    "cost": "4,845",
    "reward": false,
    "damage": {
      "head": 116.0,
      "torso": 47.0,
      "arms": 25.0,
      "legs": 31.0
    },
    "weight_lbs": 8.05,
    "recoil": {
      "hip": 14.0,
      "ads": 12.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2291.91,
    "fire_rate": 640.0,
    "range_score": 1749.02,
    "reload_full": 3.19,
    "reload_partial": 3.12,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": true,
    "note": "Great Mid weapon. Slightly above mid, but not thw worst option.",
    "shotgun": false
  },
  {
    "name": "Aug A3",
    "type": "assault rifle",
    "cost": "4,449",
    "reward": false,
    "damage": {
      "head": 104.0,
      "torso": 63.0,
      "arms": 20.0,
      "legs": 23.0
    },
    "weight_lbs": 7.42,
    "recoil": {
      "hip": 23.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2967.13,
    "fire_rate": 680.0,
    "range_score": 1915.12,
    "reload_full": 2.72,
    "reload_partial": 1.8,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "Very solid PVP option. Falls off in openworld but definitely not a bad choice all around",
    "shotgun": false
  },
  {
    "name": "RF416 A5",
    "type": "carbine",
    "cost": "5,888",
    "reward": false,
    "damage": {
      "head": 102.0,
      "torso": 49.0,
      "arms": 19.0,
      "legs": 23.0
    },
    "weight_lbs": 7.74,
    "recoil": {
      "hip": 29.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2640.67,
    "fire_rate": 750.0,
    "range_score": 1516.88,
    "reload_full": 1.77,
    "reload_partial": 2.36,
    "draw_time": 2.79,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "Performs well in PVP, but the range makes it less of a great option in openworld",
    "shotgun": false
  },
  {
    "name": "AK105 + MK3 Chassis",
    "type": "carbine",
    "cost": "3,213",
    "reward": false,
    "damage": {
      "head": 104.0,
      "torso": 53.0,
      "arms": 20.0,
      "legs": 23.0
    },
    "weight_lbs": 7.75,
    "recoil": {
      "hip": 9.0,
      "ads": 8.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2672.18,
    "fire_rate": 588.0,
    "range_score": 1812.93,
    "reload_full": 3.19,
    "reload_partial": 3.12,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "Very solid PVP option. Not considered an openworld gun, but could be used.",
    "shotgun": false
  },
  {
    "name": "MX-R Vigor 5.56",
    "type": "carbine",
    "cost": "3,647",
    "reward": false,
    "damage": {
      "head": 102.0,
      "torso": 49.0,
      "arms": 19.0,
      "legs": 23.0
    },
    "weight_lbs": 7.01,
    "recoil": {
      "hip": 12.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2640.67,
    "fire_rate": 800.0,
    "range_score": 1516.88,
    "reload_full": 1.77,
    "reload_partial": 2.51,
    "draw_time": 2.79,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "Super versatile, but falls just short in my opionon to the 110gr supersonics on the 300 KO",
    "shotgun": false
  },
  {
    "name": "MX-R Vigor 300 KO",
    "type": "carbine",
    "cost": "4,999",
    "reward": false,
    "damage": {
      "head": 110.0,
      "torso": 45.0,
      "arms": 22.0,
      "legs": 28.0
    },
    "weight_lbs": 6.59,
    "recoil": {
      "hip": 14.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 960.96,
    "fire_rate": 800.0,
    "range_score": 839.49,
    "reload_full": 1.77,
    "reload_partial": 2.51,
    "draw_time": 2.79,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "Great PVP option, quiet rounds make it good in openworld. That's pretty much it",
    "shotgun": false,
    "variants": [
      {
        "name": "with 110gr supersonics",
        "damage": {
          "head": 116.0,
          "torso": 47.0,
          "arms": 25.0,
          "legs": 31.0
        },
        "muzzle_velocity": 2166.98,
        "note": "Best openworld option for rifles in the game right now.",
        "ammo_label": "110gr Supersonics",
        "recoil": {
          "hip": 14.0,
          "ads": null
        },
        "dispersion": {
          "hip": null
        },
        "fire_rate": 800.0,
        "range_score": 1640.0,
        "reload_full": 1.77,
        "reload_partial": 2.51,
        "draw_time": 2.79,
        "weight_lbs": 6.59
      }
    ],
    "display_name": "MX-R Vigor 300 KO",
    "ammo_label": "220gr Subsonics"
  },
  {
    "name": "STGW 90",
    "type": "assault rifle",
    "cost": "3,393",
    "reward": false,
    "damage": {
      "head": 105.0,
      "torso": 71.0,
      "arms": 20.0,
      "legs": 24.0
    },
    "weight_lbs": 7.54,
    "recoil": {
      "hip": 26.0,
      "ads": 22.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 3134.23,
    "fire_rate": 700.0,
    "range_score": 2136.89,
    "reload_full": 3.34,
    "reload_partial": 2.24,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "Soild PVP option, but in my opinion, it just does not comare to some of the other options in PVP. Doesn't mean it's bad.",
    "shotgun": false
  },
  {
    "name": "STGW 07",
    "type": "carbine",
    "cost": "3,903",
    "reward": false,
    "damage": {
      "head": 101.0,
      "torso": 49.0,
      "arms": 19.0,
      "legs": 22.0
    },
    "weight_lbs": 7.83,
    "recoil": {
      "hip": 25.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2497.89,
    "fire_rate": 700.0,
    "range_score": 1357.28,
    "reload_full": 3.34,
    "reload_partial": 2.24,
    "draw_time": 0.0,
    "pvp": true,
    "pve": false,
    "beginner": false,
    "note": "Good PVP option, not very good for openworld, but functions.",
    "shotgun": false
  },
  {
    "name": "RF416 A3",
    "type": "carbine",
    "cost": "4,409",
    "reward": false,
    "damage": {
      "head": 101.0,
      "torso": 49.0,
      "arms": 19.0,
      "legs": 22.0
    },
    "weight_lbs": 7.79,
    "recoil": {
      "hip": 36.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2538.46,
    "fire_rate": 750.0,
    "range_score": 1401.72,
    "reload_full": 1.97,
    "reload_partial": 2.36,
    "draw_time": 2.79,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "Both RF416s are not great in openworld, but excel more in PVP. Can be used in openworld, but not best option at all",
    "shotgun": false
  },
  {
    "name": "SR-3MP",
    "type": "carbine",
    "cost": "3,240",
    "reward": false,
    "damage": {
      "head": 113.0,
      "torso": 67.0,
      "arms": 22.0,
      "legs": 30.0
    },
    "weight_lbs": 5.39,
    "recoil": {
      "hip": 10.0,
      "ads": 8.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 919.01,
    "fire_rate": 900.0,
    "range_score": 826.03,
    "reload_full": 2.43,
    "reload_partial": 1.82,
    "draw_time": 0.0,
    "pvp": true,
    "pve": false,
    "beginner": false,
    "note": "Very heavy PVP AR. It's light and has a very fast fire rate, but it's range is what makes it terrible for openworld",
    "shotgun": false
  },
  {
    "name": "L85A2",
    "type": "assault rifle",
    "cost": "4,005",
    "reward": false,
    "damage": {
      "head": 105.0,
      "torso": 71.0,
      "arms": 20.0,
      "legs": 24.0
    },
    "weight_lbs": 9.68,
    "recoil": {
      "hip": 7.0,
      "ads": 6.0
    },
    "dispersion": {
      "hip": 5.36
    },
    "muzzle_velocity": 3122.79,
    "fire_rate": 750.0,
    "range_score": 2121.32,
    "reload_full": 3.22,
    "reload_partial": 1.53,
    "draw_time": 0.0,
    "pvp": true,
    "pve": false,
    "beginner": true,
    "note": "Only reason this is not an openworld gun is because as of now, it has no suppressor. Best PVP AR right now.",
    "shotgun": false
  },
  {
    "name": "Famas F1",
    "type": "assault rifle",
    "cost": "2,800",
    "reward": false,
    "damage": {
      "head": 104.0,
      "torso": 70.0,
      "arms": 20.0,
      "legs": 24.0
    },
    "weight_lbs": 8.31,
    "recoil": {
      "hip": 46.0,
      "ads": 38.0
    },
    "dispersion": {
      "hip": 6.29
    },
    "muzzle_velocity": 3084.3,
    "fire_rate": 950.0,
    "range_score": 2069.35,
    "reload_full": 2.07,
    "reload_partial": 2.51,
    "draw_time": 2.79,
    "pvp": true,
    "pve": false,
    "beginner": false,
    "note": "Right behind L85 for PVP. It's an openworld option, but not advised.",
    "shotgun": false
  },
  {
    "name": "G36A2",
    "type": "assault rifle",
    "cost": "3,170",
    "reward": false,
    "damage": {
      "head": 104.0,
      "torso": 70.0,
      "arms": 20.0,
      "legs": 24.0
    },
    "weight_lbs": 7.97,
    "recoil": {
      "hip": 19.0,
      "ads": 15.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 3110.67,
    "fire_rate": 750.0,
    "range_score": 2104.89,
    "reload_full": 3.53,
    "reload_partial": 4.26,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": true,
    "note": "It's slow reload time is really bad. Good for both PVP and openworld, but that slow reload time will kill you",
    "shotgun": false
  },
  {
    "name": "G36KA2",
    "type": "carbine",
    "cost": "3,786",
    "reward": false,
    "damage": {
      "head": 102.0,
      "torso": 50.0,
      "arms": 19.0,
      "legs": 23.0
    },
    "weight_lbs": 6.4,
    "recoil": {
      "hip": 13.0,
      "ads": 11.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2722.95,
    "fire_rate": 750.0,
    "range_score": 1612.88,
    "reload_full": 3.1,
    "reload_partial": 3.52,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "Better reload time of the 2 G36s. Better in PVP, but can be used in openworld.",
    "shotgun": false
  },
  {
    "name": "Type 20",
    "type": "carbine",
    "cost": "2,250",
    "reward": false,
    "damage": {
      "head": 102.0,
      "torso": 51.0,
      "arms": 20.0,
      "legs": 23.0
    },
    "weight_lbs": 7.64,
    "recoil": {
      "hip": 12.0,
      "ads": null
    },
    "dispersion": {
      "hip": 5.47
    },
    "muzzle_velocity": 2670.69,
    "fire_rate": 700.0,
    "range_score": 1657.9,
    "reload_full": 1.7,
    "reload_partial": 2.22,
    "draw_time": 2.79,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "Really solid option for PVP, falls off in openworld, but still great overall.",
    "shotgun": false
  },
  {
    "name": "AK-105",
    "type": "carbine",
    "cost": "3,245",
    "reward": false,
    "damage": {
      "head": 104.0,
      "torso": 53.0,
      "arms": 20.0,
      "legs": 23.0
    },
    "weight_lbs": 7.24,
    "recoil": {
      "hip": 13.0,
      "ads": 11.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2672.18,
    "fire_rate": 640.0,
    "range_score": 1812.93,
    "reload_full": 3.19,
    "reload_partial": 3.12,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "Similar to the AK-103. I prefer the AK-103, but this one and the AK-101 are basically the same.",
    "shotgun": false
  },
  {
    "name": "AK-101",
    "type": "assault rifle",
    "cost": "3,245",
    "reward": false,
    "damage": {
      "head": 104.0,
      "torso": 63.0,
      "arms": 20.0,
      "legs": 23.0
    },
    "weight_lbs": 7.92,
    "recoil": {
      "hip": 13.0,
      "ads": 11.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2962.15,
    "fire_rate": 640.0,
    "range_score": 1908.7,
    "reload_full": 3.19,
    "reload_partial": 3.12,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": true,
    "note": "",
    "shotgun": false
  },
  {
    "name": "Scar-L",
    "type": "assault rifle",
    "cost": "4,199",
    "reward": false,
    "damage": {
      "head": 103.0,
      "torso": 53.0,
      "arms": 20.0,
      "legs": 23.0
    },
    "weight_lbs": 7.56,
    "recoil": {
      "hip": 30.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2830.0,
    "fire_rate": 625.0,
    "range_score": 1742.19,
    "reload_full": 1.7,
    "reload_partial": 2.22,
    "draw_time": 2.86,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "Overall a good way to mix things up as it perfeorms well in all gamemodes.Not a top pick for performance",
    "shotgun": false
  },
  {
    "name": "AK-5C",
    "type": "carbine",
    "cost": "2,555",
    "reward": false,
    "damage": {
      "head": 103.0,
      "torso": 52.0,
      "arms": 20.0,
      "legs": 23.0
    },
    "weight_lbs": 9.2,
    "recoil": {
      "hip": 11.0,
      "ads": 9.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2816.77,
    "fire_rate": 700.0,
    "range_score": 1725.93,
    "reload_full": 3.05,
    "reload_partial": 2.24,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "I personally don't like this gun, however, I do see the appeal. Give it a try and see what you think.",
    "shotgun": false
  },
  {
    "name": "AS VAL",
    "type": "assault rifle",
    "cost": "2,292",
    "reward": false,
    "damage": {
      "head": 121.0,
      "torso": 72.0,
      "arms": 24.0,
      "legs": 33.0
    },
    "weight_lbs": 5.78,
    "recoil": {
      "hip": 10.0,
      "ads": 8.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 984.01,
    "fire_rate": 900.0,
    "range_score": 947.01,
    "reload_full": 2.43,
    "reload_partial": 1.82,
    "draw_time": 0.0,
    "pvp": true,
    "pve": false,
    "beginner": false,
    "note": "Not recommended in openworld, however, does well in PVP. Use to dominate the gamemode, now it's very mid.",
    "shotgun": false
  },
  {
    "name": "C7A2",
    "type": "assault rifle",
    "cost": "2,714",
    "reward": false,
    "damage": {
      "head": 104.0,
      "torso": 70.0,
      "arms": 20.0,
      "legs": 24.0
    },
    "weight_lbs": 7.64,
    "recoil": {
      "hip": 15.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 3110.67,
    "fire_rate": 700.0,
    "range_score": 2104.89,
    "reload_full": 2.95,
    "reload_partial": 3.07,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": true,
    "note": "C7A2 is a good M4 alternative. I place it below the M4 for the simple reason that you can customize the M4 more",
    "shotgun": false
  },
  {
    "name": "AK-74M",
    "type": "assault rifle",
    "cost": "2,220",
    "reward": false,
    "damage": {
      "head": 105.0,
      "torso": 53.0,
      "arms": 20.0,
      "legs": 24.0
    },
    "weight_lbs": 7.92,
    "recoil": {
      "hip": 12.0,
      "ads": 10.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2897.12,
    "fire_rate": 640.0,
    "range_score": 2130.99,
    "reload_full": 3.19,
    "reload_partial": 3.12,
    "draw_time": 2.2,
    "pvp": true,
    "pve": true,
    "beginner": true,
    "note": "The best beginner gun for all gamemodes. You can buy it before level 4, and cruise through the other levels with it",
    "shotgun": false
  },
  {
    "name": "AKS-74UN",
    "type": "carbine",
    "cost": "1,309",
    "reward": false,
    "damage": {
      "head": 101.0,
      "torso": 52.0,
      "arms": 19.0,
      "legs": 22.0
    },
    "weight_lbs": 6.18,
    "recoil": {
      "hip": 12.0,
      "ads": 10.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2313.44,
    "fire_rate": 700.0,
    "range_score": 1358.83,
    "reload_full": 3.19,
    "reload_partial": 3.12,
    "draw_time": 2.2,
    "pvp": true,
    "pve": false,
    "beginner": false,
    "note": "Great gun for PVP, not recmonneded for openworld.",
    "shotgun": false
  },
  {
    "name": "MK 18",
    "type": "carbine",
    "cost": "1,879",
    "reward": false,
    "damage": {
      "head": 101.0,
      "torso": 49.0,
      "arms": 19.0,
      "legs": 22.0
    },
    "weight_lbs": 7.06,
    "recoil": {
      "hip": 16.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2528.5,
    "fire_rate": 750.0,
    "range_score": 1390.74,
    "reload_full": 2.07,
    "reload_partial": 2.51,
    "draw_time": 2.79,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "It's a worse M4. Not really worth it as the M4 has better stats and has better customization.",
    "shotgun": false
  },
  {
    "name": "M16A4",
    "type": "assault rifle",
    "cost": "2,019",
    "reward": false,
    "damage": {
      "head": 104.0,
      "torso": 70.0,
      "arms": 20.0,
      "legs": 24.0
    },
    "weight_lbs": 7.7,
    "recoil": {
      "hip": 15.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 3110.67,
    "fire_rate": 700.0,
    "range_score": 2104.89,
    "reload_full": 2.95,
    "reload_partial": 3.07,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": true,
    "note": "The alternative best beginner gun to the AK-74M. If you want an AR platform, this is the one.",
    "shotgun": false
  },
  {
    "name": "M16A2",
    "type": "assault rifle",
    "cost": "Free",
    "reward": false,
    "damage": {
      "head": 104.0,
      "torso": 70.0,
      "arms": 20.0,
      "legs": 24.0
    },
    "weight_lbs": 7.09,
    "recoil": {
      "hip": 16.0,
      "ads": 14.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 3110.67,
    "fire_rate": 700.0,
    "range_score": 2104.89,
    "reload_full": 2.95,
    "reload_partial": 3.07,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": true,
    "note": "The beginner gun. Not worth using once you have either the AK-74M or the M16A4. Lose it once you have of those",
    "shotgun": false
  },
  {
    "name": "MP7A2",
    "type": "pdw",
    "cost": "3,950",
    "reward": false,
    "damage": {
      "head": 82.0,
      "torso": 37.0,
      "arms": 15.0,
      "legs": 17.0
    },
    "weight_lbs": 4.18,
    "recoil": {
      "hip": 12.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2036.97,
    "fire_rate": 950.0,
    "range_score": 1057.71,
    "reload_full": 2.67,
    "reload_partial": 1.92,
    "draw_time": 0.0,
    "pvp": true,
    "pve": false,
    "beginner": false,
    "note": "A very mid PVP gun. Do not recommend it becuase of it's very low damage, even though the firerate carries it.",
    "shotgun": false
  },
  {
    "name": "MP7A1",
    "type": "pdw",
    "cost": "3,350",
    "reward": false,
    "damage": {
      "head": null,
      "torso": null,
      "arms": null,
      "legs": null
    },
    "weight_lbs": null,
    "recoil": {
      "hip": null,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": null,
    "fire_rate": null,
    "range_score": null,
    "reload_full": null,
    "reload_partial": null,
    "draw_time": null,
    "pvp": true,
    "pve": false,
    "beginner": false,
    "note": "Same as the MP7A1, just without the option of a custom grip.",
    "shotgun": false
  },
  {
    "name": "MX-R Temor 5.56",
    "type": "pdw",
    "cost": "3,647",
    "reward": false,
    "damage": {
      "head": 97.0,
      "torso": 47.0,
      "arms": 17.0,
      "legs": 21.0
    },
    "weight_lbs": 5.12,
    "recoil": {
      "hip": 16.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 1864.9,
    "fire_rate": 800.0,
    "range_score": 755.64,
    "reload_full": 1.77,
    "reload_partial": 2.51,
    "draw_time": 2.79,
    "pvp": true,
    "pve": false,
    "beginner": false,
    "note": "The 300 KO is a much better option. Do not use in openworld, use the Vigor version instead",
    "shotgun": false
  },
  {
    "name": "MX-R Temor 300 KO",
    "type": "pdw",
    "cost": "4,497",
    "reward": false,
    "damage": {
      "head": 108.0,
      "torso": 44.0,
      "arms": 21.0,
      "legs": 27.0
    },
    "weight_lbs": 5.12,
    "recoil": {
      "hip": 18.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 894.97,
    "fire_rate": 800.0,
    "range_score": 728.16,
    "reload_full": 1.77,
    "reload_partial": 2.51,
    "draw_time": 2.79,
    "pvp": true,
    "pve": false,
    "beginner": false,
    "note": "Much better for PVP than the 5.56 version",
    "shotgun": false,
    "variants": [
      {
        "name": "with 110gr supersonics",
        "damage": {
          "head": 115.0,
          "torso": 47.0,
          "arms": 24.0,
          "legs": 31.0
        },
        "muzzle_velocity": 2043.95,
        "note": "More viable for both PVP and openwrold. I suggest only using in PVP",
        "ammo_label": "110gr Supersonics",
        "recoil": {
          "hip": 18.0,
          "ads": null
        },
        "dispersion": {
          "hip": null
        },
        "fire_rate": 800.0,
        "range_score": 1530.0,
        "reload_full": 1.77,
        "reload_partial": 2.51,
        "draw_time": 2.79,
        "weight_lbs": 5.12
      }
    ],
    "display_name": "MX-R Temor 300 KO",
    "ammo_label": "220gr Subsonics"
  },
  {
    "name": "P90",
    "type": "pdw",
    "cost": "2,918",
    "reward": false,
    "damage": {
      "head": 97.0,
      "torso": 43.0,
      "arms": 17.0,
      "legs": 21.0
    },
    "weight_lbs": 6.12,
    "recoil": {
      "hip": 22.0,
      "ads": 18.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2382.86,
    "fire_rate": 900.0,
    "range_score": 1601.74,
    "reload_full": 2.55,
    "reload_partial": 1.97,
    "draw_time": 0.0,
    "pvp": true,
    "pve": false,
    "beginner": true,
    "note": "Not advised in openworld, but definitely a great PVP option",
    "shotgun": false
  },
  {
    "name": "MP9-N",
    "type": "smg",
    "cost": "2,540",
    "reward": false,
    "damage": {
      "head": 116.0,
      "torso": 60.0,
      "arms": 22.0,
      "legs": 27.0
    },
    "weight_lbs": 4.19,
    "recoil": {
      "hip": 28.0,
      "ads": 24.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 1247.58,
    "fire_rate": 1100.0,
    "range_score": 874.08,
    "reload_full": 2.88,
    "reload_partial": 2.28,
    "draw_time": 0.0,
    "pvp": true,
    "pve": false,
    "beginner": false,
    "note": "Only used well in PVP. Current PVP meta as it has easy recoil and an insane fire rate",
    "shotgun": false
  },
  {
    "name": "SR-2MP",
    "type": "smg",
    "cost": "2,375",
    "reward": false,
    "damage": {
      "head": 120.0,
      "torso": 62.0,
      "arms": 23.0,
      "legs": 28.0
    },
    "weight_lbs": 3.51,
    "recoil": {
      "hip": 17.0,
      "ads": 14.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 1302.33,
    "fire_rate": 950.0,
    "range_score": 952.48,
    "reload_full": 3.47,
    "reload_partial": 2.36,
    "draw_time": 0.0,
    "pvp": true,
    "pve": false,
    "beginner": false,
    "note": "Another really good PVP weapon. Could be interchanged with MP9-N and MP5A4",
    "shotgun": false
  },
  {
    "name": "MP5A4",
    "type": "smg",
    "cost": "1,606",
    "reward": false,
    "damage": {
      "head": 121.0,
      "torso": 62.0,
      "arms": 23.0,
      "legs": 28.0
    },
    "weight_lbs": 5.67,
    "recoil": {
      "hip": 10.0,
      "ads": 8.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 1342.37,
    "fire_rate": 800.0,
    "range_score": 1011.95,
    "reload_full": 2.83,
    "reload_partial": 1.7,
    "draw_time": 0.0,
    "pvp": true,
    "pve": false,
    "beginner": false,
    "note": "Another really PVP option. Probably the second most used PVP gun right now",
    "shotgun": false
  },
  {
    "name": "PP-2000",
    "type": "smg",
    "cost": "1,350",
    "reward": false,
    "damage": {
      "head": 121.0,
      "torso": 62.0,
      "arms": 23.0,
      "legs": 28.0
    },
    "weight_lbs": 3.7,
    "recoil": {
      "hip": 18.0,
      "ads": 15.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 1309.52,
    "fire_rate": 600.0,
    "range_score": 963.03,
    "reload_full": 2.12,
    "reload_partial": 1.48,
    "draw_time": 0.0,
    "pvp": true,
    "pve": false,
    "beginner": true,
    "note": "Good, but does not keep par with the other weapons in the SMG category",
    "shotgun": false
  },
  {
    "name": "UMP45",
    "type": "smg",
    "cost": "1,434",
    "reward": false,
    "damage": {
      "head": 132.0,
      "torso": 66.0,
      "arms": 26.0,
      "legs": 31.0
    },
    "weight_lbs": 6.72,
    "recoil": {
      "hip": 14.0,
      "ads": 11.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 940.94,
    "fire_rate": 600.0,
    "range_score": 822.46,
    "reload_full": 2.08,
    "reload_partial": 1.85,
    "draw_time": 0.0,
    "pvp": true,
    "pve": false,
    "beginner": true,
    "note": "Again, good option, but the fire rate makes it less of a viable option compared to the others",
    "shotgun": false
  },
  {
    "name": "M1014 (Shotgun Damage is per pellet)",
    "type": "shotgun",
    "cost": "2,093",
    "reward": false,
    "damage": {
      "head": 38.0,
      "torso": 19.0,
      "arms": 13.0,
      "legs": 16.0
    },
    "weight_lbs": 9.33,
    "recoil": {
      "hip": 31.0,
      "ads": 26.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 1284.12,
    "fire_rate": 342.0,
    "range_score": 446.81,
    "reload_full": 0.0,
    "reload_partial": 0.0,
    "draw_time": 0.0,
    "pvp": true,
    "pve": false,
    "beginner": true,
    "note": "Shotguns are very good for PVP players, though you will be called names as it's looked down upon. M1014 is good.",
    "shotgun": true
  },
  {
    "name": "Saiga",
    "type": "shotgun",
    "cost": "1,593",
    "reward": false,
    "damage": {
      "head": 38.0,
      "torso": 19.0,
      "arms": 13.0,
      "legs": 16.0
    },
    "weight_lbs": 7.52,
    "recoil": {
      "hip": 23.0,
      "ads": 19.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 1263.01,
    "fire_rate": null,
    "range_score": 432.25,
    "reload_full": 4.01,
    "reload_partial": 3.14,
    "draw_time": 0.0,
    "pvp": true,
    "pve": false,
    "beginner": true,
    "note": "Again, good. However, shitguns in PVP are looked down upon, so I suggest not using them.",
    "shotgun": true
  },
  {
    "name": "M590A1",
    "type": "shotgun",
    "cost": "976",
    "reward": false,
    "damage": {
      "head": 38.0,
      "torso": 19.0,
      "arms": 13.0,
      "legs": 16.0
    },
    "weight_lbs": 8.78,
    "recoil": {
      "hip": 29.0,
      "ads": 24.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 1301.53,
    "fire_rate": 75.0,
    "range_score": 459.01,
    "reload_full": 0.0,
    "reload_partial": 0.0,
    "draw_time": 0.0,
    "pvp": true,
    "pve": false,
    "beginner": false,
    "note": "Once again, good, and the second best shotgun (M1014 being the best) but looked down upon",
    "shotgun": true
  },
  {
    "name": "RF417",
    "type": "battle rifle",
    "cost": "4,955",
    "reward": false,
    "damage": {
      "head": 117.0,
      "torso": 75.0,
      "arms": 26.0,
      "legs": 32.0
    },
    "weight_lbs": 10.29,
    "recoil": {
      "hip": 36.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2425.25,
    "fire_rate": 600.0,
    "range_score": 1754.57,
    "reload_full": 2.0,
    "reload_partial": 2.2,
    "draw_time": 2.79,
    "pvp": false,
    "pve": true,
    "beginner": false,
    "note": "Great for openworld and has great stats. All around, a decent choice for open world sniping and/purpose battles.",
    "shotgun": false
  },
  {
    "name": "Mk 17 Mod 0",
    "type": "battle rifle",
    "cost": "3,449",
    "reward": false,
    "damage": {
      "head": 117.0,
      "torso": 75.0,
      "arms": 26.0,
      "legs": 32.0
    },
    "weight_lbs": 9.45,
    "recoil": {
      "hip": 53.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2601.23,
    "fire_rate": 600.0,
    "range_score": 2018.44,
    "reload_full": 2.65,
    "reload_partial": 3.28,
    "draw_time": 2.79,
    "pvp": false,
    "pve": true,
    "beginner": false,
    "note": "Great openworld choice weapon. Not my overall favorite, but a really solid option.",
    "shotgun": false
  },
  {
    "name": "SA58",
    "type": "battle rifle",
    "cost": "2,226",
    "reward": false,
    "damage": {
      "head": 117.0,
      "torso": 75.0,
      "arms": 26.0,
      "legs": 32.0
    },
    "weight_lbs": 9.26,
    "recoil": {
      "hip": 49.0,
      "ads": 41.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2601.23,
    "fire_rate": 650.0,
    "range_score": 2018.44,
    "reload_full": 2.94,
    "reload_partial": 1.3,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": true,
    "note": "Good for PVP, but openworld is iffy.",
    "shotgun": false
  },
  {
    "name": "Hecate II",
    "type": "sniper",
    "cost": "6,044",
    "reward": false,
    "damage": {
      "head": 329.0,
      "torso": 127.0,
      "arms": 65.0,
      "legs": 76.0
    },
    "weight_lbs": 22.7,
    "recoil": {
      "hip": 63.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2702.19,
    "fire_rate": 15.0,
    "range_score": 3266.76,
    "reload_full": 8.02,
    "reload_partial": 5.11,
    "draw_time": 2.79,
    "pvp": false,
    "pve": true,
    "beginner": false,
    "note": "Great for openworld, but not a great overall option",
    "shotgun": false
  },
  {
    "name": "G22A2",
    "type": "sniper",
    "cost": "7,523",
    "reward": false,
    "damage": {
      "head": 149.0,
      "torso": 101.0,
      "arms": 31.0,
      "legs": 38.0
    },
    "weight_lbs": 12.18,
    "recoil": {
      "hip": 15.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2943.48,
    "fire_rate": 34.4,
    "range_score": 3472.86,
    "reload_full": 5.54,
    "reload_partial": 3.54,
    "draw_time": 0.0,
    "pvp": false,
    "pve": true,
    "beginner": false,
    "note": "The best sniper in the game in my opinion. It's so fun to use and is best all around.",
    "shotgun": false
  },
  {
    "name": "L115A3",
    "type": "sniper",
    "cost": "4,900",
    "reward": false,
    "damage": {
      "head": 165.0,
      "torso": 104.0,
      "arms": 34.0,
      "legs": 42.0
    },
    "weight_lbs": 12.17,
    "recoil": {
      "hip": 19.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2876.45,
    "fire_rate": 34.4,
    "range_score": 3369.39,
    "reload_full": 5.53,
    "reload_partial": 3.54,
    "draw_time": 0.0,
    "pvp": false,
    "pve": true,
    "beginner": false,
    "note": "Another great sniper rifle, another of my favorites.",
    "shotgun": false
  },
  {
    "name": "M2010",
    "type": "sniper",
    "cost": "6,200",
    "reward": false,
    "damage": {
      "head": 148.0,
      "torso": 100.0,
      "arms": 30.0,
      "legs": 37.0
    },
    "weight_lbs": 12.92,
    "recoil": {
      "hip": 31.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2870.21,
    "fire_rate": 40.0,
    "range_score": 3302.11,
    "reload_full": 4.63,
    "reload_partial": 2.63,
    "draw_time": 0.0,
    "pvp": false,
    "pve": true,
    "beginner": false,
    "note": "My second favorite sniper rifle in the game, and I use ti with darker loadouts",
    "shotgun": false
  },
  {
    "name": "Ultima Ratio",
    "type": "sniper",
    "cost": "5,320",
    "reward": false,
    "damage": {
      "head": 122.0,
      "torso": 97.0,
      "arms": 29.0,
      "legs": 36.0
    },
    "weight_lbs": 15.87,
    "recoil": {
      "hip": 24.0,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2730.98,
    "fire_rate": 45.0,
    "range_score": 2979.49,
    "reload_full": 5.52,
    "reload_partial": 4.07,
    "draw_time": 0.0,
    "pvp": false,
    "pve": true,
    "beginner": false,
    "note": "In my opinion, one of the worst snipers in the game. I really don't like",
    "shotgun": false
  },
  {
    "name": "M24",
    "type": "sniper",
    "cost": "1,899",
    "reward": false,
    "damage": {
      "head": 122.0,
      "torso": 97.0,
      "arms": 29.0,
      "legs": 36.0
    },
    "weight_lbs": 12.15,
    "recoil": {
      "hip": 51.0,
      "ads": 43.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 2732.5,
    "fire_rate": 45.0,
    "range_score": 2982.8,
    "reload_full": 0.0,
    "reload_partial": 0.0,
    "draw_time": 0.0,
    "pvp": false,
    "pve": true,
    "beginner": true,
    "note": "My only problem with this gun is it's lack of suppressor.",
    "shotgun": false
  },
  {
    "name": "Operator 1911",
    "type": "pistol",
    "cost": "N/A",
    "reward": true,
    "damage": {
      "head": 123.0,
      "torso": 62.0,
      "arms": 24.0,
      "legs": 29.0
    },
    "weight_lbs": 3.12,
    "recoil": {
      "hip": 37.0,
      "ads": 31.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 876.8,
    "fire_rate": 420.0,
    "range_score": 714.16,
    "reload_full": 1.17,
    "reload_partial": 1.67,
    "draw_time": null,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "Pistols are a weird category. There really isn't a \"best\" or favorable gun. This gun is pretty good though.",
    "shotgun": false
  },
  {
    "name": "Python",
    "type": "pistol",
    "cost": "N/A",
    "reward": true,
    "damage": {
      "head": 163.0,
      "torso": 79.0,
      "arms": 35.0,
      "legs": 41.0
    },
    "weight_lbs": 2.7,
    "recoil": {
      "hip": 47.0,
      "ads": 39.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 1461.0,
    "fire_rate": 75.0,
    "range_score": 1077.67,
    "reload_full": 0.0,
    "reload_partial": 0.0,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "This gun is fun to play around with, not very practical.",
    "shotgun": false
  },
  {
    "name": "Deagle Mk XIX",
    "type": "pistol",
    "cost": "1,425",
    "reward": false,
    "damage": {
      "head": 179.0,
      "torso": 87.0,
      "arms": 38.0,
      "legs": 45.0
    },
    "weight_lbs": 4.44,
    "recoil": {
      "hip": 104.0,
      "ads": 87.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 1461.0,
    "fire_rate": 240.0,
    "range_score": 963.01,
    "reload_full": 1.07,
    "reload_partial": 1.36,
    "draw_time": 2.86,
    "pvp": true,
    "pve": false,
    "beginner": false,
    "note": "Fun gun, but only for PVP. The lack of suppressor makes this gun not viable for openworld",
    "shotgun": false
  },
  {
    "name": "M45A1",
    "type": "pistol",
    "cost": "1,499",
    "reward": false,
    "damage": {
      "head": 123.0,
      "torso": 62.0,
      "arms": 24.0,
      "legs": 29.0
    },
    "weight_lbs": 3.09,
    "recoil": {
      "hip": 47.0,
      "ads": 39.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 876.8,
    "fire_rate": 420.0,
    "range_score": 714.16,
    "reload_full": 1.17,
    "reload_partial": 1.67,
    "draw_time": 0.0,
    "pvp": true,
    "pve": false,
    "beginner": false,
    "note": "Lack of suppressor makes this inferior to the Operator 1911, even though the 1911 is a reward weapon from zombies.",
    "shotgun": false
  },
  {
    "name": "APB",
    "type": "pistol",
    "cost": "813",
    "reward": false,
    "damage": {
      "head": 101.0,
      "torso": 49.0,
      "arms": 18.0,
      "legs": 22.0
    },
    "weight_lbs": 3.21,
    "recoil": {
      "hip": 29.0,
      "ads": 24.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 992.11,
    "fire_rate": 750.0,
    "range_score": 945.88,
    "reload_full": 2.36,
    "reload_partial": 2.11,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "Only full auto pistol in the game. It's fun to play around with, but I don't find it to be all that practical",
    "shotgun": false
  },
  {
    "name": "Model 75 B",
    "type": "pistol",
    "cost": "945",
    "reward": false,
    "damage": {
      "head": 114.0,
      "torso": 59.0,
      "arms": 22.0,
      "legs": 27.0
    },
    "weight_lbs": 2.62,
    "recoil": {
      "hip": 30.0,
      "ads": 25.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 1232.08,
    "fire_rate": 465.0,
    "range_score": 852.49,
    "reload_full": 1.07,
    "reload_partial": 1.36,
    "draw_time": null,
    "pvp": true,
    "pve": false,
    "beginner": true,
    "note": "Lack of suppressor makes this gun useless in openworld. The gun has a hard trigger, which means it doesn't fire as fast as you want",
    "shotgun": false
  },
  {
    "name": "Mk 25 Mod 0",
    "type": "pistol",
    "cost": "1,100",
    "reward": false,
    "damage": {
      "head": 113.0,
      "torso": 58.0,
      "arms": 21.0,
      "legs": 26.0
    },
    "weight_lbs": 1.74,
    "recoil": {
      "hip": 40.0,
      "ads": 33.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 1219.45,
    "fire_rate": 480.0,
    "range_score": 835.11,
    "reload_full": 1.94,
    "reload_partial": 1.69,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "Great for larping. Not as good as V226 because you can't put a sight on this one.",
    "shotgun": false
  },
  {
    "name": "V320",
    "type": "pistol",
    "cost": "1,179",
    "reward": false,
    "damage": {
      "head": 114.0,
      "torso": 59.0,
      "arms": 22.0,
      "legs": 27.0
    },
    "weight_lbs": 1.69,
    "recoil": {
      "hip": 40.0,
      "ads": 34.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 1232.08,
    "fire_rate": 480.0,
    "range_score": 852.49,
    "reload_full": 1.07,
    "reload_partial": 1.36,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "Best pistol on the game in my opinion. The most versatile",
    "shotgun": false
  },
  {
    "name": "V226R",
    "type": "pistol",
    "cost": "959",
    "reward": false,
    "damage": {
      "head": 133.0,
      "torso": 58.0,
      "arms": 21.0,
      "legs": 26.0
    },
    "weight_lbs": 1.7,
    "recoil": {
      "hip": 41.0,
      "ads": 34.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 1219.45,
    "fire_rate": 480.0,
    "range_score": 835.11,
    "reload_full": 1.94,
    "reload_partial": 1.69,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "Better version of the Mk 25 Mod 0. My second favorite pistol in the game",
    "shotgun": false
  },
  {
    "name": "Mk 27 Mod 0",
    "type": "pistol",
    "cost": "1,565",
    "reward": false,
    "damage": {
      "head": 112.0,
      "torso": 57.0,
      "arms": 21.0,
      "legs": 26.0
    },
    "weight_lbs": 1.89,
    "recoil": {
      "hip": 12.0,
      "ads": 10.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 1202.06,
    "fire_rate": 511.0,
    "range_score": 811.46,
    "reload_full": 1.07,
    "reload_partial": 1.36,
    "draw_time": 2.86,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "Another great option. Very versatile",
    "shotgun": false
  },
  {
    "name": "M17",
    "type": "pistol",
    "cost": "1,130",
    "reward": false,
    "damage": {
      "head": 114.0,
      "torso": 59.0,
      "arms": 22.0,
      "legs": 27.0
    },
    "weight_lbs": 1.69,
    "recoil": {
      "hip": 40.0,
      "ads": 34.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 1232.08,
    "fire_rate": 480.0,
    "range_score": 852.49,
    "reload_full": 1.07,
    "reload_partial": 1.36,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "A worse V320. Just use the V320 for the sight unless larping",
    "shotgun": false
  },
  {
    "name": "USP45 Tactical",
    "type": "pistol",
    "cost": "1,341",
    "reward": false,
    "damage": {
      "head": 120.0,
      "torso": 60.0,
      "arms": 23.0,
      "legs": 28.0
    },
    "weight_lbs": 2.8,
    "recoil": {
      "hip": 43.0,
      "ads": 35.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 852.68,
    "fire_rate": 420.0,
    "range_score": 675.41,
    "reload_full": 1.07,
    "reload_partial": 1.36,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": false,
    "note": "Good for both gamemodes, but just not the best gun.",
    "shotgun": false
  },
  {
    "name": "HP",
    "type": "pistol",
    "cost": "939",
    "reward": false,
    "damage": {
      "head": 114.0,
      "torso": 59.0,
      "arms": 22.0,
      "legs": 27.0
    },
    "weight_lbs": 2.45,
    "recoil": {
      "hip": 21.0,
      "ads": 18.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 852.49,
    "fire_rate": 465.0,
    "range_score": 852.49,
    "reload_full": 1.07,
    "reload_partial": 1.36,
    "draw_time": 2.86,
    "pvp": true,
    "pve": false,
    "beginner": true,
    "note": "If you see someone using this gun unironically, take a picture and frame it.",
    "shotgun": false
  },
  {
    "name": "G17 Gen 3",
    "type": "pistol",
    "cost": "810",
    "reward": false,
    "damage": {
      "head": 114.0,
      "torso": 59.0,
      "arms": 21.0,
      "legs": 26.0
    },
    "weight_lbs": 1.94,
    "recoil": {
      "hip": 11.0,
      "ads": 9.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 1223.33,
    "fire_rate": 465.0,
    "range_score": 840.44,
    "reload_full": 1.07,
    "reload_partial": 1.36,
    "draw_time": 2.86,
    "pvp": true,
    "pve": true,
    "beginner": true,
    "note": "Great overall gun and very versatile. A top pick for me",
    "shotgun": false
  },
  {
    "name": "M9",
    "type": "pistol",
    "cost": "N/A",
    "reward": false,
    "damage": {
      "head": 115.0,
      "torso": 59.0,
      "arms": 22.0,
      "legs": 27.0
    },
    "weight_lbs": 2.27,
    "recoil": {
      "hip": 23.0,
      "ads": 20.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 1240.01,
    "fire_rate": 465.0,
    "range_score": 863.51,
    "reload_full": 2.27,
    "reload_partial": 2.79,
    "draw_time": 0.0,
    "pvp": true,
    "pve": true,
    "beginner": true,
    "note": "THE beginner gun. Get rid of it as soon as possible and buy the G17 gen 3",
    "shotgun": false
  },
  {
    "name": "M9A1",
    "type": "pistol",
    "cost": "450",
    "reward": false,
    "damage": {
      "head": null,
      "torso": null,
      "arms": null,
      "legs": null
    },
    "weight_lbs": null,
    "recoil": {
      "hip": null,
      "ads": null
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": null,
    "fire_rate": null,
    "range_score": null,
    "reload_full": 1.6,
    "reload_partial": null,
    "draw_time": null,
    "pvp": false,
    "pve": false,
    "beginner": false,
    "note": "Not worth buying. Same gun as the M9, just buy the G17",
    "shotgun": false
  },
  {
    "name": "PM",
    "type": "pistol",
    "cost": "390",
    "reward": false,
    "damage": {
      "head": 95.0,
      "torso": 47.0,
      "arms": 17.0,
      "legs": 21.0
    },
    "weight_lbs": 1.68,
    "recoil": {
      "hip": 40.0,
      "ads": 33.0
    },
    "dispersion": {
      "hip": null
    },
    "muzzle_velocity": 932.37,
    "fire_rate": 630.0,
    "range_score": 835.39,
    "reload_full": 2.12,
    "reload_partial": 2.11,
    "draw_time": 0.0,
    "pvp": true,
    "pve": false,
    "beginner": true,
    "note": "Not worth, once again. As a beginner, just buy the G17",
    "shotgun": false
  }
]

const TYPE_LABELS = {"assault rifle": "Assault Rifle", "battle rifle": "Battle Rifle", "carbine": "Carbine", "dmr": "DMR", "lmg": "LMG", "pdw": "PDW", "pistol": "Pistol", "shotgun": "Shotgun", "smg": "SMG", "sniper": "Sniper"}

const ALL_TYPES = [...new Set(GUNS.map(g => g.type))].sort()

function Bar({ label, value, max, inverse }) {
  if (value === null || value === undefined) return null
  const pct = Math.min(100, (value / max) * 100)
  const color = inverse
    ? pct <= 30 ? '#1BBFA0' : pct <= 60 ? '#F5D547' : '#F08080'
    : pct >= 70 ? '#1BBFA0' : pct >= 40 ? '#F5D547' : '#F08080'
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <span className="text-xs text-gray-500 w-28 flex-shrink-0">{label}</span>
      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
        <div className="h-1 rounded-full transition-all duration-500" style={{ width: pct + '%', background: color }} />
      </div>
      <span className="text-xs text-gray-400 w-12 text-right font-mono">{value}</span>
    </div>
  )
}

function DamageGrid({ dmg, pellet }) {
  if (!dmg || (!dmg.head && !dmg.torso)) return null
  return (
    <div className="mb-4">
      {pellet && <div className="text-xs text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 rounded-lg px-3 py-1.5 mb-3 font-mono">⚠ Damage shown is per pellet</div>}
      <div className="text-xs text-gray-600 uppercase tracking-widest mb-2">Damage per shot{pellet ? ' (per pellet)' : ''}</div>
      <div className="grid grid-cols-4 gap-2">
        {[['Head', dmg.head, '#F08080'], ['Torso', dmg.torso, '#F5D547'], ['Arms', dmg.arms, '#1BBFA0'], ['Legs', dmg.legs, '#6E8099']].map(([z, v, c]) => (
          <div key={z} className="bg-[#131A24] rounded-xl p-3 text-center">
            <div className="text-xs uppercase tracking-widest mb-1" style={{ color: c }}>{z}</div>
            <div className="text-2xl font-black" style={{ color: c }}>{v || '—'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatsBlock({ g }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-[#131A24] rounded-xl p-4">
        <div className="text-xs text-gray-600 uppercase tracking-widest mb-3">Handling</div>
        <Bar label="Recoil (hip)" value={g.recoil?.hip} max={100} inverse={true} />
        <Bar label="Recoil (ADS)" value={g.recoil?.ads} max={100} inverse={true} />
        <Bar label="Dispersion" value={g.dispersion?.hip} max={100} inverse={true} />
        <Bar label="Fire rate" value={g.fire_rate} max={1200} inverse={false} />
        <Bar label="Range" value={g.range_score} max={4000} inverse={false} />
      </div>
      <div className="bg-[#131A24] rounded-xl p-4">
        <div className="text-xs text-gray-600 uppercase tracking-widest mb-3">Performance</div>
        {g.muzzle_velocity && <div className="flex justify-between mb-2"><span className="text-xs text-gray-500">Muzzle velocity</span><span className="text-xs text-white font-mono">{g.muzzle_velocity.toLocaleString()} ft/s</span></div>}
        {g.weight_lbs && <div className="flex justify-between mb-2"><span className="text-xs text-gray-500">Base weight</span><span className="text-xs text-white font-mono">{g.weight_lbs} lbs</span></div>}
        {g.reload_full && <div className="flex justify-between mb-2"><span className="text-xs text-gray-500">Reload (empty)</span><span className="text-xs text-white font-mono">{g.reload_full}s</span></div>}
        {g.reload_partial && <div className="flex justify-between mb-2"><span className="text-xs text-gray-500">Reload (partial)</span><span className="text-xs text-white font-mono">{g.reload_partial}s</span></div>}
        {g.draw_time ? <div className="flex justify-between mb-2"><span className="text-xs text-gray-500">Draw time</span><span className="text-xs text-white font-mono">{g.draw_time}s</span></div> : null}
      </div>
    </div>
  )
}

function GunCard({ g }) {
  const [open, setOpen] = useState(false)
  const [ammoIdx, setAmmoIdx] = useState(0)
  const hasVariants = g.variants && g.variants.length > 0
  const currentAmmo = ammoIdx === 0 ? g : g.variants[ammoIdx - 1]

  const costClass = g.cost === 'Free' ? 'text-[#1BBFA0]' : g.cost === 'N/A' ? 'text-gray-600' : 'text-yellow-400'

  return (
    <div className={`bg-[#0D1219] border rounded-2xl overflow-hidden transition-colors ${open ? 'border-[#1BBFA0]/30' : 'border-white/5 hover:border-white/10'}`}>
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-semibold text-white">{g.display_name || g.name}</span>
          <span className="text-xs font-mono text-gray-600 uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded">{TYPE_LABELS[g.type] || g.type}</span>
          {g.reward && <span className="text-xs text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded font-mono">⭐ Reward</span>}
        </div>
        <div className="flex items-center gap-3">
          <span className={`font-mono text-sm ${costClass}`}>{g.cost}</span>
          <span className={`text-gray-500 text-xs transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
        </div>
      </div>

      {/* Cost bar */}
      <div className="px-5 py-2 bg-yellow-400/3 border-t border-yellow-400/8 flex justify-between items-center">
        <span className="text-xs text-yellow-400/40 font-mono uppercase tracking-widest">Cost</span>
        <span className={`font-black text-lg ${costClass}`}>{g.cost === 'Free' || g.cost === 'N/A' ? g.cost : g.cost + ' credits'}</span>
      </div>

      {/* Body */}
      {open && (
        <div className="px-5 pb-5 pt-4 border-t border-white/5">
          {g.note && <div className="text-sm text-gray-400 leading-relaxed mb-4 pl-3 border-l-2 border-[#1BBFA0]">{g.note}</div>}

          {hasVariants ? (
            <>
              <div className="flex gap-2 mb-4">
                <button onClick={() => setAmmoIdx(0)}
                  className={`text-xs px-4 py-2 rounded-lg border transition ${ammoIdx === 0 ? 'bg-purple-500/15 border-purple-400/40 text-purple-300 font-semibold' : 'border-white/10 text-gray-500 hover:text-white'}`}>
                  {g.ammo_label || 'Standard'}
                </button>
                {g.variants.map((v, i) => (
                  <button key={i} onClick={() => setAmmoIdx(i + 1)}
                    className={`text-xs px-4 py-2 rounded-lg border transition ${ammoIdx === i + 1 ? 'bg-purple-500/15 border-purple-400/40 text-purple-300 font-semibold' : 'border-white/10 text-gray-500 hover:text-white'}`}>
                    {v.ammo_label || v.name}
                  </button>
                ))}
              </div>
              {ammoIdx > 0 && g.variants[ammoIdx-1].note && (
                <div className="text-sm text-gray-400 leading-relaxed mb-4 pl-3 border-l-2 border-purple-400">{g.variants[ammoIdx-1].note}</div>
              )}
              <DamageGrid dmg={currentAmmo.damage} pellet={g.shotgun} />
              <StatsBlock g={currentAmmo} />
            </>
          ) : (
            <>
              <DamageGrid dmg={g.damage} pellet={g.shotgun} />
              <StatsBlock g={g} />
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default function GunsPage() {
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [search, setSearch] = useState('')
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push('/login'); return }
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="min-h-screen bg-[#07090D] flex items-center justify-center"><div className="text-[#1BBFA0] font-mono text-sm">Loading...</div></div>

  const filtered = GUNS.filter(g => {
    const mOk = mode === 'all' || (mode === 'pvp' && g.pvp) || (mode === 'pve' && g.pve)
    const tOk = typeFilter === 'all' || g.type === typeFilter
    const sOk = !search || g.name.toLowerCase().includes(search.toLowerCase()) || (g.note || '').toLowerCase().includes(search.toLowerCase())
    return mOk && tOk && sOk
  })

  return (
    <div className="min-h-screen bg-[#07090D] text-white">
      <nav className="sticky top-0 z-50 bg-[#07090D]/90 backdrop-blur border-b border-white/5 px-8 py-4 flex items-center justify-between">
        <Link href="/home" className="font-black text-2xl tracking-widest">RDYODA<span className="text-[#1BBFA0]">.</span>GG</Link>
        <div className="flex items-center gap-6">
          <Link href="/home" className="text-sm text-gray-400 hover:text-white transition">Home</Link>
          <Link href="/guns" className="text-sm text-[#1BBFA0]">Guns</Link>
          <Link href="/guides" className="text-sm text-gray-400 hover:text-white transition">Guides</Link>
          <Link href="/credits" className="text-sm text-gray-400 hover:text-white transition">Credits</Link>
          <Link href="/attachments" className="text-sm text-gray-400 hover:text-white transition">Attachments</Link>
        </div>
        <a href="https://youtube.com/@Rdyoda9" target="_blank" className="text-xs text-yellow-400 border border-yellow-400/20 px-3 py-1.5 rounded-lg hover:bg-yellow-400/10 transition">▶ @Rdyoda9</a>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="font-black text-4xl mb-2">GUN DATABASE</h1>
        <p className="text-gray-500 text-sm mb-8">{GUNS.length} weapons with real stats — damage by hit zone, recoil, muzzle velocity, reload times, and more.</p>

        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or keyword..."
          className="w-full bg-[#0D1219] border border-white/10 rounded-xl px-4 py-3 text-white text-sm mb-4 outline-none focus:border-[#1BBFA0]/40 transition"
        />

        <div className="flex gap-2 mb-4">
          {[['all','All weapons'],['pvp','PvP'],['pve','PvE / Open World']].map(([m, label]) => (
            <button key={m} onClick={() => setMode(m)}
              className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition ${
                mode === m
                  ? m === 'all' ? 'bg-[#1BBFA0]/10 border-[#1BBFA0] text-[#1BBFA0]'
                  : m === 'pvp' ? 'bg-purple-500/10 border-purple-400 text-purple-300'
                  : 'bg-yellow-400/8 border-yellow-400 text-yellow-400'
                  : 'border-white/10 text-gray-500 hover:text-white'
              }`}>
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setTypeFilter('all')}
            className={`text-xs px-3 py-1.5 rounded-full border transition ${typeFilter === 'all' ? 'bg-[#1BBFA0] text-black border-[#1BBFA0] font-semibold' : 'border-white/10 text-gray-500 hover:text-white'}`}>
            All
          </button>
          {ALL_TYPES.map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${typeFilter === t ? 'bg-[#1BBFA0] text-black border-[#1BBFA0] font-semibold' : 'border-white/10 text-gray-500 hover:text-white'}`}>
              {TYPE_LABELS[t] || t}
            </button>
          ))}
        </div>

        <div className="text-xs text-gray-600 font-mono mb-4">{filtered.length} weapon{filtered.length !== 1 ? 's' : ''}</div>

        <div className="flex flex-col gap-3">
          {filtered.map(g => <GunCard key={g.name} g={g} />)}
        </div>
      </div>
    </div>
  )
}