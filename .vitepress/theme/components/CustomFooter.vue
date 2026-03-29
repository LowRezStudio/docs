<script setup lang="ts">
import ContributorAvatar from "./ContributorAvatar.vue";

const contributors = [
	{ username: "Kyiro" },
	{ username: "Xiloe" },
	{ username: "SupImCinnamon" },
	{ username: "KANA720" },
	{ username: "andreiBe" },
];
</script>

<template>
	<div class="custom-footer">
		<div class="footer-content">
			<div class="contributors-list">
				<ContributorAvatar
					v-for="contributor in contributors"
					:key="contributor.username"
					:username="contributor.username"
				/>
			</div>
			<span class="footer-label">Made with ❤️ by the community</span>
		</div>
	</div>
</template>

<style scoped>
.custom-footer {
	border-top: 1px solid var(--vp-c-divider);
	padding: 24px 0;
	margin-top: auto;
}

.footer-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;
}

.footer-label {
	font-size: 14px;
	color: var(--vp-c-text-2);
}

.contributors-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 12px;
}

@media (max-width: 480px) {
	.contributors-list {
		gap: 8px;
	}

	.contributors-list :deep(.avatar-img) {
		width: 32px;
		height: 32px;
	}
}
</style>
