<script setup lang="ts">
defineProps<{
	href: string;
	text: string;
	note?: string;
}>();
</script>

<template>
	<div class="download">
		<a class="download-btn" :href="href" target="_blank" rel="noopener noreferrer">
			<svg class="download-icon" viewBox="0 0 16 16" aria-hidden="true">
				<path
					d="M8 2v8M4.8 6.8 8 10l3.2-3.2M2.5 13.5h11"
					fill="none"
					stroke="currentColor"
					stroke-width="1.6"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			{{ text }}
		</a>
		<small v-if="note" class="download-note">{{ note }}</small>
	</div>
</template>

<style scoped>
.download {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 8px 14px;
	margin: 20px 0 28px;
}

.download-btn {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	height: 44px;
	padding: 0 20px;
	border-radius: 22px;
	background: var(--vp-button-brand-bg);
	color: var(--vp-button-brand-text);
	font-size: 15px;
	font-weight: 600;
	line-height: 1;
	text-decoration: none;
	transition: background-color 0.2s ease;
}

.download-btn:hover {
	background: var(--vp-button-brand-hover-bg);
	color: var(--vp-button-brand-hover-text);
	text-decoration: none;
}

.download-btn:active {
	background: var(--vp-button-brand-active-bg);
}

.download-btn:focus-visible {
	outline: 2px solid var(--vp-c-brand-1);
	outline-offset: 3px;
}

.download-icon {
	flex: none;
	width: 16px;
	height: 16px;
}

.download-note {
	color: var(--vp-c-text-2);
	font-size: 13px;
}
</style>
