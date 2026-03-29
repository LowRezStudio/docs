<script setup lang="ts">
import { computed, ref } from "vue";
import maps from "./maps.json";
import versions from "./versions.json";
const gameVersion = ref("0.57");
function compareVersions(a: string, b: string) {
	//compares version numbers of the form <number>.<number>
	const partsA = a.split(".").map(Number);
	const partsB = b.split(".").map(Number);

	if (partsA[0] > partsB[0]) return 1;
	if (partsA[0] < partsB[0]) return -1;
	if (partsA[1] === partsB[1]) return 0;
	return partsA[1] > partsB[1] ? 1 : -1;
}

const filteredMaps = computed(() => {
	return maps
		.filter((m) => {
			return (
				compareVersions(gameVersion.value, m.versionStart) >= 0 &&
				compareVersions(gameVersion.value, m.versionEnd) <= 0
			);
		})
		.sort((a, b) => {
			return a.displayName.localeCompare(b.displayName);
		});
});
</script>

<template>
	<div class="maps">
		<label
			>Game Version:
			<select v-model="gameVersion">
				<option
					v-for="version in versions"
					:key="version.id"
					:value="version.version"
				>
					{{ version.version + ": " + version.name }}
				</option>
			</select>
		</label>
		<ul>
			<li v-for="map in filteredMaps" :key="map.id">
				{{ map.displayName }}
				<code>{{ map.id }}</code>
			</li>
		</ul>
	</div>
</template>
