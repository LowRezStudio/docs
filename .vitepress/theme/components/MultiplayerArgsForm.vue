<script setup lang="ts">
import { ref, computed } from "vue";
import { VPButton } from "vitepress/theme";

const maxPlayers = ref(10);
const password = ref("");
const allowSpectators = ref(false);
const modVersion = ref("TempestMpDEV17");
const mapSelect = ref("BMM_P_v01");
const selectedChampions = ref<string[]>([]);
const copyButtonText = ref("Copy");

const champions = [
	{ id: "androxus", name: "Androxus" },
	{ id: "ash", name: "Ash" },
	{ id: "barik", name: "Barik" },
	{ id: "bombking", name: "Bomb King" },
	{ id: "buck", name: "Buck" },
	{ id: "cassie", name: "Cassie" },
	{ id: "drogoz", name: "Drogoz" },
	{ id: "evie", name: "Evie" },
	{ id: "fernando", name: "Fernando" },
	{ id: "grohk", name: "Grohk" },
	{ id: "grover", name: "Grover" },
	{ id: "inara", name: "Inara" },
	{ id: "jenos", name: "Jenos" },
	{ id: "kinessa", name: "Kinessa" },
	{ id: "lex", name: "Lex" },
	{ id: "lian", name: "Lian" },
	{ id: "maeve", name: "Maeve" },
	{ id: "makoa", name: "Makoa" },
	{ id: "maldamba", name: "Mal'Damba" },
	{ id: "pip", name: "Pip" },
	{ id: "ruckus", name: "Ruckus" },
	{ id: "seris", name: "Seris" },
	{ id: "shalin", name: "Sha Lin" },
	{ id: "skye", name: "Skye" },
	{ id: "strix", name: "Strix" },
	{ id: "torvald", name: "Torvald" },
	{ id: "tyra", name: "Tyra" },
	{ id: "viktor", name: "Viktor" },
	{ id: "willo", name: "Willo" },
	{ id: "ying", name: "Ying" },
	{ id: "zhin", name: "Zhin" },
	{ id: "churchill", name: "Churchill" },
	{ id: "lazarus", name: "Lazarus" },
];

const maps = [
	{ name: "Brightmarsh", value: "BMM_P_v01" },
	{ name: "Fish Market", value: "FMM_P_Dock_v02" },
	{ name: "Timber Mill", value: "FMM_Mill_P_v04" },
	{ name: "Frozen Guard", value: "IMM_P_Igloo_v02" },
	{ name: "Frog Isle", value: "TMM_P_Isle_v02" },
	{ name: "Ice Mines", value: "IMM_Mines_P_v04" },
	{ name: "Jaguar Falls", value: "TMM_Falls_P_v04" },
	{ name: "Stone Keep", value: "KMM_P_v01" },
];

const resultCommand = computed(() => {
	if (selectedChampions.value.length === 0) return "";

	const gamemode = modVersion.value === "TempestMpDEV17" ? "SiegeDEV" : "Siege";
	let cmd = `server ${mapSelect.value}?game=${modVersion.value}.${gamemode}?maxplayers=${maxPlayers.value}`;

	if (password.value) cmd += `?serverpassword=${password.value.trim()}`;
	cmd += `?allowedChampions=${selectedChampions.value.join(",")}`;
	if (allowSpectators.value) cmd += `?allowSpectators`;

	return cmd + " -log";
});

function selectAll() {
	selectedChampions.value = champions.map(champ => champ.id);
}

function clearAll() {
	selectedChampions.value = [];
}

function copyToClipboard() {
	navigator.clipboard.writeText(resultCommand.value);
	copyButtonText.value = "Copied!";
	setTimeout(() => (copyButtonText.value = "Copy"), 1000);
}
</script>

<template>
	<div class="form">
		<div class="grid">
			<div class="section">
				<h3>Basic Settings</h3>
				<label
					>Max Players:
					<input type="number" v-model.number="maxPlayers" min="1" max="50"
				/></label>
				<label
					>Password:
					<input type="text" v-model="password" placeholder="Optional"
				/></label>
				<label
					><input type="checkbox" v-model="allowSpectators" /> Allow
					spectators</label
				>
			</div>

			<div class="section">
				<h3>Server Configuration</h3>
				<label
					>Mod Version:
					<select v-model="modVersion">
						<option value="TempestMpDEV17">TempestMpDEV17</option>
						<option value="TempestMp">TempestMp</option>
					</select>
				</label>
				<label
					>Map:
					<select v-model="mapSelect">
						<option v-for="map in maps" :key="map.value" :value="map.value">
							{{ map.name }}
						</option>
					</select>
				</label>
			</div>
		</div>

		<div class="section">
			<div class="header">
				<h3>Champions</h3>
				<div>
					<VPButton theme="alt" @click="selectAll" text="Select All" />
					<VPButton theme="alt" @click="clearAll" text="Clear All" />
				</div>
			</div>
			<div class="champions">
				<label v-for="champ in champions" :key="champ.id">
					<input type="checkbox" :value="champ.id" v-model="selectedChampions" />
					{{ champ.name }}
				</label>
			</div>
			<div v-if="selectedChampions.length > 10" class="warning">
				⚠️ Selecting more than 10 champions may cause issues with loading audio
				and other assets.
			</div>
		</div>

		<div class="section" v-if="resultCommand">
			<div class="header">
				<h3>Generated Command</h3>
				<VPButton
					theme="brand"
					@click="copyToClipboard"
					:text="copyButtonText"
				/>
			</div>
			<div class="command">
				<pre>{{ resultCommand }}</pre>
			</div>
		</div>
	</div>
</template>
