<script setup lang="ts">
defineProps<{
	username: string;
}>();
</script>

<template>
	<a
		:href="`https://github.com/${username}`"
		target="_blank"
		rel="noopener noreferrer"
		class="contributor-avatar"
	>
		<img
			:src="`https://github.com/${username}.png`"
			:alt="username"
			class="avatar-img"
			loading="lazy"
		/>
		<span class="tooltip">{{ username }}</span>
	</a>
</template>

<style scoped>
.contributor-avatar {
	position: relative;
	display: inline-block;
	transition: transform 0.2s ease;
}

.avatar-img {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	object-fit: cover;
	border: 2px solid var(--vp-c-divider);
	transition:
		border-color 0.2s ease,
		transform 0.2s ease;
}

.contributor-avatar:hover .avatar-img {
	border-color: var(--vp-c-brand-2);
	transform: scale(1.1);
}

.tooltip {
	position: absolute;
	bottom: calc(100% + 8px);
	left: 50%;
	transform: translateX(-50%);
	background: var(--vp-c-bg-soft);
	color: var(--vp-c-text-1);
	padding: 4px 8px;
	border-radius: 4px;
	font-size: 12px;
	white-space: nowrap;
	opacity: 0;
	pointer-events: none;
	transition: opacity 0.2s ease;
	border: 1px solid var(--vp-c-divider);
	z-index: 10;
}

.contributor-avatar:hover .tooltip {
	opacity: 1;
}
</style>
